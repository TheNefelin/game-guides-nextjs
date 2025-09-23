import { authOptions } from "@/services/authOptions";
import { AdventureUser, LoggedGoogleToken, NewUserAdventure } from "@/services/models";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const apiUrl = process.env.API_GET_GAMES!;
const apiKey = process.env.API_KEY!;

export async function POST(req: NextRequest) {
  try {
    const adventureUser: AdventureUser = await req.json();

    const session = await getServerSession(authOptions);
    const apiData = session?.user?.apiData

    const loggedGoogleToken: LoggedGoogleToken = {
      user_Id: apiData!.user_Id,
      sqlToken: apiData!.sqlToken
    }

    const body: NewUserAdventure = {
      adventure_Id: adventureUser.adventure_Id,
      isCheck: adventureUser.isCheck,
      userToken: loggedGoogleToken
    }

    const response = await fetch(`${apiUrl}/user-adventure`, {
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