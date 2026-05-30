import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

/* ─── Configure Cloudinary ─── */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CLOUDINARY_FOLDER = "portfolio-gallery";

/* ─── Auth Helper ─── */
async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session?.value) return false;

  const secret = process.env.ADMIN_TOKEN_SECRET;
  if (!secret) return false;

  const lastDot = session.value.lastIndexOf(".");
  if (lastDot === -1) return false;

  const value = session.value.slice(0, lastDot);
  const sig = session.value.slice(lastDot + 1);

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(value);
  const expected = hmac.digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(sig, "hex"),
      Buffer.from(expected, "hex")
    );
  } catch {
    return false;
  }
}

/* ─── Read static seed gallery (gallery.json) ─── */
function readStaticGallery() {
  try {
    const filePath = path.join(process.cwd(), "public", "gallery.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw).map((item) => ({ ...item, _source: "static" }));
  } catch {
    return [];
  }
}

/* ─── Fetch images from Cloudinary ─── */
async function fetchCloudinaryImages() {
  try {
    // Use api.resources() — reliably returns context metadata unlike the Search API
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: CLOUDINARY_FOLDER + "/",
      context: true,
      max_results: 200,
    });

    return result.resources.map((r) => {
      // Context stored as JSON string, fall back gracefully
      let meta = {};
      try {
        if (r.context?.custom?.data) {
          meta = JSON.parse(r.context.custom.data);
        } else if (r.context?.custom) {
          // Legacy pipe-separated format fallback
          meta = {
            title: r.context.custom.title,
            category: r.context.custom.category,
            height: r.context.custom.height,
          };
        }
      } catch {
        // ignore parse errors
      }

      return {
        id: `cld_${r.public_id.replace(/\//g, "_")}`,
        title: meta.title || r.public_id.split("/").pop(),
        category: meta.category || "Game Icons",
        height: meta.height || "medium",
        image: r.secure_url,
        public_id: r.public_id,
        _source: "cloudinary",
      };
    });
  } catch (err) {
    console.error("Cloudinary fetch error:", err.message);
    return [];
  }
}

/* ─── GET — Return all gallery items ─── */
export async function GET() {
  try {
    const [staticItems, cloudinaryItems] = await Promise.all([
      readStaticGallery(),
      fetchCloudinaryImages(),
    ]);

    // Cloudinary items first (newest uploads), then static seed
    return NextResponse.json([...cloudinaryItems, ...staticItems]);
  } catch (err) {
    console.error("Gallery GET error:", err);
    return NextResponse.json({ error: "Failed to load gallery" }, { status: 500 });
  }
}

/* ─── POST — Upload image to Cloudinary ─── */
export async function POST(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("image");
    const title = formData.get("title");
    const category = formData.get("category");
    const height = formData.get("height") || "medium";

    if (!file || !title || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate file type
    const ext = file.name.split(".").pop().toLowerCase();
    const allowedExt = ["jpg", "jpeg", "png", "webp", "gif", "avif"];
    if (!allowedExt.includes(ext)) {
      return NextResponse.json({ error: "Invalid file type. Use JPG, PNG, WebP, or GIF." }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary — store metadata as JSON in context to safely handle
    // special characters like '&' in 'UI & Frames', '|', '=', etc.
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: CLOUDINARY_FOLDER,
          context: `data=${JSON.stringify({ title, category, height })}`,
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    const newItem = {
      id: `cld_${uploadResult.public_id.replace(/\//g, "_")}`,
      title,
      category,
      height,
      image: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      _source: "cloudinary",
    };

    return NextResponse.json({ success: true, item: newItem });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed: " + err.message }, { status: 500 });
  }
}

/* ─── DELETE — Remove a Cloudinary image by public_id ─── */
export async function DELETE(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { public_id } = await request.json();

    if (!public_id) {
      return NextResponse.json({ error: "Missing public_id" }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result !== "ok" && result.result !== "not found") {
      return NextResponse.json({ error: "Cloudinary deletion failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json({ error: "Delete failed: " + err.message }, { status: 500 });
  }
}
