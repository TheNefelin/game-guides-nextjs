import { ApiResult } from "./models";

interface RequestOptions extends RequestInit {
  method: string;
  headers: {
    "Accept": string;
  };
}

const apiGetGames: string = process.env.API_GET_GAMES!;
const apiGetImg: string = process.env.API_GET_IMG!;
const requestOptions: RequestOptions = {
  // cache: 'no-store',
  method: "GET",
  headers: {
    "Accept": "application/json"
  },
};
const apiResult: ApiResult = await apiFetch();

async function apiFetch(): Promise<ApiResult> {
  try {
    const res: Response = await fetch(apiGetGames, requestOptions);

    if (!res.ok) {
      throw new Error(`Error en la API: ${res.status} ${res.statusText}`);
    }

    const data: ApiResult = await res.json();
    return data;
  } catch (err: unknown) {
    console.error("Error al obtener los datos de la API:", err);
    throw new Error(err instanceof Error ? err.message : "Error desconocido");
  }
};

export async function getApiResultAsync(): Promise<ApiResult> {
  return await apiResult;
}

// Método para obtener la URL completa de la imagen
export function getImgPath(imgUrl: string): string {
  return `${apiGetImg}${imgUrl}`;
}