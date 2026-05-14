import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";
import AnimatedImage from "@/components/AnimatedImage";

const offices = [
  {
    city: "New York",
    address: "245 West Broadway, Floor 4",
    line2: "Tribeca, New York, NY 10013",
    phone: "+1 (212) 555-0100",
    email: "hello@orbito.com",
  },
  {
    city: "Philadelphia",
    address: "1822 Spruce Street, Suite 200",
    line2: "Rittenhouse Square, Philadelphia, PA 19103",
    phone: "+1 (215) 555-0100",
    email: "philly@orbito.com",
  },
];

const topics = [
  "I want to buy",
  "I want to sell",
  "I want to rent",
  "I am an agent",
  "Press / partnerships",
  "Something else",
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: topics[0],
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

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
            Contact
          </AnimatedText>
          <AnimatedText
            as="h1"
            splitWords
            delay={0.1}
            className="font-black tracking-tighter"
            style={{ fontSize: "clamp(40px, 6.5vw, 88px)", lineHeight: 0.95, color: "#F1F1F1", letterSpacing: "-0.04em" }}
          >
            Let's talk.
          </AnimatedText>
          <AnimatedText
            as="h1"
            splitWords
            delay={0.25}
            className="font-black tracking-tighter"
            style={{ fontSize: "clamp(40px, 6.5vw, 88px)", lineHeight: 0.95, color: "rgba(241,241,241,0.4)", fontWeight: 300, letterSpacing: "-0.04em" }}
          >
            We answer fast.
          </AnimatedText>
        </div>
      </section>

      {/* Form + offices */}
      <section style={{ paddingTop: "clamp(3rem, 9vw, 7rem)", paddingBottom: "clamp(3rem, 9vw, 7rem)" }}>
        <div className="orbito-container">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-start">
            {/* Form */}
            <div className="p-7 sm:p-10 rounded-3xl" style={{ background: "#fff", border: "1px solid rgba(21,23,23,0.06)", boxShadow: "0 8px 40px rgba(21,23,23,0.06)" }}>
              {sent ? (
                <div className="flex flex-col items-start gap-4 py-6">
                  <CheckCircle2 className="h-10 w-10" style={{ color: "#151717" }} />
                  <h2 className="font-black tracking-tighter" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", lineHeight: 1, color: "#151717", letterSpacing: "-0.03em" }}>
                    Message sent.
                  </h2>
                  <p className="text-base font-light leading-relaxed" style={{ color: "#383A3A", maxWidth: "480px" }}>
                    Thanks {form.name.split(" ")[0] || "for reaching out"}. An Orbito team member will reply to {form.email} within one business day.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", topic: topics[0], message: "" }); }}
                    className="mt-2 inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-full"
                    style={{ background: "#151717", color: "#F1F1F1" }}
                  >
                    Send Another <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h2 className="font-black tracking-tighter mb-2" style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1, color: "#151717", letterSpacing: "-0.03em" }}>
                      Send a message
                    </h2>
                    <p className="text-sm font-light" style={{ color: "#383A3A" }}>
                      We reply within one business day, often faster.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-xs uppercase tracking-widest font-semibold block mb-2" style={{ color: "#B3B3B3" }}>Name</span>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-full focus:outline-none focus:ring-1 focus:ring-black/20"
                        style={{ border: "1px solid rgba(21,23,23,0.15)", background: "#fff", color: "#151717" }}
                        placeholder="Alex Smith"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs uppercase tracking-widest font-semibold block mb-2" style={{ color: "#B3B3B3" }}>Email</span>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-full focus:outline-none focus:ring-1 focus:ring-black/20"
                        style={{ border: "1px solid rgba(21,23,23,0.15)", background: "#fff", color: "#151717" }}
                        placeholder="you@example.com"
                      />
                    </label>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <label className="block">
                      <span className="text-xs uppercase tracking-widest font-semibold block mb-2" style={{ color: "#B3B3B3" }}>Phone (optional)</span>
                      <input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-full focus:outline-none focus:ring-1 focus:ring-black/20"
                        style={{ border: "1px solid rgba(21,23,23,0.15)", background: "#fff", color: "#151717" }}
                        placeholder="+1 (212) 555-0100"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs uppercase tracking-widest font-semibold block mb-2" style={{ color: "#B3B3B3" }}>I am here to</span>
                      <select
                        value={form.topic}
                        onChange={(e) => setForm({ ...form, topic: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-full focus:outline-none focus:ring-1 focus:ring-black/20"
                        style={{ border: "1px solid rgba(21,23,23,0.15)", background: "#fff", color: "#151717" }}
                      >
                        {topics.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-xs uppercase tracking-widest font-semibold block mb-2" style={{ color: "#B3B3B3" }}>Message</span>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded-2xl focus:outline-none focus:ring-1 focus:ring-black/20"
                      style={{ border: "1px solid rgba(21,23,23,0.15)", background: "#fff", color: "#151717" }}
                      placeholder="What's going on?"
                    />
                  </label>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-300 px-6 py-4 mt-2"
                    style={{ background: "#151717", color: "#F1F1F1" }}
                  >
                    Send Message <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Offices */}
            <div className="space-y-4">
              <h2 className="font-black tracking-tighter mb-3" style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1, color: "#151717", letterSpacing: "-0.03em" }}>
                Or drop by.
              </h2>
              {offices.map((o) => (
                <div key={o.city} className="p-6 rounded-2xl" style={{ background: "#fff", border: "1px solid rgba(21,23,23,0.06)" }}>
                  <span className="text-xs uppercase tracking-widest font-bold block mb-3" style={{ color: "#B3B3B3" }}>{o.city}</span>
                  <p className="text-sm flex items-start gap-2 mb-1" style={{ color: "#151717" }}>
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "#151717" }} />
                    <span>
                      {o.address}
                      <br />
                      <span style={{ color: "#383A3A" }}>{o.line2}</span>
                    </span>
                  </p>
                  <a href={`tel:${o.phone.replace(/[^0-9+]/g, "")}`} className="text-sm flex items-center gap-2 mt-3" style={{ color: "#151717" }}>
                    <Phone className="h-4 w-4" /> {o.phone}
                  </a>
                  <a href={`mailto:${o.email}`} className="text-sm flex items-center gap-2 mt-1.5" style={{ color: "#151717" }}>
                    <Mail className="h-4 w-4" /> {o.email}
                  </a>
                </div>
              ))}

              <div className="p-6 rounded-2xl" style={{ background: "#151717", color: "#F1F1F1" }}>
                <span className="text-xs uppercase tracking-widest font-bold block mb-2" style={{ color: "rgba(241,241,241,0.4)" }}>Hours</span>
                <p className="text-sm font-light" style={{ color: "rgba(241,241,241,0.85)" }}>
                  Monday to Friday, 9am to 7pm ET.
                  <br />
                  Weekend tours by appointment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section style={{ paddingBottom: "clamp(3rem, 9vw, 7rem)" }}>
        <div className="orbito-container">
          <div className="overflow-hidden rounded-3xl" style={{ border: "1px solid rgba(21,23,23,0.08)" }}>
            <iframe
              title="Orbito offices"
              className="w-full"
              style={{ height: "440px", border: 0 }}
              src="https://www.google.com/maps?q=245+West+Broadway,+New+York,+NY&output=embed"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
