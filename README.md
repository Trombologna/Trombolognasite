# TromBologna

Satirical hub mocking Bologna’s tram works.

## Local dev

```bash
npm install
npm run dev
```

## Deploy

GitHub Action `deploy.yml` builds Astro and pushes to `gh-pages`. Enable **Pages** in repo settings: **Source → GitHub Actions**.

## DNS setup (IONOS)

| Type | Host | Value |
|------|------|-------|
| A    | @    | 185.199.108.153 |
| CNAME| www  | trombologna.github.io. |

When DNS has propagated, GitHub will issue HTTPS automatically.
