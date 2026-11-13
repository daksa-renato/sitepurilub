"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";

/* Redes sociais: ícones. TODO: URL do canal do YouTube (sem link, abre o modal de página interna). */
const SOCIAL = [
  ["LinkedIn", "https://br.linkedin.com/company/purilub", "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"],
  ["Instagram", "https://www.instagram.com/purilub", "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"],
  ["YouTube", null, "M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"],
];

export function Footer() {
  const cols = [
    ["Soluções", FAMILIES.map(f => f.t)],
    ["Serviços", ["Descontaminação", "Flushing", "Decapagem", "Prevenção de verniz", "Óleo isolante", "Treinamentos"]],
    ["Equipamentos", ["P-C2RS®", "P-EFO-SVR", "Linha P-EFO", "P-TVF · P-CVF", "Filtros B21 · C05 · C15", "Respiros TTI"]],
    ["Empresa", ["Quem somos", "Meio ambiente", "Clientes", "Blog técnico", "E-books", "Trabalhe conosco", "LGPD"]],
  ];
  const seals = [["selo-dqs.png", "DQS"], ["selo-iqnet.png", "IQNet"], ["selo-ulfirm.png", "UL"]];
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-top">
          <div className="ft-b"><img src={logoWhite} alt="Purilub" className="logo-w" /><p>Filtração, purificação e desidratação de óleos industriais desde 1989.</p>
            <div className="soc">{SOCIAL.map(([n, href, d]) => href ? (
              <a key={n} className="soc-a" href={href} target="_blank" rel="noopener noreferrer" aria-label={"Purilub no " + n} title={n}><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={d} /></svg></a>
            ) : (
              <L key={n} className="soc-a" page={n}><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={d} /></svg><span className="sr-only">{n}</span></L>
            ))}</div></div>
          {cols.map(([h, it]) => <div key={h}><div className="ft-h">{h}</div>{it.map(i => <L key={i} className="ft-a" page={i}>{i}</L>)}</div>)}
        </div>
        <div className="ft-cert">
          <div className="ft-h">Certificações e credenciais</div>
          <div className="seals2">
            {[["award", "ISO 9001:2015", "Gestão da qualidade"], ["leaf", "ISO 14001:2015", "Gestão ambiental"], ["shield", "DQS · IQNet · UL", "Organismos certificadores"], ["spark", "Patente INPI", "Processo de filtragem próprio"], ["globe", "TTI · EPT Clean Oil", "Distribuidora oficial no Brasil"]].map(([ic, b, t]) => (
              <div key={b} className="seal2"><span className="seal2-ic"><Icon n={ic} s={22} w={1.3} /></span><div><b>{b}</b><span>{t}</span></div></div>
            ))}
          </div>
        </div>
        <div className="ft-units">
          <div><div className="ft-h">Matriz</div><p>Rua Octávio Giovanetti, 811<br />Pradópolis · SP · CEP 14850-000</p></div>
          <div><div className="ft-h">Filial</div><p>Rodovia Presidente Dutra, 90-C · Boa Sorte<br />Barra Mansa · RJ · CEP 27338-000</p></div>
          <div><div className="ft-h">Contato</div><p>16 3981-9920<br />comercial@purilub.com.br</p></div>
        </div>
        <div className="ft-dist"><span>A Purilub é distribuidora oficial da TTI e da EPT Clean Oil no Brasil</span></div>
        <div className="ft-legal"><span>© 2026 Purilub · Rentabilidade gota a gota</span><span>Desenvolvimento Agência Daksa</span></div>
      </div>
      <div className="gold-bar" />
    </footer>
  );
}
