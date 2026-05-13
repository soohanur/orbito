import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ANIM, reduceMotion } from "@/lib/animConfig";

gsap.registerPlugin(ScrollTrigger);

// Skip headings already wrapped by the explicit AnimatedText component
// (those carry .anim-text or .anim-text-words on the element itself).
const SKIP_SEL = ".anim-text, .anim-text-words";

const animateHeading = (el) => {
  if (el.dataset.animDone) return;
  if (el.closest(SKIP_SEL)) {
    el.dataset.animDone = "skip";
    return;
  }
  el.dataset.animDone = "1";
  gsap.fromTo(
    el,
    { opacity: 0, y: ANIM.y },
    {
      opacity: 1,
      y: 0,
      duration: ANIM.duration,
      ease: ANIM.ease,
      scrollTrigger: { trigger: el, start: ANIM.start, once: true },
    }
  );
};

const animateParagraph = (el) => {
  if (el.dataset.animDone) return;
  if (el.classList.contains("no-anim") || el.closest(SKIP_SEL)) {
    el.dataset.animDone = "skip";
    return;
  }
  el.dataset.animDone = "1";
  gsap.fromTo(
    el,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.55,
      ease: "power1.out",
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    }
  );
};

const scan = () => {
  document
    .querySelectorAll("h1, h2, h3, h4, h5, h6")
    .forEach(animateHeading);
  document.querySelectorAll("p").forEach(animateParagraph);
};

export function useGlobalReveal() {
  const location = useLocation();

  useEffect(() => {
    if (reduceMotion()) {
      document.documentElement.classList.remove("js-anim");
      return;
    }

    const t = setTimeout(scan, 30);

    // Re-scan when React renders new headings (route changes, filter swaps,
    // modal opens). scan() is idempotent via data-anim-done.
    let rafId = 0;
    const observer = new MutationObserver(() => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        scan();
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(t);
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [location.pathname]);
}
