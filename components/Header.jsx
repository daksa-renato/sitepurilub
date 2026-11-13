"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";

/* ---------- Header ---------- */
/* Mega menus. Regra: no máximo 2 níveis (coluna > item). O que no site antigo era submenu de até 6 níveis
   virou a linha de apoio de cada item (vazão, fluido, aplicação). Item: string ou { t, d, p (título da página), soon }. */
const MENUS = {
  "Serviços": [
    { h: "Tratamento do óleo", s: "Óleo em operação", items: [
      { t: "Descontaminação de óleo", d: "Remove partículas, água e resíduos" },
      { t: "Prevenção de verniz", d: "Trata a causa raiz da oxidação" },
      { t: "Tratamento de óleo isolante", d: "Óleo de transformadores" },
    ] },
    { h: "Limpeza de sistemas", s: "Tubulações e circuitos", items: [
      { t: "Flushing", d: "Arraste em alta velocidade · ISO 23309" },
      { t: "Decapagem", d: "Remoção química de incrustações" },
    ] },
    { h: "Óleo novo", s: "Antes de entrar na máquina", items: [
      { t: "Purificação de óleo novo", d: "Filtragem e transporte a granel" },
      { t: "Envase de óleos", d: "Óleo enquadrado em embalagem limpa" },
    ] },
    { h: "Diagnóstico e suporte", s: "Antes e depois do tratamento", items: [
      { t: "Laboratório de análise", d: "Laudo físico-químico interpretado" },
      { t: "Assessoria e treinamentos", d: "Capacitação em lubrificação" },
      { t: "Reforma e upgrade", d: "Termovácuos, centrífugas e filtros" },
    ] },
  ],
  "Equipamentos": [
    { h: "Filtragem", s: "Remove partículas", items: [
      { t: "P-EFO-B21", d: "Carrinho · até 3.500 lph" },
      { t: "P-EFO · 6.700 lph", d: "Carrinho · até 1.500 cSt" },
      { t: "P-EFO(2R)", d: "Compacto · até 1.000 lph" },
      { t: "P-EFO-DRUM", d: "Para tambores de 200 litros" },
      { t: "P-TEF", d: "Portátil de extra filtragem" },
      { t: "Unidades personalizadas", d: "Fixas ou móveis, sob projeto" },
    ] },
    { h: "Purificação", s: "Remove água", items: [
      { t: "P-C2RS®", d: "Desumidificação com nitrogênio" },
      { t: "P-TMR® N₂", d: "Nitrogênio no reservatório" },
      { t: "P-TVF", d: "Termovácuo + extra filtragem" },
      { t: "P-COO", d: "Centrífuga · 500 a 5.000 lph" },
      { t: "P-CVF", d: "Centrífuga + termovácuo" },
      { t: "Centrífuga para óleo de corte", d: "Reuso do fluido de usinagem" },
    ] },
    { h: "Verniz", s: "Prevenção e regeneração", items: [
      { t: "P-EFO-SVR", d: "Sistema tipo diálise, em tempo integral" },
      { t: "ICB® RO", d: "Turbinas a vapor ou a gás" },
      { t: "ICB® JET", d: "Turbinas aeroderivadas" },
      { t: "ICB® AW", d: "Óleo hidráulico" },
      { t: "ICB® FRF", d: "Éster fosfato" },
    ] },
    { h: "Filtros e respiros", s: "Reposição e proteção", items: [
      { t: "Spin-on B21", p: "Spin-on Série B21", d: "Sucção e retorno · até 160 lpm" },
      { t: "Cartucho C05", d: "Retorno · até 500 lpm" },
      { t: "Cartucho C15", d: "Retorno · até 1.500 lpm" },
      { t: "Respiros dessecantes TTI", d: "PowerBreather™ Standard e CV" },
    ] },
    { h: "Especiais", s: "Flushing e Diesel", items: [
      { t: "Sistema Diesel", p: "Sistema de filtração e separação de água do Diesel", d: "Filtração e separação de água" },
      { t: "Caminhão de flushing", d: "Para aerogeradores, em campo" },
      { t: "P-FEF · Bancadas de flushing", d: "Sob projeto · ISO 23309" },
    ] },
  ],
  "Marcas": [
    { h: "TTI", items: ["Respiros PowerBreather™", "Modelo Standard", "Modelo CV", "Elementos filtrantes"] },
    { h: "EPT Clean Oil", items: ["P-EFO-SVR", "Resina iônica ICB®", "SVR® AW · RO · JET · FRF"] },
  ],
};
const item = (i) => (typeof i === "string" ? { t: i } : i);
/* menus largos: rodapé com atalho para o contato */
const WIDE = {
  "Serviços": { q: "Não sabe qual serviço especificar?" },
  "Equipamentos": { q: "Não sabe qual equipamento especificar?" },
};
/* Botão "Conteúdos": menu simples (sem mega menu) com os 3 materiais do site atual.
   Slugs atuais: /blog/, /ebooks-gratuitos/, /cases-de-sucesso/ */
const CONTENT = [
  { t: "Blog técnico", d: "Artigos sobre lubrificação e óleos", icon: "flask" },
  { t: "E-books gratuitos", d: "Guias para baixar e consultar", icon: "book" },
  { t: "Cases de sucesso", d: "Resultados em plantas de clientes", icon: "award" },
];

/* Botão "Laboratório": seção da Home e a área restrita de laudos (sistema atual, fora deste site). */
const LAB_AREA = "https://www.purilub.com.br/sistema/acesso-area-restrita";
const LAB = [
  { t: "Nosso Laboratório", d: "Análises, ensaios e envio de amostras", icon: "flask2", to: "laboratorio" },
  { t: "Acesse suas Análises", d: "Área restrita com os seus laudos", icon: "lock", href: LAB_AREA },
];
const SIMPLE = { "Laboratório": LAB, "Conteúdos": CONTENT };

export function Header({ onSearch }) {
  const [open, setOpen] = useState(null);
  const [mob, setMob] = useState(false);
  const [solid, setSolid] = useState(false);
  const openInner = useInner();
  const tm = useRef();
  useEffect(() => { const f = () => setSolid(window.scrollY > 40); f(); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  const on = true;
  const enter = (k) => { clearTimeout(tm.current); setOpen(k); };
  const leave = () => { tm.current = setTimeout(() => setOpen(null), 180); };
  return (
    <header className={"hdr" + (on ? " solid" : "")} onMouseLeave={leave}>
      <div className="wrap hdr-in">
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label="Purilub, início" className="brand-a">
          <img src={on ? logoColor : logoWhite} alt="Purilub · Rentabilidade gota a gota" className="logo" />
        </a>
        <nav className="nav hide-md" aria-label="Principal">
          {Object.keys(MENUS).map(k => (
            <button key={k} className={"nav-a" + (open === k ? " on" : "")} onMouseEnter={() => enter(k)} onClick={() => setOpen(open === k ? null : k)} aria-expanded={open === k}>{k}<Icon n="chev" s={13} w={2} /></button>
          ))}
          {Object.keys(SIMPLE).map(k => (
            <div key={k} className="nav-dd" onMouseEnter={() => enter(k)}>
              <button className={"nav-a" + (open === k ? " on" : "")} onClick={() => setOpen(open === k ? null : k)} aria-expanded={open === k} aria-haspopup="true">{k}<Icon n="chev" s={13} w={2} /></button>
              <AnimatePresence>{open === k && (
                <motion.div className="dd" role="menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22, ease }}>
                  {SIMPLE[k].map(c => <DdItem key={c.t} c={c} close={() => setOpen(null)} />)}
                </motion.div>
              )}</AnimatePresence>
            </div>
          ))}
          <button className="nav-a" onMouseEnter={() => setOpen(null)} onClick={() => openInner("Quem somos")}>Sobre</button>
        </nav>
        <div className="hdr-r">
          <button className="ic-btn" onClick={onSearch} aria-label="Buscar"><Icon n="search" s={19} w={1.9} /></button>
          <button className="btn btn-or hide-sm" onClick={() => go("contato")}>Fale com um especialista</button>
          <button className="ic-btn show-md" onClick={() => setMob(true)} aria-label="Abrir menu"><Icon n="menu" s={22} /></button>
        </div>
      </div>
      <AnimatePresence>{open && MENUS[open] && (
        <motion.div className="mega" onMouseEnter={() => enter(open)} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25, ease }}>
          <motion.div key={open} className={"wrap mega-g" + (WIDE[open] ? " wide" : "")} style={WIDE[open] ? { "--cols": MENUS[open].length } : undefined} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            {MENUS[open].map(c => (
              <div key={c.h} className="mega-c"><div className="mega-h">{c.h}{c.s && <span>{c.s}</span>}</div>{c.items.map(item).map(i => (
                <L key={i.t} className={"mega-a" + (i.d ? " has-d" : "")} page={i.p || i.t}><span className="mega-at"><b>{i.t}{i.soon && <em>em breve</em>}</b>{i.d && <span>{i.d}</span>}</span><Icon n="arrow" s={14} /></L>
              ))}</div>
            ))}
          </motion.div>
          {WIDE[open] && (
            <div className="mega-ft"><div className="wrap mega-ft-in">
              <span>{WIDE[open].q} <button onClick={() => { setOpen(null); go("contato"); }}>Fale com um especialista <Icon n="arrow" s={14} /></button></span>
            </div></div>
          )}
        </motion.div>
      )}</AnimatePresence>
      <AnimatePresence>{mob && (
        <motion.div className="drawer" role="dialog" aria-label="Menu" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 260, damping: 32 }}>
          <div className="drawer-top"><img src={logoColor} alt="Purilub" className="logo" /><button className="ic-btn" onClick={() => setMob(false)} aria-label="Fechar"><Icon n="close" /></button></div>
          {Object.keys(MENUS).map(k => (
            <details key={k} className="dr-s"><summary>{k}<Icon n="chev" s={16} /></summary>{MENUS[k].map(c => (
              <div key={c.h} className="dr-g"><div className="dr-h">{c.h}</div>{c.items.map(item).map(i => <L key={i.t} className="dr-a" page={i.p || i.t}>{i.t}{i.soon && <em>em breve</em>}</L>)}</div>
            ))}</details>
          ))}
          {Object.keys(SIMPLE).map(k => (
            <details key={k} className="dr-s"><summary>{k}<Icon n="chev" s={16} /></summary>{SIMPLE[k].map(c => (
              c.href ? <a key={c.t} className="dr-a" href={c.href} target="_blank" rel="noopener noreferrer">{c.t}</a>
              : c.to ? <a key={c.t} className="dr-a" href={"#" + c.to} onClick={(e) => { e.preventDefault(); setMob(false); if (!go(c.to)) openInner(c.t); }}>{c.t}</a>
              : <L key={c.t} className="dr-a" page={c.t}>{c.t}</L>
            ))}</details>
          ))}
          <button className="btn btn-or full" onClick={() => { setMob(false); go("contato"); }}>Fale com um especialista</button>
        </motion.div>
      )}</AnimatePresence>
    </header>
  );
}

/* item dos menus simples: rola até uma seção, abre link externo ou (sem destino ainda) o modal de página interna */
function DdItem({ c, close }) {
  const inner = <><span className="dd-ic"><Icon n={c.icon} s={18} w={1.7} /></span><span className="dd-tx"><b>{c.t}</b><span>{c.d}</span></span>{c.href && <Icon n="arrow" s={14} className="dd-ext" />}</>;
  if (c.href) return <a className="dd-a" role="menuitem" href={c.href} target="_blank" rel="noopener noreferrer" onClick={close}>{inner}</a>;
  if (c.to) return <a className="dd-a" role="menuitem" href={"#" + c.to} onClick={(e) => { e.preventDefault(); close(); go(c.to); }}>{inner}</a>;
  return <L className="dd-a" page={c.t}>{inner}</L>;
}
