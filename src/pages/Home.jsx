import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";

const AnimatedElement = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {setIsVisible(true);return;}
    const fallback = setTimeout(() => setIsVisible(true), 800 + delay);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {clearTimeout(fallback);setTimeout(() => setIsVisible(true), delay);observer.unobserve(el);}
    }, { threshold: 0.05, rootMargin: "0px 0px 100px 0px" });
    observer.observe(el);
    return () => {observer.disconnect();clearTimeout(fallback);};
  }, [delay]);
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}>
      {children}
    </div>);

};

/* ── HERO ── */
function HeroSection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Full-screen background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://media.base44.com/images/public/6a032fba9f62b5c5d93ca681/d7a9a3bf9_1.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Text + CTA — centered, over the sky */}
      <div
        className="relative z-10 flex flex-col items-center text-center"
        style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", marginTop: "-165px" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-black tracking-tighter leading-none"
          style={{ fontSize: "clamp(48px, 8vw, 112px)", color: "#151717", letterSpacing: "-0.04em", marginBottom: "1.25rem" }}
        >
          Move Into What's Next
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="text-base sm:text-lg leading-relaxed"
          style={{ marginBottom: "2rem" }}
        >
          <span style={{ color: "#151717", fontWeight: 500 }}>Expert agents. Real guidance.</span>
          {" "}
          <span style={{ color: "rgba(21,23,23,0.45)" }}>A clear path to find what's next.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Link to="/Properties">
            <button
              className="group inline-flex items-center gap-3 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl px-9 py-4"
              style={{ background: "#151717", color: "#F1F1F1" }}
            >
              Find Properties
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ── WHY ORBITO ── */
function WhyOrbitoSection() {
  return (
    <section style={{ background: "#F1F1F1", paddingTop: "7rem", paddingBottom: "7rem" }}>
      <div className="orbito-container">
        <AnimatedElement>
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
            <div>
              <span className="text-xs tracking-[0.22em] uppercase font-bold inline-block pb-2 mb-6" style={{ borderBottom: "2px solid #151717", color: "#151717" }}>Why Orbito</span>
            </div>
            <div>
              <p
                style={{
                  fontFamily: '"Instrument Sans", "Instrument Sans Fallback"',
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "clamp(36px, 4.5vw, 56px)",
                  lineHeight: "1.14"
                }}>
                
                <span style={{ color: "rgb(179, 179, 179)" }}>Your next chapter</span>
                <br />
                <span style={{ color: "#151717" }}>deserves more than just a place.</span>
              </p>
            </div>
          </div>
        </AnimatedElement>
      </div>

      {/* Full-width area image */}
      <AnimatedElement delay={150} className="mt-14">
        <div className="orbito-container">
          <div className="overflow-hidden" style={{ borderRadius: "1.5rem", maxHeight: "520px" }}>
            <img
              src="https://media.base44.com/images/public/6a031b2b649f3814456c1a02/1a5af2fdf_findrealestate_com_4ea5fa732_adb89c24.jpg"
              alt="Neighborhood"
              className="w-full object-cover hover:scale-105 transition-transform duration-[18s] ease-out"
              style={{ height: "100%", maxHeight: "520px", objectPosition: "center" }} />
            
          </div>
        </div>
      </AnimatedElement>
    </section>);

}

/* ── FOR AGENTS ── */
function ForAgentsSection() {
  return (
    <section style={{ background: "#F1F1F1", paddingTop: "7rem", paddingBottom: "7rem", borderTop: "1px solid rgba(21,23,23,0.08)" }}>
      <div className="orbito-container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-stretch">
          {/* Left — images grid (agents side) */}
          <AnimatedElement delay={100}>
            <div className="grid grid-cols-2 gap-4 h-full" style={{ minHeight: "540px" }}>
              <div className="overflow-hidden" style={{ borderRadius: "1rem", aspectRatio: "3/4" }}>
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=800&fit=crop" alt="" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" />
              </div>
              <div className="overflow-hidden mt-10" style={{ borderRadius: "1rem", aspectRatio: "3/4" }}>
                <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=800&fit=crop" alt="" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" />
              </div>
            </div>
          </AnimatedElement>

          {/* Right — text + description box */}
          <AnimatedElement>
            <div className="flex flex-col justify-between h-full">
              <div>
                <span className="text-xs tracking-[0.22em] uppercase font-bold block mb-8" style={{ color: "#383A3A" }}>For Agents</span>

                {/* Main headline */}
                <h2
                  style={{
                    fontFamily: '"Instrument Sans", "Instrument Sans Fallback"',
                    fontStyle: "normal",
                    fontWeight: 500,
                    color: "rgb(0, 0, 0)",
                    fontSize: "clamp(48px, 5.5vw, 72px)",
                    lineHeight: "83px",
                    letterSpacing: "-0.04em",
                    marginBottom: "2.5rem"
                  }}>
                  
                  Don't Rent Your Career. Own It.
                </h2>

                {/* Blended description box */}
                <div
                  className="relative overflow-hidden"
                  style={{ borderRadius: "1.25rem", background: "#151717" }}>
                  
                  {/* Background image blend */}
                  <div className="absolute inset-0 opacity-20">
                    <img
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                      alt=""
                      className="w-full h-full object-cover" />
                    
                  </div>
                  <div className="relative z-10 p-8 md:p-10">
                    <p className="font-light leading-relaxed mb-8" style={{ fontSize: "16px", color: "rgba(241,241,241,0.78)", lineHeight: "1.75" }}>
                      At ORBITO, our agents don't just work for the brand — they own a part of it. We give top performers real equity, so they're invested in more than just your transaction — they're invested in your outcome. Agents are certified, supported, and equipped to deliver five-star service — because their success is tied to yours.
                    </p>
                    <Link to="/Join">
                      <button
                        className="group inline-flex items-center gap-3 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-400 hover:-translate-y-0.5 hover:shadow-lg px-8 py-4"
                        style={{ background: "#F1F1F1", color: "#151717" }}>
                        
                        <span>Join The Movement</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>);

}

/* ── TESTIMONIALS ── */
function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const staticFallback = [
  { quote: "Michael was a great realtor. Such a hard worker, dedicated to helping us find the perfect neighborhood, price point and home. Tireless and dedicated. Would recommend him 100%!", author: "Bernadette Hogan", location: "New York, NY" },
  { quote: "Shirin was truly a blessing to work with. She helped us find our perfect condo in a great area. She was patient and very understanding.", author: "Tyleen", location: "Brooklyn, NY" },
  { quote: "Working with Mathew was an absolute pleasure, and I highly recommend him to any serious homebuyer — especially first-time buyers who may feel overwhelmed by the process.", author: "Johanna Nieto", location: "Queens, NY" }];


  useEffect(() => {
    base44.entities.Testimonial.list().
    then((data) => setTestimonials(data.length > 0 ? data : staticFallback)).
    catch(() => setTestimonials(staticFallback)).
    finally(() => setLoading(false));
  }, []);

  const items = testimonials.length > 0 ? testimonials : staticFallback;

  useEffect(() => {
    if (!items.length) return;
    const interval = setInterval(() => setCurrentIndex((prev) => (prev + 1) % items.length), 7000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <section style={{ background: "#f5f4f0", paddingTop: "7rem", paddingBottom: "7rem", borderTop: "1px solid rgba(21,23,23,0.06)" }}>
      <div className="orbito-container">
        <AnimatedElement>
          <h2 className="font-black tracking-tighter mb-16" style={{ fontSize: "clamp(40px, 5vw, 68px)", lineHeight: 0.95, color: "#151717", letterSpacing: "-0.04em" }}>
            Don't Take <span style={{ color: "#B3B3B3", fontWeight: 300 }}>Our Word for It.</span>
          </h2>
        </AnimatedElement>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <AnimatedElement delay={100}>
            <div className="overflow-hidden" style={{ borderRadius: "1.5rem", aspectRatio: "4/5" }}>
              <img src="https://media.base44.com/images/public/6a031b2b649f3814456c1a02/857365a27_findrealestate_com_152131ac7_93e05ccf.jpg" alt="Happy clients" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[12s]" />
            </div>
          </AnimatedElement>

          <AnimatedElement delay={200}>
            {!loading &&
            <>
                <div className="flex gap-2 mb-12">
                  {items.map((_, i) =>
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-300"
                  style={{
                    border: `1px solid ${i === currentIndex ? "#151717" : "#B3B3B3"}`,
                    color: i === currentIndex ? "#151717" : "#B3B3B3",
                    background: i === currentIndex ? "rgba(21,23,23,0.05)" : "transparent"
                  }}>
                  
                      {String(i + 1).padStart(2, "0")}
                    </button>
                )}
                  <div className="ml-auto">
                    <Quote className="h-10 w-10 opacity-15 rotate-180" style={{ color: "#151717" }} />
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45 }}>
                  
                    <p className="font-serif italic leading-relaxed mb-8" style={{ fontSize: "clamp(19px, 2.2vw, 28px)", color: "#151717" }}>
                      "{items[currentIndex].quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold uppercase tracking-widest" style={{ color: "#151717" }}>{items[currentIndex].author}</span>
                      <span style={{ color: "#B3B3B3" }}>/</span>
                      <div className="flex gap-0.5" style={{ color: "#151717" }}>
                        {[1, 2, 3, 4, 5].map((s) => <span key={s} className="text-base leading-none">★</span>)}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </>
            }
          </AnimatedElement>
        </div>
      </div>
    </section>);

}

/* ── SERVICES ── */
function ServicesSection() {
  const services = [
  { label: "Buy", image: "https://media.base44.com/images/public/6a031b2b649f3814456c1a02/5abf9e628_findrealestate_com_buyfed72bc8_380cb417.jpg", description: "Buy smarter with expert agents backed by mortgage, legal, and appraisal pros — dialed in to get you the best deal, fast. We've done this over 10,000 times, and we know what wins." },
  { label: "Sell", image: "https://media.base44.com/images/public/6a031b2b649f3814456c1a02/fcca5e9fd_findrealestate_com_sell90b8e66b_96c2b79c.jpg", description: "Sell fast, sell high. Your listing gets pro staging, strategic pricing, constant open houses, and agents who never stop working until the right buyer signs." },
  { label: "Rent", image: "https://media.base44.com/images/public/6a031b2b649f3814456c1a02/2b4b2f5a9_findrealestate_com_rent6736c732_87b9eef4.jpg", description: "Access hidden rentals before they hit the market through agents who know every landlord in town. With decades of NYC experience, we unlock the best deals you won't find online." }];


  return (
    <section style={{ background: "#151717", color: "#F1F1F1", paddingTop: "7rem" }}>
      <div className="orbito-container" style={{ paddingBottom: "4rem" }}>
        <AnimatedElement>
          <span className="text-xs tracking-[0.22em] uppercase font-bold block mb-6" style={{ color: "rgba(241,241,241,0.4)", borderBottom: "1px solid rgba(241,241,241,0.15)", paddingBottom: "0.5rem", display: "inline-block" }}>Services</span>
          <h2 className="font-black tracking-tighter" style={{ fontSize: "clamp(48px, 6.5vw, 88px)", lineHeight: 0.93, letterSpacing: "-0.04em" }}>
            How ORBITO<br /><span style={{ color: "rgba(241,241,241,0.4)", fontWeight: 300 }}>Can Help You</span>
          </h2>
        </AnimatedElement>
      </div>

      <div style={{ borderTop: "1px solid rgba(241,241,241,0.1)", borderBottom: "1px solid rgba(241,241,241,0.1)" }}>
        {services.map((svc, i) =>
        <AnimatedElement key={i} delay={i * 80}>
            <div
            className="group relative overflow-hidden"
            style={{ height: "420px", borderBottom: i < services.length - 1 ? "1px solid rgba(241,241,241,0.1)" : "none" }}>
            
              <div className="absolute inset-0">
                <img src={svc.image} alt={svc.label} className="w-full h-full object-cover transition-transform duration-[14s] group-hover:scale-110" />
                <div className="absolute inset-0" style={{ background: "rgba(21,23,23,0.78)" }} />
              </div>
              <div className="orbito-container relative z-10 h-full flex flex-col md:flex-row items-start md:items-center justify-between gap-8 py-12">
                <div className="flex items-center gap-6 md:w-2/5">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono shrink-0 transition-colors duration-300 group-hover:bg-[#F1F1F1] group-hover:text-[#151717]" style={{ border: "1px solid rgba(241,241,241,0.3)", color: "#F1F1F1" }}>
                    {i + 1}
                  </div>
                  <p className="text-base leading-relaxed font-light" style={{ color: "rgba(241,241,241,0.75)" }}>{svc.description}</p>
                </div>
                <div className="flex justify-between items-center w-full md:w-1/2 ml-auto">
                  <h3 className="font-black tracking-tighter" style={{ fontSize: "clamp(60px, 9vw, 140px)", lineHeight: 0.8, color: "#F1F1F1" }}>{svc.label}</h3>
                  <ArrowRight className="h-16 w-16 sm:h-20 sm:w-20 transition-all duration-500 group-hover:translate-x-4" style={{ color: "rgba(241,241,241,0.25)" }} />
                </div>
              </div>
            </div>
          </AnimatedElement>
        )}
      </div>

      <div className="orbito-container py-20">
        <AnimatedElement>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <p className="font-light leading-tight max-w-2xl" style={{ fontSize: "clamp(20px, 2.4vw, 32px)", color: "#F1F1F1" }}>
              Our certified agents guide you through every stage of real estate{" "}
              <span className="font-semibold">with expert knowledge and reliable support.</span>
            </p>
            <Link to="/Properties">
              <button className="group shrink-0 inline-flex items-center gap-3 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-400 hover:-translate-y-0.5 px-8 py-4" style={{ border: "1px solid #F1F1F1", color: "#F1F1F1", background: "transparent" }}
              onMouseEnter={(e) => {e.currentTarget.style.background = "#F1F1F1";e.currentTarget.style.color = "#151717";}}
              onMouseLeave={(e) => {e.currentTarget.style.background = "transparent";e.currentTarget.style.color = "#F1F1F1";}}>
                
                <span>Get Started with ORBITO</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </AnimatedElement>
      </div>
    </section>);

}

/* ── SUPPORT ── */
function SupportSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const staticFallback = [
  { title: "Mortgage Services", description: "Helping you secure your dream home with flexible mortgage options.", image_url: "https://media.base44.com/images/public/6a031b2b649f3814456c1a02/b774f34cb_findrealestate_com_mortgage-servicese92904b1_009353ed.jpg" },
  { title: "Property Management", description: "Let us handle the details so you can enjoy the rewards.", image_url: "https://media.base44.com/images/public/6a031b2b649f3814456c1a02/5e8fd2262_findrealestate_com_property-management7a9cbb34_d27dd3e4.jpg" },
  { title: "Construction & Development", description: "Guiding you through building and developing properties with expert insight.", image_url: "https://media.base44.com/images/public/6a031b2b649f3814456c1a02/4ee46fcdc_findrealestate_com_development0de63e1b_54e494ff.jpg" }];


  useEffect(() => {
    base44.entities.Service.list().
    then((data) => setServices(data.length > 0 ? data : staticFallback)).
    catch(() => setServices(staticFallback)).
    finally(() => setLoading(false));
  }, []);

  const items = services.length > 0 ? services : staticFallback;

  return (
    <section style={{ background: "#151717", color: "#F1F1F1", paddingTop: "7rem", paddingBottom: "7rem", borderTop: "1px solid rgba(241,241,241,0.1)" }}>
      <div className="orbito-container">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-end mb-16">
          <AnimatedElement>
            <h2 className="font-black tracking-tighter" style={{ fontSize: "clamp(40px, 5vw, 80px)", lineHeight: 0.93, letterSpacing: "-0.04em" }}>
              Support Beyond<br /><span style={{ color: "rgba(241,241,241,0.35)", fontWeight: 300 }}>Buying and Selling</span>
            </h2>
          </AnimatedElement>
          <AnimatedElement delay={150}>
            <p className="text-lg font-light leading-relaxed mb-8" style={{ color: "rgba(241,241,241,0.7)" }}>
              <span style={{ color: "#F1F1F1", fontWeight: 600 }}>The real estate market never stands still — and neither do we.</span> Our experts offer continued support beyond the sale, helping you maximize your investment.
            </p>
            <button
              className="group inline-flex items-center gap-3 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-400 hover:-translate-y-0.5 px-8 py-4"
              style={{ background: "#F1F1F1", color: "#151717" }}>
              
              Discover Our Services
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </AnimatedElement>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 transition-opacity duration-500 ${loading ? "opacity-30" : "opacity-100"}`}>
          {items.map((svc, i) =>
          <AnimatedElement key={i} delay={i * 120}>
              <div className="group relative overflow-hidden flex flex-col justify-end hover:-translate-y-2 hover:shadow-2xl transition-all duration-500" style={{ borderRadius: "1.5rem", height: "420px", border: "1px solid rgba(241,241,241,0.08)" }}>
                <div className="absolute inset-0">
                  <img src={svc.image_url} alt={svc.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #151717 0%, rgba(21,23,23,0.5) 55%, transparent 100%)" }} />
                </div>
                <div className="relative z-10 p-8">
                  <h3 className="font-bold text-2xl mb-3 leading-tight" style={{ color: "#F1F1F1" }}>{svc.title}</h3>
                  <p className="text-sm leading-relaxed mb-6 font-light" style={{ color: "rgba(241,241,241,0.65)" }}>{svc.description}</p>
                  <button className="group/btn inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-300" style={{ color: "#F1F1F1" }}>
                    Learn More <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </AnimatedElement>
          )}
        </div>
      </div>
    </section>);

}

/* ── BLOG ── */
function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const staticFallback = [
  { date: "2026-04-13", title: "Q1 2026 NYC Market Report", excerpt: "Q1 2026 saw strong rental demand, active sales, and shifting pricing across NYC. Here's what it means heading into the spring market.", image_url: "https://media.base44.com/images/public/6a031b2b649f3814456c1a02/55592eadd_fresh-boot-3c0a0dc212_media_strapiapp_com_nyc_604e40fa02_215269bf.png" },
  { date: "2026-04-01", title: "Philly Real Estate: A Winter Chill or a Spring Opportunity?", excerpt: "Record-low listings and steady price growth define a unique February for the Philadelphia Metro.", image_url: "https://media.base44.com/images/public/6a031b2b649f3814456c1a02/28dd61f46_fresh-boot-3c0a0dc212_media_strapiapp_com_jonathan_gong_tl3jdt_Z_u_YM_unsplash_5f055e7e75_051daa14.jpg" },
  { date: "2026-03-09", title: "What $1M Buys in Different NYC Neighborhoods", excerpt: "Curious what $1M can still buy in today's NYC market? Explore a snapshot of available listings across Manhattan.", image_url: "https://media.base44.com/images/public/6a031b2b649f3814456c1a02/d2176ce77_fresh-boot-3c0a0dc212_media_strapiapp_com_gregreese_building_6662138_1920_96e6ea69b1_d1f0adec.jpg" }];


  useEffect(() => {
    base44.entities.BlogPost.list().
    then((data) => setPosts(data.length > 0 ? data : staticFallback)).
    catch(() => setPosts(staticFallback)).
    finally(() => setLoading(false));
  }, []);

  const items = posts.length > 0 ? posts : staticFallback;

  return (
    <section style={{ background: "#F1F1F1", paddingTop: "7rem", paddingBottom: "7rem" }}>
      <div className="orbito-container">
        <div className="grid md:grid-cols-2 gap-12 items-end mb-16 pb-12" style={{ borderBottom: "1px solid rgba(21,23,23,0.1)" }}>
          <AnimatedElement>
            <h2 className="font-black tracking-tighter" style={{ fontSize: "clamp(48px, 6.5vw, 88px)", lineHeight: 0.93, color: "#151717", letterSpacing: "-0.04em" }}>
              Blog &amp;<br /><span style={{ color: "#B3B3B3", fontWeight: 300 }}>Resources</span>
            </h2>
          </AnimatedElement>
          <AnimatedElement delay={100}>
            <div className="md:pl-8 flex flex-col items-start gap-6">
              <p className="text-lg font-light leading-relaxed" style={{ color: "#383A3A" }}>
                See how we've helped clients achieve their real estate dreams, one successful move at a time.
              </p>
              <button
                className="group inline-flex items-center gap-3 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-400 hover:-translate-y-0.5 hover:shadow-lg px-8 py-4"
                style={{ background: "#151717", color: "#F1F1F1" }}>
                
                Visit Our Blog <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </AnimatedElement>
        </div>

        <div className={`transition-opacity duration-500 ${loading ? "opacity-30" : "opacity-100"}`}>
          {items.map((post, i) =>
          <AnimatedElement key={i} delay={i * 80}>
              <div className="group grid md:grid-cols-[1.5fr_1fr] gap-10 md:gap-20 py-14 items-center" style={{ borderBottom: "1px solid rgba(21,23,23,0.1)" }}>
                <div className="order-2 md:order-1 flex flex-col justify-center">
                  <span className="text-xs tracking-widest font-bold block mb-5 pl-3" style={{ borderLeft: "2px solid #151717", color: "#151717" }}>{post.date}</span>
                  <h3 className="font-bold text-3xl sm:text-4xl mb-5 leading-tight tracking-tight group-hover:opacity-70 transition-opacity" style={{ color: "#151717" }}>{post.title}</h3>
                  <p className="leading-relaxed text-lg font-light mb-8 max-w-xl" style={{ color: "#383A3A" }}>{post.excerpt}</p>
                  <button className="group/btn inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase transition-colors px-4 py-1.5 rounded-full" style={{ border: "1px solid rgba(21,23,23,0.3)", color: "#151717" }}>
                    Read More <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="order-1 md:order-2">
                  <div className="overflow-hidden" style={{ borderRadius: "1rem", aspectRatio: "16/9" }}>
                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[10s]" />
                  </div>
                </div>
              </div>
            </AnimatedElement>
          )}
        </div>
      </div>
    </section>);

}

/* ── FINAL CTA ── */
function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden flex items-center justify-center" style={{ paddingTop: "10rem", paddingBottom: "10rem" }}>
      <div className="absolute inset-0 z-0">
        <img
          src="https://media.base44.com/images/public/6a031b2b649f3814456c1a02/90de1b44d_findrealestate_com_bgec610793_759c5b57.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ animation: "kenBurns 20s ease-out infinite alternate" }} />
        
        <div className="absolute inset-0" style={{ background: "rgba(21,23,23,0.58)" }} />
      </div>
      <div className="relative z-10 text-center px-6" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <AnimatedElement>
          <h2 className="font-black tracking-tighter mb-12" style={{ fontSize: "clamp(44px, 6vw, 88px)", lineHeight: 1.02, letterSpacing: "-0.04em" }}>
            <span style={{ color: "#B3B3B3", fontWeight: 300 }}>We will help you </span>
            <span style={{ color: "#F1F1F1" }}>move to next</span>
          </h2>
          <Link to="/Properties">
            <button
              className="group relative overflow-hidden inline-flex items-center gap-3 rounded-full text-base font-semibold tracking-widest uppercase transition-all duration-500 hover:-translate-y-1 px-10 py-5"
              style={{ background: "#F1F1F1", color: "#151717" }}>
              
              <span className="relative">Let's Get Started</span>
              <ArrowRight className="relative h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </Link>
        </AnimatedElement>
      </div>
    </section>);

}

export default function Home() {
  return (
    <div style={{ background: "#F1F1F1" }}>
      <HeroSection />
      <WhyOrbitoSection />
      <ForAgentsSection />
      <TestimonialsSection />
      <ServicesSection />
      <SupportSection />
      <BlogSection />
      <FinalCtaSection />
    </div>);

}