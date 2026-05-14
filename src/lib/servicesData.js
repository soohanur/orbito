export const services = [
  {
    slug: "mortgage",
    title: "Mortgage Services",
    kicker: "Financing",
    tagline: "Lock the right loan, on the right terms, on the right day.",
    excerpt: "Helping you secure your dream home with flexible mortgage options.",
    image: "/images/b774f34cb-findrealestate-com-mor-a90fcee891c3.jpg",
    intro: "Most buyers lose 1 to 2 percent on price simply because their financing isn't ready when it matters. Our in-house mortgage partners pre-position your loan before you tour, so your offer arrives clean, fast, and credible.",
    benefits: [
      "Free 20 minute pre-qualification call",
      "Fixed and adjustable rate options modeled side by side",
      "Jumbo, conforming, FHA, and VA loans",
      "Locked rate windows aligned to your closing date",
      "In-house underwriters who answer the phone",
      "Refinance review every 12 months for life",
    ],
    steps: [
      { title: "Pre-qualify", body: "Soft credit pull, income review, and a real number you can shop with within 24 hours." },
      { title: "Compare", body: "Side by side rate, term, and closing cost models for every product you qualify for." },
      { title: "Pre-approve", body: "Underwritten approval letter, ready to go on offers the same day." },
      { title: "Lock", body: "Rate lock timed to your accepted offer and target close date." },
      { title: "Close", body: "Clear-to-close docs reviewed with you line by line. No surprises at the table." },
    ],
    faqs: [
      { q: "Does pre-qualification hurt my credit?", a: "No. The initial pull is a soft inquiry. A hard pull only happens once you formally apply for a specific loan." },
      { q: "How long is a rate lock good for?", a: "Typically 30 to 60 days. We match lock length to your expected closing window so you never pay for extension." },
      { q: "What credit score do I need?", a: "Conforming loans start at 620, FHA at 580, and our jumbo partners look at 700 plus. We will tell you exactly what your score qualifies for." },
    ],
  },
  {
    slug: "property-management",
    title: "Property Management",
    kicker: "Ownership Made Easy",
    tagline: "Own the building. Skip the headaches.",
    excerpt: "Let us handle the details so you can enjoy the rewards.",
    image: "/images/5e8fd2262-findrealestate-com-pro-dbc5c56b7560.jpg",
    intro: "We run buildings the way good owners would if they had the time. Tenant placement, rent collection, maintenance, compliance, and financial reporting. One monthly statement, no late-night plumber calls.",
    benefits: [
      "Tenant screening with full background and credit checks",
      "Rent collection with automated late fee enforcement",
      "24/7 maintenance hotline with vetted vendors",
      "Annual rent benchmarking against your block",
      "Year-end financial statement for your accountant",
      "Compliance tracking for inspections, registrations, and certificates",
    ],
    steps: [
      { title: "Onboard", body: "Walk-through, document handoff, vendor introductions. We mirror your existing leases and SOPs first, optimize later." },
      { title: "Lease up", body: "Pricing analysis, marketing, showings, and screening. Vacancy days minimized." },
      { title: "Operate", body: "Rent collection, maintenance dispatch, vendor management, owner reporting." },
      { title: "Optimize", body: "Annual rent benchmark, capex planning, and lease renewal strategy." },
    ],
    faqs: [
      { q: "What does this cost?", a: "Most owners pay 6 to 8 percent of collected rent plus a one-time lease-up fee. We will quote your exact building after a walk-through." },
      { q: "Do you handle short term rentals?", a: "We focus on 12+ month leases. For short term, we partner with a vetted operator and oversee the relationship for you." },
      { q: "Can I keep my existing vendors?", a: "Yes. We can run on your vendors, ours, or a hybrid. Your call." },
    ],
  },
  {
    slug: "construction-development",
    title: "Construction & Development",
    kicker: "Build and Develop",
    tagline: "From raw lot to certificate of occupancy.",
    excerpt: "Guiding you through building and developing properties with expert insight.",
    image: "/images/4ee46fcdc-findrealestate-com-dev-fb4fc37e4ec7.jpg",
    intro: "Development is a margin business. The deals that succeed are the ones where the right team got involved before the lot was acquired. We sit on your side from feasibility through stabilization.",
    benefits: [
      "Site feasibility and zoning analysis",
      "Architect and GC matchmaking, vetted by track record",
      "Construction loan structuring with partner lenders",
      "Monthly draw oversight and budget vs actual tracking",
      "Pre-leasing strategy starting at month 3",
      "Stabilization plan and refi exit modeled day one",
    ],
    steps: [
      { title: "Feasibility", body: "Zoning, FAR, comps, and pro forma. Go or no-go before you commit capital." },
      { title: "Team", body: "Architect, GC, expediter, attorney. Vetted, not introduced cold." },
      { title: "Permit and finance", body: "Construction loan structured, permits filed, draw schedule set." },
      { title: "Build", body: "Monthly site visits, draw reviews, change order discipline." },
      { title: "Lease and stabilize", body: "Pre-leasing kicks off pre-CO, rate target locked in." },
      { title: "Exit", body: "Refi to permanent debt or sale, whichever your model favors." },
    ],
    faqs: [
      { q: "What deal size do you work on?", a: "Anywhere from a single brownstone renovation up to mid-sized multifamily ground-ups. We are honest if a deal is outside our zone." },
      { q: "Do you take equity in the project?", a: "Sometimes. We work fee-based, equity-based, or hybrid. The structure follows the deal, not the other way around." },
      { q: "Can you only run one phase?", a: "Yes. Feasibility-only or owner's rep during construction are common engagements." },
    ],
  },
];

export const serviceSlug = (s) => s;

export const findServiceBySlug = (slug) =>
  services.find((s) => s.slug === slug);
