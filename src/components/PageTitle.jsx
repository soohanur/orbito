import { useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";
import { findPropertyBySlug } from "@/lib/propertiesData";
import { findAgentBySlug } from "@/lib/agentsData";
import { findBlogBySlug } from "@/lib/blogData";

const BRAND = "Orbito";

const exact = {
  "/": `${BRAND} — Real Estate, Rewired`,
  "/Properties": `Property — ${BRAND}`,
  "/Agents": `Agents — ${BRAND}`,
  "/Join": `Join — ${BRAND}`,
  "/About": `About — ${BRAND}`,
  "/Buy": `Buy — ${BRAND}`,
  "/Sell": `Sell — ${BRAND}`,
  "/Rent": `Rent — ${BRAND}`,
  "/Blog": `Blog — ${BRAND}`,
  "/SignIn": `Sign In — ${BRAND}`,
  "/Register": `Create Account — ${BRAND}`,
  "/Profile": `Profile — ${BRAND}`,
};

const titleFor = (pathname) => {
  if (exact[pathname]) return exact[pathname];

  let m = matchPath("/Properties/:slug", pathname);
  if (m) {
    const p = findPropertyBySlug(m.params.slug);
    return p ? `${p.neighborhood} · ${p.address} — ${BRAND}` : `Property — ${BRAND}`;
  }

  m = matchPath("/Agents/:slug", pathname);
  if (m) {
    const a = findAgentBySlug(m.params.slug);
    return a ? `${a.name} · Agent — ${BRAND}` : `Agent — ${BRAND}`;
  }

  m = matchPath("/Blog/:slug", pathname);
  if (m) {
    const b = findBlogBySlug(m.params.slug);
    return b ? `${b.title} — ${BRAND}` : `Blog — ${BRAND}`;
  }

  return BRAND;
};

export default function PageTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = titleFor(pathname);
  }, [pathname]);
  return null;
}
