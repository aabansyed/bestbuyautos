# BestBuy Autos — React Conversion

Full React (Vite + React Router 7) conversion of the original static
`bestbuyautos` site (12 HTML pages, ~13,000 lines).

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
```

## Structure

```
src/
  components/
    Navbar.jsx        - main nav, mega dropdown, mobile menu (React state)
    Footer.jsx         - shared footer
    Layout.jsx          - shared chrome: loader, marquee, topbar, navbar,
                          footer, global auth modal, toast — wraps every route
  pages/
    Home.jsx            - / (hero slider, inventory grid, shipping calc,
                           testimonials, FAQ, contact, WeTalk chat widget)
    Auction.jsx          - /auction
    Blog.jsx             - /blog
    CeoMessage.jsx       - /ceo-message
    ContactUs.jsx        - /contact-us
    HowToBuy.jsx         - /how-to-buy
    OurCompany.jsx       - /our-company
    OurPartners.jsx      - /our-partners
    PrivacyPolicy.jsx    - /privacy-policy
    Reviews.jsx          - /reviews
    scripts/             - page-specific interactive logic (ported from the
                           original inline <script> blocks)
  utils/
    globalScript.js      - site-wide vanilla-JS utilities shared across
                           pages (modals, toast, FAQ accordion, contact
                           form, shipping calculator, WeTalk chat) —
                           attached to `window` since the original inline
                           onclick="" handlers, once converted to JSX
                           onClick, still call these by name
  styles/
    global.css            - root variables + shared nav/footer/base styles
    <page>.css             - per-page styles extracted from that page's
                           original <style> blocks
public/                    - all images from the original site (renamed to
                           remove spaces/uppercase for clean URLs)
```

## How the conversion was done

Every page's HTML was mechanically converted to JSX (class→className,
inline `style=""` strings → style objects, void tags self-closed, event
handlers wired up) and reviewed by hand. Where a page had real
interactivity (car inventory filters, wishlist/compare, review filters,
partner filters, contact-form validation, etc.), the original vanilla JS
was ported into a page-specific script module that runs in a `useEffect`
on mount and operates on the DOM the same way the original did — this
keeps 1:1 behavioral fidelity with the source site rather than a partial
rewrite. Functions referenced by (now-JSX) onClick handlers are exposed
on `window` so they resolve correctly.

## Admin Panel (Cars)

A full CRUD admin panel lives at **`/admin`**, backed by Supabase (Auth + Database + Storage). It lets you add, edit, delete, and show/hide stock cars — changes appear on the public homepage inventory immediately (no redeploy needed).

### One-time setup

1. **Run the SQL schema.** In your Supabase project dashboard → SQL Editor → New query, paste and run everything in `supabase/schema.sql`. This creates the `cars` table, security policies, a public `car-images` storage bucket, and seeds it with the 12 cars that used to be hardcoded (delete that last block first if you'd rather start empty).
2. **Create your `.env` file** (copy `.env.example`) with your project's URL + anon key from Supabase → Settings → API:
   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
3. **Create an admin user.** Supabase → Authentication → Users → Add user (set an email + password yourself). There's no public sign-up form in this app — whoever you create here is who can log in at `/admin`.

### Using it

- Visit `/admin` → log in with the account you created above.
- **Cars list**: search, filter by body type, toggle a car's visibility (Live/Hidden) without deleting it, edit, or delete.
- **Add/Edit Car**: brand, model, year, price, mileage, fuel type, transmission, body type (Sedan/SUV/Coupe/Van/Hatchback/Truck/Wagon), color, engine, horsepower, badge (New/Hot/Premium), description, and multiple images — upload straight from your device (stored in Supabase Storage) or you can also just drop in image URLs by editing `images` directly in the Supabase table editor if you prefer. The first image is the cover photo shown on the inventory grid; click the star on any other image to make it the cover.
- Only cars marked **in stock** show up in the homepage's Stock Cars section — toggling a car to "Hidden" pulls it from the site instantly without deleting its data.

### Notes

- `src/lib/carsApi.js` — all the Supabase read/write functions, reused by both the admin panel and the public homepage.
- `src/lib/AuthContext.jsx` — wraps the app, exposes the current admin session.
- `src/pages/admin/` — the panel itself (`AdminLogin`, `AdminLayout`, `CarsList`, `CarForm`, `ProtectedRoute`).
- This first phase covers **cars only**, as agreed. Reviews, Partners, Blog, and company-info sections still use their original static content — happy to wire any of those into the same admin panel next if you want them dynamic too.



- **EmailJS on Contact Us** (`src/pages/scripts/contactScript.js`) still
  has the original site's placeholder keys (`YOUR_PUBLIC_KEY`, etc.). Until
  real keys are added, the form automatically falls back to opening the
  visitor's email client (`mailto:`) — same fallback behavior as the
  original site.
- **`blog-detail.html`** was referenced by the blog cards' "Read More"
  links but was not part of the uploaded archive, so those links currently
  have no matching route. Add a `BlogDetail.jsx` + route when that page's
  source is available.
- **`bankingdetails.html`** was linked from the nav's "Bank Details" mega-menu
  item but likewise wasn't in the archive — it currently points to
  `/contact-us` as a reasonable stand-in.
- Two files in the uploaded archive were not converted because they looked
  like unused drafts, not real site pages: `indedx.html` (typo filename,
  a mostly-empty test file) and `listen.html` (a different, simpler
  unrelated page). Let me know if either should actually be included.
- The bundle is a single ~670KB JS chunk (vite warns about this at build
  time). Works fine, just consider code-splitting with `React.lazy()` per
  route if you want smaller initial load.
