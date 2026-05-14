import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useClientAuth } from "@/lib/ClientAuth";
import AnimatedText from "@/components/AnimatedText";

export default function SignIn() {
  const { user, signIn } = useClientAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/Profile";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) navigate(redirectTo, { replace: true });
  }, [user, navigate, redirectTo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      signIn(form);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-start lg:items-center" style={{ background: "#F1F1F1", minHeight: "100vh", paddingTop: "clamp(100px, 12vw, 140px)", paddingBottom: "5rem" }}>
      <div className="orbito-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-start lg:items-center">
          <div>
            <AnimatedText as="span" className="text-xs tracking-[0.25em] uppercase font-medium block mb-5" style={{ color: "#B3B3B3" }}>
              Welcome back
            </AnimatedText>
            <AnimatedText
              as="h1"
              splitWords
              delay={0.05}
              className="font-black tracking-tighter mb-6"
              style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.92, color: "#151717", letterSpacing: "-0.04em" }}
            >
              Sign in to Orbito.
            </AnimatedText>
            <AnimatedText as="p" delay={0.2} className="font-light text-lg" style={{ color: "#383A3A", maxWidth: "460px" }}>
              Pick up where you left off. Saved homes, tour requests, and your agent - all in one place.
            </AnimatedText>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="p-8 sm:p-10 rounded-3xl" style={{ background: "#fff", border: "1px solid rgba(21,23,23,0.06)", boxShadow: "0 8px 40px rgba(21,23,23,0.06)" }}>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="px-4 py-3 text-sm rounded-xl" style={{ background: "rgba(224,85,85,0.08)", color: "#a13030", border: "1px solid rgba(224,85,85,0.18)" }}>
                    {error}
                  </div>
                )}

                <label className="block">
                  <span className="text-xs uppercase tracking-widest font-semibold block mb-2" style={{ color: "#B3B3B3" }}>Email</span>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#B3B3B3" }} />
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 text-sm rounded-full focus:outline-none focus:ring-1 focus:ring-black/20"
                      style={{ border: "1px solid rgba(21,23,23,0.15)", background: "#fff", color: "#151717" }}
                      placeholder="you@example.com"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-xs uppercase tracking-widest font-semibold block mb-2" style={{ color: "#B3B3B3" }}>Password</span>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "#B3B3B3" }} />
                    <input
                      required
                      type={showPwd ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full pl-11 pr-12 py-3 text-sm rounded-full focus:outline-none focus:ring-1 focus:ring-black/20"
                      style={{ border: "1px solid rgba(21,23,23,0.15)", background: "#fff", color: "#151717" }}
                      placeholder="••••••••"
                    />
                    <button type="button" onClick={() => setShowPwd((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full" style={{ color: "#B3B3B3" }}>
                      {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={busy}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-300 px-6 py-4 mt-2 disabled:opacity-60"
                  style={{ background: "#151717", color: "#F1F1F1" }}
                >
                  {busy ? "Signing in..." : <>Sign In <ArrowRight className="h-4 w-4" /></>}
                </button>

                <p className="text-sm text-center pt-2" style={{ color: "#383A3A" }}>
                  No account yet?{" "}
                  <Link to="/Register" className="font-semibold underline" style={{ color: "#151717" }}>
                    Create one
                  </Link>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
