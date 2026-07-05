# DN MAN — Menswear E-commerce Frontend

A minimalist, premium men's clothing e-commerce frontend built with React 18, Vite, Tailwind CSS, and Lucide React icons.

## Stack
- **React 18** + **Vite** — fast dev server & build
- **Tailwind CSS** — utility-first styling, custom "ink / charcoal / stone / cream" palette
- **React Router v6** — client-side routing
- **Lucide React** — icon set
- **Context API + useState** — global cart & wishlist state (no external state library needed)

## Getting Started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

To build for production:
```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── assets/            # logo/banner images (add your own)
├── components/
│   ├── Navbar.jsx         # sticky nav: logo, search, categories, wishlist & cart badges
│   ├── Hero.jsx           # homepage hero banner w/ CTA
│   ├── ProductCard.jsx    # grid card: hover image swap, quick-add, wishlist heart
│   ├── FilterSidebar.jsx  # PLP filters: category, price range, size
│   ├── CartDrawer.jsx     # slide-out cart w/ qty steppers, remove, subtotal
│   └── Footer.jsx         # newsletter signup + link columns
├── context/
│   ├── CartContext.jsx    # global cart/wishlist state via useContext + useState
│   └── AuthContext.jsx    # register/login/logout state (localStorage-backed mock auth)
├── data/
│   └── products.js        # mock product catalog (12 items)
├── pages/
│   ├── Home.jsx            # hero + featured collections + new arrivals + brand banner
│   ├── ProductListing.jsx  # PLP: filters + sort dropdown + product grid
│   ├── ProductDetail.jsx   # PDP: gallery, size selector, add-to-cart, accordion
│   ├── Wishlist.jsx        # saved items page
│   ├── Checkout.jsx        # shipping form + order summary + COD / VietQR payment
│   ├── Login.jsx           # sign in form
│   ├── Register.jsx        # create account form
│   ├── Account.jsx         # logged-in user profile + sign out
│   └── Contact.jsx         # contact info panel + contact form
├── App.jsx             # routes + shared layout (Navbar/Footer/CartDrawer)
└── main.jsx            # app entry, wraps App in BrowserRouter + CartProvider
```

## Key Features Implemented

1. **Sticky Navbar** — logo, live search (routes to `/shop?search=...`), category links, wishlist badge, cart badge, responsive mobile menu.
2. **Homepage** — full-bleed hero with CTA, featured collections grid, new-arrivals product grid, brand statement section, newsletter footer.
3. **Product Listing Page** — sidebar filters (category checkboxes, price range slider, size buttons), sort dropdown (Newest / Price Low–High / Price High–Low), responsive grid, mobile filter drawer.
4. **Product Detail Page** — image gallery with thumbnail switcher, size selector with validation, add-to-cart with confirmation state, wishlist toggle, description/size/shipping accordion, related products.
5. **Cart Drawer** — slide-in from the right, quantity steppers, remove button, live subtotal, empty state, checkout CTA.
6. **Global State** — `CartContext` (React Context + useState) manages cart items, quantities, subtotal, cart count, wishlist, drawer open/close, and cart-clearing on order placement — no prop drilling required.
7. **Hover Micro-interactions** — product image cross-fade on hover, "Quick Add" button slide-up, wishlist heart fill state, underline link animations.
8. **Checkout Page** (`/checkout`) — shipping info form (name/phone/address with validation), live order summary (items, subtotal, shipping, total), and a payment method selector: **Cash on Delivery** or **Bank Transfer / VietQR**. Selecting Bank Transfer and placing the order reveals a confirmation view with bank details and a dynamically generated VietQR code image.
9. **Register / Login / Account** — `/register`, `/login`, and `/account` pages backed by `AuthContext`. Session persists across page reloads via `localStorage`. The Navbar shows a user icon that links to Login (guest) or Account (signed in), and the Checkout page pre-fills name/phone for signed-in users while still allowing guest checkout.
10. **Contact Page** (`/contact`) — store info panel (address, phone, email, business hours) alongside a contact form (name, email, subject, message) with inline validation and a local success confirmation. Linked from both the main Navbar and the Footer "Contact Us" item.

## Auth Integration Notes
- `AuthContext.jsx` follows the same pattern as `CartContext.jsx` — a Provider wrapping the app in `main.jsx`, consumed anywhere via `useAuth()`.
- **This is a frontend-only mock auth system**: registered users are stored as a JSON array in `localStorage` (`dnman_users`), and the active session is tracked by user id in `localStorage` (`dnman_session`). There is no backend, no password hashing, and no real security — it exists to demonstrate the register/login/logout flow and UI.
- For production, replace `AuthContext.jsx`'s internals with real API calls (e.g. to your backend, or a service like Firebase Auth / Supabase Auth / Auth0), hash passwords server-side, and use HTTP-only cookies or JWTs instead of localStorage for session storage.
- `useAuth()` exposes: `user`, `isAuthenticated`, `register({ fullName, email, phone, password })`, `login({ email, password })`, `logout()`.

## Checkout & VietQR Integration
- The "Checkout" button in the `CartDrawer` now links to `/checkout` instead of being a stub.
- `Checkout.jsx` reads `cartItems`, `subtotal`, and `clearCart` from `useCart()` (the same `CartContext` used everywhere else) — no new state layer needed.
- On **Place Order**, the form validates shipping fields, generates a simple order ID (`DNMAN########`), stores the order details in local component state, and calls `clearCart()` to empty the global cart.
- If **Bank Transfer** was selected, the confirmation view builds a VietQR image URL on the fly:
  ```
  https://img.vietqr.io/image/<BANK_ID>-<ACCOUNT_NUMBER>-print.jpg?amount=<AMOUNT>&addInfo=<ORDER_ID>&accountName=<ACCOUNT_NAME>
  ```
  Bank details are placeholders (`MB Bank`, `0865156242`, `DUONG THI KIM YEN`) defined at the top of `Checkout.jsx` in the `BANK_INFO` object — replace with your real merchant account.
  Since store prices are in USD but VietQR transfers are in VND, the amount is converted using an illustrative fixed rate (`USD_TO_VND` constant) — swap this for your live pricing/rate in production.
- If **COD** was selected, a simpler confirmation is shown instead (no QR code).
- Both confirmation views show the shared notice: *"Hệ thống sẽ kiểm tra và xác nhận đơn hàng sau khi nhận được chuyển khoản."*

## Notes
- Product images are placeholder Unsplash URLs — swap in `src/data/products.js` with real product photography.
- Real payment confirmation (webhook/polling against your bank or a VietQR-compatible payment gateway) is not implemented — this only generates the static QR image and displays a "pending" state.
- The Contact form simulates a successful submission locally — wire `Contact.jsx`'s `handleSubmit` up to your email service (e.g. SendGrid, Resend) or a backend endpoint to actually deliver messages.
- Replace the wordmark logo in `Navbar.jsx` with an actual logo image from `src/assets` if desired.
