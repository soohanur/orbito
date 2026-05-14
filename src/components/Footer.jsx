import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) { setSubmitted(true); setEmail(""); }
  };

  return (
    <footer style={{ backgroundColor: "#151717", color: "#F1F1F1" }}>
      {/* Newsletter bar */}
      <div style={{ borderBottom: "1px solid rgba(241,241,241,0.1)" }}>
        <div className="orbito-container py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="font-semibold text-lg tracking-tight" style={{ color: "#F1F1F1" }}>Subscribe to our Newsletter!</p>
            {submitted ? (
              <p className="text-sm" style={{ color: "#B3B3B3" }}>Thank you for subscribing.</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex w-full sm:w-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-5 py-3 text-sm flex-1 sm:w-72 focus:outline-none"
                  style={{ background: "rgba(241,241,241,0.08)", border: "1px solid rgba(241,241,241,0.15)", color: "#F1F1F1" }}
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-300 shrink-0"
                  style={{ background: "#F1F1F1", color: "#151717" }}
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="orbito-container py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Contact */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "#B3B3B3" }} />
              <div>
                <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#B3B3B3" }}>Head Office</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(241,241,241,0.7)" }}>
                  57 E 57th St, New York,<br />NY 10022, United States
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "#B3B3B3" }} />
              <div>
                <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#B3B3B3" }}>Email Us</p>
                <a href="mailto:hello@orbitogroup.com" className="text-sm transition-colors hover:opacity-80" style={{ color: "rgba(241,241,241,0.7)" }}>
                  hello@orbitogroup.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "#B3B3B3" }} />
              <div>
                <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#B3B3B3" }}>Call Us</p>
                <a href="tel:+12129999999" className="text-sm transition-colors hover:opacity-80" style={{ color: "rgba(241,241,241,0.7)" }}>
                  +1 212 999 9999
                </a>
              </div>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <p className="text-xs tracking-widest uppercase mb-6" style={{ color: "#B3B3B3" }}>Navigate</p>
            <nav className="flex flex-col gap-3">
              <Link to="/Properties" className="text-sm transition-colors hover:opacity-100" style={{ color: "rgba(241,241,241,0.7)" }}>Search</Link>
              <Link to="/Agents" className="text-sm transition-colors hover:opacity-100" style={{ color: "rgba(241,241,241,0.7)" }}>Agents</Link>
              <Link to="/Join" className="text-sm transition-colors hover:opacity-100" style={{ color: "rgba(241,241,241,0.7)" }}>Join</Link>
              <Link to="/About" className="text-sm transition-colors hover:opacity-100" style={{ color: "rgba(241,241,241,0.7)" }}>About Us</Link>
            </nav>
          </div>

          {/* Social - names only, no links */}
          <div>
            <p className="text-xs tracking-widest uppercase mb-6" style={{ color: "#B3B3B3" }}>Follow</p>
            <nav className="flex flex-col gap-3">
              {["Facebook", "Instagram", "YouTube", "LinkedIn"].map((name) => (
                <span key={name} className="text-sm cursor-default select-none" style={{ color: "rgba(241,241,241,0.4)" }}>{name}</span>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Logo + legal */}
      <div style={{ borderTop: "1px solid rgba(241,241,241,0.1)" }}>
        <div className="orbito-container py-10">
          <div className="mb-10">
            <span
              className="font-black tracking-tighter"
              style={{ fontSize: "clamp(48px, 8vw, 100px)", lineHeight: 0.9, letterSpacing: "-0.05em", color: "rgba(241,241,241,0.08)" }}
            >
              ORBITO
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {["Terms", "Privacy Policy", "Fair Housing Notice", "Operating Procedure", "Press"].map((t) => (
                <a key={t} href="#" className="text-xs transition-colors hover:opacity-70" style={{ color: "rgba(241,241,241,0.3)" }}>{t}</a>
              ))}
            </div>
            <div className="flex flex-col sm:items-end gap-1">
              <span className="text-xs" style={{ color: "rgba(241,241,241,0.25)" }}>Housing Choice Vouchers Welcome</span>
              <span className="text-xs" style={{ color: "rgba(241,241,241,0.25)" }}>Se Aceptan Vales de Elección de Vivienda</span>
              <span className="text-xs mt-1" style={{ color: "rgba(241,241,241,0.25)" }}>Copyright © 2026 Orbito Real Estate</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}