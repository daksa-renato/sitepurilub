"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";

export function Counter({ to, suffix = "", dur = 1.6 }) {
  const ref = useRef(); const inView = useInView(ref, { once: true }); const [v, setV] = useState(0);
  useEffect(() => { const fb = setTimeout(() => { if (document.documentElement.classList.contains("no-motion")) setV(to); }, 1700); return () => clearTimeout(fb); }, []);
  useEffect(() => { if (!inView) return; const c = animate(0, to, { duration: dur, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) }); return () => c.stop(); }, [inView]);
  return <span ref={ref}>{v}{suffix}</span>;
}
