import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Star, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { agents, badgeColors, agentSlug } from "@/lib/agentsData";
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

export default function Agents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const specialties = ["All", "Luxury", "Buyers", "Rentals", "Commercial", "Investment"];

  const filtered = agents.filter(agent => {
    const matchSearch = searchQuery === "" ||
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = activeFilter === "All" ||
      agent.specialty.toLowerCase().includes(activeFilter.toLowerCase()) ||
      agent.title.toLowerCase().includes(activeFilter.toLowerCase());
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ background: "#F1F1F1", minHeight: "100vh" }}>
      <section style={{ background: "#F1F1F1", paddingTop: "clamp(100px, 14vw, 160px)", paddingBottom: "3rem" }}>
        <div className="orbito-container">
          <AnimatedText
            as="h1"
            splitWords
            className="font-black tracking-tighter"
            style={{ fontSize: "clamp(48px, 10vw, 140px)", lineHeight: 0.9, color: "#151717", letterSpacing: "-0.05em" }}
          >
            Meet Our Agents.
          </AnimatedText>
          <AnimatedText
            as="p"
            delay={0.25}
            className="font-light mt-6"
            style={{ fontSize: "clamp(15px, 1.6vw, 18px)", color: "#383A3A", maxWidth: "420px" }}
          >
            Over 1,000 Agents Dedicated to Moving You Forward
          </AnimatedText>
        </div>
      </section>

      <section style={{ paddingTop: "clamp(1.5rem, 4vw, 2rem)", paddingBottom: "clamp(2.5rem, 8vw, 6rem)" }}>
        <div className="orbito-container">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-10">
            <div className="relative flex-shrink-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#B3B3B3" }} />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-11 pr-4 py-2.5 text-sm focus:outline-none rounded-full w-64"
                style={{ border: "1px solid rgba(21,23,23,0.15)", background: "#fff", color: "#151717" }}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {specialties.map(s => (
                <button
                  key={s}
                  data-no-flip="1"
                  onClick={() => setActiveFilter(s)}
                  className="px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-full"
                  style={activeFilter === s
                    ? { background: "#151717", color: "#F1F1F1" }
                    : { background: "transparent", border: "1px solid rgba(21,23,23,0.2)", color: "#383A3A" }
                  }
                >
                  {s}
                </button>
              ))}
            </div>
            <span className="text-xs tracking-widest uppercase ml-auto" style={{ color: "#B3B3B3" }}>{filtered.length} agents</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((agent, i) => (
              <AnimatedElement key={agent.name} delay={i * 45}>
                <Link to={`/Agents/${agentSlug(agent.name)}`} className="block">
                  <div
                    className="group cursor-pointer overflow-hidden hover:-translate-y-1 transition-all duration-500"
                    style={{
                      background: "#fff",
                      borderRadius: "1.25rem",
                      border: "1px solid rgba(21,23,23,0.06)",
                      boxShadow: "0 2px 20px rgba(21,23,23,0.04)",
                    }}
                  >
                    <div className="relative overflow-hidden" style={{ aspectRatio: "3/3.2" }}>
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3">
                        <span
                          className="text-xs font-semibold tracking-wider uppercase px-2.5 py-1"
                          style={{
                            background: badgeColors[agent.badge]?.bg || "#151717",
                            color: badgeColors[agent.badge]?.text || "#F1F1F1",
                            borderRadius: "6px",
                            fontSize: "10px",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {agent.badge}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-md" style={{ background: "rgba(21,23,23,0.75)", backdropFilter: "blur(8px)" }}>
                        <Star className="h-3 w-3" style={{ color: "#e8d97a", fill: "#e8d97a" }} />
                        <span className="text-xs font-semibold" style={{ color: "#F1F1F1" }}>{agent.rating}</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ background: "linear-gradient(to top, rgba(21,23,23,0.65) 0%, transparent 100%)" }} />
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-lg leading-tight mb-0.5" style={{ color: "#151717" }}>{agent.name}</h3>
                      <p className="text-sm font-medium mb-1" style={{ color: "#383A3A" }}>{agent.title}</p>
                      <p className="text-xs flex items-center gap-1 mb-3" style={{ color: "#B3B3B3" }}>
                        <MapPin className="h-3 w-3" />
                        {agent.location}
                      </p>
                      <p className="text-xs" style={{ color: "#B3B3B3" }}>{agent.specialty}</p>

                      <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid rgba(21,23,23,0.07)" }}>
                        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#151717" }}>{agent.deals} deals</span>
                        <div
                          className="flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-all duration-300 px-4 py-1.5 rounded-full"
                          style={{ background: "#151717", color: "#F1F1F1" }}
                        >
                          View
                          <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedElement>
            ))}
          </div>

          <div className="flex items-center justify-center gap-1 mt-16 flex-wrap">
            {[1, 2, 3, 4, "...", 38, 39, 40].map((page, i) => (
              <button
                key={i}
                data-no-flip="1"
                className="w-9 h-9 flex items-center justify-center text-xs font-semibold rounded-full transition-all duration-200"
                style={page === 1
                  ? { background: "#151717", color: "#F1F1F1" }
                  : { background: "transparent", border: "1px solid rgba(21,23,23,0.15)", color: page === "..." ? "#B3B3B3" : "#383A3A" }
                }
              >
                {page}
              </button>
            ))}
            <button
              data-no-flip="1"
              className="flex items-center gap-1.5 px-4 h-9 text-xs font-semibold tracking-widest uppercase rounded-full transition-all duration-200"
              style={{ border: "1px solid rgba(21,23,23,0.15)", color: "#383A3A" }}
            >
              Next <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
