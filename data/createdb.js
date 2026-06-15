import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";
import { cwd } from "node:process";

const DB_FILE = `${cwd()}/data/discostore.db`;
const CREATE_SQL = `${cwd()}/data/CREATE.SQL`;
const DATA_JSON = `${cwd()}/data/albumes.json`;

const db = new DatabaseSync(DB_FILE);

const schema = readFileSync(CREATE_SQL, "utf-8");
db.exec(schema);

const albumes = JSON.parse(readFileSync(DATA_JSON, "utf-8"));

const insert = db.prepare(`
  INSERT INTO albumes
    (titulo, artista, genero, anio, sello, pistas, imagen, slug, resumen, descripcion)
  VALUES
    (:titulo, :artista, :genero, :anio, :sello, :pistas, :imagen, :slug, :resumen, :descripcion)
`);

let total = 0;
for (const album of albumes) {
  insert.run(album);
  total += 1;
}

console.log(`Base de datos creada en: ${DB_FILE}`);
console.log(`${total} álbumes cargados desde ${DATA_JSON}`);

db.close();
