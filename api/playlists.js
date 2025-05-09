import express from "express";
const router = express.Router();
export default router;

import { getAllPlaylists, createPlaylist } from "#db/queries/tracks";
import {
  getTracksByPlaylist,
  createPlaylistTrack,
} from "#db/queries/playlists_tracks";

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

router
  .route("/:id/tracks")
  .get(async (req, res) => {
    const tracksByPlaylist = await getTracksByPlaylist(playlistId);
    res.send(tracksByPlaylist);
  })
  .post(async (req, res) => {
    if (!req.body) return res.status(400).send("Request must have a body.");

    const { playlistId, trackId } = req.body;
    if (!trackId)
      return res
        .status(400)
        .send(
          "You must specify the ID of the track to be added to the playlist."
        );

    const playlistWithNewTrack = await createPlaylistTrack(
      req.playlist_id,
      req.track_id
    );
    res.status(201).send(playlistWithNewTrack);
  });
