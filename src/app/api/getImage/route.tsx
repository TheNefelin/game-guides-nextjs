import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.API_KEY!;

export async function GET(req: NextRequest) {
  try {
    // Obtener los parámetros de la URL
    const searchParams = req.nextUrl.searchParams;
    const id_user = searchParams.get("id");

    if (!id_user) {
      return NextResponse.json(
        { error: "El ID del usuario es requerido." },
        { status: 400 } // Bad Request
      );
    }

    const response = await fetch(`https://dragonra.bsite.net/api/img/f1?fileName=${id_user}`, {
      method: "GET",
      headers: {
        "Accept": "image/webp", // Asegúrate de aceptar el tipo de imagen WebP
        "ApiKey": apiKey,
      },
    });

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      console.error(`Error en la API: ${response.status} - ${response.statusText}`);
      return NextResponse.json(
        { error: `Error en la API: ${response.statusText}` },
        { status: response.status }
      );
    }

    // Obtener el blob de la imagen
    const blob = await response.blob();

    // Crear una respuesta a partir del blob
    const imageResponse = new Response(blob, {
      headers: {
        "Content-Type": "image/webp", // Establecer el tipo de contenido a WebP
      },
    });

    return imageResponse; // Retornar la respuesta de la imagen

  } catch (error) {
    console.error("Error en getGames:", error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}