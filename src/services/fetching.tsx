import { ApiAuthResult, ApiResult, GoogleBody, GuidesUser } from "./models";

interface RequestOptions extends RequestInit {
  method: string;
  headers: {
    "Accept": string
    "Content-Type": string
    "ApiKey": string
  };
}

const apiUrl: string = process.env.API_GET_GAMES!;
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
const postRequestOptions = (body: GoogleBody | GuidesUser): RequestOptions => {
  return {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "ApiKey": "Esmerilemelo-777"
    },
    body: JSON.stringify(body)
  };  
}

const apiFetch = async (apiUri: string, requestOptions: RequestOptions): Promise<ApiResult> => {
  try {
    const res = await fetch(apiUri, requestOptions);
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

const apiAuthFetch = async (apiUri: string, requestOptions: RequestOptions): Promise<ApiAuthResult> => {
  try {
    const res = await fetch(apiUri, requestOptions);
    const data: ApiAuthResult = await res.json();

    if (!res.ok) {
      throw new Error(`Error en la API: ${res.status} ${res.statusText}`);
    }

    return data;
  } catch (err: unknown) {
    console.error("Error al obtener los datos de la API:", err);
    throw new Error(err instanceof Error ? err.message : "Error desconocido");
  }
};

export async function loginGoogleAsync(body: GoogleBody): Promise<ApiAuthResult> {
  return await apiAuthFetch(`${apiUrl}/auth/google`, postRequestOptions(body));
}

export async function postGuideCheck(body: GuidesUser): Promise<ApiResult> {
  return await apiFetch(`https://dragonra.bsite.net/api/game-guide/guide`, postRequestOptions(body));
}

export async function getApiResultAsync(id_user: string | undefined): Promise<ApiResult> {
  id_user = id_user !== undefined ? id_user : "";
  return await apiFetch(`${apiUrl}/game-guide/dapper/${id_user}`, getRequestOptions);
}

export function getImgPath(imgUrl: string): string {
  return `${apiGetImg}${imgUrl}`;
}