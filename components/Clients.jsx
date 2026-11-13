"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";
import { Img } from "./Img";

export function Clients() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section className="clients" aria-label="Clientes">
      <div className="wrap cl-head"><motion.h2 className="cl-title" {...rev(0, 14)}>Quem confia na Purilub</motion.h2></div>
      <div className="marquee"><div className="mq-track">
        {row.map(([n, src], i) => (
          <div key={i} className="cl" title={n}><Img src={src} alt={n} className="cl-img" fallback={<span className="cl-txt">{n}</span>} /></div>
        ))}
      </div></div>
    </section>
  );
}
