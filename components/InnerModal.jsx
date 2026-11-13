"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";

export function InnerModal({ page, onClose }) {
  useEffect(() => { const f = (e) => e.key === "Escape" && onClose(); window.addEventListener("keydown", f); return () => window.removeEventListener("keydown", f); }, []);
  return (
    <motion.div className="ov" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="inner" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={page} initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} transition={{ duration: 0.32, ease }}>
        <div className="mono xs mut">HOME / {page.toUpperCase()}</div>
        <h3>{page}</h3>
        <p className="mut">Página interna. Neste protótipo navegável, apenas a Home está construída. Cada menu, card e link já tem seu destino previsto na arquitetura do novo site.</p>
        <div className="inner-b"><button className="btn btn-nv" onClick={onClose}>Voltar para a Home</button><button className="btn btn-line" onClick={() => { onClose(); go("contato"); }}>Fale com um especialista</button></div>
      </motion.div>
    </motion.div>
  );
}
