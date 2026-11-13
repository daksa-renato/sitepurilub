"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";
import { Title } from "./Title";
import { Img } from "./Img";

export function Sectors() {
  return (
    <section className="sec no-mob" id="setores">
      <div className="wrap">
        <div className="sh">
          <div><Title n="08" label="Setores" lines={["Onde o óleo move a operação,", "a Purilub está presente"]} /></div>
          <Fade as="p" i={3} className="sh-p">Atendemos plantas de alta exigência em todo o Brasil, das usinas hidrelétricas às siderúrgicas.</Fade>
        </div>
        <div className="sct">{SECTORS.map((s, i) => (
          <L key={s.t} i={i} className={"st" + (i === 0 ? " big" : "")} page={"Setor: " + s.t}>
            {s.img ? <Img src={s.img} alt={s.alt || s.t} className="st-img" fallback={<span className="st-pat" />} /> : <span className="st-pat" />}
            <span className="st-ic"><Icon n={s.icon} s={22} w={1.6} /></span>
            <span className="st-b"><b>{s.t}</b><span>{s.s}</span></span>
            <span className="st-ar"><Icon n="arrow" s={18} /></span>
          </L>
        ))}</div>
      </div>
    </section>
  );
}
