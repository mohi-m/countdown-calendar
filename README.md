# Until Us

An interactive, password-gated memory calendar counting down from July 28 to an LA reunion on August 21, 2026.

## Run locally

```bash
npm install
npm run dev
```

The requested anniversary password works locally. Only its SHA-256 hash is stored in the app source.

## Add your photos and messages

Edit `src/memories.ts`. Every calendar entry has a date, title, note, image URL, and alt text. The included photos and some copy are placeholders.

Google Drive can serve the photos if each file is shared as **Anyone with the link → Viewer**:

1. Copy the Drive sharing link and find the ID between `/d/` and `/view`.
2. Set `imageUrl` to `https://drive.google.com/thumbnail?id=FILE_ID&sz=w1600`.
3. Test the URL in a private browser window before publishing.

Drive sometimes rate-limits images and may change its delivery behavior. For the most reliable site, put compressed WebP/JPEG files in `public/photos/` and use paths such as `./photos/day-01.webp`.

Change `reunionDate` in `src/memories.ts` if the arrival time is not August 21 at 9:00 PM Pacific time. Daily memories unlock according to the date in Los Angeles.

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project to its `main` branch.
2. In the repository, open **Settings → Secrets and variables → Actions**.
3. Add a repository secret named `CALENDAR_PASSWORD` with your intended password.
4. Open **Settings → Pages** and choose **GitHub Actions** as the source.
5. Push to `main`, then watch the **Deploy to GitHub Pages** workflow.

This is a privacy screen, not strong authentication. GitHub Pages is static: someone determined can inspect or bypass browser-side code. The workflow hashes the secret so the literal password is not shipped, which is appropriate for a low-stakes personal calendar but not for sensitive/private photos. Public Drive links are also accessible to anyone who obtains the image URL.

## Checks

```bash
npm run lint
npm run build
```