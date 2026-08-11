import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const imagesDir = path.join(process.cwd(), "public", "images");

const mimeTypes: Record<string, string> = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
};

export async function GET(req: NextRequest) {
  try {
    const fileName = req.nextUrl.searchParams.get("fileName");

    if (!fileName) {
      return NextResponse.json(
        { error: "El nombre del archivo es requerido." },
        { status: 400 }
      );
    }

    const safeName = path.basename(fileName);
    const filePath = path.join(imagesDir, safeName);
    const ext = path.extname(safeName).toLowerCase();
    const contentType = mimeTypes[ext];

    if (!contentType) {
      return NextResponse.json(
        { error: "Tipo de imagen no soportado." },
        { status: 400 }
      );
    }

    const buffer = await fs.readFile(filePath);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Imagen no encontrada" },
      { status: 404 }
    );
  }
}
