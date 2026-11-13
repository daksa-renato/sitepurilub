"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";

export function Search({ onClose }) {
  const [q, setQ] = useState("");
  const ref = useRef();
  const openInner = useInner();
  useEffect(() => { ref.current?.focus(); const f = (e) => e.key === "Escape" && onClose(); window.addEventListener("keydown", f); return () => window.removeEventListener("keydown", f); }, []);
  const n = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const res = useMemo(() => q.trim().length < 2 ? [] : SEARCH_INDEX.filter(i => n(i.t + " " + i.d).includes(n(q))).slice(0, 8), [q]);
  return (
    <motion.div className="ov" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="srch" onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, y: -16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }} transition={{ duration: 0.28, ease }}>
        <div className="srch-in"><Icon n="search" s={22} /><input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Busque por solução, equipamento ou serviço" aria-label="Buscar" /><span className="kbd">ESC</span></div>
        {q.trim().length < 2 ? (
          <div className="srch-s"><span className="mono xs mut">BUSCAS FREQUENTES</span><div>{["filtração de óleo", "flushing", "verniz", "água no óleo", "óleo isolante", "P-C2RS", "respiro"].map(s => <button key={s} className="chip" onClick={() => setQ(s)}>{s}</button>)}</div></div>
        ) : res.length ? (
          <ul className="srch-r">{res.map((r, i) => <motion.li key={r.t} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}><a href="#" onClick={(e) => { e.preventDefault(); onClose(); openInner(r.t); }}><span className="mono xs">{r.type}</span><b>{r.t}</b><span className="mut sm">{r.d}</span><Icon n="arrow" s={16} /></a></motion.li>)}</ul>
        ) : <p className="srch-e mut">Nada encontrado para “{q}”. Fale com um especialista: <b>16 3981-9920</b></p>}
      </motion.div>
    </motion.div>
  );
}
