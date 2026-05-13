import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Bed, Bath, Maximize2, MapPin, Heart, Calendar,
  Phone, Mail, Share2, Home, CheckCircle2,
} from "lucide-react";
import {
  findPropertyBySlug, propertyListings, propertySlug, tagColors,
} from "@/lib/propertiesData";
import { agents, agentSlug } from "@/lib/agentsData";
import { useClientAuth } from "@/lib/ClientAuth";

export default function PropertyDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const property = findPropertyBySlug(slug);
  const { user, toggleFavorite } = useClientAuth();
  const [contactOpen, setContactOpen] = useState(false);
  const [tourSent, setTourSent] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", date: "", message: "" });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!property) {
    return (
      <div className="orbito-container py-40 text-center" style={{ background: "#F1F1F1" }}>
        <h1 className="font-black text-4xl mb-4" style={{ color: "#151717" }}>Property not found</h1>
        <Link to="/Properties" className="underline text-sm font-semibold tracking-widest uppercase" style={{ color: "#151717" }}>
          Back to listings
        </Link>
      </div>
    );
  }

  const saveKey = `property:${slug}`;
  const isSaved = user ? (user.favorites || []).includes(saveKey) : false;

  const related = propertyListings
    .filter((p) => p.neighborhood === property.neighborhood && propertySlug(p) !== slug)
    .slice(0, 3);

  const fallback = propertyListings.filter((p) => propertySlug(p) !== slug).slice(0, 3);
  const relatedList = related.length > 0 ? related : fallback;

  const featuredAgent = agents[0];

  const heroImages = [
    property.image,
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop",
  ];

  const features = [
    "Hardwood floors throughout",
    "Open chef's kitchen with island",
    "Floor-to-ceiling windows",
    "In-unit washer & dryer",
    "Building gym & rooftop",
    "Pet-friendly",
    "Smart thermostat & locks",
    "24/7 concierge",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setTourSent(true);
  };

  return (
    <div style={{ background: "#F1F1F1" }}>
      {/* Back bar */}
      <div className="pt-24 pb-6">
        <div className="orbito-container">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-colors"
            style={{ color: "#383A3A" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </button>
        </div>
      </div>

      {/* Gallery */}
      <section>
        <div className="orbito-container">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-3" style={{ minHeight: "60vh" }}>
            <div className="md:col-span-3 relative overflow-hidden rounded-2xl" style={{ minHeight: "60vh" }}>
              <img src={heroImages[0]} alt={property.neighborhood} className="w-full h-full object-cover absolute inset-0" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-md"
                  style={{ background: tagColors[property.tag]?.bg, color: tagColors[property.tag]?.text }}>
                  {property.tag}
                </span>
                {property.featured && (
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-md" style={{ background: "rgba(21,23,23,0.7)", backdropFilter: "blur(8px)", color: "#F1F1F1" }}>
                    ✦ Featured
                  </span>
                )}
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => user && toggleFavorite(saveKey)}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                  style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)" }}
                  title={user ? "Save property" : "Sign in to save"}
                >
                  <Heart className="h-4 w-4" style={{ color: isSaved ? "#e05555" : "#383A3A", fill: isSaved ? "#e05555" : "none" }} />
                </button>
                <button
                  onClick={() => { navigator.clipboard?.writeText(window.location.href); }}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)" }}
                  title="Copy link"
                >
                  <Share2 className="h-4 w-4" style={{ color: "#383A3A" }} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
              {heroImages.slice(1, 4).map((src, i) => (
                <div key={i} className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
                  <img src={src} alt="" className="w-full h-full object-cover absolute inset-0" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Summary */}
      <section style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
        <div className="orbito-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <span className="text-xs tracking-[0.25em] uppercase font-medium block mb-3" style={{ color: "#B3B3B3" }}>
                {property.city}
              </span>
              <h1 className="font-black tracking-tighter mb-2"
                style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 0.95, color: "#151717", letterSpacing: "-0.04em" }}>
                {property.neighborhood}
              </h1>
              <p className="flex items-center gap-2 text-sm mb-8" style={{ color: "#383A3A" }}>
                <MapPin className="h-4 w-4" /> {property.address}, {property.city}
              </p>

              <div className="flex flex-wrap gap-8 py-6 mb-10" style={{ borderTop: "1px solid rgba(21,23,23,0.08)", borderBottom: "1px solid rgba(21,23,23,0.08)" }}>
                {property.beds > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest" style={{ color: "#B3B3B3" }}>
                      <Bed className="h-3.5 w-3.5" /> Bedrooms
                    </div>
                    <p className="font-black text-2xl mt-1" style={{ color: "#151717" }}>{property.beds}</p>
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest" style={{ color: "#B3B3B3" }}>
                    <Bath className="h-3.5 w-3.5" /> Bathrooms
                  </div>
                  <p className="font-black text-2xl mt-1" style={{ color: "#151717" }}>{property.baths}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest" style={{ color: "#B3B3B3" }}>
                    <Maximize2 className="h-3.5 w-3.5" /> Area
                  </div>
                  <p className="font-black text-2xl mt-1" style={{ color: "#151717" }}>{property.area}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest" style={{ color: "#B3B3B3" }}>
                    <Calendar className="h-3.5 w-3.5" /> On Market
                  </div>
                  <p className="font-black text-2xl mt-1" style={{ color: "#151717" }}>{property.daysOnMarket} days</p>
                </div>
              </div>

              <h2 className="font-black text-2xl tracking-tight mb-4" style={{ color: "#151717" }}>About this home</h2>
              <p className="text-base font-light leading-relaxed mb-6" style={{ color: "#383A3A" }}>
                A thoughtfully designed {property.type === "Commercial" ? "commercial space" : "home"} in the heart of {property.neighborhood}.
                This residence balances modern finishes with the character of {property.city}, offering {property.area} of
                refined living. Sun-filled rooms, generous proportions, and an unbeatable location define daily life here.
              </p>
              <p className="text-base font-light leading-relaxed" style={{ color: "#383A3A" }}>
                Step into a layout designed for both relaxed mornings and weekend hosting. Premium fixtures, considered
                materials, and an effortless flow make this one of the standout listings in {property.neighborhood}.
              </p>

              <h2 className="font-black text-2xl tracking-tight mt-12 mb-5" style={{ color: "#151717" }}>Features & amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-3 py-2" style={{ color: "#383A3A" }}>
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "#151717" }} />
                    <span className="text-sm">{f}</span>
                  </div>
                ))}
              </div>

              <h2 className="font-black text-2xl tracking-tight mt-12 mb-5" style={{ color: "#151717" }}>Neighborhood</h2>
              <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(21,23,23,0.08)" }}>
                <iframe
                  title="map"
                  className="w-full"
                  style={{ height: "320px", border: 0 }}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(property.address + ", " + property.city)}&output=embed`}
                />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 p-7 rounded-2xl" style={{ background: "#fff", border: "1px solid rgba(21,23,23,0.06)", boxShadow: "0 4px 30px rgba(21,23,23,0.05)" }}>
                <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "#B3B3B3" }}>Price</p>
                <p className="font-black tracking-tighter mb-6" style={{ fontSize: "clamp(32px, 3vw, 44px)", color: "#151717", letterSpacing: "-0.03em" }}>
                  {property.price}
                </p>

                <button
                  onClick={() => setContactOpen((v) => !v)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-300 px-6 py-4 mb-3"
                  style={{ background: "#151717", color: "#F1F1F1" }}
                >
                  Schedule a Tour <ArrowRight className="h-4 w-4" />
                </button>

                <Link to={`/Agents/${agentSlug(featuredAgent.name)}`} className="block">
                  <div className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-[#F6F6F6]">
                    <img src={featuredAgent.image} alt={featuredAgent.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="text-xs uppercase tracking-widest" style={{ color: "#B3B3B3" }}>Listing Agent</p>
                      <p className="font-bold text-sm" style={{ color: "#151717" }}>{featuredAgent.name}</p>
                    </div>
                  </div>
                </Link>

                <div className="flex gap-2 mt-3">
                  <a href={`tel:${featuredAgent.phone}`} className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase" style={{ border: "1px solid rgba(21,23,23,0.15)", color: "#151717" }}>
                    <Phone className="h-3 w-3" /> Call
                  </a>
                  <a href={`mailto:${featuredAgent.email}`} className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase" style={{ border: "1px solid rgba(21,23,23,0.15)", color: "#151717" }}>
                    <Mail className="h-3 w-3" /> Email
                  </a>
                </div>

                {contactOpen && (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                    {tourSent ? (
                      <div className="p-4 rounded-xl text-sm" style={{ background: "rgba(21,23,23,0.05)", color: "#151717" }}>
                        Tour request sent. {featuredAgent.name.split(" ")[0]} will reach out shortly.
                      </div>
                    ) : (
                      <>
                        <input
                          required
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-3 text-sm rounded-full focus:outline-none"
                          style={{ border: "1px solid rgba(21,23,23,0.15)", background: "#fff" }}
                        />
                        <input
                          required
                          type="email"
                          placeholder="Email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3 text-sm rounded-full focus:outline-none"
                          style={{ border: "1px solid rgba(21,23,23,0.15)", background: "#fff" }}
                        />
                        <input
                          required
                          type="date"
                          value={form.date}
                          onChange={(e) => setForm({ ...form, date: e.target.value })}
                          className="w-full px-4 py-3 text-sm rounded-full focus:outline-none"
                          style={{ border: "1px solid rgba(21,23,23,0.15)", background: "#fff" }}
                        />
                        <textarea
                          placeholder="Message (optional)"
                          rows={3}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full px-4 py-3 text-sm rounded-2xl focus:outline-none"
                          style={{ border: "1px solid rgba(21,23,23,0.15)", background: "#fff" }}
                        />
                        <button
                          type="submit"
                          className="w-full py-3 rounded-full text-xs font-semibold tracking-widest uppercase"
                          style={{ background: "#151717", color: "#F1F1F1" }}
                        >
                          Send Request
                        </button>
                      </>
                    )}
                  </form>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related */}
      <section style={{ paddingTop: "3rem", paddingBottom: "6rem" }}>
        <div className="orbito-container">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-black tracking-tighter" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", color: "#151717", letterSpacing: "-0.03em" }}>
              You may also like
            </h2>
            <Link to="/Properties" className="text-xs font-semibold tracking-widest uppercase underline" style={{ color: "#151717" }}>
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedList.map((p, i) => {
              const s = propertySlug(p);
              return (
                <Link key={i} to={`/Properties/${s}`} className="block">
                  <div className="group overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
                    style={{ background: "#fff", borderRadius: "1rem", border: "1px solid rgba(21,23,23,0.06)" }}>
                    <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                      <img src={p.image} alt={p.neighborhood} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-base tracking-tight" style={{ color: "#151717" }}>{p.neighborhood}</h3>
                          <p className="text-xs mt-0.5" style={{ color: "#B3B3B3" }}>{p.address}</p>
                        </div>
                        <span className="font-black text-base" style={{ color: "#151717" }}>{p.price}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="overflow-hidden" style={{ paddingTop: "5rem", paddingBottom: "5rem", background: "#151717" }}>
        <div className="orbito-container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <h2 className="font-black tracking-tighter" style={{ fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 0.95, color: "#F1F1F1", letterSpacing: "-0.03em" }}>
              Want to see more<br />
              <span style={{ color: "rgba(241,241,241,0.35)", fontWeight: 300 }}>like this?</span>
            </h2>
            <Link to="/Properties">
              <button className="inline-flex items-center gap-3 rounded-full text-sm font-semibold tracking-widest uppercase px-10 py-5"
                style={{ background: "#F1F1F1", color: "#151717" }}>
                <Home className="h-4 w-4" /> Browse Listings
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
