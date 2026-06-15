import { DatabaseSync } from "node:sqlite";
import { cwd } from "node:process";

const db = new DatabaseSync(`${cwd()}/data/discostore.db`);

export const getAll = () =>
  db.prepare("SELECT * FROM albumes ORDER BY anio").all();

export const getBySlug = (slug) =>
  db.prepare("SELECT * FROM albumes WHERE slug = ?").get(slug);

export const getByGenero = (genero) =>
  db
    .prepare(
      "SELECT slug FROM albumes WHERE LOWER(genero) = LOWER(?) ORDER BY anio",
    )
    .all(genero);

export const search = (text) => {
  const like = `%${text}%`;
  return db
    .prepare(
      `SELECT * FROM albumes
         WHERE LOWER(titulo) LIKE ?
            OR LOWER(artista) LIKE ?
            OR LOWER(genero) LIKE ?
            OR LOWER(resumen) LIKE ?
            OR LOWER(descripcion) LIKE ?
       ORDER BY anio`,
    )
    .all(like, like, like, like, like);
};
