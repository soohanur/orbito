import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";
import AnimatedImage from "@/components/AnimatedImage";
import { services, findServiceBySlug } from "@/lib/servicesData";

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = findServiceBySlug(slug);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!service) {
    return (
      <div className="orbito-container py-40 text-center" style={{ background: "#F1F1F1" }}>
        <h1 className="font-black text-4xl mb-4" style={{ color: "#151717" }}>Service not found</h1>
        <Link to="/Services" className="underline text-sm font-semibold tracking-widest uppercase" style={{ color: "#151717" }}>
          Back to services
        </Link>
      </div>
    );
  }

  const others = services.filter((s) => s.slug !== slug);

  return (
    <div style={{ background: "#F1F1F1" }}>
      {/* Back bar */}
      <div className="pt-24 pb-2">
        <div className="orbito-container">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase"
            style={{ color: "#383A3A" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "56vh" }}>
        <AnimatedImage className="absolute inset-0">
          <img
            src={service.image}
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.35)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(21,23,23,0.95) 0%, rgba(21,23,23,0.15) 60%, transparent 100%)" }} />
        </AnimatedImage>
        <div className="relative z-10 orbito-container pb-12 sm:pb-20 w-full">
          <AnimatedText as="span" className="text-xs tracking-[0.25em] uppercase font-medium block mb-5" style={{ color: "rgba(241,241,241,0.4)" }}>
            {service.kicker}
          </AnimatedText>
          <AnimatedText
            as="h1"
            splitWords
            delay={0.1}
            className="font-black tracking-tighter"
            style={{ fontSize: "clamp(40px, 6.5vw, 88px)", lineHeight: 0.95, color: "#F1F1F1", letterSpacing: "-0.04em" }}
          >
            {service.title}
          </AnimatedText>
        </div>
      </section>

      {/* Intro */}
      <section style={{ paddingTop: "clamp(3rem, 9vw, 7rem)", paddingBottom: "clamp(3rem, 9vw, 7rem)" }}>
        <div className="orbito-container">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <h2 className="font-black tracking-tighter mb-6" style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 0.95, color: "#151717", letterSpacing: "-0.03em" }}>
                {service.tagline}
              </h2>
              <p className="text-lg font-light leading-relaxed mb-8" style={{ color: "#383A3A" }}>
                {service.intro}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3" style={{ color: "#383A3A" }}>
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "#151717" }} />
                    <span className="text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden" style={{ borderRadius: "1rem", aspectRatio: "4/3" }}>
              <img src={service.image} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section style={{ paddingTop: "clamp(3rem, 9vw, 7rem)", paddingBottom: "clamp(3rem, 9vw, 7rem)", background: "#151717", color: "#F1F1F1" }}>
        <div className="orbito-container">
          <h2 className="font-black tracking-tighter mb-12" style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 0.95, color: "#F1F1F1", letterSpacing: "-0.04em" }}>
            How it works
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.steps.map((s, i) => (
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

      {/* FAQ */}
      <section style={{ paddingTop: "clamp(3rem, 9vw, 7rem)", paddingBottom: "clamp(3rem, 9vw, 7rem)", background: "#f5f4f0" }}>
        <div className="orbito-container">
          <h2 className="font-black tracking-tighter mb-10" style={{ fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 0.95, color: "#151717", letterSpacing: "-0.04em" }}>
            Common questions
          </h2>
          <div className="max-w-3xl">
            {service.faqs.map((f, i) => {
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

      {/* Other services */}
      <section style={{ paddingTop: "clamp(3rem, 9vw, 7rem)", paddingBottom: "clamp(3rem, 9vw, 7rem)" }}>
        <div className="orbito-container">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-black tracking-tighter" style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "#151717", letterSpacing: "-0.03em" }}>
              Other services
            </h2>
            <Link to="/Services" className="text-xs font-semibold tracking-widest uppercase underline" style={{ color: "#151717" }}>
              All services
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {others.map((s) => (
              <Link key={s.slug} to={`/Services/${s.slug}`} className="block">
                <div className="group relative overflow-hidden flex flex-col justify-end hover:-translate-y-2 hover:shadow-xl transition-all duration-500"
                  style={{ borderRadius: "1.25rem", height: "320px", border: "1px solid rgba(21,23,23,0.08)" }}>
                  <div className="absolute inset-0">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #151717 0%, rgba(21,23,23,0.45) 55%, transparent 100%)" }} />
                  </div>
                  <div className="relative z-10 p-7">
                    <span className="text-xs tracking-[0.22em] uppercase font-bold block mb-2" style={{ color: "rgba(241,241,241,0.6)" }}>{s.kicker}</span>
                    <h3 className="font-bold text-xl leading-tight" style={{ color: "#F1F1F1" }}>{s.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="overflow-hidden" style={{ paddingTop: "clamp(3rem, 9vw, 7rem)", paddingBottom: "clamp(3rem, 9vw, 7rem)", background: "#151717" }}>
        <div className="orbito-container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <h2 className="font-black tracking-tighter" style={{ fontSize: "clamp(28px, 4.5vw, 60px)", lineHeight: 0.95, color: "#F1F1F1", letterSpacing: "-0.03em" }}>
              Ready to get<br /><span style={{ color: "rgba(241,241,241,0.35)", fontWeight: 300 }}>started?</span>
            </h2>
            <Link to="/Agents">
              <button className="inline-flex items-center gap-3 rounded-full text-sm font-semibold tracking-widest uppercase px-10 py-5"
                style={{ background: "#F1F1F1", color: "#151717" }}>
                Talk to an Agent <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
