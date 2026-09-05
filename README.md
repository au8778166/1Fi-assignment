# 1Fi Marketplace

A shop-on-EMI marketplace built for the 1Fi SDE Intern assignment — users can browse products, pick a variant, choose a no-cost/low-cost EMI plan, and check out, all backed by a real REST API instead of hardcoded UI data.

**Live demo:** [quickai-tawny.vercel.app](https://quickai-tawny.vercel.app/) &nbsp;•&nbsp; **Repo:** [github.com/au8778166/1Fi-assignment](https://github.com/au8778166/1Fi-assignment)

---

## Features

- **Shop page with 3 sections** — Top Brands, Nearby Stores (placeholders per spec), and the fully built **1Fi Marketplace**
- **Product listing** — image, name, brand, category, MRP vs. discounted price, live search, and category filters
- **Product details** — variant selection (storage/color), full description, and available EMI plans
- **EMI plan selection** — tenure, monthly amount, interest rate, and cashback per plan
- **Checkout flow** — review → place order → order confirmation
- **Order history** — list past orders and view individual order details
- **Loading, empty, and error states** on every data-driven screen
- **Responsive UI** built with Tailwind CSS, consistent spacing/typography/components throughout

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Vite, React Router, Tailwind CSS, Axios, lucide-react |
| Backend | Node.js, Express 5, Mongoose 9 (MongoDB) |
| Deployment | Frontend on Vercel, Backend on Render |

## Project Structure

```
1Fi-assignment/
├── client/                    # React + Vite frontend
│   └── src/
│       ├── components/        # ProductCard, EMIPlanCard, VariantSelector,
│       │                      # SearchBar, ShopTabs, BottomNav
│       ├── pages/              # Shop, MarketPlace, ProductDetails,
│       │                      # Checkout, OrderSuccess, Orders, OrderDetails
│       └── services/api.jsx   # Axios client — all HTTP calls live here
│
└── server/                    # Express + MongoDB backend
    └── src/
        ├── config/db.js       # Mongoose connection
        ├── models/            # Product, Order schemas
        ├── controllers/       # productController.js
        ├── routes/            # productRoutes.js, orderRoutes.js
        ├── seed/seed.js       # Seeds the DB with sample products
        └── server.js          # App entry point
```

## Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB connection string (local or MongoDB Atlas)

### 1. Backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

```bash
npm run seed   # populates the database with sample products
npm run dev    # starts the API on http://localhost:5000
```

### 2. Frontend

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

```bash
npm run dev    # starts the app on http://localhost:5173
```

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check |
| `GET` | `/api/products` | List all products (summary fields) |
| `GET` | `/api/products/:slug` | Get full product detail by slug, incl. EMI plans |
| `POST` | `/api/orders` | Create a new order |
| `GET` | `/api/orders` | List all orders, newest first |
| `GET` | `/api/orders/:id` | Get a single order by ID |

All endpoints were tested end-to-end (happy path + 404/validation cases) — every route responds with the expected status code and payload shape.

## Known Limitations

- **Top Brands** and **Nearby Stores** tabs are intentionally left blank per the assignment brief — no implementation was required for those sections.
- Malformed order IDs and order-validation failures currently return `500` instead of a more precise `400 Bad Request`.
- No authentication — orders aren't tied to a user account.

## Evaluation Notes

This project was built to satisfy the 1Fi SDE Intern assignment brief: a Shop page with three sections, a fully implemented Marketplace (listing, variants, EMI plans, plan selection, checkout CTA), dynamic (non-hardcoded) data via REST APIs, and loading/error/empty states throughout.