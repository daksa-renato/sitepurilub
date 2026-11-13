"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";

/* rola até a seção; devolve false se ela não existe ou está oculta (ex.: seções .no-mob no celular) */
export const go = (id) => { const el = document.getElementById(id); if (!el || !el.offsetParent) return false; window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" }); return true; };
export const Inner = React.createContext(() => {});
export const useInner = () => React.useContext(Inner);
export const ease = [0.2, 0.7, 0.2, 1];
export const rev = (i = 0, y = 26) => ({ initial: { opacity: 0, y }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-40px" }, transition: { duration: 0.7, delay: i * 0.07, ease } });
export const L = ({ children, page, className = "lnk", i }) => {
  const open = useInner();
  const extra = i === undefined ? {} : rev(i);
  return <motion.a href="#" className={className} {...extra} onClick={(e) => { e.preventDefault(); open(page || (typeof children === "string" ? children : "Página interna")); }}>{children}</motion.a>;
};
export const Fade = ({ children, i = 0, className = "", y = 26, as = "div" }) => { const C = motion[as]; return <C className={className} {...rev(i, y)}>{children}</C>; };
