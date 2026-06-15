// Repositorio de datos: todas las consultas a SQLite viven aquí.
// Los controladores (routes/) llaman a estas funciones y nunca tocan la BD directamente.
import { DatabaseSync } from "node:sqlite";
import { cwd } from "node:process";

const db = new DatabaseSync(`${cwd()}/data/discostore.db`);

// Devuelve todos los álbumes completos, ordenados por año.
export const getAll = () =>
  db.prepare("SELECT * FROM albumes ORDER BY anio").all();

// Devuelve un álbum por su slug (o undefined si no existe).
export const getBySlug = (slug) =>
  db.prepare("SELECT * FROM albumes WHERE slug = ?").get(slug);

// Devuelve los slugs de los álbumes de un género (sin distinguir mayúsculas).
export const getByGenero = (genero) =>
  db
    .prepare("SELECT slug FROM albumes WHERE LOWER(genero) = LOWER(?) ORDER BY anio")
    .all(genero);

// Busca un texto en título, artista, género y descripciones.
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
       ORDER BY anio`
    )
    .all(like, like, like, like, like);
};
