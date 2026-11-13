"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";
import { Title } from "./Title";
import { Img } from "./Img";

export function Equipment() {
  const [cat, setCat] = useState("Todos");
  const [more, setMore] = useState(false);
  useEffect(() => setMore(false), [cat]);
  const list = (cat === "Todos" ? EQUIPMENTS : EQUIPMENTS.filter(e => e.c === cat)).filter(e => e.t !== "P-EFO-SVR");
  return (
    <section className="sec alt" id="equipamentos">
      <div className="wrap">
        <div className="sh">
          <div><Title n="04" label="Equipamentos" lines={["Projetados e fabricados", "pela Purilub"]} /></div>
          <Fade as="p" i={3} className="sh-p">Unidades de filtragem, desidratação e remoção de verniz para comprar e operar na sua planta, ou para uso nos nossos serviços.</Fade>
        </div>
        <div className="feat">
          <motion.article className="fc" {...rev(0)}>
            <div className="fc-img"><img src="/img/equipamentos/p-c2rs-desidratacao-oleo-nitrogenio-contrafluxo.webp" alt="P-C2RS® 3000, sistema de desidratação de óleo com nitrogênio em contrafluxo" /></div>
            <div className="fc-b">
              <span className="mono xs mut">DESIDRATAÇÃO · NITROGÊNIO</span>
              <h3>P-C2RS® 3000</h3>
              <p>Câmara de secagem de fluxo cruzado P-C2M2®: nitrogênio a −60 °C em contrafluxo remove a umidade de óleos hidráulicos, lubrificantes, isolantes e Diesel.</p>
              <L page="P-C2RS®">Ver ficha técnica <Icon n="arrow" s={15} /></L>
            </div>
          </motion.article>
          <motion.article className="fc" {...rev(1.5)}>
            <div className="fc-img"><img src={imgSvrCut} alt="P-EFO-SVR em corte com resina iônica" /></div>
            <div className="fc-b">
              <span className="mono xs mut">VERNIZ · RESINA IÔNICA</span>
              <h3>P-EFO-SVR</h3>
              <p>Sistema tipo diálise que remove continuamente os produtos de oxidação dissolvidos, a causa raiz do verniz, sem parar a turbina.</p>
              <L page="P-EFO-SVR">Ver ficha técnica <Icon n="arrow" s={15} /></L>
            </div>
          </motion.article>
        </div>
        <Fade className="eq-bar">
          <div className="tabs" role="tablist">{EQUIP_CATS.map(c => <button key={c} role="tab" aria-selected={cat === c} className={"tab" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>{cat === c && <motion.span layoutId="tabpill" className="tab-pill" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}<span className="tab-t">{c}</span></button>)}</div>
          <L page="Catálogo de equipamentos">Catálogo completo <Icon n="arrow" s={15} /></L>
        </Fade>
        <motion.div layout className="eq-g"><AnimatePresence mode="popLayout">{(more ? list : list.slice(0, 8)).map((e, k) => (
          <EqCard key={e.t} e={e} k={k % 8} />
        ))}</AnimatePresence></motion.div>
        {list.length > 8 && (
          <motion.div layout className="eq-more">
            <motion.button className="btn btn-line lg" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => { if (more) go("equipamentos"); setMore(!more); }}>
              {more ? "Exibir menos" : `Exibir mais (+${list.length - 8})`}
              <motion.span animate={{ rotate: more ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ display: "inline-flex" }}><Icon n="chev" s={18} w={2} /></motion.span>
            </motion.button>
          </motion.div>
        )}
        {false && <div>{list.map(e => (
          <L key={e.t} className="ec" page={e.t}>
            <div className="ec-img"><Img src={e.img} alt={e.t} /></div>
            <div className="ec-b"><div className="ec-top"><span className="mono xs mut">{e.c.toUpperCase()}</span>{e.tag && <span className={"pill " + (e.tag === "Lançamento" ? "or" : "")}>{e.tag}</span>}</div><h3>{e.t}</h3><p>{e.d}</p></div>
          </L>
        ))}</div>}
      </div>
    </section>
  );
}

export function EqCard({ e, k }) {
  const open = useInner();
  return (
    <motion.a layout href="#" className="ec" onClick={(ev) => { ev.preventDefault(); open(e.t); }} initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.45, delay: k * 0.04, ease }} whileHover={{ y: -4 }}>
      <div className="ec-img"><Img src={e.img} alt={e.t} /></div>
      <div className="ec-b"><div className="ec-top"><span className="mono xs mut">{e.c.toUpperCase()}</span>{e.tag && <span className={"pill " + (e.tag === "Lançamento" ? "or" : "")}>{e.tag}</span>}</div><h3>{e.t}</h3><p>{e.d}</p></div>
    </motion.a>
  );
}
