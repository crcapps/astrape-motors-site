# Astrape Motors Static Site

Starter landing page and deployment workflow for Porkbun static hosting.

## Local development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run quality
```

This runs format checks, lints HTML/CSS/JS, and builds production assets.

## Deploy to Porkbun FTP

1. Copy `.env.example` to `.env`.
2. Fill in your FTP credentials.
3. Build and deploy:

```bash
npm run build
npm run deploy:ftp
```

By default, deployment uploads the contents of `dist/` to `/`.
