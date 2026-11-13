"use client";
import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@/lib/icons";
import { rev, useInner, Fade } from "./helpers";
import { Title } from "./Title";

/* Marcas representadas: logotipo em destaque, texto, país de origem e CTA.
   Efeitos no hover: luz que segue o mouse no palco do logo, logo levemente ampliado e CTA preenchido. */
const BRANDS = [
  {
    id: "tti",
    name: "TTI",
    page: "TTI",
    logo: "/img/marcas/logo-tti-respiros-dessecantes-distribuidora-oficial-brasil.webp",
    w: 180, h: 90,
    alt: "Logotipo TTI, fabricante dos respiros dessecantes PowerBreather",
    text: "Respiros dessecantes PowerBreather™ (Standard e CV) com filtros DuoGlass: barram umidade e poeira antes que entrem no reservatório.",
    country: "Estados Unidos",
    cta: "Conhecer os respiros TTI",
    c1: "#1C75BC", c2: "#6CBE45",
  },
  {
    id: "ept",
    name: "EPT Clean Oil",
    page: "EPT Clean Oil",
    logo: "/img/marcas/logo-ept-clean-oil-resina-ionica-distribuidora-oficial-brasil.webp",
    w: 266, h: 227,
    alt: "Logotipo EPT Clean Oil, fabricante da resina iônica ICB",
    text: "Resina iônica ICB® e sistemas SVR® para prevenção e mitigação de verniz em turbinas e sistemas hidráulicos.",
    country: "Canadá",
    cta: "Conhecer a tecnologia EPT",
    c1: "#6CBE45", c2: "#F7A823",
  },
];

function BrandCard({ b, i }) {
  const open = useInner();
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <motion.a href="#" className={"bc bc-" + b.id} {...rev(i)} onMouseMove={move}
      style={{ "--c1": b.c1, "--c2": b.c2 }}
      onClick={(e) => { e.preventDefault(); open(b.page); }}>
      <span className="bc-stage">
        <span className="bc-glow" aria-hidden="true" />
        <img src={b.logo} alt={b.alt} width={b.w} height={b.h} loading="lazy" className="bc-logo" />
      </span>
      <span className="bc-body">
        <span className="bc-eb">Distribuidora oficial no Brasil</span>
        <h3>{b.name}</h3>
        <p>{b.text}</p>
        <span className="bc-country"><Icon n="pin" s={16} w={1.8} /><b>{b.country}</b></span>
        <span className="bc-cta"><span className="bc-cta-t">{b.cta}</span><span className="bc-cta-i"><Icon n="arrow" s={16} w={2} /></span></span>
      </span>
    </motion.a>
  );
}

export function Brands() {
  return (
    <section className="sec no-mob" id="marcas">
      <div className="wrap">
        <div className="sh">
          <div><Title n="06" label="Marcas representadas" lines={["Tecnologia internacional", "com suporte no Brasil"]} /></div>
          <Fade as="p" i={3} className="sh-p">A Purilub é distribuidora oficial de duas referências mundiais em controle de contaminação, com estoque, aplicação e suporte técnico local.</Fade>
        </div>
        <div className="bcs">{BRANDS.map((b, i) => <BrandCard key={b.id} b={b} i={i * 1.5} />)}</div>
      </div>
    </section>
  );
}
