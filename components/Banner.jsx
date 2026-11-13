"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";
import { SlantPanel } from "./SlantPanel";
import { Img } from "./Img";

export function Banner() {
  const rows = [["Vazões disponíveis", "1.000 · 1.500 · 1.900 · 2.300 · 2.700 · 3.500 lph"], ["Viscosidade máxima", "460 cSt @ 600 lph · 90 cSt @ 3.500 lph"], ["Filtração de linha", "2 estágios · Beta = 1.000"], ["Motor", "2 CV · 220 / 380 / 440 V · 3Ø · 60 Hz"], ["Dimensões / peso", "700 × 500 × 1.100 mm · 90 kg"]];
  return (
    <section className="banner">
      <div className="wrap">
        <motion.div className="bn" {...rev(0, 40)}>
          <div className="bn-head">
            <SlantPanel className="bn-panel" slant={0.42} r={70} />
            <span className="bn-sub">Unidade móvel de filtragem<br />até <b>3.500 lph</b> e <b>460 cSt</b></span>
            <h2>P-EFO-B21</h2>
          </div>
          <div className="bn-body">
            <div className="bn-txt">
              <p className="bn-lead">Carrinho de filtragem absoluta de uso geral para óleos lubrificantes, hidráulicos e isolantes. Com 50 cm de largura, passa por qualquer porta ou corredor: o modelo mais versátil para uso contínuo em planta.</p>
              <div className="bn-h">Principais diferenciais</div>
              <ul className="bn-ul">
                <li>Robusto e leve: 90 kg, apenas 4,1 kgf para iniciar o deslocamento</li>
                <li>Elementos absolutos Beta = 1.000 em 2 estágios, inclusive absorvedores de umidade</li>
                <li>Engates mini-mess, válvula de amostra, bacia de contenção e bandeja porta-ferramentas</li>
              </ul>
              <div className="bn-h">Dados técnicos</div>
              <dl className="tbl">{rows.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl>
              <div className="bn-cta"><L className="btn btn-or" page="P-EFO-B21">Solicitar proposta <Icon n="arrow" s={16} /></L><L page="P-EFO-B21 · ficha técnica">Ficha técnica completa <Icon n="arrow" s={15} /></L></div>
            </div>
            <div className="bn-img"><Img src={R + "2022/01/thumb_660x660_P-EFO.webp"} alt="Unidade móvel de filtragem P-EFO-B21" className="bn-photo" fallback={<div className="bn-fb"><Icon n="gear" s={64} w={1} /></div>} /></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
