import { promises as fs, existsSync } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const apiUrl = process.argv[2] ?? process.env.API_GET_GAMES ?? "";
const outDir = path.join(rootDir, "public", "images");

const fileNamePattern = /[\w\-.]+\.(webp|png|jpe?g|gif)/gi;

if (!apiUrl) {
  console.error("⚠️  Debes pasar la URL base de la API como argumento o definir API_GET_GAMES.");
  console.error("    Uso: node scripts/download-images.mjs https://mi-api.com");
  process.exit(1);
}

const fileNames = new Set();

async function scanJson() {
  const dbPath = path.join(rootDir, "data", "db.json");
  if (!existsSync(dbPath)) {
    console.error("⚠️  No existe data/db.json. Ejecuta primero: npm run generate:db");
    process.exit(1);
  }
  const db = JSON.parse(await fs.readFile(dbPath, "utf-8"));
  for (const game of db.games) {
    if (game.imgUrl) fileNames.add(game.imgUrl);
    for (const c of game.characters ?? []) if (c.imgUrl) fileNames.add(c.imgUrl);
    for (const bg of game.backgroundImgs ?? []) if (bg.imgUrl) fileNames.add(bg.imgUrl);
    for (const guide of game.guides ?? []) {
      for (const adventure of guide.adventures ?? []) {
        const matches = adventure.description.matchAll(fileNamePattern);
        for (const m of matches) fileNames.add(m[0]);
        for (const img of adventure.adventureImg ?? []) if (img.imgUrl) fileNames.add(img.imgUrl);
      }
    }
  }
}

async function download(fileName) {
  const target = path.join(outDir, fileName);
  if (existsSync(target)) return { fileName, status: "skip" };
  const url = `${apiUrl.replace(/\/+$/, "")}/img?fileName=${encodeURIComponent(fileName)}`;
  const res = await fetch(url);
  if (!res.ok) return { fileName, status: `error ${res.status}` };
  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(target, buffer);
  return { fileName, status: "ok" };
}

await fs.mkdir(outDir, { recursive: true });
await scanJson();

console.log(`📥 Descargando ${fileNames.size} imágenes a ${outDir} ...`);
let ok = 0;
let skipped = 0;
const errors = [];
for (const fileName of fileNames) {
  const result = await download(fileName);
  if (result.status === "ok") ok++;
  else if (result.status === "skip") skipped++;
  else errors.push(`${fileName}: ${result.status}`);
  process.stdout.write(`\r   ok: ${ok} | saltadas: ${skipped} | errores: ${errors.length}`);
}
console.log();
if (errors.length) {
  console.log("❌ Errores:");
  for (const e of errors.slice(0, 30)) console.log(`   - ${e}`);
} else {
  console.log("✅ Imágenes descargadas correctamente.");
}
