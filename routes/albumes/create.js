import schema from "./album.schema.js";
import slugify from "../../lib/slugify.js";
import * as album from "../../data/albumes.js";

export const create = (req, res) => {
  const parsed = schema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message });
  }

  const slug = slugify(parsed.data.titulo);

  if (album.exists(slug)) {
    return res
      .status(409)
      .json({ error: `Ya existe un álbum con el slug '${slug}'` });
  }

  album.create({ ...parsed.data, slug });

  res.status(201).location(`/album/${slug}`).json(album.getBySlug(slug));
};
