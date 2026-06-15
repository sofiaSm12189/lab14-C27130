# Referencias

Fuentes consultadas para la construcción de esta API.

## Material del curso

- **Presentación de Express** (estructura base del proyecto, repositorio de datos y
  controladores por ruta): <https://multimediossg.github.io/slides/express/>

## Tecnologías y documentación oficial

- **Node.js — `node:sqlite` (`DatabaseSync`)**: base de datos SQLite integrada en Node.
  <https://nodejs.org/api/sqlite.html>
- **Node.js — `process.loadEnvFile()`**: carga de variables de entorno desde `.env`.
  <https://nodejs.org/api/process.html#processloadenvfilepath>
- **Express — Routing**: definición de rutas y parámetros.
  <https://expressjs.com/en/guide/routing.html>
- **Express — `express.static`**: servir archivos estáticos (portadas).
  <https://expressjs.com/en/starter/static-files.html>
- **Express — Manejo de errores**: middleware de error para JSON malformado.
  <https://expressjs.com/en/guide/error-handling.html>
- **Zod**: validación de esquemas (`safeParse`, mensajes de error, `transform`).
  <https://zod.dev/>

## Conceptos web

- **MDN — Códigos de estado HTTP** (200, 201, 204, 400, 404, 409):
  <https://developer.mozilla.org/es/docs/Web/HTTP/Status>
- **MDN — Cabecera `Location`** (respuesta 201 Created):
  <https://developer.mozilla.org/es/docs/Web/HTTP/Headers/Location>
- **MDN — `String.prototype.normalize()`** (eliminación de acentos para el slug):
  <https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/normalize>

## Datos del catálogo

- **Discografía de The Weeknd** (títulos, años, sellos y número de pistas de los álbumes):
  <https://es.wikipedia.org/wiki/The_Weeknd>
