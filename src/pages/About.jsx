import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedText from "@/components/AnimatedText";

const AnimatedElement = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setIsVisible(true); return; }
    const fallback = setTimeout(() => setIsVisible(true), 800 + delay);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { clearTimeout(fallback); setTimeout(() => setIsVisible(true), delay); observer.unobserve(el); }
    }, { threshold: 0.05, rootMargin: "0px 0px 200px 0px" });
    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, [delay]);
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className || ""}`}>
      {children}
    </div>
  );
};

const values = [
  { label: "Transparency", body: "We believe real estate should feel human. No hidden agendas — just honest guidance at every step." },
  { label: "Ownership", body: "Our agents are equity holders. Their commitment to your outcome is personal, not transactional." },
  { label: "Excellence", body: "From the first showing to the final signature, we hold ourselves to a five-star standard." },
  { label: "Community", body: "We serve New York and Philadelphia as neighbors — invested in the places we help you call home." },
];

const stats = [
  { value: "10,000+", label: "Transactions Closed" },
  { value: "1,000+", label: "Certified Agents" },
  { value: "2", label: "Markets: NYC & Philly" },
  { value: "15+", label: "Years in Business" },
];

export default function About() {
  return (
    <div style={{ background: "#F1F1F1", minHeight: "100vh" }}>

      {/* Hero */}
      <section style={{ paddingTop: "9rem", paddingBottom: "6rem" }}>
        <div className="orbito-container">
          <div>
            <AnimatedText as="span" className="text-xs tracking-[0.22em] uppercase font-bold block mb-6" style={{ color: "#B3B3B3" }}>
              About Orbito
            </AnimatedText>
            <AnimatedText
              as="h1"
              splitWords
              delay={0.05}
              className="font-black tracking-tighter mb-2"
              style={{ fontSize: "clamp(52px, 8vw, 110px)", lineHeight: 0.93, color: "#151717", letterSpacing: "-0.05em", maxWidth: "900px" }}
            >
              Real Estate,
            </AnimatedText>
            <AnimatedText
              as="h1"
              splitWords
              delay={0.25}
              className="font-black tracking-tighter mb-8"
              style={{ fontSize: "clamp(52px, 8vw, 110px)", lineHeight: 0.93, color: "#B3B3B3", fontWeight: 300, letterSpacing: "-0.05em", maxWidth: "900px" }}
            >
              Rewired.
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.4}
              className="font-light leading-relaxed"
              style={{ fontSize: "clamp(18px, 2vw, 26px)", color: "#383A3A", maxWidth: "680px" }}
            >
              Orbito is a premier real estate brokerage headquartered in New York City, with offices in Philadelphia. We specialize in buying, selling, and renting residential and commercial properties — guided by a belief that every move matters.
            </AnimatedText>
          </div>
        </div>
      </section>

      {/* Full-width image */}
      <AnimatedElement>
        <div className="orbito-container mb-24">
          <div className="w-full overflow-hidden" style={{ borderRadius: "1.5rem", maxHeight: "560px" }}>
            <img
              src="/croped.jpg"
              alt="Orbito"
              className="w-full object-cover hover:scale-105 transition-transform duration-[18s] ease-out"
              style={{ objectPosition: "center", height: "560px" }}
            />
          </div>
        </div>
      </AnimatedElement>

      {/* Our story */}
      <AnimatedElement>
        <section style={{ paddingBottom: "7rem" }}>
          <div className="orbito-container">
            <div className="grid md:grid-cols-2 gap-16 md:gap-28 items-start">
              <div>
                <h2 className="font-black tracking-tighter mb-10" style={{ fontSize: "clamp(36px, 4.5vw, 62px)", lineHeight: 0.93, color: "#151717", letterSpacing: "-0.04em" }}>
                  Our Story
                </h2>
              </div>
              <div>
                <p className="font-light leading-relaxed mb-6" style={{ fontSize: "17px", color: "#383A3A" }}>
                  Orbito was founded on a simple but powerful idea: that real estate should work for the people who live it — both clients and agents. We built a brokerage where agents are partners, not just producers, and where clients receive the kind of attention that comes from people genuinely invested in their outcome.
                </p>
                <p className="font-light leading-relaxed mb-6" style={{ fontSize: "17px", color: "#383A3A" }}>
                  Over the years, we've grown from a small team in Midtown Manhattan into one of the region's most trusted names in residential and commercial real estate. We've closed more than 10,000 transactions across New York City and Philadelphia — and we're just getting started.
                </p>
                <p className="font-light leading-relaxed" style={{ fontSize: "17px", color: "#383A3A" }}>
                  Today, Orbito represents a movement: a new way of thinking about property, career, and community. Our certified agents are trained, supported, and empowered to deliver five-star results — every time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Stats */}
      <AnimatedElement>
        <section style={{ background: "#151717", paddingTop: "5rem", paddingBottom: "5rem" }}>
          <div className="orbito-container">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-black text-4xl sm:text-5xl mb-3 tracking-tighter" style={{ color: "#F1F1F1" }}>{s.value}</div>
                  <div className="text-xs tracking-widest uppercase" style={{ color: "rgba(241,241,241,0.4)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Values */}
      <AnimatedElement>
        <section style={{ paddingTop: "7rem", paddingBottom: "7rem", background: "#F1F1F1" }}>
          <div className="orbito-container">
            <h2 className="font-black tracking-tighter mb-16" style={{ fontSize: "clamp(40px, 5vw, 68px)", lineHeight: 0.93, color: "#151717", letterSpacing: "-0.04em" }}>
              What We<br /><span style={{ color: "#B3B3B3", fontWeight: 300 }}>Stand For</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <AnimatedElement key={i} delay={i * 100}>
                  <div className="p-8 h-full" style={{ background: "#fff", borderRadius: "1rem", border: "1px solid rgba(21,23,23,0.07)" }}>
                    <span className="font-bold text-xl block mb-4" style={{ color: "#151717" }}>{v.label}</span>
                    <p className="font-light text-sm leading-relaxed" style={{ color: "#383A3A" }}>{v.body}</p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Team image */}
      <AnimatedElement>
        <div className="orbito-container mb-24">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="overflow-hidden" style={{ borderRadius: "1rem", aspectRatio: "4/3" }}>
              <img src="/about3.webp" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="overflow-hidden" style={{ borderRadius: "1rem", aspectRatio: "4/3" }}>
              <img src="/about4.jpeg" alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </AnimatedElement>

      {/* CTA */}
      <section style={{ background: "#151717", paddingTop: "7rem", paddingBottom: "7rem" }}>
        <div className="orbito-container">
          <AnimatedElement>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
              <h2 className="font-black tracking-tighter" style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 0.93, color: "#F1F1F1", letterSpacing: "-0.04em" }}>
                Ready to find<br /><span style={{ color: "rgba(241,241,241,0.35)", fontWeight: 300 }}>what moves you?</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/Properties">
                  <button className="group inline-flex items-center gap-3 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-400 hover:-translate-y-0.5 px-8 py-4" style={{ background: "#F1F1F1", color: "#151717" }}>
                    Search Properties <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link to="/Join">
                  <button className="group inline-flex items-center gap-3 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-400 hover:-translate-y-0.5 px-8 py-4" style={{ border: "1px solid rgba(241,241,241,0.35)", color: "#F1F1F1" }}>
                    Join as Agent <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </div>
  );
}