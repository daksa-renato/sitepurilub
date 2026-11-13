"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";

/* painel com borda inclinada e canto arredondado geometricamente perfeito */
export function SlantPanel({ className = "", slant = 0.34, r = 120 }) {
  const ref = useRef(); const [[W, H], setSz] = useState([0, 0]);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const upd = () => setSz([el.offsetWidth, el.offsetHeight]); upd();
    if (!window.ResizeObserver) return;
    const ro = new ResizeObserver(upd); ro.observe(el); return () => ro.disconnect();
  }, []);
  let d = "";
  if (W && H) {
    const xT = W, xB = Math.max(r * 1.2, W - H * slant);
    const l = Math.hypot(xT - xB, H), v1 = [(xT - xB) / l, -H / l], v2 = [-1, 0];
    const th = Math.acos(v1[0] * v2[0] + v1[1] * v2[1]);
    const rr = Math.min(r, H * 0.45), t = rr / Math.tan(th / 2);
    const P1 = [xB + v1[0] * t, H + v1[1] * t], P2 = [xB - t, H];
    d = `M0 0H${xT}L${P1[0].toFixed(2)} ${P1[1].toFixed(2)}A${rr} ${rr} 0 0 1 ${P2[0].toFixed(2)} ${P2[1].toFixed(2)}H0Z`;
  }
  return <div ref={ref} className={"slant " + className} aria-hidden="true">{d && <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}><path d={d} /></svg>}</div>;
}
