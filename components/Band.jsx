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
      <div className="wrap band-in">
        <div><span className="mono xs">NÃO SABE QUAL SOLUÇÃO ESPECIFICAR?</span><h2>Conte o problema.<br />A gente indica o caminho.</h2></div>
        <div className="band-r"><button className="btn btn-or lg" onClick={() => go("contato")}>Fale com um especialista <Icon n="arrow" s={18} /></button><a className="band-ph" href="tel:+551639819920"><Icon n="phone" s={16} /> 16 3981-9920</a></div>
      </div>
    </div>
  );
}
