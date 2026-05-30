import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

function signToken(value, secret) {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(value);
  return `${value}.${hmac.digest("hex")}`;
}

export async function POST(request) {
  try {
    const {email, password } = await request.json();
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const tokenSecret = process.env.ADMIN_TOKEN_SECRET;

    if (!email || email !== adminEmail) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create a signed session token
    const sessionValue = `admin_authenticated_${Date.now()}`;
    const signedToken = signToken(sessionValue, tokenSecret);

    const cookieStore = await cookies();
    cookieStore.set("admin_session", signedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
