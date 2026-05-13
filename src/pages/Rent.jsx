import ServiceLanding from "@/components/ServiceLanding";

export default function Rent() {
  return (
    <ServiceLanding
      kicker="Rent"
      titleA="Find Your"
      titleB="Next Lease."
      intro="Access hidden rentals before they hit the market through agents who know every landlord in town. Decades of NYC experience, no-fee options, and tenant-side negotiation — built for renters who actually want help."
      heroImage="/images/2b4b2f5a9-findrealestate-com-ren-5ea1ad3acb4c.jpg"
      introImage="/images/photo-1502672260266-1c1ef2d93688-75b8beaea48a.jpg"
      benefits={[
        "Off-market listings via direct landlord relationships",
        "No-fee apartment options curated weekly",
        "Application coaching for competitive markets",
        "Tenant-side negotiation on rent + concessions",
        "Lease review before you sign",
        "Move-in coordination with building management",
      ]}
      steps={[
        { title: "Brief", body: "Tell your agent your budget, move date, and non-negotiables. They build a shortlist." },
        { title: "Tour", body: "Back-to-back showings across neighborhoods — public, off-market, and direct-to-landlord." },
        { title: "Apply", body: "Paperwork done right the first time: pay stubs, references, guarantor if needed." },
        { title: "Negotiate", body: "Rent, concessions, lease length — we push on every lever the market gives." },
        { title: "Sign", body: "Lease reviewed line by line so you know exactly what you're agreeing to." },
        { title: "Move in", body: "Walk-through, key handoff, building intro. Done." },
      ]}
      faqs={[
        { q: "Are there no-fee rentals?", a: "Yes. We maintain a live list of no-fee buildings and landlord-paid listings across NYC. Ask your agent to filter for them." },
        { q: "What documents will I need?", a: "Generally: photo ID, last 2 pay stubs, recent tax return, 2 months of bank statements, references, and a guarantor form if your income is under 40x rent." },
        { q: "How fast can I move in?", a: "If you have docs ready, applications approve in 1–3 business days. Move-in typically within 1–2 weeks of approval." },
        { q: "Do you handle short-term rentals?", a: "We focus on 12+ month leases. For corporate or short-term housing we'll refer you to a vetted partner." },
      ]}
      listingFilter={(p) => p.type === "Rent"}
      ctaTitle={<>Ready to find<br /><span style={{ color: "rgba(241,241,241,0.35)", fontWeight: 300 }}>your next place?</span></>}
      ctaSubtitle="Tell us your budget and neighborhood. We'll send a curated shortlist within 24 hours."
      ctaButton="Browse Rentals"
    />
  );
}
