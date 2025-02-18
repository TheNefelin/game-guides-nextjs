import { NextRequest, NextResponse } from "next/server";

const apiUrl = process.env.API_GET_GAMES!;
const apiKey = process.env.API_KEY!;

export async function GET(req: NextRequest) {
  try {
    // Obtener los parámetros de la URL
    const searchParams = req.nextUrl.searchParams;
    const id_user = searchParams.get("id") ?? ""; // Si no hay ID, usar ""

    const response = await fetch(`${apiUrl}/${id_user}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "ApiKey": apiKey,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`Error en la API: ${response.status} - ${response.statusText}`);
      return NextResponse.json(
        { error: `Error en la API: ${response.statusText}` },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error en getGames:", error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
