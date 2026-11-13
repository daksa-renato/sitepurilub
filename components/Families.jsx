"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";
import { Title } from "./Title";

export function Families() {
  return (
    <section className="sec" id="solucoes">
      <div className="wrap">
        <div className="sh">
          <div><Title n="01" label="Soluções mais pesquisadas" lines={["Tecnologia para cada etapa", "do ciclo de vida do óleo"]} /></div>
          <Fade as="p" i={3} className="sh-p">Cinco frentes técnicas que tratam a causa da falha, não o sintoma. Do óleo novo ao óleo em operação, com resultado comprovado em laudo.</Fade>
        </div>
        <div className="fam">
          {FAMILIES.map(f => (
            <L key={f.n} i={FAMILIES.indexOf(f)} className="fam-i" page={f.t}>
              <span className="mono fam-n">{f.n}</span>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
              <span className="fam-a"><Icon n="arrow" s={18} /></span>
            </L>
          ))}
        </div>
      </div>
    </section>
  );
}
