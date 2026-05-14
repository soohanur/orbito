import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BRAND_DARK = "rgb(21, 23, 23)";
const BRAND_LIGHT = "rgb(241, 241, 241)";

const isTransparent = (c) =>
  !c || c === "transparent" || c === "rgba(0, 0, 0, 0)" || c === "rgba(0,0,0,0)";

const invertBrand = (c) => {
  if (!c) return c;
  if (c === BRAND_DARK) return BRAND_LIGHT;
  if (c === BRAND_LIGHT) return BRAND_DARK;
  // Detect close-to-light vs close-to-dark for non-exact values
  const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (m) {
    const avg = (parseInt(m[1]) + parseInt(m[2]) + parseInt(m[3])) / 3;
    return avg > 127 ? BRAND_DARK : BRAND_LIGHT;
  }
  return c;
};

const getParentBg = (el) => {
  let p = el.parentElement;
  while (p && p !== document.body) {
    const c = getComputedStyle(p).backgroundColor;
    if (c && !isTransparent(c)) return c;
    p = p.parentElement;
  }
  return getComputedStyle(document.body).backgroundColor || "rgb(241, 241, 241)";
};

const setup = (btn) => {
  if (btn.dataset.flipReady) return;

  const cs = getComputedStyle(btn);
  const bg = cs.backgroundColor;
  const color = cs.color;
  const borderColor = cs.borderTopColor;
  const borderWidth = parseFloat(cs.borderTopWidth || "0");

  const transparentBg = isTransparent(bg);
  const hasBorder = borderWidth > 0;

  // Skip naked buttons (no bg, no border): usually icon-only triggers.
  if (transparentBg && !hasBorder) {
    btn.dataset.flipReady = "skip";
    return;
  }

  btn.dataset.flipReady = "1";

  let flipBg, flipColor, flipBorder;
  if (transparentBg) {
    // currently transparent + border -> on hover, solid in border color
    flipBg = borderColor;
    flipColor = invertBrand(borderColor);
    flipBorder = `1px solid ${borderColor}`;
  } else {
    // currently solid -> on hover, transparent with border + text in a
    // color that contrasts with the surrounding section (not the button's
    // own bg). Keeps the hover state readable whether the button sits on
    // a light page or a dark section.
    const parentBg = getParentBg(btn);
    const contrast = invertBrand(parentBg);
    flipBg = "transparent";
    flipColor = contrast;
    flipBorder = `1px solid ${contrast}`;
  }

  // Snapshot original inline style values for restore
  const orig = {
    background: btn.style.background,
    backgroundColor: btn.style.backgroundColor,
    color: btn.style.color,
    border: btn.style.border,
    borderColor: btn.style.borderColor,
  };

  const onEnter = () => {
    btn.style.background = flipBg;
    btn.style.color = flipColor;
    btn.style.border = flipBorder;
  };
  const onLeave = () => {
    btn.style.background = orig.background || "";
    btn.style.backgroundColor = orig.backgroundColor || "";
    btn.style.color = orig.color || "";
    btn.style.border = orig.border || "";
    btn.style.borderColor = orig.borderColor || "";
  };

  btn.addEventListener("mouseenter", onEnter);
  btn.addEventListener("mouseleave", onLeave);
};

const scan = () => {
  document.querySelectorAll("button").forEach(setup);
};

export function useButtonFlip() {
  const location = useLocation();

  useEffect(() => {
    // Wait one frame for the route to paint, then a small extra delay so
    // computedStyle reflects loaded fonts / late inline style changes.
    const t = setTimeout(scan, 60);

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
