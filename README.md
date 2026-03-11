# Rick & Morty Universe Explorer

An interactive data dashboard built with Next.js that lets you explore characters from the Rick & Morty universe using the public [Rick & Morty API](https://rickandmortyapi.com/).

---

## Features

- **Global search** — searches all 826 characters via the API, not just loaded ones
- **Filters** — filter by species, status, and gender
- **Load more** — paginated character loading without losing scroll position
- **Inline analytics** — charts update live based on currently loaded & filtered characters
- **Debounced search** — smooth search experience with no unnecessary API calls

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Character explorer with search, filters, and paginated grid |

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
│
├── components/
│   ├── CharacterCard.jsx   # Single character card
│   ├── CharacterList.jsx   # Grid of character cards
│   ├── Filters.jsx         # Species / status / gender dropdowns
│   ├── Chart.jsx           # Analytics charts (updates with filters)
│   └── SearchBar.jsx       # Debounced global search input
│
├── hooks/
│   ├── useCharacters.js    # Fetches paginated characters with search
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
| Charts use loaded characters only, not full dataset | charts grow naturally as the user loads more pages |
| Page resets to 1 only when search term changes | Prevents requesting page 3 of a search that only has 1 page |
| Search state lives in `page.jsx` not `SearchBar` | Debounce in `page.jsx` prevents an API call firing on every single keystroke — waits 250ms of no typing before calling the API |
| `useMemo` for species dropdown | Prevents recomputing the species list on every keystroke — only recalculates when the characters array actually changes |
| Characters with `unknown` origin or location excluded from displacement | Cannot determine displacement without both values — including them would skew the chart |
---

## Testing
- Search "rick" → should show results from all dimensions, not just page 1
- Apply a species filter → should narrow results correctly
- Clear search → should return to unfiltered paginated results
- Clear all filters → should reset all three dropdowns at once
- Load more → should append results without resetting scroll

