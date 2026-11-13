"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";

/* título de seção: índice + linha animada + rótulo, e título revelado linha a linha */
export function Title({ n, label, lines, light, center }) {
  return (
    <div className={"ttl" + (light ? " light" : "") + (center ? " center" : "")}>
      <div className="eb">
        <motion.img src={light ? logoIconW : logoIcon} alt="" className="eb-ic" initial={{ opacity: 0, scale: 0.6, rotate: -12 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 260, damping: 18 }} />
        <motion.span className="eb-line" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} />
        <motion.span className="eb-t" initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.35, ease }}>{label}</motion.span>
      </div>
      <motion.h2 initial="h" whileInView="s" viewport={{ once: true, margin: "-40px" }}>{lines.map((ln, i) => (
        <span className="ln" key={i}><motion.span className="ln-i" variants={{ h: { y: "110%" }, s: { y: "0%", transition: { duration: 0.85, delay: 0.1 + i * 0.1, ease } } }}>{ln}</motion.span></span>
      ))}</motion.h2>
    </div>
  );
}
