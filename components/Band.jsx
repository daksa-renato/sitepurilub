"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";

export function Band() {
  return (
    <div className="band">
      <img className="band-img" src="/img/especialista-purilub-operando-equipamento-ilustracao.webp" alt="Ilustração de técnico da Purilub operando o painel de um equipamento de tratamento de óleo" width={1683} height={800} loading="lazy" />
      <div className="wrap band-in">
        <div className="band-l">
          <span className="mono xs">NÃO SABE QUAL SOLUÇÃO ESPECIFICAR?</span><h2>Conte o problema.<br />A gente indica o caminho.</h2>
          <button className="btn btn-or lg" onClick={() => go("contato")}>Fale com um especialista <Icon n="arrow" s={18} /></button>
        </div>
      </div>
    </div>
  );
}
