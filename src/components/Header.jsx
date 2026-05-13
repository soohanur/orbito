import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { useClientAuth } from "@/lib/ClientAuth";

const NAV_ITEMS = [
  { label: "Property", to: "/Properties" },
  { label: "Agents", to: "/Agents" },
  { label: "Join", to: "/Join" },
  { label: "About", to: "/About" },
];

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const { user, signOut } = useClientAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 60);
      if (currentY < 60) {
        setVisible(true);
      } else if (currentY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };

    const handleMouseMove = (e) => {
      if (e.clientY < 80) setVisible(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const isTransparent = isHome && !scrolled;

  const handleSignOut = () => {
    signOut();
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out"
        style={{
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          background: isTransparent ? "transparent" : "rgba(241,241,241,0.96)",
          backdropFilter: isTransparent ? "none" : "blur(16px)",
          borderBottom: "none",
        }}
      >
        <div className="orbito-container">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="shrink-0">
              <span
                className="font-black text-2xl sm:text-3xl transition-colors duration-500"
                style={{ letterSpacing: "-0.05em", color: "#151717" }}
              >
                ORBITO
              </span>
            </Link>

            <nav className="hidden sm:flex items-center gap-10 lg:gap-14">
              {NAV_ITEMS.map((item) => {
                const active = location.pathname === item.to ||
                  (item.to !== "/" && location.pathname.startsWith(item.to + "/"));
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="text-sm font-medium tracking-wide transition-colors duration-200"
                    style={{
                      color: active ? "#151717" : "#383A3A",
                      fontWeight: active ? 600 : 500,
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden sm:flex items-center gap-3">
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full transition-all duration-300"
                    style={{ background: "#151717", color: "#F1F1F1" }}
                  >
                    <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                    <span className="text-xs font-semibold tracking-wide max-w-[120px] truncate">
                      {user.name.split(" ")[0]}
                    </span>
                  </button>
                  {userMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 rounded-2xl overflow-hidden"
                      style={{ background: "#fff", border: "1px solid rgba(21,23,23,0.08)", boxShadow: "0 10px 40px rgba(21,23,23,0.12)" }}
                    >
                      <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(21,23,23,0.06)" }}>
                        <p className="text-sm font-bold truncate" style={{ color: "#151717" }}>{user.name}</p>
                        <p className="text-xs truncate" style={{ color: "#B3B3B3" }}>{user.email}</p>
                      </div>
                      <Link
                        to="/Profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm transition-colors hover:bg-[#F6F6F6]"
                        style={{ color: "#151717" }}
                      >
                        <User className="h-4 w-4" /> Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm transition-colors hover:bg-[#F6F6F6] text-left"
                        style={{ color: "#151717" }}
                      >
                        <LogOut className="h-4 w-4" /> Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/SignIn">
                  <button
                    className="text-sm font-semibold tracking-widest uppercase px-7 py-2.5 rounded-full transition-all duration-300"
                    style={{
                      background: isTransparent ? "#F1F1F1" : "#151717",
                      color: isTransparent ? "#151717" : "#F1F1F1",
                    }}
                  >
                    Sign In
                  </button>
                </Link>
              )}
            </div>

            <button
              className="sm:hidden p-2 transition-colors duration-300"
              style={{ color: "#151717" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#F1F1F1] pt-16 flex flex-col">
          <nav className="flex flex-col px-8 py-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="py-5 border-b border-black/10 text-[#151717] font-medium text-xl hover:text-[#383A3A] transition-colors"
              >
                {item.label}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  to="/Profile"
                  className="mt-6 inline-flex items-center justify-center gap-2 bg-[#151717] text-[#F1F1F1] py-4 rounded-full text-base font-semibold tracking-widest uppercase"
                >
                  <User className="h-4 w-4" /> {user.name.split(" ")[0]}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 py-4 rounded-full text-base font-semibold tracking-widest uppercase"
                  style={{ border: "1px solid rgba(21,23,23,0.2)", color: "#151717" }}
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </>
            ) : (
              <Link
                to="/SignIn"
                className="mt-10 w-full inline-flex items-center justify-center bg-[#151717] text-[#F1F1F1] py-4 rounded-full text-base font-semibold tracking-widest uppercase"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
