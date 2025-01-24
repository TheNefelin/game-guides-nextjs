import { ApiResult } from "./models";

interface RequestOptions extends RequestInit {
  method: string;
  headers: {
    "Accept": string;
  };
}

export default class Singleton {
  private static instance: Singleton;
  private static apiResult: Promise<ApiResult>;
  private static readonly apiGetGames: string = process.env.API_GET_GAMES!;
  private static readonly apiGetImg: string = process.env.API_GET_IMG!;
  private static readonly requestOptions: RequestOptions = {
    // cache: 'no-store',
    method: "GET",
    headers: {
      "Accept": "application/json"
    },
  };

  private constructor() {
    console.log('Instancia Singleton creada');
    // Asignamos directamente la promesa
    Singleton.apiResult = Singleton.apiFetch();
  }

  // Método para obtener la instancia única del Singleton
  private static getInstance(): Singleton {
    if (!this.instance) {
      this.instance = new Singleton();
    }
    return this.instance;
  }

  // Fetching de la API
  private static apiFetch = async (): Promise<ApiResult> => {
    try {
      const res = await fetch(this.apiGetGames, this.requestOptions);
      const data: ApiResult = await res.json();
      return data;
    } catch (err: unknown) {
      // Devolver error estándar si ocurre algo
      const apiResult: ApiResult = {
        isSucces: false,
        statusCode: 500,
        message: err instanceof Error ? err.message : 'Error desconocido',
        data: []
      };
      return apiResult;
    }
  };

  // Método estático para obtener el resultado de la API
  public static async getApiResultAsync(): Promise<ApiResult> {
    this.getInstance()
    return await this.apiResult;
  }

  // Método para obtener la URL completa de la imagen
  public static getImgPath(imgUrl: string): string {
    this.getInstance()
    return `${this.apiGetImg}${imgUrl}`;
  }
}
