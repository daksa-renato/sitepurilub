"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";
import { Title } from "./Title";

export function Approach() {
  const ref = useRef();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const steps = [["Coleta e análise", "Medimos água, partículas, acidez e potencial de verniz no nosso laboratório."], ["Plano técnico", "Indicamos serviço, equipamento ou filtro conforme o laudo e a sua operação."], ["Execução na planta", "Equipe, frota e equipamentos próprios, dentro das normas de segurança do cliente."], ["Laudo de resultado", "Novas análises comprovam a estabilização do óleo."]];
  return (
    <section className="appr">
      <div className="appr-bg" aria-hidden="true" />
      <div className="wrap appr-in">
        <div className="appr-l">
          <Title n="02" label="Como trabalhamos" lines={["Diagnóstico antes", "da solução"]} light />
          <p>Tratar óleo sem conhecer as condições dele é perda de tempo e de dinheiro. Por isso todo projeto Purilub começa pela análise e termina com o laudo.</p>
          <div className="appr-words"><span>Análise</span><i /><span>Tratamento</span><i /><span>Comprovação</span></div>
        </div>
        <ol className="appr-steps" ref={ref}><motion.span className="appr-prog" style={{ scaleY: scrollYProgress }} />{steps.map(([t, d], i) => (
          <motion.li key={t} {...rev(i)}><span className="mono">{String(i + 1).padStart(2, "0")}</span><div><h3>{t}</h3><p>{d}</p></div></motion.li>
        ))}</ol>
      </div>
    </section>
  );
}
