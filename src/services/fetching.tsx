import { ApiResult, Game } from "./models";

interface RequestOptions extends RequestInit {
  method: string;
  headers: {
    "Accept": string;
    "Content-Type": string
    "ApiKey": string
  };
}

const apiGetGames: string = process.env.API_GET_GAMES!;
const apiGetImg: string = process.env.API_GET_IMG!;
const apiKey: string = process.env.API_KEY!;
const getRequestOptions: RequestOptions = {
  // cache: 'no-store', // or 'force-cache'
  method: "GET",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "ApiKey": apiKey
  },
};

const apiFetch = async (requestOptions: RequestOptions): Promise<ApiResult> => {
  try {
    const res = await fetch(apiGetGames, requestOptions);
    const data: ApiResult = await res.json();

    if (!res.ok) {
      throw new Error(`Error en la API: ${res.status} ${res.statusText}`);
    }

    return data;
  } catch (err: unknown) {
    console.error("Error al obtener los datos de la API:", err);
    throw new Error(err instanceof Error ? err.message : "Error desconocido");
  }
};

export async function getApiResultAsync(): Promise<ApiResult> {
  return await apiFetch(getRequestOptions);
}

export async function getGameAsync(id: number): Promise<Game | undefined> {
  const apiResult = await apiFetch(getRequestOptions)
  return apiResult.data.find(e => e.id === id)
}

export function getImgPath(imgUrl: string): string {
  return `${apiGetImg}${imgUrl}`;
}