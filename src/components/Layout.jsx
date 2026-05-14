import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useSmoothScroll } from "@/lib/useSmoothScroll";
import { useGlobalReveal } from "@/lib/useGlobalReveal";
import { useButtonFlip } from "@/lib/useButtonFlip";

export default function Layout() {
  useSmoothScroll();
  useGlobalReveal();
  useButtonFlip();
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
