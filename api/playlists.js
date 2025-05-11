import express from "express";
const router = express.Router();
export default router;

import { getTracksByPlaylistId } from "#db/queries/tracks";
import {
  getAllPlaylists,
  createPlaylist,
  getPlaylistById,
} from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";

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

    const newPlaylist = await createPlaylist(name, description);
    res.status(201).send(newPlaylist);
  });

router.param("id", async (req, res, next, id) => {
  if (!/^\d+$/.test(id))
    return res.status(400).send("ID must be a positive integer.");
  const playlist = await getPlaylistById(id);
  if (!playlist) return res.status(404).send("Playlist not found.");
  req.playlist = playlist;
  next();
});

router.route("/:id").get((req, res) => {
  res.send(req.playlist);
});

router
  .route("/:id/tracks")
  .get(async (req, res) => {
    const tracksByPlaylist = await getTracksByPlaylistId(req.playlist.id);
    res.send(tracksByPlaylist);
  })
  .post(async (req, res) => {
    if (!req.body) return res.status(400).send("Request must have a body.");

    const { trackId } = req.body;
    if (!trackId) return res.status(400).send("Request body requires TrackId.");

    const playlistWithNewTrack = await createPlaylistTrack(
      req.playlist.id,
      trackId
    );
    res.status(201).send(playlistWithNewTrack);
  });
