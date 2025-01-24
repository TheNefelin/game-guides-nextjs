import { ApiResult } from "./models";

const API_GET_GAMES = process.env.API_GET_GAMES!;
const API_GET_IMG = process.env.API_GET_IMG!;

export const fetchApiResult = async (): Promise<ApiResult> => {
  try {
    const res = await fetch(API_GET_GAMES, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store", // Opcional, dependiendo de tu necesidad
    });
    const data: ApiResult = await res.json();
    return data;
  } catch (err: unknown) {
    return {
      isSucces: false,
      statusCode: 500,
      message: err instanceof Error ? err.message : "Error desconocido",
      data: [],
    };
  }
};

export const getImgPath = (imgUrl: string): string => {
  return `${API_GET_IMG}${imgUrl}`;
};
