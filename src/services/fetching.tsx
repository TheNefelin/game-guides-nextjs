import { AdventureUser, ApiResult, Game, GoogleBody, GuideUser, LoggedGoogleToken } from "./models";

const apiUrl: string = process.env.API_GET_GAMES!;
const apiKey: string = process.env.API_KEY!;

export async function loginGoogleAsync(body: GoogleBody): Promise<ApiResult<LoggedGoogleToken>> {
  const res = await fetch(`${apiUrl}/auth-google`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "ApiKey": apiKey
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error(`Error en la API: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getGamesAsync(user_id: string = "00000000-0000-0000-0000-000000000000"): Promise<ApiResult<Game[]>> {
  const res = await fetch(`${apiUrl}/${user_id}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "ApiKey": apiKey
    }
  });

  if (!res.ok) {
    throw new Error(`Error en la API: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function postGuideCheck(body: GuideUser): Promise<ApiResult<object>> {
  const res = await fetch("/api/postGuideCheck", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Error en la API: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function postAdventureCheck(body: AdventureUser): Promise<ApiResult<object>> {
  const res = await fetch("/api/postAdventureCheck", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Error en la API: ${res.status} ${res.statusText}`);
  }

  return res.json();
}