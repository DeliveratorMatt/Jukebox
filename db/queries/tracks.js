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

/** fetches all tracks currently in the database */
export async function getAllTracks() {
  const sql = `
  SELECT *
  FROM tracks
  `;
  const { rows: tracks } = await db.query(sql);
  return tracks;
}
