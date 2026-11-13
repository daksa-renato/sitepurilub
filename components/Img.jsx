"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";

/* imagem remota com fallback elegante */
export function Img({ src, alt, className = "", fallback }) {
  const [bad, setBad] = useState(!src);
  const ref = useRef();
  /* erro de carga ocorrido antes da hidratação não dispara onError: confere ao montar */
  useEffect(() => { const el = ref.current; if (el && el.complete && el.naturalWidth === 0) setBad(true); }, []);
  if (bad) return fallback || <div className={"img-fb " + className}><Icon n="gear" s={28} w={1.3} /></div>;
  return <img ref={ref} src={src} alt={alt} className={className} loading="lazy" onError={() => setBad(true)} />;
}
