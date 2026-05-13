import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "@/lib/scrollManager";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Defer one tick so the new route mounts before we reset scroll.
    const id = requestAnimationFrame(() => scrollToTop(true));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
