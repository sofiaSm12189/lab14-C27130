-- Esquema de la base de datos de DiscoStore.
-- Se vuelve a crear cada vez que se ejecuta `npm run seed`.

DROP TABLE IF EXISTS albumes;

CREATE TABLE albumes (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo      TEXT    NOT NULL,
  artista     TEXT    NOT NULL,
  genero      TEXT    NOT NULL,
  anio        INTEGER NOT NULL,
  sello       TEXT    NOT NULL,
  pistas      INTEGER NOT NULL,
  imagen      TEXT    NOT NULL,
  slug        TEXT    NOT NULL UNIQUE,
  resumen     TEXT    NOT NULL,
  descripcion TEXT    NOT NULL
);
