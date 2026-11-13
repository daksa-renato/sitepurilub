"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "@/lib/icons";
import { logoColor, logoWhite, logoIcon, logoIconW, imgC2rs, imgD1, imgD2, imgD3, imgSvrCut, imgIcb, imgDiesel } from "@/lib/assets";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "@/lib/data";
import { go, Inner, useInner, ease, rev, L, Fade } from "./helpers";
import { Title } from "./Title";

export function Contact() {
  const blank = { nome: "", empresa: "", email: "", tel: "", tema: "", msg: "" };
  const [f, setF] = useState(blank);
  const [err, setErr] = useState({});
  const [ok, setOk] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!f.nome.trim()) er.nome = "Informe seu nome";
    if (!f.empresa.trim()) er.empresa = "Informe a empresa";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = "E-mail inválido";
    if (!f.msg.trim()) er.msg = "Conte brevemente o problema";
    setErr(er); if (!Object.keys(er).length) setOk(true);
  };
  const temas = ["Água no óleo", "Partículas", "Verniz", "Óleo isolante", "Diesel", "Flushing", "Outro"];
  return (
    <section className="ct" id="contato">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="wrap ct-in">
        <div className="ct-l">
          <Title n="10" label="Fale com um especialista" lines={["O próximo passo começa", "com uma conversa técnica"]} light />
          <p>Um engenheiro do nosso time avalia o caso e responde com uma recomendação. Empresas que tratam o óleo com a Purilub podem economizar até 75%.</p>
          <Fade as="ul" i={2} className="ct-list">
            <li><Icon n="phone" s={18} /><div><b>16 3981-9920</b><span>Comercial</span></div></li>
            <li><Icon n="mail" s={18} /><div><b>comercial@purilub.com.br</b><span>Resposta do time técnico-comercial</span></div></li>
            <li><Icon n="pin" s={18} /><div><b>Pradópolis (SP) · Barra Mansa (RJ)</b><span>Atendimento em todo o Brasil</span></div></li>
          </Fade>
        </div>
        <motion.form className="form" onSubmit={submit} noValidate {...rev(1, 40)}>
          {ok ? (
            <motion.div className="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease }}><motion.span className="ok-ic" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.15 }}><Icon n="check" s={28} w={2.2} /></motion.span><h3>Recebemos o seu caso, {f.nome.split(" ")[0]}.</h3><p>Um especialista da Purilub vai entrar em contato. (Protótipo: nenhum dado foi enviado.)</p><button type="button" className="btn btn-nv" onClick={() => { setOk(false); setF(blank); }}>Enviar outro caso</button></motion.div>
          ) : (<>
            <div className="fm-h"><b>Entre em contato</b><div className="chips">{temas.map(t => <button type="button" key={t} className={"chip" + (f.tema === t ? " on" : "")} onClick={() => setF({ ...f, tema: f.tema === t ? "" : t })}>{t}</button>)}</div></div>
            <div className="g2f">
              <label>Nome<input value={f.nome} onChange={set("nome")} className={err.nome ? "bad" : ""} />{err.nome && <em>{err.nome}</em>}</label>
              <label>Empresa<input value={f.empresa} onChange={set("empresa")} className={err.empresa ? "bad" : ""} />{err.empresa && <em>{err.empresa}</em>}</label>
              <label>E-mail corporativo<input value={f.email} onChange={set("email")} className={err.email ? "bad" : ""} />{err.email && <em>{err.email}</em>}</label>
              <label>Telefone / WhatsApp<input value={f.tel} onChange={set("tel")} /></label>
            </div>
            <label>Descreva o problema<textarea rows="4" value={f.msg} onChange={set("msg")} className={err.msg ? "bad" : ""} placeholder="Ex.: água no óleo da turbina, verniz em válvulas, partida de sistema novo" />{err.msg && <em>{err.msg}</em>}</label>
            <button className="btn btn-or lg full" type="submit">Quero uma recomendação técnica <Icon n="arrow" s={18} /></button>
            <p className="xs mut fm-n">Seus dados são tratados conforme a Política de Privacidade (LGPD).</p>
          </>)}
        </motion.form>
      </div>
    </section>
  );
}
