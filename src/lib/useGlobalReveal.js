import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ANIM, reduceMotion } from "@/lib/animConfig";

gsap.registerPlugin(ScrollTrigger);

const SKIP_ANCESTOR_SEL = ".anim-text, .anim-text-words, .anim-img";

const scan = () => {
  const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  headings.forEach((el) => {
    if (el.dataset.animDone) return;
    if (el.closest(SKIP_ANCESTOR_SEL)) {
      el.dataset.animDone = "skip";
      // ensure no leftover hidden state
      el.style.opacity = "";
      el.style.transform = "";
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
  });

  const images = document.querySelectorAll("img");
  images.forEach((el) => {
    if (el.dataset.animDone) return;
    if (el.closest(SKIP_ANCESTOR_SEL)) {
      el.dataset.animDone = "skip";
      el.style.opacity = "";
      el.style.transform = "";
      return;
    }
    el.dataset.animDone = "1";
    gsap.fromTo(
      el,
      { opacity: 0, scale: ANIM.scale },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: ANIM.ease,
        scrollTrigger: { trigger: el, start: ANIM.start, once: true },
      }
    );
  });
};

export function useGlobalReveal() {
  const location = useLocation();

  useEffect(() => {
    if (reduceMotion()) {
      // Strip the gate class so CSS rules don't hide anything.
      document.documentElement.classList.remove("js-anim");
      return;
    }

    // Initial scan (slight delay so React has painted the new route)
    const t = setTimeout(scan, 30);

    // Debounced re-scan on DOM mutations (covers filter changes, lazy lists,
    // dropdowns, modals, etc). scan() is idempotent via data-anim-done.
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
