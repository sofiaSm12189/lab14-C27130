import * as album from "../../data/albumes.js";

export const remove = (req, res) => {
  const { slug } = req.params;

  if (!album.exists(slug)) {
    return res.status(404).json({ error: "Álbum no encontrado" });
  }

  album.remove(slug);

  res.status(204).end();
};
