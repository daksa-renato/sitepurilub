"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";
import { Title } from "./Title";

export function Faq() {
  const [o, setO] = useState(0);
  return (
    <section className="sec faq-sec">
      <div className="wrap">
        <div className="faq-h"><Title n="09" label="Perguntas frequentes" lines={["Dúvidas técnicas mais comuns"]} /></div>
        <div className="faq">{FAQ.map((f, k) => (
          <motion.div key={f.q} className={"fq" + (o === k ? " on" : "")} {...rev(k, 16)}>
            <button className="fq-q" aria-expanded={o === k} onClick={() => setO(o === k ? -1 : k)}><span className="mono">{String(k + 1).padStart(2, "0")}</span>{f.q}<span className="fq-ic" /></button>
            <AnimatePresence initial={false}>{o === k && (
              <motion.div className="fq-a2" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }}><p>{f.a}</p>{f.cta && <button className="fq-cta" onClick={() => go("contato")}>{f.cta}<Icon n="arrow" s={15} /></button>}</motion.div>
            )}</AnimatePresence>
          </motion.div>
        ))}</div>
      </div>
    </section>
  );
}
