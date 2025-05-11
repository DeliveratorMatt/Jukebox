import db from "#db/client";

/** creates a single new track and @returns it */
export async function createTrack(name, duration_ms) {
  const sql = `
      INSERT INTO tracks
          (name, duration_ms)
      VALUES
          ($1, $2)
      RETURNING *
      `;
  const {
    rows: [track],
  } = await db.query(sql, [name, duration_ms]);
  return track;
}

/**fetches a specific track */
export async function getTrackById(id) {
  const sql = `
  SELECT *
  FROM tracks
  WHERE id = $1
  `;

  const {
    rows: [track],
  } = await db.query(sql, [id]);
  return track;
}

/** fetches all tracks with a particular playlist id */
export async function getTracksByPlaylistId(id) {
  const sql = `
  SELECT tracks.*
  FROM
    tracks
    JOIN playlists_tracks ON playlists_tracks.track_id = tracks.id
    JOIN playlists ON playlists_tracks.playlist_id = playlists.id
  WHERE playlists.id = $1
  `;

  const { rows: tracks } = await db.query(sql, [id]);
  return tracks;
}

/** fetches all tracks currently in the database */
export async function getAllTracks() {
  const sql = `
  SELECT *
  FROM tracks
  `;
  const { rows: tracks } = await db.query(sql);
  return tracks;
}
