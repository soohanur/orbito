import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import AnimatedText from "@/components/AnimatedText";
import AnimatedImage from "@/components/AnimatedImage";

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

const benefits = [
  "Real equity in the company you help build",
  "Certified agent training and ongoing support",
  "Access to exclusive listing networks",
  "Dedicated marketing and brand resources",
  "Five-star client experience systems",
  "Leadership track and growth pathways",
];

const stats = [
  { value: "10,000+", label: "Transactions Closed" },
  { value: "5★", label: "Average Agent Rating" },
  { value: "NYC + Philly", label: "Markets Covered" },
  { value: "Equity", label: "For Top Performers" },
];

export default function Join() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const staticFallback = [
    { quote: "Michael was a great realtor. Such a hard worker, dedicated to helping us find the perfect neighborhood, price point and home. Tireless and dedicated. Would recommend him 100%!", author: "Bernadette Hogan", location: "New York, NY" },
    { quote: "Shirin was truly a blessing to work with. She helped us find our perfect condo in a great area. She was patient and very understanding.", author: "Tyleen", location: "Brooklyn, NY" },
    { quote: "Working with Mathew was an absolute pleasure, and I highly recommend him to any serious homebuyer. Thank you, Mathew, for making this happen!", author: "Johanna Nieto", location: "Queens, NY" },
  ];

  useEffect(() => {
    base44.entities.Testimonial.list()
      .then(setTestimonials)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const items = testimonials.length > 0 ? testimonials : staticFallback;

  return (
    <div style={{ background: "#F1F1F1" }}>
      {/* Hero - mirrors Properties hero pattern */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "56vh" }}>
        <AnimatedImage className="absolute inset-0">
          <img
            src="/images/7d130d024-findrealestate-com-1f6-e4c983d93a08.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.35)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(21,23,23,0.95) 0%, rgba(21,23,23,0.15) 60%, transparent 100%)" }} />
        </AnimatedImage>
        <div className="relative z-10 orbito-container pb-12 sm:pb-20 w-full">
          <AnimatedText as="span" className="text-xs tracking-[0.25em] uppercase font-medium block mb-5" style={{ color: "rgba(241,241,241,0.4)" }}>
            For Agents
          </AnimatedText>
          <AnimatedText
            as="h1"
            splitWords
            delay={0.1}
            className="font-black tracking-tighter"
            style={{ fontSize: "clamp(40px, 6.5vw, 88px)", lineHeight: 0.95, color: "#F1F1F1", letterSpacing: "-0.04em" }}
          >
            Don't Rent Your Career.
          </AnimatedText>
          <AnimatedText
            as="h1"
            splitWords
            delay={0.25}
            className="font-black tracking-tighter"
            style={{ fontSize: "clamp(40px, 6.5vw, 88px)", lineHeight: 0.95, color: "rgba(241,241,241,0.4)", fontWeight: 300, letterSpacing: "-0.04em" }}
          >
            Own It.
          </AnimatedText>
        </div>
      </section>

      {/* Intro */}
      <AnimatedElement>
        <section style={{ paddingTop: "clamp(3rem, 8vw, 6rem)", paddingBottom: "clamp(3rem, 8vw, 6rem)" }}>
          <div className="orbito-container">
            <div className="grid sm:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-lg sm:text-xl leading-relaxed mb-8" style={{ color: "#383A3A" }}>
                  At ORBITO, our agents don't just work for the brand - they own a part of it.{" "}
                  <span style={{ color: "#151717", fontWeight: 600 }}>We give top performers real equity, so they're invested in more than just your transaction - they're invested in your outcome.</span>
                </p>
                <p className="text-base leading-relaxed mb-10" style={{ color: "#383A3A" }}>
                  Agents are certified, supported, and equipped to deliver five-star service - because their success is tied to yours. You're not just here to close deals - you're building a career, a life, a legacy.
                </p>
                <button
                  className="group inline-flex items-center gap-3 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg px-8 py-4"
                  style={{ background: "#151717", color: "#F1F1F1" }}
                >
                  Join The Movement
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="overflow-hidden" style={{ borderRadius: "0.75rem" }}>
                <img
                  src="/join%20page.jpeg"
                  alt=""
                  className="w-full object-cover hover:scale-[1.02] transition-transform duration-700"
                  style={{ aspectRatio: "4/3" }}
                />
              </div>
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Stats */}
      <AnimatedElement>
        <section style={{ paddingTop: "4rem", paddingBottom: "4rem", background: "#151717", color: "#F1F1F1" }}>
          <div className="orbito-container">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-black text-4xl sm:text-5xl mb-2 tracking-tight" style={{ color: "#F1F1F1" }}>{s.value}</div>
                  <div className="text-xs tracking-widest uppercase" style={{ color: "rgba(241,241,241,0.45)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Benefits */}
      <AnimatedElement>
        <section style={{ paddingTop: "clamp(3rem, 8vw, 6rem)", paddingBottom: "clamp(3rem, 8vw, 6rem)", background: "#f5f4f0" }}>
          <div className="orbito-container">
            <div className="grid sm:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-black tracking-tighter mb-12" style={{ fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 0.93, color: "#151717", letterSpacing: "-0.04em" }}>
                  We give you the tools to thrive,{" "}
                  <span style={{ color: "#B3B3B3", fontWeight: 300 }}>not just survive.</span>
                </h2>
                <div className="space-y-3">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-4 py-4" style={{ borderBottom: "1px solid rgba(21,23,23,0.1)" }}>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "#151717" }}>
                        <Check className="h-3 w-3" style={{ color: "#F1F1F1" }} />
                      </div>
                      <span className="text-base font-medium" style={{ color: "#151717" }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden" style={{ borderRadius: "0.75rem", aspectRatio: "3/4" }}>
                <img
                  src="/images/857365a27-findrealestate-com-152-1bb768b0da88.jpg"
                  alt=""
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* Testimonials */}
      <AnimatedElement>
        <section style={{ paddingTop: "clamp(3rem, 8vw, 6rem)", paddingBottom: "clamp(3rem, 8vw, 6rem)", background: "#F1F1F1" }}>
          <div className="orbito-container">
            <h2 className="font-black tracking-tighter mb-14" style={{ fontSize: "clamp(40px, 5vw, 68px)", lineHeight: 0.93, color: "#151717", letterSpacing: "-0.04em" }}>
              What Our Clients<br /><span style={{ color: "#B3B3B3", fontWeight: 300 }}>Are Saying.</span>
            </h2>
            <div className={`grid sm:grid-cols-3 gap-6 transition-opacity duration-500 ${loading ? "opacity-30" : "opacity-100"}`}>
              {items.slice(0, 3).map((t, i) => (
                <AnimatedElement key={i} delay={i * 100}>
                  <div className="p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-500" style={{ background: "#fff", borderRadius: "0.75rem" }}>
                    <p className="text-base leading-relaxed italic mb-6" style={{ color: "#151717" }}>"{t.quote}"</p>
                    <div style={{ borderTop: "1px solid rgba(21,23,23,0.1)", paddingTop: "1rem" }}>
                      <span className="font-semibold text-sm block" style={{ color: "#151717" }}>{t.author}</span>
                      {t.location && <span className="text-xs" style={{ color: "#B3B3B3" }}>{t.location}</span>}
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>
      </AnimatedElement>

      {/* CTA */}
      <section className="relative overflow-hidden" style={{ paddingTop: "clamp(3rem, 10vw, 8rem)", paddingBottom: "clamp(3rem, 10vw, 8rem)", background: "#151717" }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(241,241,241,0.04)" }} />
        <div className="orbito-container relative z-10">
          <AnimatedElement>
            <h2 className="font-black tracking-tighter mb-10" style={{ fontSize: "clamp(44px, 6vw, 82px)", lineHeight: 0.93, color: "#F1F1F1", letterSpacing: "-0.04em" }}>
              Ready to Own<br />Your Career?
            </h2>
            <button
              className="group inline-flex items-center gap-3 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-500 hover:-translate-y-0.5 px-10 py-5"
              style={{ background: "#F1F1F1", color: "#151717" }}
            >
              Join The Movement
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </AnimatedElement>
        </div>
      </section>
    </div>
  );
}