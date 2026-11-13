"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";
import { Title } from "./Title";

export function Services() {
  return (
    <section className="sec" id="servicos">
      <div className="wrap">
        <div className="sh">
          <div><Title n="03" label="Serviços" lines={["Serviços executados", "dentro da sua planta"]} /></div>
          <Fade as="p" i={3} className="sh-p">Descontaminação de óleo, flushing, remoção de verniz e análise de óleo com estrutura completa: técnicos, frota e equipamentos próprios.</Fade>
        </div>
        <div className="svc">{SERVICES.map((s, k) => (
          <L key={s.t} i={k % 2 + Math.floor(k / 2) * 0.5} className="svc-i" page={s.t}>
            <span className="svc-ic"><Icon n={s.icon} s={22} w={1.6} /></span>
            <div><h3>{s.t}</h3><p>{s.d}</p></div>
            <Icon n="arrow" s={16} className="svc-ar" />
          </L>
        ))}</div>
      </div>
    </section>
  );
}
