import { NextResponse } from "next/server";
import { getGamesAsync } from "@/services/fetching";

export async function GET() {
  try {
    const apiResult = await getGamesAsync();

    if (!apiResult.isSuccess) {
      return NextResponse.json(
        { error: apiResult.message },
        { status: apiResult.statusCode }
      );
    }

    return NextResponse.json({ success: true, data: apiResult.data });
  } catch (error) {
    console.error("Error en getGames:", error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
