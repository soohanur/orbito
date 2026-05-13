import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2, User } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";
import { blogPosts, findBlogBySlug } from "@/lib/blogData";

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = findBlogBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!post) {
    return (
      <div className="orbito-container py-40 text-center" style={{ background: "#F1F1F1" }}>
        <h1 className="font-black text-4xl mb-4" style={{ color: "#151717" }}>Article not found</h1>
        <Link to="/Blog" className="underline text-sm font-semibold tracking-widest uppercase" style={{ color: "#151717" }}>
          Back to blog
        </Link>
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

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
      <section style={{ paddingBottom: "clamp(2rem, 5vw, 3rem)" }}>
        <div className="orbito-container">
          <AnimatedText as="span" className="text-xs tracking-[0.25em] uppercase font-medium block mb-5" style={{ color: "#B3B3B3" }}>
            {post.category}
          </AnimatedText>
          <AnimatedText
            as="h1"
            splitWords
            delay={0.1}
            className="font-black tracking-tighter mb-6 max-w-4xl"
            style={{ fontSize: "clamp(36px, 6vw, 76px)", lineHeight: 0.95, color: "#151717", letterSpacing: "-0.04em" }}
          >
            {post.title}
          </AnimatedText>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm" style={{ color: "#B3B3B3" }}>
            <span className="flex items-center gap-2"><User className="h-3.5 w-3.5" />{post.author}</span>
            <span className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" />
              {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
            <button
              onClick={() => { navigator.clipboard?.writeText(window.location.href); }}
              className="flex items-center gap-2 transition-colors"
              style={{ color: "#383A3A" }}
              title="Copy link"
            >
              <Share2 className="h-3.5 w-3.5" /> Share
            </button>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <section style={{ paddingBottom: "clamp(2.5rem, 6vw, 4rem)" }}>
        <div className="orbito-container">
          <div className="overflow-hidden" style={{ borderRadius: "1.5rem", aspectRatio: "16/9" }}>
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Body */}
      <section style={{ paddingBottom: "clamp(3rem, 8vw, 6rem)" }}>
        <div className="orbito-container">
          <article className="max-w-3xl mx-auto">
            <p className="font-light italic mb-10 text-lg sm:text-xl" style={{ color: "#151717", borderLeft: "3px solid #151717", paddingLeft: "1.25rem", lineHeight: 1.5 }}>
              {post.excerpt}
            </p>
            {post.body.map((para, i) => (
              <p key={i} className="text-base sm:text-lg font-light leading-relaxed mb-6" style={{ color: "#383A3A" }}>
                {para}
              </p>
            ))}
          </article>
        </div>
      </section>

      {/* Author footer */}
      <section style={{ paddingBottom: "clamp(3rem, 8vw, 6rem)" }}>
        <div className="orbito-container">
          <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl" style={{ background: "#fff", border: "1px solid rgba(21,23,23,0.07)" }}>
            <span className="text-xs uppercase tracking-widest font-semibold no-anim" style={{ color: "#B3B3B3" }}>Written by</span>
            <p className="font-bold text-xl mt-1 mb-1" style={{ color: "#151717" }}>{post.author}</p>
            <p className="text-sm font-light leading-relaxed" style={{ color: "#383A3A" }}>
              Orbito agent covering {post.category.toLowerCase()}. Reach out via the Agents page to ask a question about anything in this article.
            </p>
          </div>
        </div>
      </section>

      {/* Related */}
      <section style={{ paddingBottom: "clamp(3rem, 9vw, 7rem)" }}>
        <div className="orbito-container">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-black tracking-tighter" style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "#151717", letterSpacing: "-0.03em" }}>
              Keep reading
            </h2>
            <Link to="/Blog" className="text-xs font-semibold tracking-widest uppercase underline" style={{ color: "#151717" }}>
              All articles
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link key={p.slug} to={`/Blog/${p.slug}`} className="block">
                <div className="group overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
                  style={{ background: "#fff", borderRadius: "1rem", border: "1px solid rgba(21,23,23,0.06)" }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-5">
                    <span className="text-xs tracking-widest uppercase font-bold block mb-2" style={{ color: "#B3B3B3" }}>{p.category}</span>
                    <h3 className="font-bold text-base leading-tight mb-2" style={{ color: "#151717" }}>{p.title}</h3>
                    <p className="text-xs font-light leading-relaxed line-clamp-2" style={{ color: "#383A3A" }}>{p.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="overflow-hidden" style={{ paddingTop: "clamp(3rem, 9vw, 7rem)", paddingBottom: "clamp(3rem, 9vw, 7rem)", background: "#151717" }}>
        <div className="orbito-container">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <h2 className="font-black tracking-tighter" style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 0.95, color: "#F1F1F1", letterSpacing: "-0.03em" }}>
              More from the<br /><span style={{ color: "rgba(241,241,241,0.35)", fontWeight: 300 }}>Orbito team.</span>
            </h2>
            <Link to="/Blog">
              <button className="inline-flex items-center gap-3 rounded-full text-sm font-semibold tracking-widest uppercase px-10 py-5"
                style={{ background: "#F1F1F1", color: "#151717" }}>
                Read the blog <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
