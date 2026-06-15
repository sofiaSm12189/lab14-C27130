import * as album from "../../data/albumes.js";

export const getAll = (req, res) => {
  res.json(album.getAll());
};
