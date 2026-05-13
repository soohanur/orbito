import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const ANIM = {
  duration: 0.7,
  ease: "power2.out",
  y: 20,
  scale: 1.02,
  wordStagger: 0.05,
  start: "top 88%",
};
