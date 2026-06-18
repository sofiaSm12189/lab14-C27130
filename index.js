import express from "express";
import process from "node:process";

import { home } from "./routes/albumes/home.js";
import { getAll } from "./routes/albumes/getAll.js";
import { getBySlug } from "./routes/albumes/getBySlug.js";
import { getByGenero } from "./routes/albumes/getByGenero.js";
import { search } from "./routes/albumes/search.js";
import { create } from "./routes/albumes/create.js";
import { update } from "./routes/albumes/update.js";
import { remove } from "./routes/albumes/remove.js";

try {
  process.loadEnvFile();
} catch {}

const HOST = process.env.HOST ?? "localhost";
const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.json());
app.use("/imagenes", express.static("public/images"));

app.get("/", home);
app.get("/albumes", getAll);
app.get("/album/:slug", getBySlug);
app.get("/genero/:genero", getByGenero);
app.get("/search/:text", search);
app.post("/albumes", create);
app.put("/album/:slug", update);
app.delete("/album/:slug", remove);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, HOST, () => {
    console.log(`DiscoStore API escuchando en http://${HOST}:${PORT}/`);
  });
}

export default app;
