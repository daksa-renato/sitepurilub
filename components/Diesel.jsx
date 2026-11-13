"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";
import { Title } from "./Title";

export function Diesel() {
  const apps = [["server", "Data centers"], ["monitor", "Salas de controle"], ["hospital", "Hospitais"], ["store", "Shopping centers"], ["building", "Condomínios"], ["elevator", "Elevadores"]];
  return (
    <section className="sec diesel" id="diesel">
      <div className="wrap ds-kick">
        <motion.span className="ds-kick-l" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} />
        <motion.span className="ds-kick-t" {...rev(0, 14)}>Lançamento</motion.span>
        <motion.span className="ds-kick-l r" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} />
      </div>
      <div className="wrap ds-in">
        <div className="ds-l">
          <Title n="05" label="Óleo Diesel" lines={["Sistema de filtração e", "separação de água do Diesel"]} />
          <Fade as="p" i={2}>O Diesel estocado por longos períodos nos tanques dos geradores favorece a proliferação de bactérias e o acúmulo de água, entupindo filtros, bombas e bicos injetores. E o gerador falha justamente quando é mais necessário.</Fade>
          <Fade as="p" i={3}>Com o sistema Purilub, poucas horas de acionamento por semana mantêm o combustível limpo e o gerador pronto para a emergência.</Fade>
          <L className="btn btn-nv" page="Sistema de filtração e separação de água do Diesel">Conhecer o sistema <Icon n="arrow" s={16} /></L>
        </div>
        <motion.div className="ds-r" {...rev(1, 40)}>
          <motion.img src={imgDiesel} alt="Sistema de filtração e separação de água do Diesel Purilub" className="ds-img" initial={{ opacity: 0, y: 24, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} />
          <div className="ds-h">Garantia de suprimento de energia para:</div>
          <div className="ds-g">{apps.map(([i, t], k) => <motion.div key={t} className="ds-i" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 + k * 0.08, ease }} whileHover={{ y: -4 }}><span className="ds-ic"><Icon n={i} s={26} w={1.3} /></span><span>{t}</span></motion.div>)}</div>
        </motion.div>
      </div>
    </section>
  );
}
