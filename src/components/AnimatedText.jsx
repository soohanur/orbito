import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ANIM, reduceMotion } from "@/lib/animConfig";

/**
 * Minimal fade + y-rise text reveal on scroll-into-view.
 *
 *   <AnimatedText>Body text</AnimatedText>
 *   <AnimatedText as="h1" splitWords>Hero headline</AnimatedText>
 *   <AnimatedText delay={0.1}>Subhead</AnimatedText>
 *
 * Initial hidden state is set via CSS (.anim-text / .anim-word) so there is
 * no FOUC if JS is slow.
 */
export default function AnimatedText({
  as: Tag = "div",
  splitWords = false,
  delay = 0,
  duration = ANIM.duration,
  y = ANIM.y,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduceMotion()) {
      gsap.set(el, { clearProps: "all" });
      el.querySelectorAll(".anim-word").forEach((w) =>
        gsap.set(w, { clearProps: "all" })
      );
      el.style.opacity = 1;
      return;
    }

    const words = splitWords ? el.querySelectorAll(".anim-word") : null;

    const tween = splitWords
      ? gsap.to(words, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger: ANIM.wordStagger,
          ease: ANIM.ease,
          scrollTrigger: { trigger: el, start: ANIM.start, once: true },
          onStart: () => {
            el.style.opacity = 1;
          },
        })
      : gsap.to(el, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: ANIM.ease,
          scrollTrigger: { trigger: el, start: ANIM.start, once: true },
        });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [splitWords, delay, duration, y]);

  if (splitWords && typeof children === "string") {
    const words = children.split(/(\s+)/);
    return (
      <Tag ref={ref} className={`anim-text-words ${className}`} {...rest}>
        {words.map((w, i) =>
          /\s+/.test(w) ? (
            <span key={i}>{w}</span>
          ) : (
            <span key={i} className="anim-word">
              {w}
            </span>
          )
        )}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={`anim-text ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
