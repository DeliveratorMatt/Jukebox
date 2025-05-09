import db from "#db/client";

import { createTrack } from "#db/queries/tracks";
import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 20; i++) {
    const trackDuration = 10000000 + Math.floor(Math.random() * 60000000);
    await createTrack("Song " + i, trackDuration);
  }

  for (let i = 1; i <= 10; i++) {
    await createPlaylist("Playlist" + i, "Description" + i);
  }

  for (let i = 1; i <= 15; i++) {
    const playlist_id = 1 + Math.floor(Math.random() * 10);
    await createPlaylistTrack(playlist_id, i);
  }
}
