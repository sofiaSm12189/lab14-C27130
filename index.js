import express from "express";
import process from "node:process";

import { home } from "./routes/albumes/home.js";
import { getAll } from "./routes/albumes/getAll.js";
import { getBySlug } from "./routes/albumes/getBySlug.js";
import { getByGenero } from "./routes/albumes/getByGenero.js";
import { search } from "./routes/albumes/search.js";

try {
  process.loadEnvFile();
} catch {}

const HOST = process.env.HOST ?? "localhost";
const PORT = process.env.PORT ?? 3000;

const app = express();

app.use("/imagenes", express.static("public/images"));

app.get("/", home);
app.get("/albumes", getAll);
app.get("/album/:slug", getBySlug);
app.get("/genero/:genero", getByGenero);
app.get("/search/:text", search);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, HOST, () => {
  console.log(`DiscoStore API escuchando en http://${HOST}:${PORT}/`);
});
