# Rick & Morty Universe Explorer

An interactive data dashboard built with Next.js that lets you explore characters from the Rick & Morty universe using the public [Rick & Morty API](https://rickandmortyapi.com/).

---

## Features

- **Global search** — searches all 826 characters via the API, not just loaded ones
- **Filters** — filter by species, status, and gender
- **Load more** — paginated character loading without losing scroll position
- **Analytics dashboard** — visualises the full character dataset with 6 charts
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
git clone <your-repo-url>
cd rick-morty-explorer

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
| Page resets to 1 only when search term changes | Prevents load more from jumping back to the top |
| Early return removed from `page.jsx` | Keeps the search input mounted so typing focus is never lost |
| Charts always use full dataset | Ensures analytics are accurate regardless of current search |

---

## Testing
- Search "rick" → should show results from all dimensions, not just page 1
- Apply a species filter → should narrow results correctly
- Load more → should append results without resetting scroll
- Visit `/dashboard` → charts should load the full dataset independently
- Clear search → should return to unfiltered paginated results
