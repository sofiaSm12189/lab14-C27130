import { DatabaseSync } from "node:sqlite";
import { cwd } from "node:process";

const DB_FILE = process.env.DISCONSTORE_DB ?? `${cwd()}/data/discostore.db`;
const db = new DatabaseSync(DB_FILE);

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

export const exists = (slug) => Boolean(getBySlug(slug));

export const create = (album) =>
  db
    .prepare(
      `INSERT INTO albumes
        (titulo, artista, genero, anio, sello, pistas, imagen, slug, resumen, descripcion)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      album.titulo,
      album.artista,
      album.genero,
      album.anio,
      album.sello,
      album.pistas,
      album.imagen,
      album.slug,
      album.resumen,
      album.descripcion,
    );

export const update = (slug, album) =>
  db
    .prepare(
      `UPDATE albumes
        SET titulo = ?, artista = ?, genero = ?, anio = ?, sello = ?, pistas = ?, imagen = ?, resumen = ?, descripcion = ?
        WHERE slug = ?`,
    )
    .run(
      album.titulo,
      album.artista,
      album.genero,
      album.anio,
      album.sello,
      album.pistas,
      album.imagen,
      album.resumen,
      album.descripcion,
      slug,
    );

export const remove = (slug) =>
  db.prepare("DELETE FROM albumes WHERE slug = ?").run(slug);

export { db };
