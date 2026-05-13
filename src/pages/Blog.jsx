import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";
import AnimatedImage from "@/components/AnimatedImage";
import { blogPosts } from "@/lib/blogData";

const categories = ["All", "Market Reports", "Buyer Guides", "Seller Guides"];

export default function Blog() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = blogPosts.filter((p) => {
    const matchQ = !query ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase());
    const matchC = cat === "All" || p.category === cat;
    return matchQ && matchC;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div style={{ background: "#F1F1F1" }}>
      {/* Hero */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "56vh" }}>
        <AnimatedImage className="absolute inset-0">
          <img
            src="/images/photo-1486325212027-8081e485255e-2e21257bec98.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ filter: "brightness(0.32)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(21,23,23,0.95) 0%, rgba(21,23,23,0.15) 60%, transparent 100%)" }} />
        </AnimatedImage>
        <div className="relative z-10 orbito-container pb-12 sm:pb-20 w-full">
          <AnimatedText as="span" className="text-xs tracking-[0.25em] uppercase font-medium block mb-5" style={{ color: "rgba(241,241,241,0.4)" }}>
            Blog
          </AnimatedText>
          <AnimatedText
            as="h1"
            splitWords
            delay={0.1}
            className="font-black tracking-tighter"
            style={{ fontSize: "clamp(40px, 6.5vw, 88px)", lineHeight: 0.95, color: "#F1F1F1", letterSpacing: "-0.04em" }}
          >
            Notes from
          </AnimatedText>
          <AnimatedText
            as="h1"
            splitWords
            delay={0.25}
            className="font-black tracking-tighter"
            style={{ fontSize: "clamp(40px, 6.5vw, 88px)", lineHeight: 0.95, color: "rgba(241,241,241,0.4)", fontWeight: 300, letterSpacing: "-0.04em" }}
          >
            the market.
          </AnimatedText>
        </div>
      </section>

      {/* Filter bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(241,241,241,0.97)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(21,23,23,0.08)" }}>
        <div className="orbito-container py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#B3B3B3" }} />
              <input
                type="text"
                placeholder="Search articles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-black/20 rounded-full"
                style={{ border: "1px solid rgba(21,23,23,0.15)", color: "#151717", background: "#fff" }}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className="px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-full"
                  style={cat === c
                    ? { background: "#151717", color: "#F1F1F1" }
                    : { background: "transparent", border: "1px solid rgba(21,23,23,0.2)", color: "#383A3A" }
                  }
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <section style={{ paddingTop: "clamp(3rem, 9vw, 7rem)", paddingBottom: "clamp(3rem, 9vw, 7rem)" }}>
        <div className="orbito-container">
          {filtered.length === 0 ? (
            <div className="py-32 text-center">
              <p className="text-xl font-light no-anim" style={{ color: "#B3B3B3" }}>No articles match your search.</p>
              <button onClick={() => { setQuery(""); setCat("All"); }} className="mt-6 text-sm font-semibold underline" style={{ color: "#151717" }}>Clear filters</button>
            </div>
          ) : (
            <>
              {featured && (
                <Link to={`/Blog/${featured.slug}`} className="block mb-16">
                  <div className="group grid md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 items-center">
                    <div className="overflow-hidden order-1" style={{ borderRadius: "1.25rem", aspectRatio: "16/10" }}>
                      <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="order-2">
                      <span className="text-xs tracking-[0.22em] uppercase font-bold block mb-4" style={{ color: "#B3B3B3" }}>{featured.category}</span>
                      <h2 className="font-black tracking-tighter mb-5" style={{ fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: 0.97, color: "#151717", letterSpacing: "-0.03em" }}>
                        {featured.title}
                      </h2>
                      <p className="text-base sm:text-lg font-light leading-relaxed mb-6" style={{ color: "#383A3A" }}>{featured.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs tracking-widest uppercase" style={{ color: "#B3B3B3" }}>
                        <span>{new Date(featured.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                        <span>·</span>
                        <span>{featured.readTime}</span>
                      </div>
                      <div className="mt-8 inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-full"
                        style={{ background: "#151717", color: "#F1F1F1" }}>
                        Read Article <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {rest.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((p) => (
                    <Link key={p.slug} to={`/Blog/${p.slug}`} className="block">
                      <div className="group overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
                        style={{ background: "#fff", borderRadius: "1rem", border: "1px solid rgba(21,23,23,0.06)" }}>
                        <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                          <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="p-5">
                          <span className="text-xs tracking-widest uppercase font-bold block mb-2" style={{ color: "#B3B3B3" }}>{p.category}</span>
                          <h3 className="font-bold text-lg leading-tight mb-2 group-hover:opacity-70 transition-opacity" style={{ color: "#151717" }}>{p.title}</h3>
                          <p className="text-sm font-light leading-relaxed mb-4 line-clamp-3" style={{ color: "#383A3A" }}>{p.excerpt}</p>
                          <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(21,23,23,0.07)" }}>
                            <span className="text-xs" style={{ color: "#B3B3B3" }}>{new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                            <span className="text-xs font-semibold" style={{ color: "#151717" }}>{p.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
