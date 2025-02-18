import { NextRequest, NextResponse } from "next/server";

const apiUrl = process.env.API_GET_GAMES!;
const apiKey = process.env.API_KEY!;

export async function GET(req: NextRequest) {
  try {
    // Obtener los parámetros de la URL
    const searchParams = req.nextUrl.searchParams;
    const fileName = searchParams.get("fileName");

    if (!fileName) {
      return NextResponse.json(
        { error: "El ID es requerido." },
        { status: 400 } // Bad Request
      );
    }

    const response = await fetch(`${apiUrl}/img?fileName=${fileName}`, {
      method: "GET",
      headers: {
        "Accept": "image/webp", // Asegúrate de aceptar el tipo de imagen WebP
        "ApiKey": apiKey,
      },
      cache: 'default', // 'no-cache'
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