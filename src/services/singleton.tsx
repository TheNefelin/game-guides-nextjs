import { ApiResult, Game } from "./models";

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
    // cache: 'no-store', // or 'force-cache'
    method: "GET",
    headers: {
      "Accept": "application/json"
    },
  };

  private constructor() {
    console.log('Instancia Singleton creada');
  }

  // Método para obtener la instancia única del Singleton
  private static getInstance(): Singleton {
    if (!this.instance) {
      this.instance = new Singleton();
    }
    this.apiResult = this.apiFetch();
    return this.instance;
  }

  // Fetching de la API
  private static apiFetch = async (): Promise<ApiResult> => {
    try {
      const res = await fetch(this.apiGetGames, this.requestOptions);
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

  // Método estático para obtener el resultado de la API
  public static async getApiResultAsync(): Promise<ApiResult> {
    if (!this.apiResult) {
      this.getInstance();
    }
    return this.apiResult;
  }

  public static async getGameAsync(id: number): Promise<Game | undefined> {
    if (!this.apiResult) {
      this.getInstance();
    }
    return (await this.apiResult).data.find(e => e.id === id)
  }

  // Método para obtener la URL completa de la imagen
  public static getImgPath(imgUrl: string): string {
    return `${this.apiGetImg}${imgUrl}`;
  }
}
