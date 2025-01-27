import { ApiResult, Game } from "./models";

interface RequestOptions extends RequestInit {
  method: string;
  headers: {
    "Accept": string;
  };
}

const apiGetGames: string = process.env.API_GET_GAMES!;
const apiGetImg: string = process.env.API_GET_IMG!;
const requestOptions: RequestOptions = {
  // cache: 'no-store', // or 'force-cache'
  method: "GET",
  headers: {
    "Accept": "application/json"
  },
};

const apiFetch = async (): Promise<ApiResult> => {
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
  return await apiFetch();
}

export async function getGameAsync(id: number): Promise<Game | undefined> {
  const apiResult = await apiFetch()
  return apiResult.data.find(e => e.id === id)
}

export function getImgPath(imgUrl: string): string {
  return `${apiGetImg}${imgUrl}`;
}