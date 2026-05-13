# Orbito — A Real Estate Platform Built Entirely With AI

> **100% AI-assembled.** Concept, copy, design, code, and review — every layer was driven by AI tools, orchestrated end-to-end by a single operator who specializes in turning AI fluency into shippable product.

Live demo: `npm install && npm run dev` → http://localhost:5173

---

## Why this project exists

Orbito is a proof-of-capability. It demonstrates that a modern, polished, production-grade web product — with authentication, routing, dynamic detail pages, search, filtering, favorites, agent profiles, and a coherent design system — can be **planned, designed, built, and refined entirely through AI tooling**, without a traditional design team, without hand-written boilerplate, and without copy-pasting from templates.

It is built specifically as a portfolio piece for AI-native builders: people who treat large language models not as autocomplete but as **collaborators across the full software lifecycle**.

If you are reading this thinking "I could never build a site like this without a team" — that's exactly the point. With the right AI stack and the right operating model, **one person can.**

---

## The AI Stack — every tool, every role

This site was assembled by chaining four AI tools, each playing a specific role. Nothing was outsourced to a human designer, copywriter, or engineer.

### 1. **ChatGPT — Ideation & Concept**
ChatGPT was used at the very front of the pipeline to:
- Brainstorm the product category (luxury-tier real estate marketplace)
- Define the target audience (NYC buyers, renters, agents, investors)
- Generate competitor analyses, value proposition variants, and naming candidates
- Draft the information architecture: which pages exist, what each page promises, what the user flow looks like
- Produce the editorial voice — confident, minimal, slightly editorial, no emoji, no fluff

This phase answered: *"What are we building, who is it for, and why would they care?"*

### 2. **Claude — Strategic Planning**
Claude (Anthropic) was used to convert the raw concept into an actionable build plan:
- Mapped each user story to specific pages and components
- Identified the data model (properties, agents, users, favorites)
- Decided routing structure (`/Properties`, `/Properties/:slug`, `/Agents`, `/Agents/:slug`, `/SignIn`, `/Register`, `/Profile`)
- Specified the design language (typography scale, brand tokens `#151717` / `#F1F1F1` / `#383A3A` / `#B3B3B3`, container system, motion principles)
- Chose the tech stack: **React + Vite + Tailwind + Framer Motion + React Router**
- Pre-empted edge cases: anonymous favorites, signed-in favorites, route fallbacks, mobile nav drawer

This phase answered: *"How exactly do we build this, in what order, with what trade-offs?"*

### 3. **Base44 — Initial Design & Scaffold**
Base44 was used to materialize the plan into a working starter:
- Generated the first pass of layout, theme tokens, base components, and core pages
- Produced a coherent visual baseline so we never had to "design from a blank page"
- Wired up routing, the layout shell (`Header`, `Footer`, `Layout`), and reusable UI primitives in `src/components/ui/`
- Provided the deployment-ready Vite app skeleton

This phase answered: *"What does V0.1 look like, today, running in a browser?"*

### 4. **Claude Code — Refinement, Features & Engineering**
Claude Code (the agentic CLI variant) is where the project graduated from "AI demo" to "real product." It was used to:
- **Rename and restructure navigation** — `Search` → `Property` across nav, hero kickers, and mobile drawer
- **Extract shared data layers** into `src/lib/propertiesData.js` and `src/lib/agentsData.js` so detail pages, related cards, and favorites all reference one source of truth
- **Build dynamic single-pages for every property** (`/Properties/:slug`) with hero galleries, embedded Google Maps, amenities, sticky sidebar (price + listing agent + tour-request form), and related listings — all matching the global theme
- **Build dynamic single-pages for every agent** (`/Agents/:slug`) with bio, stats (deals / rating / years / languages), specialty highlights, contact form, featured listings, and other-agents carousel
- **Fix the missing Shirin Khoury agent image** with a working Unsplash portrait swap, then enrich every agent record with phone, email, bio, years, and languages
- **Ship a complete client-side authentication system** in `src/lib/ClientAuth.jsx` (localStorage-backed, no backend required for the demo): register, sign-in, sign-out, password validation, session persistence, profile editing (name, phone, location, bio), and per-user saved favorites
- **Add a full Profile dashboard** at `/Profile` showing avatar, member-since date, editable profile fields, and saved homes synced to the favorites system on the listings pages
- **Polish the header**: avatar dropdown when logged in, Register + Sign In CTAs when logged out, full mobile drawer parity
- **Remove cruft**: the "20 Properties Found" counter was deleted to give the listings grid more visual weight
- **Diagnose and fix tooling issues** end-to-end (the well-known `@rollup/rollup-linux-x64-gnu` npm optional-deps bug was identified and patched without breaking anything else)

This phase answered: *"How do we go from 'looks like a real site' to 'is a real site, with real features that actually work'?"*

---

## What's actually in the product

| Surface | What it does |
|---|---|
| `/` Home | Editorial hero, narrative-driven sections |
| `/Properties` | Filterable, sortable listings grid (Buy / Rent / Commercial) + search by address, neighborhood, city |
| `/Properties/:slug` | Per-listing detail page: gallery, stats, description, amenities, map, sticky price + tour-request form, related listings, CTA |
| `/Agents` | Filterable agent directory with specialty chips and search |
| `/Agents/:slug` | Per-agent profile: bio, stats, languages, contact form, featured listings, other agents |
| `/SignIn` & `/Register` | Validated forms, themed end-to-end, password show/hide, error states |
| `/Profile` | Editable profile, avatar, member-since, saved-homes grid backed by per-user favorites |
| `/Join` | Career / agent recruitment landing |
| `/About` | Brand story |
| Header | Theme-aware (transparent on home, blurred on scroll); avatar dropdown for signed-in users |

Every page uses the same brand tokens (`#151717` / `#F1F1F1` / `#383A3A` / `#B3B3B3`), the same `orbito-container` width system, the same typography rhythm, and the same motion grammar (Framer Motion entry animations, IntersectionObserver scroll reveals).

---

## The operating model (why this matters)

Most people use AI as a glorified autocomplete. **This project was built by treating each AI tool as a specialist on a team I direct.**

- **ChatGPT** is my product strategist.
- **Claude** is my staff engineer / architect.
- **Base44** is my design system and scaffolder.
- **Claude Code** is my senior implementer and refactorer.
- **I** am the orchestrator — defining intent, sequencing the tools, reviewing every output, integrating across them, and shipping.

The skill is not in writing prompts. The skill is in **knowing which AI to hand which problem to**, in what order, with what context, and how to integrate their outputs into one coherent codebase. That is what an AI-native builder does, and that is what this repo is evidence of.

If you can do this across one codebase, you can do it across any codebase. **The leverage is real.**

---

## Tech Stack

- **React 18** + **Vite** — modern, fast, hot-reload dev loop
- **Tailwind CSS** + custom brand tokens — utility-first styling discipline
- **React Router v6** — SPA routing with dynamic slug routes
- **Framer Motion** — entrance animations
- **Lucide React** — consistent icon system
- **localStorage** — zero-backend auth + favorites for the demo
- **Base44 SDK** — initial scaffold (still wired for forward compatibility)

---

## Running locally

```bash
git clone https://github.com/soohanur/orbito.git
cd orbito
npm install
npm run dev
```

Open http://localhost:5173. Try:
1. Click **Register** → create an account
2. Browse **Property** → click any listing → schedule a tour
3. Heart a few listings → visit **Profile** → see them saved
4. Click **Agents** → open any agent → submit contact form
5. Sign out → sign back in → favorites persist

> **Note on Rollup native dependency:** if `npm run dev` fails with a missing `@rollup/rollup-linux-x64-gnu` module, run `npm i @rollup/rollup-linux-x64-gnu --no-save` to patch a known npm optional-deps bug. This is an npm issue, not an Orbito issue.

---

## Project structure

```
src/
├── App.jsx                    # Routes + provider composition
├── components/
│   ├── Header.jsx             # Theme-aware nav, auth-aware avatar menu
│   ├── Footer.jsx
│   ├── Layout.jsx
│   └── ui/                    # Base44-scaffolded shadcn-style primitives
├── lib/
│   ├── ClientAuth.jsx         # localStorage auth (register/signIn/profile/favorites)
│   ├── propertiesData.js      # Single source of truth for listings
│   ├── agentsData.js          # Single source of truth for agents
│   └── AuthContext.jsx        # Base44 auth shell (kept for forward compat)
└── pages/
    ├── Home.jsx
    ├── Properties.jsx
    ├── PropertyDetail.jsx     # Dynamic per-listing page
    ├── Agents.jsx
    ├── AgentDetail.jsx        # Dynamic per-agent page
    ├── SignIn.jsx
    ├── Register.jsx
    ├── Profile.jsx
    ├── Join.jsx
    └── About.jsx
```

---

## What this proves

A single operator, using AI as a multi-specialist team, can ship a polished, multi-page, authenticated web product end-to-end. No design hire. No engineering hire. No copywriter. No template marketplace. Just **intent + AI orchestration + judgment**.

If you are looking for someone who can do the same for your product — that is what I do.

---

**Built by [@soohanur](https://github.com/soohanur)** · Orchestrated with ChatGPT, Claude, Base44, and Claude Code.
