import AdmZip from "adm-zip";
import { XMLParser } from "fast-xml-parser";
import { writeFileSync } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const odsPath = path.resolve(process.argv[2] ?? path.join(rootDir, "BD.ods"));
const outPath = path.resolve(process.argv[3] ?? path.join(rootDir, "data", "db.json"));

const zip = new AdmZip(odsPath);
const contentXml = zip.readAsText("content.xml");

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  removeNSPrefix: true,
  parseTagValue: false,
});
const doc = parser.parse(contentXml);
const tables = doc["document-content"].body.spreadsheet.table;
const tableList = Array.isArray(tables) ? tables : [tables];

function asArray(value) {
  return Array.isArray(value) ? value : value === undefined ? [] : [value];
}

function cellText(cell) {
  const p = cell?.["p"];
  if (p === undefined || p === null) return "";
  if (Array.isArray(p)) {
    return p.map(extractText).join("\n");
  }
  return extractText(p);
}

function extractText(value) {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const keys = Object.keys(value);
    return keys.map((k) => extractText(value[k])).join("");
  }
  return "";
}

function rowCells(row) {
  const cells = [];
  for (const cell of asArray(row["table-cell"])) {
    const repeat = parseInt(cell["@_number-columns-repeated"] ?? "1", 10) || 1;
    const text = cellText(cell);
    for (let i = 0; i < repeat; i++) cells.push(text);
  }
  return cells;
}

function tableToRows(table) {
  return asArray(table["table-row"]).map(rowCells).filter((r) => r.length > 0);
}

function toInt(value) {
  const n = parseInt(value, 10);
  return Number.isNaN(n) ? 0 : n;
}

function toBool(value) {
  return value === "1" || value === 1 || value === "true" || value === true;
}

function headerRow(rows) {
  return rows[0] ?? [];
}

function rowsByHeader(rows, header) {
  return rows.slice(1).map((row) => {
    const obj = {};
    header.forEach((name, i) => {
      obj[name] = row[i] ?? "";
    });
    return obj;
  });
}

const gamesRows = tableToRows(tableList.find((t) => t["@_name"] === "GG_Games"));
const sourcesRows = tableToRows(tableList.find((t) => t["@_name"] === "GG_Sources"));
const charactersRows = tableToRows(tableList.find((t) => t["@_name"] === "GG_Characters"));
const backgroundRows = tableToRows(tableList.find((t) => t["@_name"] === "GG_BackgroundImgs"));
const guidesRows = tableToRows(tableList.find((t) => t["@_name"] === "GG_Guides"));
const adventuresRows = tableToRows(tableList.find((t) => t["@_name"] === "GG_Adventures"));
const adventureImgsRows = tableToRows(tableList.find((t) => t["@_name"] === "GG_AdventureImgs"));

const games = rowsByHeader(gamesRows, headerRow(gamesRows)).map((g) => ({
  game_Id: toInt(g["Game_Id"]),
  name: g["Name"],
  description: g["Description"],
  imgUrl: g["ImgUrl"],
  isEnabled: toBool(g["IsEnabled"]),
}));

const sources = rowsByHeader(sourcesRows, headerRow(sourcesRows)).map((s) => ({
  source_Id: toInt(s["Source_Id"]),
  name: s["Name"],
  url: s["Url"],
  game_Id: toInt(s["Game_Id"]),
}));

const characters = rowsByHeader(charactersRows, headerRow(charactersRows)).map((c) => ({
  character_Id: toInt(c["Character_Id"]),
  name: c["Name"],
  description: c["Description"],
  imgUrl: c["ImgUrl"],
  game_Id: toInt(c["Game_Id"]),
}));

const backgrounds = rowsByHeader(backgroundRows, headerRow(backgroundRows)).map((b) => ({
  backgroundImg_Id: toInt(b["BackgroundImg_Id"]),
  imgUrl: b["ImgUrl"],
  game_Id: toInt(b["Game_Id"]),
}));

const guides = rowsByHeader(guidesRows, headerRow(guidesRows)).map((gu) => ({
  guide_Id: toInt(gu["Guide_Id"]),
  name: gu["Name"],
  sort: toInt(gu["Sort"]),
  game_Id: toInt(gu["Game_Id"]),
}));

const adventures = rowsByHeader(adventuresRows, headerRow(adventuresRows)).map((a) => ({
  adventure_Id: toInt(a["Adventure_Id"]),
  description: a["Description"],
  isImportant: toBool(a["IsImportant"]),
  sort: toInt(a["Sort"]),
  guide_Id: toInt(a["Guide_Id"]),
}));

const adventureImgs = rowsByHeader(adventureImgsRows, headerRow(adventureImgsRows)).map((ai) => ({
  adventureImg_Id: toInt(ai["AdventureImg_Id"]),
  imgUrl: ai["ImgUrl"],
  sort: toInt(ai["Sort"]),
  adventure_Id: toInt(ai["Adventure_Id"]),
}));

const adventuresByGuide = new Map();
for (const adventure of adventures) {
  if (!adventure.guide_Id) continue;
  const list = adventuresByGuide.get(adventure.guide_Id) ?? [];
  list.push(adventure);
  adventuresByGuide.set(adventure.guide_Id, list);
}
for (const list of adventuresByGuide.values()) {
  list.sort((a, b) => a.sort - b.sort);
}

const imgsByAdventure = new Map();
for (const img of adventureImgs) {
  if (!img.adventure_Id) continue;
  const list = imgsByAdventure.get(img.adventure_Id) ?? [];
  list.push(img);
  imgsByAdventure.set(img.adventure_Id, list);
}
for (const list of imgsByAdventure.values()) {
  list.sort((a, b) => a.sort - b.sort);
}

const guidesByGame = new Map();
for (const guide of guides) {
  if (!guide.game_Id) continue;
  const list = guidesByGame.get(guide.game_Id) ?? [];
  list.push(guide);
  guidesByGame.set(guide.game_Id, list);
}
for (const list of guidesByGame.values()) {
  list.sort((a, b) => a.sort - b.sort);
}

const data = {
  games: games
    .filter((g) => g.game_Id)
    .map((g) => ({
      game_Id: g.game_Id,
      name: g.name,
      description: g.description,
      imgUrl: g.imgUrl,
      isEnabled: g.isEnabled,
      characters: characters
        .filter((c) => c.game_Id === g.game_Id)
        .map(({ game_Id, ...rest }) => rest),
      sources: sources
        .filter((s) => s.game_Id === g.game_Id)
        .map(({ game_Id, ...rest }) => rest),
      backgroundImgs: backgrounds
        .filter((b) => b.game_Id === g.game_Id)
        .map(({ game_Id, ...rest }) => rest),
      guides: (guidesByGame.get(g.game_Id) ?? []).map((guide) => ({
        guide_Id: guide.guide_Id,
        name: guide.name,
        sort: guide.sort,
        guideUser: {
          user_id: "",
          guide_Id: guide.guide_Id,
          isCheck: false,
        },
        adventures: (adventuresByGuide.get(guide.guide_Id) ?? []).map((adventure) => ({
          adventure_Id: adventure.adventure_Id,
          description: adventure.description,
          isImportant: adventure.isImportant,
          sort: adventure.sort,
          adventureUser: {
            user_Id: "",
            adventure_Id: adventure.adventure_Id,
            isCheck: false,
          },
          adventureImg: (imgsByAdventure.get(adventure.adventure_Id) ?? []).map(
            ({ adventure_Id, ...rest }) => rest
          ),
        })),
      })),
    })),
};

writeFileSync(outPath, JSON.stringify(data, null, 2), "utf-8");
console.log(`✅ BD generada en ${outPath}`);
console.log(`   Juegos: ${data.games.length}`);
console.log(`   Guías: ${data.games.reduce((n, g) => n + g.guides.length, 0)}`);
console.log(`   Aventuras: ${data.games.reduce((n, g) => n + g.guides.reduce((m, gu) => m + gu.adventures.length, 0), 0)}`);
