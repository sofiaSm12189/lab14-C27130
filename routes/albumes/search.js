import schema from "./search.schema.js";
import * as album from "../../data/albumes.js";

export const search = (req, res) => {
  const parsed = schema.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message });
  }

  res.json(album.search(parsed.data.text));
};
