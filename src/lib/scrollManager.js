let lenisInstance = null;

export const setLenis = (l) => {
  lenisInstance = l;
};

export const scrollToTop = (immediate = true) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate });
  } else if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, left: 0, behavior: immediate ? "instant" : "smooth" });
  }
};
