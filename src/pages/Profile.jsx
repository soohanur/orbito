import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, LogOut, Mail, MapPin, Pencil, Phone, Save, X } from "lucide-react";
import { useClientAuth } from "@/lib/ClientAuth";
import { findPropertyBySlug, propertySlug, tagColors } from "@/lib/propertiesData";

export default function Profile() {
  const { user, ready, signOut, updateProfile, toggleFavorite } = useClientAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", bio: "", location: "" });

  useEffect(() => {
    if (ready && !user) navigate("/SignIn", { replace: true, state: { from: "/Profile" } });
  }, [ready, user, navigate]);

  useEffect(() => {
    if (user) setForm({
      name: user.name || "",
      phone: user.phone || "",
      bio: user.bio || "",
      location: user.location || "",
    });
  }, [user]);

  if (!user) return null;

  const favoriteProps = (user.favorites || [])
    .filter((k) => k.startsWith("property:"))
    .map((k) => ({ key: k, slug: k.slice("property:".length) }))
    .map(({ key, slug }) => ({ key, slug, property: findPropertyBySlug(slug) }))
    .filter((x) => x.property);

  const handleSave = () => {
    updateProfile(form);
    setEditing(false);
  };

  const handleLogout = () => {
    signOut();
    navigate("/", { replace: true });
  };

  return (
    <div style={{ background: "#F1F1F1", paddingTop: "clamp(100px, 12vw, 140px)", paddingBottom: "5rem" }}>
      <div className="orbito-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-xs tracking-[0.25em] uppercase font-medium block mb-3" style={{ color: "#B3B3B3" }}>
            Your account
          </span>
          <h1 className="font-black tracking-tighter mb-10"
            style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.92, color: "#151717", letterSpacing: "-0.04em" }}>
            Hello, <span style={{ color: "#B3B3B3", fontWeight: 300 }}>{user.name.split(" ")[0]}.</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile card */}
          <aside className="lg:col-span-1">
            <div className="p-7 rounded-3xl" style={{ background: "#fff", border: "1px solid rgba(21,23,23,0.06)", boxShadow: "0 4px 30px rgba(21,23,23,0.05)" }}>
              <div className="flex items-center gap-4 mb-6">
                <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover" style={{ background: "#151717" }} />
                <div className="min-w-0">
                  <p className="font-bold text-lg truncate" style={{ color: "#151717" }}>{user.name}</p>
                  <p className="text-xs flex items-center gap-1 truncate" style={{ color: "#B3B3B3" }}>
                    <Mail className="h-3 w-3" /> {user.email}
                  </p>
                </div>
              </div>

              {editing ? (
                <div className="space-y-3">
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-4 py-2.5 text-sm rounded-full focus:outline-none"
                    style={{ border: "1px solid rgba(21,23,23,0.15)", background: "#fff" }} />
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: "#B3B3B3" }} />
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="Phone"
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-full focus:outline-none"
                      style={{ border: "1px solid rgba(21,23,23,0.15)", background: "#fff" }} />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: "#B3B3B3" }} />
                    <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                      placeholder="Location"
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-full focus:outline-none"
                      style={{ border: "1px solid rgba(21,23,23,0.15)", background: "#fff" }} />
                  </div>
                  <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    rows={3} placeholder="Short bio"
                    className="w-full px-4 py-3 text-sm rounded-2xl focus:outline-none"
                    style={{ border: "1px solid rgba(21,23,23,0.15)", background: "#fff" }} />
                  <div className="flex gap-2">
                    <button onClick={handleSave}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                      style={{ background: "#151717", color: "#F1F1F1" }}>
                      <Save className="h-3.5 w-3.5" /> Save
                    </button>
                    <button onClick={() => setEditing(false)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                      style={{ border: "1px solid rgba(21,23,23,0.15)", color: "#151717" }}>
                      <X className="h-3.5 w-3.5" /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-sm" style={{ color: "#383A3A" }}>
                  <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" style={{ color: "#B3B3B3" }} /> {user.phone || "—"}</div>
                  <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" style={{ color: "#B3B3B3" }} /> {user.location || "—"}</div>
                  <p className="leading-relaxed">{user.bio || "Add a short bio so agents can get to know you."}</p>

                  <div className="flex gap-2 pt-3">
                    <button onClick={() => setEditing(true)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                      style={{ background: "#151717", color: "#F1F1F1" }}>
                      <Pencil className="h-3.5 w-3.5" /> Edit Profile
                    </button>
                    <button onClick={handleLogout}
                      className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-semibold tracking-widest uppercase"
                      style={{ border: "1px solid rgba(21,23,23,0.15)", color: "#151717" }}>
                      <LogOut className="h-3.5 w-3.5" /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 p-6 rounded-3xl" style={{ background: "#151717", color: "#F1F1F1" }}>
              <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: "rgba(241,241,241,0.4)" }}>Member since</p>
              <p className="font-black text-2xl">{new Date(user.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long" })}</p>
            </div>
          </aside>

          {/* Saved listings */}
          <section className="lg:col-span-2">
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-black tracking-tighter" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", color: "#151717", letterSpacing: "-0.03em" }}>
                Saved homes
              </h2>
              <Link to="/Properties" className="text-xs font-semibold tracking-widest uppercase underline" style={{ color: "#151717" }}>
                Browse more
              </Link>
            </div>

            {favoriteProps.length === 0 ? (
              <div className="p-10 rounded-3xl text-center" style={{ background: "#fff", border: "1px solid rgba(21,23,23,0.06)" }}>
                <Heart className="h-8 w-8 mx-auto mb-3" style={{ color: "#B3B3B3" }} />
                <p className="text-sm" style={{ color: "#383A3A" }}>No saved homes yet.</p>
                <Link to="/Properties">
                  <button className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-widest uppercase"
                    style={{ background: "#151717", color: "#F1F1F1" }}>
                    Explore Properties <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {favoriteProps.map(({ key, slug, property }) => (
                  <div key={key} className="group overflow-hidden rounded-2xl relative" style={{ background: "#fff", border: "1px solid rgba(21,23,23,0.06)" }}>
                    <Link to={`/Properties/${slug}`} className="block">
                      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                        <img src={property.image} alt={property.neighborhood} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute top-3 left-3">
                          <span className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-md"
                            style={{ background: tagColors[property.tag]?.bg, color: tagColors[property.tag]?.text, fontSize: "10px" }}>
                            {property.tag}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-base" style={{ color: "#151717" }}>{property.neighborhood}</h3>
                            <p className="text-xs mt-0.5" style={{ color: "#B3B3B3" }}>{property.address}</p>
                          </div>
                          <span className="font-black text-base" style={{ color: "#151717" }}>{property.price}</span>
                        </div>
                      </div>
                    </Link>
                    <button
                      onClick={() => toggleFavorite(key)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                      style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)" }}
                      title="Remove from saved"
                    >
                      <Heart className="h-3.5 w-3.5" style={{ color: "#e05555", fill: "#e05555" }} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
