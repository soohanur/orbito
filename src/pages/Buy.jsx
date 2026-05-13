import ServiceLanding from "@/components/ServiceLanding";

export default function Buy() {
  return (
    <ServiceLanding
      kicker="Buy"
      titleA="Buy Smarter,"
      titleB="Close Faster."
      intro="From first showing to closing day, Orbito agents bring data, discipline, and direct lines to vetted mortgage, legal, and appraisal partners — so you make a stronger offer with less guesswork."
      heroImage="/images/5abf9e628-findrealestate-com-buy-4c228619891a.jpg"
      introImage="/images/photo-1600585154340-be6161a56a0c-4b4238334759.jpg"
      benefits={[
        "Pre-approval guidance from in-house mortgage partners",
        "Off-market listings before they hit public portals",
        "Hard-numbers comparables on every offer",
        "Negotiation specialists at every step",
        "Vetted inspectors, attorneys, and appraisers",
        "Closing-day coordination, end to end",
      ]}
      steps={[
        { title: "Discover", body: "Define budget, neighborhood, and must-haves with an agent who knows the inventory cold." },
        { title: "Tour", body: "Curated showings — public and off-market — calibrated to what you actually want." },
        { title: "Offer", body: "Sharp pricing strategy and clean contract terms designed to win." },
        { title: "Diligence", body: "Inspection, appraisal, and title — orchestrated by our partners, on time." },
        { title: "Finance", body: "Lock the right loan structure with a partner who's done this thousands of times." },
        { title: "Close", body: "Sign, fund, and pick up your keys. We're there at the table." },
      ]}
      faqs={[
        { q: "Do I need pre-approval before I tour?", a: "Strongly recommended. It clarifies your budget and tells sellers you're a serious buyer. We'll connect you with a partner lender at no obligation." },
        { q: "How fast can I close?", a: "Cash deals can close in 14 days. Financed deals typically run 30–45 days depending on lender and appraisal." },
        { q: "What fees do I pay?", a: "Most NYC buyers pay roughly 4–6% of purchase price in closing costs (taxes, title, mortgage, attorney). Your agent will give you a line-itemized estimate up front." },
        { q: "Can I see off-market listings?", a: "Yes. Many of our best opportunities never hit Zillow — that's the value of working with a connected brokerage." },
      ]}
      listingFilter={(p) => p.type === "Buy"}
      ctaTitle={<>Find what's<br /><span style={{ color: "rgba(241,241,241,0.35)", fontWeight: 300 }}>worth buying.</span></>}
      ctaSubtitle="Browse current sale listings or talk to an agent about something specific."
      ctaButton="Browse Sale Listings"
    />
  );
}
