import express from "express";
const router = express.Router();
export default router;

import { getAllPlaylists, createPlaylist } from "#db/queries/tracks";
import { getTracksByPlaylist } from "#db/queries/playlists_tracks";

router
  .route("/")
  .get(async (req, res) => {
    const playlists = await getAllPlaylists();
    res.send(playlists);
  })
  .post(async (req, res) => {
    if (!req.body) return res.status(400).send("Request must have a body.");

    const { name, description } = req.body;
    if (!name || !description)
      return res
        .status(400)
        .send("New playlist must have a name and a description.");

    const newPlaylist = await createPlaylist({ name, description });
    res.status(201).send(newPlaylist);
  });

router.route("/:id").get((req, res) => {
  res.send(req.playlist);
});

router.route("/:id/tracks").get((req, res) => {
    const tracksByPlaylist = await (getTracksByPlaylist{ id: req.playlists_tracks.id });
    res.send(tracksByPlaylist);
})
