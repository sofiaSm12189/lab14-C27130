import * as album from "../../data/albumes.js";

export const getBySlug = (req, res) => {
  const encontrado = album.getBySlug(req.params.slug);

  if (!encontrado) {
    return res.status(404).json({ error: "Álbum no encontrado" });
  }

  res.json(encontrado);
};
