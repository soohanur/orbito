# Orbito

A real estate site built end to end with AI. No designer, no copywriter, no second engineer.

Live demo: `npm install && npm run dev` then open http://localhost:5173

---

## What it is

A multi page React site for a fictional NYC and Philly brokerage. Properties, agents, blog, buy/sell/rent landings, profile with saved homes, login, register. Everything you would expect from a real brokerage marketing site.

The whole thing was made by chaining four AI tools. The point is to show that one person with the right AI workflow can ship a real product.

---

## The AI workflow

Four tools, four roles. I orchestrated, they specialized.

**1. ChatGPT (ideation).** Concept, audience, naming, page list, copy voice.

**2. Claude (planning).** Information architecture, routing, data model, design tokens, tradeoff calls.

**3. Base44 (initial scaffold).** First working pass of layout, theme, base components, routing shell.

**4. Claude Code (engineering).** Everything after that. Single property and agent pages, client side auth with profile and favorites, Buy/Sell/Rent landings, blog, sitewide GSAP scroll animations, Lenis smooth scroll, mobile responsiveness, deploy build.

---

## The actual prompts

These are the prompts that drove the build. Each one is written to be specific enough that the tool can deliver, while leaving room for it to make good calls on its own. Copy them, swap the brand, you get a similar result.

### ChatGPT (concept and copy voice)

> I want to launch a real estate brand called Orbito. Premium feel, NYC and Philadelphia focused, targeting buyers, renters, agents, and investors. Help me think this through.
>
> Give me:
> 1. A short positioning statement (one sentence).
> 2. The three buyer personas, very specific (income bracket, age, what they care about, where they look today).
> 3. A site map of every page I need for an MVP launch and what each page promises the visitor.
> 4. The brand voice in plain rules (do say / do not say) plus three example headlines I can drop on the homepage.
>
> Constraints: no emoji, no marketing fluff, no "elevate", no "unlock". The voice should feel like a confident senior agent who does not need to oversell. Keep everything in plain English. If a page does not earn its place in the MVP, cut it.

### Base44 (first design pass)

> Build me a static marketing site scaffold for a real estate brand called Orbito. React with Vite, Tailwind, React Router. Mobile responsive.
>
> Pages: Home, Properties, Agents, Join, About. Standard shared Header (logo left, nav center, sign in button right) and Footer.
>
> Design language:
> * Editorial and minimal. No gradients, no glassmorphism, no rounded squircle cards.
> * Brand tokens: background `#F1F1F1`, ink `#151717`, muted ink `#383A3A`, faded `#B3B3B3`.
> * Typography: tight black display font for headlines (think Inter or Instrument Sans, 800/900 weight), letter spacing negative, line height tight. Body text light weight, generous line height.
> * Container with very wide max width (around 1920px) and generous left/right padding that shrinks on mobile.
> * Heroes are big, type led, often with one quiet hero image. Use clamp() for fluid font sizes.
> * Cards are clean white with a one pixel light border and soft hover lift.
>
> Home sections in order: full bleed hero, "Why Orbito" two column statement, For Agents pitch with two stacked images, services row (Buy / Sell / Rent) as full width dark sections with a number and a big label, results stat strip, blog teaser, final CTA.
>
> Wire the routes, drop placeholder copy, ship a working starter I can clone and iterate on.

### Claude / Claude Code (engineering and refinement)

> I have a Vite + React + Tailwind scaffold for a real estate site called Orbito. I need you to turn it into a real product. Read the existing code first before you change anything.
>
> Work in this order and check in after each block:
>
> 1. Extract property and agent data into `src/lib/propertiesData.js` and `src/lib/agentsData.js` (single source of truth, no duplicate arrays). Each property has type, price, beds, baths, area, address, neighborhood, city, image, tag, featured, daysOnMarket. Each agent has name, title, location, deals, rating, specialty, image, badge, phone, email, bio, years, languages.
>
> 2. Build dynamic single pages for every property at `/Properties/:slug` and every agent at `/Agents/:slug`. Properties detail needs gallery, stats row, description, amenities list, embedded Google Map iframe, sticky sidebar (price + listing agent + tour request form), related listings, dark CTA. Agent detail needs hero image, stats, contact form, listings carousel, other agents row. Match the existing theme exactly. No new tokens, no new colors.
>
> 3. Ship client side auth using localStorage in `src/lib/ClientAuth.jsx`. Register, sign in, sign out, edit profile, per user favorites. No backend, no JWT, no third party. The header avatar dropdown swaps in when the user is logged in. Wire `/SignIn`, `/Register`, `/Profile`.
>
> 4. Add three service landing pages, `/Buy`, `/Sell`, `/Rent`. Share one `ServiceLanding` component, parameterize copy, hero image, benefits, steps, FAQs, and listing filter. Link them from the Home services rows.
>
> 5. Add `/Blog` and `/Blog/:slug`. Six seeded posts in `src/lib/blogData.js`. List page mirrors the Properties hero pattern, has a sticky filter bar with four category chips (All, Market Reports, Buyer Guides, Seller Guides). Detail page has author, date, read time, share button, related posts.
>
> 6. Animation pass with GSAP and Lenis:
>     * Lenis for site wide inertia smooth scroll, code split, disabled when `prefers-reduced-motion`. Sync `lenis.on("scroll")` to `ScrollTrigger.update` and feed Lenis from `gsap.ticker`.
>     * One reusable `<AnimatedText>` (with `splitWords` prop for hero word stagger) and one `<AnimatedImage>`. Initial hidden state in CSS, animated to identity on enter. No FOUC.
>     * A global hook that finds every `h1` to `h6` and every `<p>` on each route, skips elements already wrapped by `AnimatedText`, and adds one ScrollTrigger per element with `start: "top 88%"` (headings, 0.7s) or `start: "top 92%"` (paragraphs, 0.55s, opacity only, no y shift).
>     * Set the `html.js-anim` gate class via a tiny inline script in `index.html` so headings and paragraphs are hidden before JS boots. Reduced motion clears everything.
>
> 7. Mobile pass. Replace fixed `paddingTop/Bottom` rem values on every section with `clamp()` so spacing shrinks on phones. Stack heroes correctly. Drop oversized fixed line heights. Auth pages use `items-start` on mobile so a tall stacked grid is not centered off screen.
>
> 8. Production hygiene. Per route `document.title` via a small `PageTitle` component (dynamic for `/Properties/:slug`, `/Agents/:slug`, `/Blog/:slug`). A `ScrollToTop` component that resets scroll on every navigation, preferring Lenis when active. Favicon, meta description, theme color. SPA fallback `.htaccess` in `public/` that does not rewrite `/api`, `/assets`, or `/images`.
>
> 9. Self host every image. Find every external image URL in source, download into `public/images/`, rewrite references. Keep dicebear avatar URL as is since it is per user.
>
> Constraints across every step:
> * Do not change existing styles when adding animation or routes. Wrap, do not restyle.
> * Do not invent new brand tokens. Use the four colors and the container that already exist.
> * Run the dev server and verify before you say a task is done.
> * Commit each block with a clear message. Author the commits as the repo owner, not the harness email.

---

## Architecture

```
src/
  App.jsx                  Route wiring + providers
  components/
    Header.jsx             Theme aware nav with avatar menu
    Footer.jsx             Newsletter + links
    Layout.jsx             Mounts smooth scroll + global reveal
    ScrollToTop.jsx        Resets scroll on route change
    PageTitle.jsx          Per route document.title
    AnimatedText.jsx       Hero word stagger reveal
    AnimatedImage.jsx      Fade plus tiny scale reveal
    ServiceLanding.jsx     Shared Buy/Sell/Rent layout
    ui/                    Shadcn style base primitives
  lib/
    ClientAuth.jsx         localStorage auth context
    AuthContext.jsx        Base44 shell, short circuits when no appId
    propertiesData.js      Listing data
    agentsData.js          Agent data
    blogData.js            Blog post data
    useSmoothScroll.js     Lenis lifecycle
    useGlobalReveal.js     Sitewide h1 to h6 and p reveal
    animConfig.js          Shared duration / ease / start
    scrollManager.js       Lenis aware programmatic scroll
  pages/
    Home.jsx               Editorial homepage
    Properties.jsx         Listings grid with filters
    PropertyDetail.jsx     Single listing
    Agents.jsx             Agent directory
    AgentDetail.jsx        Single agent
    Buy.jsx Sell.jsx Rent.jsx   Service landings
    Blog.jsx BlogDetail.jsx     Blog list + post
    About.jsx Join.jsx          Brand pages
    SignIn.jsx Register.jsx Profile.jsx   Auth flow
  index.css                Brand tokens + reveal initial states
public/
  favicon.png
  croped.jpg, about3.webp, about4.jpeg, join page.jpeg
  images/                  55 self hosted property + agent photos
  .htaccess                SPA fallback + caching
index.html                 Pre paint js-anim gate + meta tags
```

---

## Tech stack

React 18, Vite, Tailwind, React Router v6, Framer Motion (hero entrances), GSAP plus ScrollTrigger (sitewide reveals), Lenis (smooth scroll), Lucide icons, localStorage auth.

---

## Run locally

```bash
git clone https://github.com/soohanur/orbito.git
cd orbito
npm install
npm run dev
```

Open http://localhost:5173.

If `npm run dev` complains about `@rollup/rollup-linux-x64-gnu`, run `npm i @rollup/rollup-linux-x64-gnu --no-save`. Known npm bug, not an Orbito issue.

## Build for hosting

```bash
npm run build
```

Output goes to `dist/`. Upload the contents to any static host. Hostinger users can drop `orbito-dist.zip` (in repo root) into File Manager and extract.

---

## Why this matters

One person directed four AI tools and shipped a polished, multi page, authenticated web product. No design hire. No engineering hire. No copywriter. Just clear intent, the right tool for each step, and judgment.

If you can do this once you can do it for any product.

Built by [@soohanur](https://github.com/soohanur).
