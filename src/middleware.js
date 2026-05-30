import { NextResponse } from "next/server";

/**
 * Verify the HMAC-signed session cookie using the Web Crypto API.
 * (Node.js crypto is not available in the Edge Runtime used by middleware.)
 */
async function verifySession(sessionValue, secret) {
  try {
    const lastDot = sessionValue.lastIndexOf(".");
    if (lastDot === -1) return false;

    const value = sessionValue.slice(0, lastDot);
    const sig = sessionValue.slice(lastDot + 1);

    const encoder = new TextEncoder();

    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(value)
    );

    const expected = Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Constant-time comparison
    if (sig.length !== expected.length) return false;
    let mismatch = 0;
    for (let i = 0; i < sig.length; i++) {
      mismatch |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
    }
    return mismatch === 0;
  } catch {
    return false;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const loginUrl = new URL("/admin", request.url);

  // Protect all /admin/* routes EXCEPT the login page itself
  if (pathname.startsWith("/admin") && pathname !== "/admin") {
    const sessionCookie = request.cookies.get("admin_session");

    // No cookie → redirect to login
    if (!sessionCookie?.value) {
      return NextResponse.redirect(loginUrl);
    }

    const secret = process.env.ADMIN_TOKEN_SECRET;
    if (!secret) {
      return NextResponse.redirect(loginUrl);
    }

    // Invalid signature → redirect to login
    const valid = await verifySession(sessionCookie.value, secret);
    if (!valid) {
      const res = NextResponse.redirect(loginUrl);
      // Clear the bad cookie
      res.cookies.delete("admin_session");
      return res;
    }
  }

  return NextResponse.next();
}

// Only run middleware on /admin routes
export const config = {
  matcher: ["/admin/:path+"],
};
