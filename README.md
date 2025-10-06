# LocalMart – LocalStorage E‑Commerce (Frontend Only)

LocalMart is a lightweight, modern, frontend-only demo shop. It simulates a shopping experience using the browser's LocalStorage—no backend required.

## Features
- Add/remove items from cart, update quantities
- Persist cart in LocalStorage across refreshes
- Dynamic totals with configurable tax rate
- Categorized browsing: Gadgets, Foods, Sports, Shoes
- Optional: fetch extra electronics from a public demo API (with graceful fallback)
- Responsive, modern UI with hero section and animated background

## Tech Stack
- HTML, CSS, JavaScript (no frameworks)

## Quick Start (Local)
Open the `index.html` file directly or run a simple local server for best results (recommended for API/images):

### Option A: Double‑click
- On Windows, just double‑click `index.html` to open in your default browser

### Option B: Python HTTP server
```bash
# from the project root
python -m http.server 5500
# then open http://localhost:5500/
```

### Option C: Node static server
```bash
# from the project root
npx serve -p 5500 .
# then open http://localhost:5500/
```

## Project Structure
```
.
├─ index.html      # Layout, hero, category chips, cart sidebar
├─ styles.css      # Modern responsive styles + animated background
├─ app.js          # Products, LocalStorage cart, rendering, optional API fetch
└─ README.md
```

## Configuration
- Tax rate: edit `TAX_RATE` in `app.js`
- Categories and products: edit the `products` array in `app.js`
- Currency: handled by `formatCurrency()` in `app.js`
- Background/animation: tweak gradients and keyframes in `styles.css`

## Optional API (Electronics)
We try to augment the `Gadgets` category with data from `https://fakestoreapi.com/products/category/electronics`.
If the request fails or is blocked by CORS, LocalMart silently falls back to local data.

## Deploy (GitHub Pages)
1. Commit and push this repo to GitHub
2. In your GitHub repository, go to Settings → Pages
3. Set Source to `Deploy from a branch` and select `main` branch `/ (root)`
4. Save; your site will be available at the URL GitHub provides

## License
MIT
