import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";
import AnimatedImage from "@/components/AnimatedImage";
import { services } from "@/lib/servicesData";

export default function Services() {
  return (
    <div style={{ background: "#F1F1F1" }}>
      {/* Hero */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "56vh" }}>
        <AnimatedImage className="absolute inset-0">
          <img
            src="/images/d2176ce77-fresh-boot-3c0a0dc212-be1949c06cb7.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.35)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(21,23,23,0.95) 0%, rgba(21,23,23,0.15) 60%, transparent 100%)" }} />
        </AnimatedImage>
        <div className="relative z-10 orbito-container pb-12 sm:pb-20 w-full">
          <AnimatedText as="span" className="text-xs tracking-[0.25em] uppercase font-medium block mb-5" style={{ color: "rgba(241,241,241,0.4)" }}>
            Services
          </AnimatedText>
          <AnimatedText
            as="h1"
            splitWords
            delay={0.1}
            className="font-black tracking-tighter"
            style={{ fontSize: "clamp(40px, 6.5vw, 88px)", lineHeight: 0.95, color: "#F1F1F1", letterSpacing: "-0.04em" }}
          >
            Support Beyond
          </AnimatedText>
          <AnimatedText
            as="h1"
            splitWords
            delay={0.25}
            className="font-black tracking-tighter"
            style={{ fontSize: "clamp(40px, 6.5vw, 88px)", lineHeight: 0.95, color: "rgba(241,241,241,0.4)", fontWeight: 300, letterSpacing: "-0.04em" }}
          >
            Buying and Selling.
          </AnimatedText>
        </div>
      </section>

      {/* Intro */}
      <section style={{ paddingTop: "clamp(3rem, 9vw, 7rem)", paddingBottom: "clamp(2rem, 5vw, 3rem)" }}>
        <div className="orbito-container">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <h2 className="font-black tracking-tighter" style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 0.95, color: "#151717", letterSpacing: "-0.03em" }}>
              Everything around the transaction, handled.
            </h2>
            <p className="text-lg font-light leading-relaxed" style={{ color: "#383A3A" }}>
              Buying or selling is the visible part. The work that actually decides whether a deal pays off lives on either side of the closing table. Three teams sit here so you do not have to chase them yourself.
            </p>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section style={{ paddingTop: "clamp(2rem, 5vw, 3rem)", paddingBottom: "clamp(3rem, 9vw, 7rem)" }}>
        <div className="orbito-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link key={s.slug} to={`/Services/${s.slug}`} className="block">
                <div className="group relative overflow-hidden flex flex-col justify-end hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
                  style={{ borderRadius: "1.5rem", height: "440px", border: "1px solid rgba(21,23,23,0.08)" }}>
                  <div className="absolute inset-0">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #151717 0%, rgba(21,23,23,0.45) 55%, transparent 100%)" }} />
                  </div>
                  <div className="relative z-10 p-8">
                    <span className="text-xs tracking-[0.22em] uppercase font-bold block mb-3" style={{ color: "rgba(241,241,241,0.6)" }}>{s.kicker}</span>
                    <h3 className="font-bold text-2xl mb-3 leading-tight" style={{ color: "#F1F1F1" }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed mb-6 font-light" style={{ color: "rgba(241,241,241,0.7)" }}>{s.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase" style={{ color: "#F1F1F1" }}>
                      Learn More <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
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
              Not sure which one<br /><span style={{ color: "rgba(241,241,241,0.35)", fontWeight: 300 }}>fits your situation?</span>
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
