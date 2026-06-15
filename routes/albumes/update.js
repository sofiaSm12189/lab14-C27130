import schema from "./album.schema.js";
import * as album from "../../data/albumes.js";

export const update = (req, res) => {
  const { slug } = req.params;

  if (!album.exists(slug)) {
    return res.status(404).json({ error: "Álbum no encontrado" });
  }

  const parsed = schema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message });
  }

  album.update(slug, parsed.data);

  res.status(200).json(album.getBySlug(slug));
};
