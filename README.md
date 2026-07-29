# Until Us

An interactive, password-gated memory calendar counting down from July 28 to an LA reunion on August 21, 2026.

## Run locally

```bash
npm install
npm run dev
```

The requested anniversary password works locally. Only its SHA-256 hash is stored in the app source.

## Add photos, videos, and messages

Edit `src/memories.ts` for titles and messages. Media is configured separately so Drive IDs are never committed to the repository. Days without media use a plain gray tile, and locked days never load or render their media.

Google Drive can serve both photos and videos if each file is shared as **Anyone with the link → Viewer**:

1. Copy the Drive sharing link and find the ID between `/d/` and `/view`.
2. Add the file ID to the one-line JSON value in `.env.local`. This file is ignored by Git.
3. Test the published site in a private browser window before sharing it.

```dotenv
VITE_MEDIA_CONFIG={"2026-07-30":{"fileId":"PHOTO_FILE_ID","alt":"Us at the beach"},"2026-08-02":{"fileId":"VIDEO_FILE_ID","type":"video","alt":"A video from our trip"}}
```

Photos omit `type`; videos use `"type":"video"`. The video thumbnail comes from the same Drive file, and the video opens in Drive's embedded player.

Drive sometimes rate-limits media and may change its delivery behavior. For the most reliable photos, put compressed WebP/JPEG files in `public/photos/`. For videos, Drive's preview player is generally more practical than storing large files in GitHub.

Change `reunionDate` in `src/memories.ts` if the arrival time is not August 21 at 9:00 PM Pacific time. Daily memories unlock according to the date in Los Angeles.

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project to its `main` branch.
2. In the repository, open **Settings → Secrets and variables → Actions**.
3. Add a repository secret named `CALENDAR_PASSWORD` with your intended password.
4. Add a repository secret named `CALENDAR_MEDIA`. Its value is everything after `VITE_MEDIA_CONFIG=` in `.env.local`, including the outer `{}`.
5. Open **Settings → Pages** and choose **GitHub Actions** as the source.
6. Push to `main`, then watch the **Deploy to GitHub Pages** workflow.

This keeps Drive IDs out of the repository, but not out of the deployed browser. GitHub Pages is static: the build must place the IDs in JavaScript so the browser can request each file. A visitor can inspect those requests or bypass browser-side code. This is appropriate for a low-stakes personal calendar, not sensitive/private media.

## Checks

```bash
npm run lint
npm run build
```
