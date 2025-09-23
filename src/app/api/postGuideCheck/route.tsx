import { authOptions } from "@/services/authOptions";
import { GuideUser, LoggedGoogleToken, NewUserGuide } from "@/services/models";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const apiUrl = process.env.API_GET_GAMES!;
const apiKey = process.env.API_KEY!;

export async function POST(req: NextRequest) {
  try {
    const guideUser: GuideUser = await req.json();

    const session = await getServerSession(authOptions);
    const apiData = session?.user?.apiData

    const loggedGoogleToken: LoggedGoogleToken = {
      user_Id: apiData!.user_Id,
      sqlToken: apiData!.sqlToken
    }

    const body: NewUserGuide = {
      guide_Id: guideUser.guide_Id,
      isCheck: guideUser.isCheck,
      userToken: loggedGoogleToken
    }

    const response = await fetch(`${apiUrl}/user-guide`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "ApiKey": apiKey,
      },
      body: JSON.stringify(body),
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
    console.error("Error en postAdventureCheck:", error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}