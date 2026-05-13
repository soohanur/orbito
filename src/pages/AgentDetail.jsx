import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, MapPin, Star, Phone, Mail, Award,
  Briefcase, Globe2, CheckCircle2,
} from "lucide-react";
import { findAgentBySlug, agents, agentSlug, badgeColors } from "@/lib/agentsData";
import { propertyListings, propertySlug, tagColors } from "@/lib/propertiesData";

export default function AgentDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const agent = findAgentBySlug(slug);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!agent) {
    return (
      <div className="orbito-container py-40 text-center" style={{ background: "#F1F1F1" }}>
        <h1 className="font-black text-4xl mb-4" style={{ color: "#151717" }}>Agent not found</h1>
        <Link to="/Agents" className="underline text-sm font-semibold tracking-widest uppercase" style={{ color: "#151717" }}>
          Back to agents
        </Link>
      </div>
    );
  }

  const otherAgents = agents.filter((a) => agentSlug(a.name) !== slug).slice(0, 3);
  const agentListings = propertyListings.slice(0, 4);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ background: "#F1F1F1" }}>
      <div className="pt-24 pb-6">
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
      <section style={{ paddingBottom: "3rem" }}>
        <div className="orbito-container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="relative overflow-hidden rounded-3xl" style={{ aspectRatio: "4/5" }}>
                <img src={agent.image} alt={agent.name} className="w-full h-full object-cover object-top absolute inset-0" />
                <div className="absolute top-4 left-4">
                  <span
                    className="text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md"
                    style={{
                      background: badgeColors[agent.badge]?.bg || "#151717",
                      color: badgeColors[agent.badge]?.text || "#F1F1F1",
                      fontSize: "10px",
                    }}
                  >
                    {agent.badge}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-md" style={{ background: "rgba(21,23,23,0.75)", backdropFilter: "blur(8px)" }}>
                  <Star className="h-3 w-3" style={{ color: "#e8d97a", fill: "#e8d97a" }} />
                  <span className="text-xs font-semibold" style={{ color: "#F1F1F1" }}>{agent.rating}</span>
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-3">
              <span className="text-xs tracking-[0.25em] uppercase font-medium block mb-3" style={{ color: "#B3B3B3" }}>
                {agent.title}
              </span>
              <h1 className="font-black tracking-tighter mb-3"
                style={{ fontSize: "clamp(44px, 6vw, 84px)", lineHeight: 0.92, color: "#151717", letterSpacing: "-0.04em" }}>
                {agent.name}
              </h1>
              <p className="flex items-center gap-2 text-sm mb-8" style={{ color: "#383A3A" }}>
                <MapPin className="h-4 w-4" /> {agent.location}
              </p>

              <p className="text-base font-light leading-relaxed mb-10" style={{ color: "#383A3A", maxWidth: "640px" }}>
                {agent.bio}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6" style={{ borderTop: "1px solid rgba(21,23,23,0.08)", borderBottom: "1px solid rgba(21,23,23,0.08)" }}>
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest" style={{ color: "#B3B3B3" }}>
                    <Briefcase className="h-3.5 w-3.5" /> Deals
                  </div>
                  <p className="font-black text-2xl mt-1" style={{ color: "#151717" }}>{agent.deals}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest" style={{ color: "#B3B3B3" }}>
                    <Star className="h-3.5 w-3.5" /> Rating
                  </div>
                  <p className="font-black text-2xl mt-1" style={{ color: "#151717" }}>{agent.rating}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest" style={{ color: "#B3B3B3" }}>
                    <Award className="h-3.5 w-3.5" /> Years
                  </div>
                  <p className="font-black text-2xl mt-1" style={{ color: "#151717" }}>{agent.years}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest" style={{ color: "#B3B3B3" }}>
                    <Globe2 className="h-3.5 w-3.5" /> Languages
                  </div>
                  <p className="font-black text-sm mt-2" style={{ color: "#151717" }}>{agent.languages.join(", ")}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                <a href={`tel:${agent.phone}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-widest uppercase" style={{ background: "#151717", color: "#F1F1F1" }}>
                  <Phone className="h-4 w-4" /> {agent.phone}
                </a>
                <a href={`mailto:${agent.email}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-widest uppercase" style={{ border: "1px solid rgba(21,23,23,0.2)", color: "#151717" }}>
                  <Mail className="h-4 w-4" /> Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialty */}
      <section style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
        <div className="orbito-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-black text-2xl tracking-tight mb-5" style={{ color: "#151717" }}>Specialty & approach</h2>
              <p className="text-base font-light leading-relaxed mb-6" style={{ color: "#383A3A" }}>
                {agent.name.split(" ")[0]} focuses on <strong style={{ color: "#151717" }}>{agent.specialty}</strong> across {agent.location}.
                Clients turn to {agent.name.split(" ")[0]} when they want clear answers, sharp pricing strategy, and an advocate who
                treats every deal like their own.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Data-driven pricing strategy",
                  "End-to-end transaction support",
                  "Vetted contractor & vendor network",
                  "Off-market listing access",
                  "Negotiation specialist",
                  "Discreet, high-touch service",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-3 py-2" style={{ color: "#383A3A" }}>
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "#151717" }} />
                    <span className="text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact card */}
            <aside>
              <div className="p-7 rounded-2xl" style={{ background: "#fff", border: "1px solid rgba(21,23,23,0.06)", boxShadow: "0 4px 30px rgba(21,23,23,0.05)" }}>
                <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: "#B3B3B3" }}>Get in touch</p>
                {sent ? (
                  <div className="p-4 rounded-xl text-sm" style={{ background: "rgba(21,23,23,0.05)", color: "#151717" }}>
                    Message sent. {agent.name.split(" ")[0]} will follow up shortly.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-full focus:outline-none"
                      style={{ border: "1px solid rgba(21,23,23,0.15)", background: "#fff" }} />
                    <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-full focus:outline-none"
                      style={{ border: "1px solid rgba(21,23,23,0.15)", background: "#fff" }} />
                    <input placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-full focus:outline-none"
                      style={{ border: "1px solid rgba(21,23,23,0.15)", background: "#fff" }} />
                    <textarea required placeholder="How can I help?" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-2xl focus:outline-none"
                      style={{ border: "1px solid rgba(21,23,23,0.15)", background: "#fff" }} />
                    <button type="submit" className="w-full py-3 rounded-full text-xs font-semibold tracking-widest uppercase"
                      style={{ background: "#151717", color: "#F1F1F1" }}>
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
        <div className="orbito-container">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-black tracking-tighter" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", color: "#151717", letterSpacing: "-0.03em" }}>
              Featured listings
            </h2>
            <Link to="/Properties" className="text-xs font-semibold tracking-widest uppercase underline" style={{ color: "#151717" }}>
              All listings
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {agentListings.map((p, i) => {
              const s = propertySlug(p);
              return (
                <Link key={i} to={`/Properties/${s}`} className="block">
                  <div className="group overflow-hidden hover:-translate-y-1 transition-all duration-500"
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
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-sm" style={{ color: "#151717" }}>{p.neighborhood}</h3>
                          <p className="text-xs mt-0.5" style={{ color: "#B3B3B3" }}>{p.address}</p>
                        </div>
                        <span className="font-black text-sm" style={{ color: "#151717" }}>{p.price}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other agents */}
      <section style={{ paddingTop: "3rem", paddingBottom: "6rem" }}>
        <div className="orbito-container">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-black tracking-tighter" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", color: "#151717", letterSpacing: "-0.03em" }}>
              Other agents
            </h2>
            <Link to="/Agents" className="text-xs font-semibold tracking-widest uppercase underline" style={{ color: "#151717" }}>
              See all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherAgents.map((a) => (
              <Link key={a.name} to={`/Agents/${agentSlug(a.name)}`} className="block">
                <div className="group overflow-hidden hover:-translate-y-1 transition-all duration-500"
                  style={{ background: "#fff", borderRadius: "1.25rem", border: "1px solid rgba(21,23,23,0.06)" }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: "3/3.2" }}>
                    <img src={a.image} alt={a.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-base" style={{ color: "#151717" }}>{a.name}</h3>
                    <p className="text-xs mt-0.5" style={{ color: "#B3B3B3" }}>{a.title} · {a.location}</p>
                    <div className="flex items-center gap-1.5 mt-3 text-xs font-semibold tracking-widest uppercase" style={{ color: "#151717" }}>
                      View Profile <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
