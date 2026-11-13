"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";
import { SlantPanel } from "./SlantPanel";
import { Counter } from "./Counter";
import { HeroShowcase } from "./HeroShowcase";

/* ---------- Hero ---------- */
export function Hero() {
  const { scrollY } = useScroll();
  const h = (d) => ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease } });
  return (
    <section className="hero">
      <div className="hero-stage">
        <motion.div className="hero-panel-w" initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1, ease }}><SlantPanel className="hero-panel" slant={0.27} r={130} /></motion.div>
        <svg className="hero-drop" viewBox="0 0 400 640" aria-hidden="true">
          <motion.path d="M70 20 L330 470 A170 170 0 1 1 20 560" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, delay: 0.5, ease: "easeInOut" }} />
          <motion.path className="g" d="M10 150 L250 560 A120 120 0 1 1 -20 600" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, delay: 0.8, ease: "easeInOut" }} />
        </svg>
        <div className="wrap hero-in">
          <div className="hero-txt">
            <motion.div className="hero-iso" {...h(0.25)} aria-label="Certificações ISO 9001 e ISO 14001"><span>ISO 9001</span><span>ISO 14001</span></motion.div>
            <h1>{["Filtração e purificação", "de óleos industriais"].map((t, i) => (
              <span className="ln" key={i}><motion.span className="ln-i" initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 1, delay: 0.35 + i * 0.12, ease }}>{t}</motion.span></span>
            ))}</h1>
            <motion.p className="hero-lead" {...h(0.65)}>Removemos água, partículas e verniz de óleos lubrificantes, hidráulicos, isolantes e Diesel, dentro da sua planta e sem parar a operação.</motion.p>
            <motion.div className="hero-cta" {...h(0.8)}>
              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="btn btn-or lg" onClick={() => go("contato")}>Fale com um especialista <Icon n="arrow" s={18} /></motion.button>
              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="btn btn-glass lg" onClick={() => go("servicos")}>Conheça as soluções</motion.button>
            </motion.div>
          </div>
          <div className="hero-vis"><HeroShowcase /></div>
        </div>
      </div>
      <div className="wrap hero-stats">
        {[["award", <>Mais de <Counter to={35} /> anos<br />de experiência</>, "No tratamento de óleos"], ["shield", <>Qualidade<br />ISO 9001 · 14001</>, "Certificação DQS / IQNet"], ["book", <>Inovação<br />Patente INPI</>, "Processo de filtragem próprio"], ["truck", <>Distribuidora oficial<br />no Brasil</>, "EPT Clean Oil · TTI"]].map(([i, b, t], k) => (
          <Fade key={k} i={k} className="hs" y={16}><Icon n={i} s={26} w={1.4} /><div><b>{b}</b><span>{t}</span></div></Fade>
        ))}
      </div>
      <div className="gold-bar" />
    </section>
  );
}
