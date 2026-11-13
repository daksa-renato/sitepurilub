"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";
import { Header } from "./Header";
import { Banner } from "./Banner";
import { Footer } from "./Footer";
import { InnerModal } from "./InnerModal";

/* Modelo guardado: ficha técnica de equipamento (para uso em página interna) */
export function FichaPage() {
  const [inner, setInner] = useState(null);
  return (
    <MotionConfig reducedMotion="user">
      <Inner.Provider value={setInner}>
        <Header onSearch={() => {}} />
        <main style={{ paddingTop: 78 }}><Banner /></main>
        <Footer />
        <AnimatePresence>{inner && <InnerModal key="m" page={inner} onClose={() => setInner(null)} />}</AnimatePresence>
      </Inner.Provider>
    </MotionConfig>
  );
}
