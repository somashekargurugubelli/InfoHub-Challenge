# InfoHub — Full‑Stack (React + Express) — No API Keys

A single‑page app with three live utilities, all using **free, no‑key** public APIs:

- Weather (Open‑Meteo)
- Currency (exchangerate.host)
- Motivational Quotes (ZenQuotes)

This project is structured for easy local development and one‑click Render deployment.

## Folder Structure

```
InfoHub-Challenge/
├── client/                  # React (Vite) + Tailwind
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── WeatherModule.jsx
│       │   ├── CurrencyConverter.jsx
│       │   └── QuoteGenerator.jsx
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
├── server/                  # Node + Express
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── render.yaml              # Render Blueprint (client + server)
└── README.md
```

## Prerequisites

- Node.js LTS (includes npm)

> No API keys required.

## Run Locally

### 1) Start backend
```bash
cd server
npm install
npm start        # http://localhost:3001
```

### 2) Start frontend (new terminal)
```bash
cd client
cp .env.example .env   # keep VITE_API_BASE empty for local proxy
npm install
npm run dev            # http://localhost:5173
```

Vite proxy forwards `/api` to `http://localhost:3001` in dev.

## Endpoints

- `GET /api/weather?city=<name>` → current temperature, wind
- `GET /api/currency?amount=<inr>` → INR converted to USD/EUR
- `GET /api/quote` → live random quote

## Production Build

```bash
cd client
npm run build
```

Output in `client/dist`.

## Deploy on Render (Free)

1. Push this project to GitHub.
2. In Render, click **New → Blueprint** and connect your repo. Render reads `render.yaml`.
3. After the server deploys, copy its URL (like `https://infohub-server-xyz.onrender.com`).
4. In **infohub-client** service, set env var `VITE_API_BASE` to your server URL and redeploy.

### Services created by `render.yaml`
- `infohub-server` — Node web service running Express (port 3001)
- `infohub-client` — Static site that builds Vite and serves `dist`

## Tech Notes

- Tailwind is preconfigured.
- CORS allows all origins by default; tighten via `CORS_ORIGIN` if needed.
- All APIs are free and require no account or token.

## Troubleshooting

- If the frontend cannot reach the server in dev, ensure `npm start` is running in `/server` and then reload `http://localhost:5173`.
- On Windows, if port 3001 is busy, set `PORT=3002` in `server/.env` and restart.
