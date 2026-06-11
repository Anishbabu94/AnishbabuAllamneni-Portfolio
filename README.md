# Anish Babu Allamneni Portfolio

Production-focused AI Engineer portfolio built with Next.js, TypeScript,
Tailwind CSS, and Framer Motion.

## Highlights

- Responsive portfolio and printable resume
- Light and dark themes
- Accessible keyboard navigation and reduced-motion support
- Static export with sitemap, robots, manifest, structured data, and social metadata
- Playwright coverage at 375px, 768px, 1280px, and 1440px

## Local Development

Requirements:

- Node.js 18.17 or newer
- npm 9 or newer

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run check
npm run test:responsive
```

`npm run check` runs TypeScript, ESLint, and the production build. Playwright
starts its own development server on port 3100.

## Production Export

```bash
npm run build
```

The deployable static site is generated in `out/`.

To preview that exact export locally:

```bash
npm start
```

Set `PORT` to use a port other than 3000.

## Deployment

### Vercel

Import the repository into Vercel. The included `vercel.json` uses `npm run
build` and serves the static `out/` directory.

### Netlify

Import the repository into Netlify. The included `netlify.toml` configures:

- Build command: `npm run build`
- Publish directory: `out`
- Node.js 20

### Other Static Hosts

Upload the contents of `out/`. Configure the host to serve `404.html` for
unknown routes.

## Content

Portfolio content is maintained in [`lib/data.ts`](./lib/data.ts). Update
personal details, experience, projects, skills, and certifications there.

The public canonical URL is configured as `https://anishallamneni.com`.
Update `siteConfig.url` before deployment if the production domain changes.
