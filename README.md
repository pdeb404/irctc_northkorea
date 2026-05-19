# 조선철도 — Chosŏn Ch'ŏldo Railway Booking System

> A full-featured IRCTC-style railway ticket booking clone themed for the Democratic People's Republic of Korea (DPRK).

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite) ![License](https://img.shields.io/badge/license-MIT-green)

---

## Screenshots

The app features a dark red-and-gold socialist-constructivist aesthetic across five main views: train search, results, booking flow, PNR status, and schedule.

---

## Features

- **Train Search** — select origin/station, destination, travel date, class, and quota
- **Swap Stations** — animated station swap button
- **Train Results** — live availability badges (AVBL / RAC / NOT AVBL), per-class pricing in KPW (₩)
- **Multi-step Booking Flow** — passenger details → fare summary → confirmation
- **PNR Generation & Lookup** — unique PNR issued on booking; check status anytime
- **Full Train Schedule** — timetable view for all services
- **About Page** — history and operational stats of the Korean State Railway
- **Live Ticker** — scrolling service announcements and delay notices

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Bundler | Vite 5 |
| Styling | Inline CSS with CSS variables |
| State | React `useState` hooks only |
| Dependencies | None beyond React itself |

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
# 1. Scaffold a new Vite + React project
npm create vite@latest dprk-railways -- --template react
cd dprk-railways

# 2. Replace the default App component
cp /path/to/dprk-railways.jsx src/App.jsx

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build        # outputs to /dist
npm run preview      # preview the production build locally
```

---

## Project Structure

```
dprk-railways/
├── src/
│   ├── App.jsx          # entire application (single-file)
│   └── main.jsx         # React entry point (unchanged from Vite default)
├── index.html
├── package.json
└── vite.config.js
```

The entire app lives in `src/App.jsx` — no routing library, no component library, no external dependencies.

---

## Stations Included

| Station | Region |
|---|---|
| Pyongyang Central | Capital |
| Wonsan | East Coast |
| Kaesong | Southern Border |
| Sinuiju | Northern Border |
| Hamhung | East Coast |
| Chongjin | Northeast |
| Rajin | Far Northeast |
| Hyesan | Northern Highlands |
| Sariwon | Western Plains |
| Nampo | West Coast |
| Haeju | Southwest |
| Kanggye | Northern Highlands |
| Kimchaek | East Coast |
| Kusong | Northwest |
| Tanchon | East Coast |

---

## Train Services

| Train | Number | Route | Duration |
|---|---|---|---|
| Paektusan Express | 1 UP | Pyongyang → Wonsan | 8h 30m |
| Mangyongbong Mail | 3 UP | Pyongyang → Wonsan | 10h 45m |
| Chollima Intercity | 101 UP | Pyongyang → Wonsan | 4h 15m |
| Kumsusan Rapid | 505 UP | Pyongyang → Wonsan | 9h 35m |

### Travel Classes

| Class | Code | Description |
|---|---|---|
| Juche Luxury | 1A | Premier air-conditioned berth |
| Songun Premier | 2A | AC two-tier sleeper |
| Paektu Express | SL | Sleeper coach |
| People's Standard | 3A | General seating |

---

## Extending the App

### Adding More Trains

Edit the `SAMPLE_TRAINS` array in `App.jsx`:

```js
{
  id: "PK-005",
  name: "My New Train",
  number: "9 UP",
  dep: "07:00",
  arr: "13:00",
  duration: "6h 0m",
  distance: "450 km",
  avail: { "Juche Luxury (1A)": 8, "Songun Premier (2A)": 16, "Paektu Express (SL)": 24, "People's Standard (3A)": 80 },
  price: { "Juche Luxury (1A)": 900, "Songun Premier (2A)": 630, "Paektu Express (SL)": 460, "People's Standard (3A)": 200 },
  days: "D M T W T F S"
}
```

### Adding More Stations

Edit the `STATIONS` array:

```js
const STATIONS = [
  "Pyongyang Central",
  "Your New Station",
  // ...
];
```

### Connecting a Real Backend

Replace the `search()` function and `SAMPLE_TRAINS` mock data with a `fetch()` call to your API:

```js
const search = async () => {
  const res = await fetch(`/api/trains?from=${from}&to=${to}&date=${date}`);
  const data = await res.json();
  setResults(data);
  setTab("results");
};
```

---

## Notes

- This is a fictional UI built for educational and entertainment purposes.
- All train names, schedules, and pricing are invented.
- The Korean State Railway (조선철도) is a real institution; this project is not affiliated with it in any way.

---

## License

MIT — do whatever you want with it.
