import * as album from "../../data/albumes.js";

export const getByGenero = (req, res) => {
  const slugs = album.getByGenero(req.params.genero).map((fila) => fila.slug);
  res.json(slugs);
};
