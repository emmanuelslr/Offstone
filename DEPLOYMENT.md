# Vercel Deployment Configuration

This project uses a monorepo structure with the Next.js app located in the `front/` directory.

## Configuration

The `vercel.json` file configures Vercel to:
- Build from the `front/` directory using `rootDirectory: "./front"`
- Use Next.js framework detection
- Properly serve images from `front/public/images/`

## Image Paths

Images are located in `front/public/images/` and should be accessible via `/images/` paths in the deployed application.

Last updated: 2025-01-23
