import { promises as fs } from "fs";
import path from "path";
import { ApiResult, Game } from "./models";

const dbPath = path.join(process.cwd(), "data", "db.json");

interface DbFile {
  games: Game[];
}

export async function getGamesAsync(): Promise<ApiResult<Game[]>> {
  try {
    const file = await fs.readFile(dbPath, "utf-8");
    const db: DbFile = JSON.parse(file);
    return {
      isSuccess: true,
      statusCode: 200,
      message: "OK",
      data: db.games ?? [],
    };
  } catch (error) {
    console.error("Error al leer la base de datos local:", error);
    return {
      isSuccess: false,
      statusCode: 500,
      message: "No se pudo leer la base de datos local",
      data: [],
    };
  }
}
