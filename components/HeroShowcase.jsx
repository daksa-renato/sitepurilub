"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";
import { Img } from "./Img";

/* ---------- Vitrine de equipamentos (abertura) ---------- */
const DUR = 6.5;
/* O slide inicial é sorteado só depois de montar no navegador: o HTML estático sai sempre com o
   primeiro slide (oculto), evitando divergência de hidratação entre servidor e cliente. */
export function HeroShowcase() {
  const [start, setStart] = useState(null);
  useEffect(() => { setStart(Math.floor(Math.random() * SHOWCASE.length)); }, []);
  return <div style={{ display: "contents", visibility: start === null ? "hidden" : undefined }}><Showcase key={start === null ? "ssr" : start} start={start || 0} /></div>;
}
function Showcase({ start }) {
  const N = SHOWCASE.length;
  const [[i, dir], setI] = useState(() => [start, 1]);
  const [paused, setPaused] = useState(false);
  const prog = useMotionValue(0);
  const ctrl = useRef();
  const step = (d) => setI(([x]) => [(x + d + N) % N, d]);
  const to = (k) => setI(([x]) => (k === x ? [x, 1] : [k, k > x ? 1 : -1]));
  useEffect(() => {
    prog.set(0);
    const c = animate(prog, 1, { duration: DUR, ease: "linear", onComplete: () => step(1) });
    ctrl.current = c; if (paused) c.pause();
    return () => c.stop();
  }, [i]);
  useEffect(() => { const c = ctrl.current; if (c) paused ? c.pause() : c.play(); }, [paused]);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 60]);
  const s = SHOWCASE[i];
  const open = useInner();
  return (
    <div className="show" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-roledescription="carrossel" aria-label="Equipamentos em destaque">
      <div className="show-orb" aria-hidden="true" />
      <motion.div className="show-stage" style={{ y }}>
        <AnimatePresence initial={false} custom={dir}>
          <motion.div key={s.id} className="show-img" custom={dir}
            initial={{ clipPath: "circle(0% at 50% 64%)" }}
            animate={{ clipPath: "circle(78% at 50% 64%)", transition: { duration: 1.15, ease: [0.65, 0, 0.35, 1] } }}
            exit={(d) => ({ opacity: 0, scale: 0.9, x: d * -60, filter: "blur(8px)", transition: { duration: 0.7, ease } })}
            drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.18}
            onDragEnd={(e, info) => { if (info.offset.x < -60) step(1); else if (info.offset.x > 60) step(-1); }}>
            {s.img ? <Img src={s.img} alt={s.alt || s.name} fallback={<ShowPh s={s} />} /> : <ShowPh s={s} />}
          </motion.div>
        </AnimatePresence>
        <motion.span key={"r" + i} className="show-ripple" aria-hidden="true" initial={{ scale: 0.2, opacity: 0.7 }} animate={{ scale: 2.4, opacity: 0 }} transition={{ duration: 1.3, ease: "easeOut" }} />
      </motion.div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={s.id} className="show-name" initial="h" animate="s" exit="x" variants={{ s: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}>
          <span className="ln"><motion.b className="ln-i" variants={{ h: { y: "105%" }, s: { y: "0%", transition: { duration: 0.7, ease } }, x: { y: "-105%", transition: { duration: 0.35 } } }}>{s.name}</motion.b></span>
          <motion.span className="show-sub" variants={{ h: { opacity: 0, y: 8 }, s: { opacity: 1, y: 0 }, x: { opacity: 0 } }}>{s.sub}</motion.span>
        </motion.div>
      </AnimatePresence>


      <div className="show-ctrl">
        <button className="arw" onClick={() => step(-1)} aria-label="Equipamento anterior"><Icon n="arrow" s={18} className="flip" /></button>
        <button className="arw" onClick={() => step(1)} aria-label="Próximo equipamento"><Icon n="arrow" s={18} /></button>
        <span className="cnt"><b>{String(i + 1).padStart(2, "0")}</b> / {String(N).padStart(2, "0")}</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.a key={s.id} href="#" className="show-cta" onClick={(e) => { e.preventDefault(); open(s.page || s.name); }} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.3, ease } }} exit={{ opacity: 0, x: -8, transition: { duration: 0.2 } }}>
            <span className="show-cta-t">{s.cta || "Conhecer o " + s.name}</span>
            <span className="show-cta-i"><Icon n="arrow" s={16} w={2} /></span>
          </motion.a>
        </AnimatePresence>
      </div>
    </div>
  );
}
function ShowPh({ s }) {
  return <div className="show-ph"><img src={logoIcon} alt="" /><b>{s.name}</b><span>Imagem do equipamento em breve</span></div>;
}
