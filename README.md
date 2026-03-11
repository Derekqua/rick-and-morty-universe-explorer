# Rick & Morty Universe Explorer

An interactive data dashboard built with Next.js that lets you explore characters from the Rick & Morty universe using the public [Rick & Morty API](https://rickandmortyapi.com/).

---

## Features

- **Global search** — searches all 826 characters via the API, not just loaded ones
- **Filters** — filter by species, status, and gender
- **Load more** — paginated character loading without losing scroll position
- **Analytics dashboard** — visualises the full character dataset with 5 charts
- **Debounced search** — smooth search experience with no unnecessary API calls

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Character explorer with search, filters, and paginated grid |
| `/dashboard` | Analytics dashboard with charts and summary stats |

---

## Tech Stack

- [Next.js 16](https://nextjs.org/) — React framework with file-based routing
- [Recharts](https://recharts.org/) — charts and data visualisation
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [Rick & Morty API](https://rickandmortyapi.com/) — public REST API, no auth required

---

## Project Structure

```
src/
├── app/
│   ├── layout.jsx          # Root layout with shared navbar
│   ├── page.jsx            # Character explorer page
│   └── dashboard/
│       └── page.jsx        # Analytics dashboard page
│
├── components/
│   ├── CharacterCard.jsx   # Single character card
│   ├── CharacterList.jsx   # Grid of character cards
│   ├── Filters.jsx         # Species / status / gender dropdowns
│   ├── Chart.jsx     # All charts for the dashboard
│   └── SearchBar.jsx       # Debounced global search input
│
├── hooks/
│   ├── useCharacters.js    # Fetches paginated characters with search
│   └── useAllCharacters.js # Fetches full dataset for analytics
│
├── lib/
│   └── api.js              # API fetch functions
│
└── utils/
    └── transformData.js    # Data transforms for charts
```

---

## Setup

### Prerequisites
- Node.js >= 18
- npm or yarn

### Install and run

```bash
# Clone the repo
git clone https://github.com/Derekqua/rick-and-morty-universe-explorer.git
cd rick-and-morty-universe-explorer

# Install dependencies
npm install

# Start dev server
npm run dev
```

App runs at `http://localhost:3000`

### Build for production

```bash
npm run build
npm run preview
```

---

## Assumptions and Design Decisions

| Decision | Reason |
|----------|--------|
| Global search via `?name=` API param | More efficient than loading all characters and filtering locally |
| `useAllCharacters` only runs on `/dashboard` | Avoids 42 parallel requests on the main explorer page |
| Page resets to 1 only when search term changes | Prevents requesting page 3 of a search that only has 1 page |
| Search state lives in `page.jsx` not `SearchBar` | Debounce in `page.jsx` prevents an API call firing on every single keystroke — waits 250ms of no typing before calling the API |
| Charts always use full dataset | Ensures analytics are accurate regardless of current search |
| `useMemo` for species dropdown | Prevents recomputing the species list on every keystroke — only recalculates when the characters array actually changes |
---

## Testing
- Search "rick" → should show results from all dimensions, not just page 1
- Apply a species filter → should narrow results correctly
- Clear search → should return to unfiltered paginated results
- Load more → should append results without resetting scroll
- Visit dashboard from the navbar → charts should load the full dataset independently

