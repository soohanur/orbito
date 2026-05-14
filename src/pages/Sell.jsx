import ServiceLanding from "@/components/ServiceLanding";

export default function Sell() {
  return (
    <ServiceLanding
      kicker="Sell"
      titleA="Sell Fast,"
      titleB="Sell High."
      intro="Pro staging, strategic pricing, constant open houses, and agents who don't stop working until the right buyer signs. We don't list and wait - we list and work."
      heroImage="/images/fcca5e9fd-findrealestate-com-sel-e187393c02ac.jpg"
      introImage="/images/photo-1600596542815-ffad4c1539a9-2757c5a980b6.jpg"
      benefits={[
        "Comparable-driven pricing strategy",
        "Pro photography, staging, and floor plans",
        "Multi-channel marketing across listings + paid",
        "Brokerage-wide buyer network on day one",
        "Weekly performance and traffic reporting",
        "Negotiation specialists protecting your number",
      ]}
      steps={[
        { title: "Value", body: "Free pricing analysis grounded in your block's last 12 months of comps." },
        { title: "Prep", body: "Staging, repairs, and a punch list - we tell you exactly what moves the needle." },
        { title: "Launch", body: "Photos, floor plans, video, and a coordinated marketing push from day one." },
        { title: "Show", body: "Open houses + private tours run by agents who can answer every buyer question." },
        { title: "Negotiate", body: "We pressure-test every offer and push for clean terms, not just headline price." },
        { title: "Close", body: "Inspection, attorney, lender - we keep all parties on schedule to your closing date." },
      ]}
      faqs={[
        { q: "What's my home worth?", a: "We'll run a no-obligation Comparative Market Analysis on your address - typically within 48 hours of your request." },
        { q: "How long do homes take to sell?", a: "Properly priced listings in our markets average 35–55 days on market. Aggressive pricing + great prep can cut that in half." },
        { q: "What fees come out of my proceeds?", a: "Standard commission, attorney fees, transfer taxes, and any seller concessions. Your agent will model your net at every offer." },
        { q: "Should I sell before I buy?", a: "Depends on liquidity and contingencies. We help clients model both paths and pick the lower-risk one." },
      ]}
      listingFilter={(p) => p.type === "Buy"}
      ctaTitle={<>Ready to list<br /><span style={{ color: "rgba(241,241,241,0.35)", fontWeight: 300 }}>your place?</span></>}
      ctaSubtitle="Request a free pricing analysis and a marketing plan tailored to your block."
      ctaButton="Talk to a Listing Agent"
    />
  );
}
