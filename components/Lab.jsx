"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";
import { Title } from "./Title";
import { Img } from "./Img";

export function Lab() {
  return (
    <section className="lab" id="laboratorio">
      <div className="lab-photo"><Img src={R + "2023/03/bg_solucoes.webp"} alt="Análise de óleo em laboratório" className="lab-ph" fallback={<img src={imgD3} alt="" className="lab-ph" />} /></div>
      <div className="wrap lab-in">
        <motion.div className="lab-card" {...rev(0, 40)}>
          <div className="lab-l">
            <Title n="07" label="Laboratório próprio" lines={["Análise de óleo", "com laudo interpretado"]} />
            <p>Você recebe o diagnóstico e a recomendação técnica, não só uma tabela de números. É o ponto de partida de qualquer projeto.</p>
            <div className="lab-cta"><L className="btn btn-or" page="Enviar amostra">Enviar amostra para análise <Icon n="arrow" s={16} /></L><L page="Como coletar amostras">Como coletar <Icon n="arrow" s={14} /></L></div>
          </div>
          <ul className="lab-ul">{["Classe de pureza · ISO 4406 / NAS", "Teor de água", "Número ácido (TAN) e básico (TBN)", "Potencial de verniz (MPC)", "Viscosidade e ensaios físico-químicos"].map((i, k) => <motion.li key={i} {...rev(k + 2, 12)}><Icon n="check" s={16} w={2.2} />{i}</motion.li>)}</ul>
        </motion.div>
      </div>
    </section>
  );
}
