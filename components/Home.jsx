"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";
import { ScrollProgress } from "./ScrollProgress";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Clients } from "./Clients";
import { Services } from "./Services";
import { Approach } from "./Approach";
import { Diesel } from "./Diesel";
import { Band } from "./Band";
import { Equipment } from "./Equipment";
import { Brands } from "./Brands";
import { Lab } from "./Lab";
import { Sectors } from "./Sectors";
import { Faq } from "./Faq";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { Search } from "./Search";
import { InnerModal } from "./InnerModal";

export function Home() {
  const [search, setSearch] = useState(false);
  const [inner, setInner] = useState(null);
  useEffect(() => { const f = (e) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearch(true); } }; window.addEventListener("keydown", f); return () => window.removeEventListener("keydown", f); }, []);
  return (
    <MotionConfig reducedMotion="user">
    <Inner.Provider value={setInner}>
      <ScrollProgress />
      <Header onSearch={() => setSearch(true)} />
      <main>
        <Hero />
        <Clients />
        <Services />
        <Approach />
        <Diesel />
        <Band />
        <Equipment />
        <Brands />
        <Lab />
        <Sectors />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <motion.a className="wa" href="#" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1.6 }} onClick={(e) => { e.preventDefault(); setInner("WhatsApp comercial"); }} aria-label="WhatsApp"><WA /></motion.a>
      <AnimatePresence>{search && <Search key="s" onClose={() => setSearch(false)} />}</AnimatePresence>
      <AnimatePresence>{inner && <InnerModal key="m" page={inner} onClose={() => setInner(null)} />}</AnimatePresence>
    </Inner.Provider>
    </MotionConfig>
  );
}
