import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Search, Bed, Bath, Maximize2, MapPin, Heart, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { propertyListings, tagColors, propertySlug } from "@/lib/propertiesData";
import { useClientAuth } from "@/lib/ClientAuth";
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

const filters = ["All", "Buy", "Rent", "Commercial"];

export default function Properties() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const { user, toggleFavorite } = useClientAuth();
  const [guestSaved, setGuestSaved] = useState(new Set());

  const isSaved = (slug) =>
    user ? (user.favorites || []).includes(`property:${slug}`) : guestSaved.has(slug);

  const handleToggleSave = (slug) => {
    if (user) {
      toggleFavorite(`property:${slug}`);
    } else {
      setGuestSaved((prev) => {
        const next = new Set(prev);
        next.has(slug) ? next.delete(slug) : next.add(slug);
        return next;
      });
    }
  };

  const filtered = propertyListings
    .filter((p) => {
      const matchesFilter = activeFilter === "All" || p.type === activeFilter;
      const matchesSearch = searchQuery === "" ||
        p.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return a.daysOnMarket - b.daysOnMarket;
      if (sortBy === "price-asc") return parseFloat(a.price.replace(/[^0-9.]/g, "")) - parseFloat(b.price.replace(/[^0-9.]/g, ""));
      if (sortBy === "price-desc") return parseFloat(b.price.replace(/[^0-9.]/g, "")) - parseFloat(a.price.replace(/[^0-9.]/g, ""));
      return 0;
    });

  const featuredListings = filtered.filter(p => p.featured);
  const regularListings = filtered.filter(p => !p.featured);

  return (
    <div style={{ background: "#F1F1F1" }}>
      {/* Hero */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "56vh" }}>
        <AnimatedImage className="absolute inset-0">
          <img
            src="/images/photo-1486325212027-8081e485255e-2e21257bec98.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.35)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(21,23,23,0.95) 0%, rgba(21,23,23,0.15) 60%, transparent 100%)" }} />
        </AnimatedImage>
        <div className="relative z-10 orbito-container pb-20 w-full">
          <AnimatedText className="text-xs tracking-[0.25em] uppercase font-medium block mb-5" as="span" style={{ color: "rgba(241,241,241,0.4)" }}>
            Property
          </AnimatedText>
          <AnimatedText
            as="h1"
            splitWords
            delay={0.1}
            className="font-black tracking-tighter"
            style={{ fontSize: "clamp(44px, 6.5vw, 88px)", lineHeight: 0.93, color: "#F1F1F1", letterSpacing: "-0.04em" }}
          >
            Find Your Next Place.
          </AnimatedText>
        </div>
      </section>

      {/* Search + Filters */}
      <div style={{ position: "sticky", top: "0", zIndex: 30, background: "rgba(241,241,241,0.97)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(21,23,23,0.08)" }}>
        <div className="orbito-container py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#B3B3B3" }} />
              <input
                type="text"
                placeholder="Search address, neighborhood..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-black/20 transition-all rounded-full"
                style={{ border: "1px solid rgba(21,23,23,0.15)", color: "#151717", background: "#fff" }}
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-full"
                  style={activeFilter === f
                    ? { background: "#151717", color: "#F1F1F1" }
                    : { background: "transparent", border: "1px solid rgba(21,23,23,0.2)", color: "#383A3A" }
                  }
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="relative ml-auto">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-8 py-2.5 text-xs font-semibold tracking-wide rounded-full focus:outline-none cursor-pointer"
                style={{ border: "1px solid rgba(21,23,23,0.15)", color: "#383A3A", background: "#fff" }}
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 pointer-events-none" style={{ color: "#B3B3B3" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Listings */}
      <section style={{ paddingTop: "3.5rem", paddingBottom: "6rem" }}>
        <div className="orbito-container">
          {filtered.length === 0 ? (
            <div className="py-32 text-center">
              <p className="text-xl font-light" style={{ color: "#B3B3B3" }}>No properties match your search.</p>
              <button onClick={() => { setSearchQuery(""); setActiveFilter("All"); }} className="mt-6 text-sm font-semibold underline" style={{ color: "#151717" }}>Clear filters</button>
            </div>
          ) : (
            <>
              {featuredListings.length > 0 && (
                <div className="mb-10">
                  <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-5" style={{ color: "#B3B3B3" }}>Featured</p>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {featuredListings.map((p, i) => {
                      const slug = propertySlug(p);
                      return (
                        <AnimatedElement key={`f-${i}`} delay={i * 60}>
                          <Link to={`/Properties/${slug}`} className="block">
                            <div
                              className="group relative overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-500"
                              style={{ background: "#fff", borderRadius: "1.25rem", border: "1px solid rgba(21,23,23,0.06)" }}
                            >
                              <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                                <img
                                  src={p.image}
                                  alt={p.neighborhood}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                  <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-md" style={{ background: tagColors[p.tag]?.bg, color: tagColors[p.tag]?.text }}>
                                    {p.tag}
                                  </span>
                                  <span className="text-xs font-semibold px-3 py-1.5 rounded-md" style={{ background: "rgba(21,23,23,0.7)", backdropFilter: "blur(8px)", color: "#F1F1F1" }}>
                                    ✦ Featured
                                  </span>
                                </div>
                                <button
                                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleToggleSave(slug); }}
                                  className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                                  style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}
                                >
                                  <Heart className="h-4 w-4 transition-colors" style={{ color: isSaved(slug) ? "#e05555" : "#B3B3B3", fill: isSaved(slug) ? "#e05555" : "none" }} />
                                </button>
                              </div>
                              <div className="p-6">
                                <div className="flex items-start justify-between mb-1">
                                  <div>
                                    <h3 className="font-bold text-xl tracking-tight" style={{ color: "#151717" }}>{p.neighborhood}</h3>
                                    <p className="text-sm flex items-center gap-1 mt-0.5" style={{ color: "#B3B3B3" }}>
                                      <MapPin className="h-3 w-3" />{p.address}, {p.city}
                                    </p>
                                  </div>
                                  <span className="font-black text-xl tracking-tight" style={{ color: "#151717" }}>{p.price}</span>
                                </div>
                                <div className="flex gap-5 text-xs tracking-wider uppercase mt-4 pt-4" style={{ borderTop: "1px solid rgba(21,23,23,0.07)", color: "#B3B3B3" }}>
                                  {p.beds > 0 && <span className="flex items-center gap-1.5"><Bed className="h-3 w-3" />{p.beds} Beds</span>}
                                  <span className="flex items-center gap-1.5"><Bath className="h-3 w-3" />{p.baths} Baths</span>
                                  <span className="flex items-center gap-1.5"><Maximize2 className="h-3 w-3" />{p.area}</span>
                                  <span className="ml-auto">{p.daysOnMarket}d on market</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </AnimatedElement>
                      );
                    })}
                  </div>
                </div>
              )}

              {regularListings.length > 0 && (
                <div>
                  {featuredListings.length > 0 && (
                    <p className="text-xs tracking-[0.2em] uppercase font-semibold mb-5" style={{ color: "#B3B3B3" }}>All Listings</p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {regularListings.map((p, i) => {
                      const slug = propertySlug(p);
                      return (
                        <AnimatedElement key={`r-${i}`} delay={i * 40}>
                          <Link to={`/Properties/${slug}`} className="block">
                            <div
                              className="group overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
                              style={{ background: "#fff", borderRadius: "1rem", border: "1px solid rgba(21,23,23,0.06)" }}
                            >
                              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                                <img
                                  src={p.image}
                                  alt={p.neighborhood}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-3 left-3">
                                  <span className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-md" style={{ background: tagColors[p.tag]?.bg, color: tagColors[p.tag]?.text, fontSize: "10px" }}>
                                    {p.tag}
                                  </span>
                                </div>
                                <button
                                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleToggleSave(slug); }}
                                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                                  style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(6px)" }}
                                >
                                  <Heart className="h-3.5 w-3.5" style={{ color: isSaved(slug) ? "#e05555" : "#B3B3B3", fill: isSaved(slug) ? "#e05555" : "none" }} />
                                </button>
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
                                  <span className="ml-auto text-xs" style={{ color: "rgba(21,23,23,0.3)" }}>{p.daysOnMarket}d</span>
                                </div>
                                <div
                                  className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-full"
                                  style={{ border: "1px solid #151717", color: "#151717", background: "transparent" }}
                                >
                                  <span>View Details</span>
                                  <ArrowRight className="h-3 w-3" />
                                </div>
                              </div>
                            </div>
                          </Link>
                        </AnimatedElement>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden" style={{ paddingTop: "7rem", paddingBottom: "7rem", background: "#151717" }}>
        <div className="orbito-container relative z-10">
          <AnimatedElement>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
              <h2 className="font-black tracking-tighter" style={{ fontSize: "clamp(36px, 5vw, 68px)", lineHeight: 0.93, color: "#F1F1F1", letterSpacing: "-0.04em" }}>
                Ready to find<br /><span style={{ color: "rgba(241,241,241,0.35)", fontWeight: 300 }}>what moves you?</span>
              </h2>
              <Link to="/Agents">
                <button className="group shrink-0 inline-flex items-center gap-3 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-400 hover:-translate-y-0.5 px-10 py-5" style={{ background: "#F1F1F1", color: "#151717" }}>
                  Talk to an Agent
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </div>
  );
}
