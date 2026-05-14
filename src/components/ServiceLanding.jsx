import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ChevronDown, MapPin, Bed, Bath, Maximize2 } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";
import AnimatedImage from "@/components/AnimatedImage";
import { propertyListings, propertySlug, tagColors } from "@/lib/propertiesData";

/**
 * Generic service landing page (Buy / Sell / Rent).
 * All sections follow the existing theme tokens, container, and animation
 * conventions used by Properties / About / Join.
 */
export default function ServiceLanding({
  kicker,            // e.g. "Buy"
  titleA,            // first line of hero (animated)
  titleB,            // second line of hero (animated, faded)
  intro,             // paragraph under hero
  heroImage,         // dark hero background
  introImage,        // second-section image
  benefits = [],     // string[]
  steps = [],        // [{ title, body }]
  faqs = [],         // [{ q, a }]
  listingFilter,     // (p) => boolean - which propertyListings to show
  ctaTitle,
  ctaSubtitle,
  ctaButton = "Browse Listings",
}) {
  const [openFaq, setOpenFaq] = useState(null);
  const filtered = (listingFilter ? propertyListings.filter(listingFilter) : propertyListings).slice(0, 6);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div style={{ background: "#F1F1F1" }}>
      {/* Hero */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "56vh" }}>
        <AnimatedImage className="absolute inset-0">
          <img
            src={heroImage}
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.35)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(21,23,23,0.95) 0%, rgba(21,23,23,0.15) 60%, transparent 100%)" }} />
        </AnimatedImage>
        <div className="relative z-10 orbito-container pb-12 sm:pb-20 w-full">
          <AnimatedText as="span" className="text-xs tracking-[0.25em] uppercase font-medium block mb-5" style={{ color: "rgba(241,241,241,0.4)" }}>
            {kicker}
          </AnimatedText>
          <AnimatedText
            as="h1"
            splitWords
            delay={0.1}
            className="font-black tracking-tighter"
            style={{ fontSize: "clamp(40px, 6.5vw, 88px)", lineHeight: 0.95, color: "#F1F1F1", letterSpacing: "-0.04em" }}
          >
            {titleA}
          </AnimatedText>
          {titleB && (
            <AnimatedText
              as="h1"
              splitWords
              delay={0.25}
              className="font-black tracking-tighter"
              style={{ fontSize: "clamp(40px, 6.5vw, 88px)", lineHeight: 0.95, color: "rgba(241,241,241,0.4)", fontWeight: 300, letterSpacing: "-0.04em" }}
            >
              {titleB}
            </AnimatedText>
          )}
        </div>
      </section>

      {/* Intro */}
      <section style={{ paddingTop: "clamp(3rem, 9vw, 7rem)", paddingBottom: "clamp(3rem, 9vw, 7rem)" }}>
        <div className="orbito-container">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <p className="text-lg sm:text-xl leading-relaxed mb-8" style={{ color: "#383A3A" }}>
                {intro}
              </p>
              {benefits.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {benefits.map((b) => (
                    <div key={b} className="flex items-start gap-3" style={{ color: "#383A3A" }}>
                      <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "#151717" }} />
                      <span className="text-sm">{b}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="overflow-hidden" style={{ borderRadius: "1rem", aspectRatio: "4/3" }}>
              <img src={introImage} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Process steps */}
      {steps.length > 0 && (
        <section style={{ paddingTop: "clamp(3rem, 9vw, 7rem)", paddingBottom: "clamp(3rem, 9vw, 7rem)", background: "#151717", color: "#F1F1F1" }}>
          <div className="orbito-container">
            <h2 className="font-black tracking-tighter mb-12" style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 0.95, color: "#F1F1F1", letterSpacing: "-0.04em" }}>
              How it works
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((s, i) => (
                <div key={i} className="p-7 rounded-2xl" style={{ background: "rgba(241,241,241,0.04)", border: "1px solid rgba(241,241,241,0.08)" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono mb-5"
                    style={{ border: "1px solid rgba(241,241,241,0.3)", color: "#F1F1F1" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: "#F1F1F1" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(241,241,241,0.65)" }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured listings */}
      {filtered.length > 0 && (
        <section style={{ paddingTop: "clamp(3rem, 9vw, 7rem)", paddingBottom: "clamp(3rem, 9vw, 7rem)" }}>
          <div className="orbito-container">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-black tracking-tighter" style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "#151717", letterSpacing: "-0.03em" }}>
                Featured listings
              </h2>
              <Link to="/Properties" className="text-xs font-semibold tracking-widest uppercase underline" style={{ color: "#151717" }}>
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filtered.map((p) => {
                const slug = propertySlug(p);
                return (
                  <Link key={slug} to={`/Properties/${slug}`} className="block">
                    <div className="group overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
                      style={{ background: "#fff", borderRadius: "1rem", border: "1px solid rgba(21,23,23,0.06)" }}>
                      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                        <img src={p.image} alt={p.neighborhood} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute top-3 left-3">
                          <span className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-md"
                            style={{ background: tagColors[p.tag]?.bg, color: tagColors[p.tag]?.text, fontSize: "10px" }}>
                            {p.tag}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h3 className="font-bold text-base tracking-tight" style={{ color: "#151717" }}>{p.neighborhood}</h3>
                            <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: "#B3B3B3" }}>
                              <MapPin className="h-2.5 w-2.5" />{p.address}
                            </p>
                          </div>
                          <span className="font-black text-base" style={{ color: "#151717" }}>{p.price}</span>
                        </div>
                        <div className="flex gap-3 text-xs tracking-wider uppercase mt-3 pt-3" style={{ borderTop: "1px solid rgba(21,23,23,0.07)", color: "#B3B3B3" }}>
                          {p.beds > 0 && <span className="flex items-center gap-1"><Bed className="h-3 w-3" />{p.beds}</span>}
                          <span className="flex items-center gap-1"><Bath className="h-3 w-3" />{p.baths}</span>
                          <span className="flex items-center gap-1"><Maximize2 className="h-3 w-3" />{p.area}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section style={{ paddingTop: "clamp(3rem, 9vw, 7rem)", paddingBottom: "clamp(3rem, 9vw, 7rem)", background: "#f5f4f0" }}>
          <div className="orbito-container">
            <h2 className="font-black tracking-tighter mb-10" style={{ fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 0.95, color: "#151717", letterSpacing: "-0.04em" }}>
              Common questions
            </h2>
            <div className="max-w-3xl">
              {faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <button
                    key={i}
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full text-left py-5 flex items-start justify-between gap-6 transition-colors"
                    style={{ borderTop: i === 0 ? "1px solid rgba(21,23,23,0.1)" : "none", borderBottom: "1px solid rgba(21,23,23,0.1)" }}
                  >
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg" style={{ color: "#151717" }}>{f.q}</h3>
                      {open && (
                        <p className="text-sm leading-relaxed mt-3 font-light" style={{ color: "#383A3A" }}>{f.a}</p>
                      )}
                    </div>
                    <ChevronDown className="h-4 w-4 mt-1 shrink-0 transition-transform" style={{ color: "#151717", transform: open ? "rotate(180deg)" : "none" }} />
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(3rem, 10vw, 8rem)", paddingBottom: "clamp(3rem, 10vw, 8rem)", background: "#151717" }}>
        <div className="orbito-container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h2 className="font-black tracking-tighter" style={{ fontSize: "clamp(32px, 5vw, 64px)", lineHeight: 0.95, color: "#F1F1F1", letterSpacing: "-0.04em" }}>
                {ctaTitle}
              </h2>
              {ctaSubtitle && (
                <p className="font-light mt-4" style={{ color: "rgba(241,241,241,0.55)", maxWidth: "520px" }}>
                  {ctaSubtitle}
                </p>
              )}
            </div>
            <Link to="/Properties">
              <button className="group shrink-0 inline-flex items-center gap-3 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-400 hover:-translate-y-0.5 px-10 py-5"
                style={{ background: "#F1F1F1", color: "#151717" }}>
                {ctaButton}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
