import express from "express";
const router = express.Router();
export default router;

import { createTrack, getAllTracks } from "#db/queries/tracks";

router.route("/").get(async (req, res) => {
  const tracks = await getAllTracks();
  res.send(tracks);
});

router.route("/:id").get((req, res) => {
  res.send(req.track);
});
