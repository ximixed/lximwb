# Ilsim Sayon — Portfolio

A single-page React portfolio (hash-based navigation between Home, About, Projects, Contact, and Profile).

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for deployment

```bash
npm run build
```

This outputs a static site to `dist/`, which you can upload to any static host (Netlify, Vercel, GitHub Pages, etc.).

## Notes

- Profile image is located in `public/pic/profile.jpg` and automatically bundled during build.
- The contact form opens a pre-filled Gmail compose window for direct communication.
