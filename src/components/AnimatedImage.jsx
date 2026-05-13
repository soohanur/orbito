import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ANIM, reduceMotion } from "@/lib/animConfig";

/**
 * Soft fade-in + tiny scale-down for images.
 * Wraps an <img> (or any element) and animates it on scroll-into-view.
 * Initial hidden state set via CSS .anim-img so no FOUC.
 *
 *   <AnimatedImage>
 *     <img src="..." alt="" />
 *   </AnimatedImage>
 */
export default function AnimatedImage({
  delay = 0,
  duration = 0.8,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduceMotion()) {
      el.style.opacity = 1;
      el.style.transform = "none";
      return;
    }

    const tween = gsap.to(el, {
      opacity: 1,
      scale: 1,
      duration,
      delay,
      ease: ANIM.ease,
      scrollTrigger: { trigger: el, start: ANIM.start, once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, duration]);

  return (
    <div ref={ref} className={`anim-img ${className}`} {...rest}>
      {children}
    </div>
  );
}
