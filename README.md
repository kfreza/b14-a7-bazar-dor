# 🛒 বাজার দর — BazarDor

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**

BazarDor is a Bangla market-price tracker. It shows today's prices for everyday essentials such as rice, lentils, oil, vegetables, fish, meat, eggs and spices. You can see which prices went up or down since yesterday and compare the same product across 12 markets in six divisions of Bangladesh.

🔗 **Live site:** https://b14-a7-bazar-dor-lilac.vercel.app/
📦 **Repository:** https://github.com/kfreza/b14-a7-bazar-dor

---

## ✨ Features

1. **Live price ticker:** an endlessly scrolling strip under the navbar shows every product with its price and daily change (`▲ ২.১%` / `▼ ২.৯%`). It pauses on hover.
2. **Today's risers and fallers:** the home page highlights the 6 biggest price increases and the 6 biggest drops, followed by a responsive grid of all products.
3. **Category pages with price sorting:** browse by category and sort by `ডিফল্ট`, `দাম: কম থেকে বেশি` or `দাম: বেশি থেকে কম`. Sorting uses the numeric price, so Bengali numerals are ordered correctly.
4. **Market-wise product details (login required):** each product shows its minimum, maximum and average price, the change since yesterday, and a table of today's prices in every market and division.
5. **Authentication with BetterAuth:** sign up and sign in with email and password, or with Google or GitHub. Protected pages redirect to sign-in and return you to the page you wanted.
6. **Profile and name update:** view your account details and change your name on a separate update page.
7. **Fully Bangla, fully responsive:** Bengali digits and dates throughout (`১,৮৫০ টাকা`, `শনিবার, ১০ অক্টোবর, ২০২৬`), with layouts for mobile, tablet and desktop.
8. **Friendly feedback:** toast notifications for every auth action, skeleton loaders while data loads, and a Bangla 404 page with a **হোম পেজে ফিরে যান** button.

> **Price colors:** this is a shopper's app, so a price **increase is red** (bad news) and a **decrease is green** (good news). Unchanged prices are gray.

---

## 🛠️ Technologies

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org) (App Router, Cache Components, Proxy) | Framework, routing, caching and route protection |
| React 19 + TypeScript | UI and type safety |
| [Tailwind CSS 4](https://tailwindcss.com) + [DaisyUI 5](https://daisyui.com) | Styling, custom green theme and responsive layout |
| [BetterAuth](https://better-auth.com) | Email/password, Google and GitHub authentication, user updates |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Stores users, accounts and sessions |
| [react-hot-toast](https://react-hot-toast.com) | Toast notifications |
| Hind Siliguri (Google Fonts via `next/font`) | Bangla typography |
| Vercel | Hosting |

Price data comes from the BazarDor API (`/products`, `/categories`). If the API is rate-limited or unavailable, the app falls back to a bundled snapshot, so pages always render.

---

## 📄 Pages

| Route | Description |
|---|---|
| `/` | Hero, today's risers and fallers, and all products |
| `/category/[slug]` | Products in one category, with sorting |
| `/product/[slug]` | 🔒 Price summary and market-wise price table |
| `/signin`, `/signup` | Authentication |
| `/profile` | 🔒 Account details and sign out |
| `/profile/update` | 🔒 Update your name |

---

## 🚀 Run locally

**Requirements:** Node.js 20.9 or newer and a MongoDB database (a free MongoDB Atlas cluster works).

```bash
git clone https://github.com/kfreza/b14-a7-bazar-dor.git
cd b14-a7-bazar-dor
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

| Variable | Value |
|---|---|
| `BETTER_AUTH_SECRET` | A long random string, e.g. from `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | `http://localhost:3000` locally, your live URL in production |
| `MONGODB_URI` | Your MongoDB connection string |
| `MONGODB_DB` | Database name, e.g. `bazardor` |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | From Google Cloud Console → OAuth client |
| `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` | From GitHub → Settings → Developer settings → OAuth Apps |

OAuth callback URLs to register:

- `http://localhost:3000/api/auth/callback/google`
- `http://localhost:3000/api/auth/callback/github`

Then start the app:

```bash
npm run dev
```

Open http://localhost:3000.

---

## 📁 Project structure

```
src/
├── app/              # Routes: home, category, product, auth, profile, API
├── components/       # Navbar, ticker, cards, product detail, auth forms, profile
├── data/             # Fallback snapshot of the BazarDor API
├── lib/              # API client, auth, session guard, Bengali formatting
└── proxy.ts          # Redirects logged-out users away from protected routes
```
