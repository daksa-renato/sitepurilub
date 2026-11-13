import React, { useState, useEffect, useMemo, useRef } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, animate, MotionConfig, useMotionValue } from "framer-motion";
import { Icon, WA } from "./icons.jsx";
import logoColor from "./assets/logo_color.png";
import logoWhite from "./assets/logo_white.png";
import logoIcon from "./assets/logo_icon.png";
import logoIconW from "./assets/logo_icon_w.png";
import imgC2rs from "./assets/img_c2rs.jpg";
import imgD1 from "./assets/img_c2rs_d1.jpg";
import imgD2 from "./assets/img_c2rs_d2.jpg";
import imgD3 from "./assets/img_c2rs_d3.jpg";
import imgSvrCut from "./assets/img_svr_cut.jpg";
import imgIcb from "./assets/img_icb.jpg";
import imgDiesel from "./assets/img_diesel.webp";
import { R, SHOWCASE, FAMILIES, SERVICES, EQUIP_CATS, EQUIPMENTS, CLIENTS, SECTORS, FAQ, SEARCH_INDEX } from "./data.js";

/* ---------- helpers ---------- */
const go = (id) => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" }); };
const Inner = React.createContext(() => {});
const useInner = () => React.useContext(Inner);
const ease = [0.2, 0.7, 0.2, 1];
const rev = (i = 0, y = 26) => ({ initial: { opacity: 0, y }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-40px" }, transition: { duration: 0.7, delay: i * 0.07, ease } });
const L = ({ children, page, className = "lnk", i }) => {
  const open = useInner();
  const extra = i === undefined ? {} : rev(i);
  return <motion.a href="#" className={className} {...extra} onClick={(e) => { e.preventDefault(); open(page || (typeof children === "string" ? children : "Página interna")); }}>{children}</motion.a>;
};
const Fade = ({ children, i = 0, className = "", y = 26, as = "div" }) => { const C = motion[as]; return <C className={className} {...rev(i, y)}>{children}</C>; };

/* painel com borda inclinada e canto arredondado geometricamente perfeito */
function SlantPanel({ className = "", slant = 0.34, r = 120 }) {
  const ref = useRef(); const [[W, H], setSz] = useState([0, 0]);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const upd = () => setSz([el.offsetWidth, el.offsetHeight]); upd();
    if (!window.ResizeObserver) return;
    const ro = new ResizeObserver(upd); ro.observe(el); return () => ro.disconnect();
  }, []);
  let d = "";
  if (W && H) {
    const xT = W, xB = Math.max(r * 1.2, W - H * slant);
    const l = Math.hypot(xT - xB, H), v1 = [(xT - xB) / l, -H / l], v2 = [-1, 0];
    const th = Math.acos(v1[0] * v2[0] + v1[1] * v2[1]);
    const rr = Math.min(r, H * 0.45), t = rr / Math.tan(th / 2);
    const P1 = [xB + v1[0] * t, H + v1[1] * t], P2 = [xB - t, H];
    d = `M0 0H${xT}L${P1[0].toFixed(2)} ${P1[1].toFixed(2)}A${rr} ${rr} 0 0 1 ${P2[0].toFixed(2)} ${P2[1].toFixed(2)}H0Z`;
  }
  return <div ref={ref} className={"slant " + className} aria-hidden="true">{d && <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}><path d={d} /></svg>}</div>;
}

/* título de seção: índice + linha animada + rótulo, e título revelado linha a linha */
function Title({ n, label, lines, light, center }) {
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

function Counter({ to, suffix = "", dur = 1.6 }) {
  const ref = useRef(); const inView = useInView(ref, { once: true }); const [v, setV] = useState(0);
  useEffect(() => { const fb = setTimeout(() => { if (document.documentElement.classList.contains("no-motion")) setV(to); }, 1700); return () => clearTimeout(fb); }, []);
  useEffect(() => { if (!inView) return; const c = animate(0, to, { duration: dur, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) }); return () => c.stop(); }, [inView]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const sx = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div className="sprog" style={{ scaleX: sx }} />;
}

/* imagem remota com fallback elegante */
function Img({ src, alt, className = "", fallback }) {
  const [bad, setBad] = useState(!src);
  if (bad) return fallback || <div className={"img-fb " + className}><Icon n="gear" s={28} w={1.3} /></div>;
  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setBad(true)} />;
}
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);
}

/* ---------- Header ---------- */
const MENUS = {
  "Serviços": [
    { h: "Tratamento do óleo", items: ["Descontaminação de óleo", "Purificação de óleo novo", "Tratamento de óleo isolante", "Envase de óleos"] },
    { h: "Limpeza de sistemas", items: ["Flushing", "Decapagem", "Prevenção de verniz"] },
    { h: "Suporte técnico", items: ["Laboratório de análise", "Assessoria e treinamentos", "Reforma e upgrade"] },
  ],
  "Equipamentos": [
    { h: "Filtragem", items: ["P-EFO-B21", "P-EFO · 6.700 lph", "P-EFO-DRUM", "P-TEF", "Unidades personalizadas"] },
    { h: "Purificação", items: ["P-C2RS®", "P-TVF", "P-CVF", "P-COO", "Caminhão de flushing"] },
    { h: "Verniz e filtros", items: ["P-EFO-SVR", "Elementos ICB®", "Spin-on Série B21", "Cartucho C05 · C15", "Respiros dessecantes TTI"] },
  ],
  "Marcas": [
    { h: "TTI · Estados Unidos", items: ["Respiros PowerBreather™", "Modelo Standard", "Modelo CV", "Elementos filtrantes"] },
    { h: "EPT Clean Oil · Canadá", items: ["P-EFO-SVR", "Resina iônica ICB®", "SVR® AW · RO · JET · FRF"] },
  ],
};
const FEAT = {
  "Soluções": { img: imgD3, k: "Comece pelo diagnóstico", t: "Análise de óleo com laudo interpretado", a: "laboratorio" },
  "Serviços": { img: imgD1, k: "Na sua planta", t: "Equipe, frota e equipamentos próprios", a: "servicos" },
  "Equipamentos": { img: imgC2rs, k: "Lançamento", t: "P-C2RS®: desidratação com nitrogênio", a: "equipamentos" },
  "Marcas": { img: imgIcb, k: "Distribuidora oficial", t: "TTI e EPT Clean Oil no Brasil", a: "marcas" },
};

function Header({ onSearch }) {
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
          <button className="nav-a" onMouseEnter={() => setOpen(null)} onClick={() => go("laboratorio")}>Laboratório</button>
          <button className="nav-a" onMouseEnter={() => setOpen(null)} onClick={() => openInner("Quem somos")}>Sobre</button>
        </nav>
        <div className="hdr-r">
          <button className="ic-btn" onClick={onSearch} aria-label="Buscar"><Icon n="search" s={19} w={1.9} /></button>
          <button className="btn btn-or hide-sm" onClick={() => go("contato")}>Fale com um especialista</button>
          <button className="ic-btn show-md" onClick={() => setMob(true)} aria-label="Abrir menu"><Icon n="menu" s={22} /></button>
        </div>
      </div>
      <AnimatePresence>{open && (
        <motion.div className="mega" onMouseEnter={() => enter(open)} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25, ease }}>
          <motion.div key={open} className="wrap mega-g" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            {MENUS[open].map(c => (
              <div key={c.h} className="mega-c"><div className="mega-h">{c.h}</div>{c.items.map(i => <L key={i} className="mega-a" page={i}>{i}<Icon n="arrow" s={14} /></L>)}</div>
            ))}
            <button className="mega-f" onClick={() => { setOpen(null); go(FEAT[open].a); }}>
              <img src={FEAT[open].img} alt="" />
              <span className="mega-fo"><span className="tagline">{FEAT[open].k}</span><b>{FEAT[open].t}</b><span className="mega-fl">Conhecer <Icon n="arrow" s={14} /></span></span>
            </button>
          </motion.div>
        </motion.div>
      )}</AnimatePresence>
      <AnimatePresence>{mob && (
        <motion.div className="drawer" role="dialog" aria-label="Menu" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 260, damping: 32 }}>
          <div className="drawer-top"><img src={logoColor} alt="Purilub" className="logo" /><button className="ic-btn" onClick={() => setMob(false)} aria-label="Fechar"><Icon n="close" /></button></div>
          {Object.keys(MENUS).map(k => (
            <details key={k} className="dr-s"><summary>{k}<Icon n="chev" s={16} /></summary>{MENUS[k].flatMap(c => c.items).map(i => <L key={i} className="dr-a" page={i}>{i}</L>)}</details>
          ))}
          <button className="btn btn-or full" onClick={() => { setMob(false); go("contato"); }}>Fale com um especialista</button>
        </motion.div>
      )}</AnimatePresence>
    </header>
  );
}

function Search({ onClose }) {
  const [q, setQ] = useState("");
  const ref = useRef();
  const openInner = useInner();
  useEffect(() => { ref.current?.focus(); const f = (e) => e.key === "Escape" && onClose(); window.addEventListener("keydown", f); return () => window.removeEventListener("keydown", f); }, []);
  const n = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const res = useMemo(() => q.trim().length < 2 ? [] : SEARCH_INDEX.filter(i => n(i.t + " " + i.d).includes(n(q))).slice(0, 8), [q]);
  return (
    <motion.div className="ov" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="srch" onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, y: -16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }} transition={{ duration: 0.28, ease }}>
        <div className="srch-in"><Icon n="search" s={22} /><input ref={ref} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Busque por solução, equipamento ou serviço" aria-label="Buscar" /><span className="kbd">ESC</span></div>
        {q.trim().length < 2 ? (
          <div className="srch-s"><span className="mono xs mut">BUSCAS FREQUENTES</span><div>{["filtração de óleo", "flushing", "verniz", "água no óleo", "óleo isolante", "P-C2RS", "respiro"].map(s => <button key={s} className="chip" onClick={() => setQ(s)}>{s}</button>)}</div></div>
        ) : res.length ? (
          <ul className="srch-r">{res.map((r, i) => <motion.li key={r.t} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}><a href="#" onClick={(e) => { e.preventDefault(); onClose(); openInner(r.t); }}><span className="mono xs">{r.type}</span><b>{r.t}</b><span className="mut sm">{r.d}</span><Icon n="arrow" s={16} /></a></motion.li>)}</ul>
        ) : <p className="srch-e mut">Nada encontrado para “{q}”. Fale com um especialista: <b>16 3981-9920</b></p>}
      </motion.div>
    </motion.div>
  );
}

/* ---------- Vitrine de equipamentos (abertura) ---------- */
const DUR = 6.5;
function HeroShowcase() {
  const N = SHOWCASE.length;
  const [[i, dir], setI] = useState(() => [Math.floor(Math.random() * N), 1]);
  const [paused, setPaused] = useState(false);
  const prog = useMotionValue(0);
  const ctrl = useRef();
  const step = (d) => setI(([x]) => [(x + d + N) % N, d]);
  const to = (k) => setI(([x]) => (k === x ? [x, 1] : [k, k > x ? 1 : -1]));
  useEffect(() => {
    prog.set(0);
    const c = animate(prog, 1, { duration: DUR, ease: "linear", onComplete: () => step(1) });
    ctrl.current = c; if (paused) c.pause();
    return () => c.stop();
  }, [i]);
  useEffect(() => { const c = ctrl.current; if (c) paused ? c.pause() : c.play(); }, [paused]);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 60]);
  const s = SHOWCASE[i];
  return (
    <div className="show" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-roledescription="carrossel" aria-label="Equipamentos em destaque">
      <div className="show-orb" aria-hidden="true" />
      <motion.div className="show-stage" style={{ y }}>
        <AnimatePresence initial={false} custom={dir}>
          <motion.div key={s.id} className="show-img" custom={dir}
            initial={{ clipPath: "circle(0% at 50% 64%)" }}
            animate={{ clipPath: "circle(78% at 50% 64%)", transition: { duration: 1.15, ease: [0.65, 0, 0.35, 1] } }}
            exit={(d) => ({ opacity: 0, scale: 0.9, x: d * -60, filter: "blur(8px)", transition: { duration: 0.7, ease } })}
            drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.18}
            onDragEnd={(e, info) => { if (info.offset.x < -60) step(1); else if (info.offset.x > 60) step(-1); }}>
            {s.img ? <Img src={s.img} alt={s.name} fallback={<ShowPh s={s} />} /> : <ShowPh s={s} />}
          </motion.div>
        </AnimatePresence>
        <motion.span key={"r" + i} className="show-ripple" aria-hidden="true" initial={{ scale: 0.2, opacity: 0.7 }} animate={{ scale: 2.4, opacity: 0 }} transition={{ duration: 1.3, ease: "easeOut" }} />
      </motion.div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={s.id} className="show-name" initial="h" animate="s" exit="x" variants={{ s: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}>
          <span className="ln"><motion.b className="ln-i" variants={{ h: { y: "105%" }, s: { y: "0%", transition: { duration: 0.7, ease } }, x: { y: "-105%", transition: { duration: 0.35 } } }}>{s.name}</motion.b></span>
          <motion.span className="show-sub" variants={{ h: { opacity: 0, y: 8 }, s: { opacity: 1, y: 0 }, x: { opacity: 0 } }}>{s.sub}</motion.span>
        </motion.div>
      </AnimatePresence>


      <div className="show-ctrl">
        <button className="arw" onClick={() => step(-1)} aria-label="Equipamento anterior"><Icon n="arrow" s={18} className="flip" /></button>
        <button className="arw" onClick={() => step(1)} aria-label="Próximo equipamento"><Icon n="arrow" s={18} /></button>
        <span className="cnt"><b>{String(i + 1).padStart(2, "0")}</b> / {String(N).padStart(2, "0")}</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.a key={s.id} href="#" className="show-cta" onClick={(e) => e.preventDefault()} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.3, ease } }} exit={{ opacity: 0, x: -8, transition: { duration: 0.2 } }}>
            <span className="show-cta-t">Conhecer o {s.name}</span>
            <span className="show-cta-i"><Icon n="arrow" s={16} w={2} /></span>
          </motion.a>
        </AnimatePresence>
      </div>
    </div>
  );
}
function ShowPh({ s }) {
  return <div className="show-ph"><img src={logoIcon} alt="" /><b>{s.name}</b><span>Imagem do equipamento em breve</span></div>;
}

/* ---------- Hero ---------- */
function Hero() {
  const { scrollY } = useScroll();
  const h = (d) => ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease } });
  return (
    <section className="hero">
      <div className="hero-stage">
        <motion.div className="hero-panel-w" initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1, ease }}><SlantPanel className="hero-panel" slant={0.27} r={130} /></motion.div>
        <svg className="hero-drop" viewBox="0 0 400 640" aria-hidden="true">
          <motion.path d="M70 20 L330 470 A170 170 0 1 1 20 560" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, delay: 0.5, ease: "easeInOut" }} />
          <motion.path className="g" d="M10 150 L250 560 A120 120 0 1 1 -20 600" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, delay: 0.8, ease: "easeInOut" }} />
        </svg>
        <div className="wrap hero-in">
          <div className="hero-txt">
            <motion.div className="eyebrow" {...h(0.25)}>Desde 1989 · ISO 9001 e ISO 14001</motion.div>
            <h1>{["Filtração e purificação", "de óleos industriais"].map((t, i) => (
              <span className="ln" key={i}><motion.span className="ln-i" initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 1, delay: 0.35 + i * 0.12, ease }}>{t}</motion.span></span>
            ))}</h1>
            <motion.p className="hero-lead" {...h(0.65)}>Removemos água, partículas e verniz de óleos lubrificantes, hidráulicos, isolantes e Diesel, dentro da sua planta e sem parar a operação.</motion.p>
            <motion.div className="hero-cta" {...h(0.8)}>
              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="btn btn-or lg" onClick={() => go("contato")}>Fale com um especialista <Icon n="arrow" s={18} /></motion.button>
              <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="btn btn-glass lg" onClick={() => go("servicos")}>Conheça as soluções</motion.button>
            </motion.div>
          </div>
          <div className="hero-vis"><HeroShowcase /></div>
        </div>
      </div>
      <div className="wrap hero-stats">
        {[["award", <>Mais de <Counter to={35} /> anos<br />de experiência</>, "No tratamento de óleos"], ["shield", <>Qualidade<br />ISO 9001 · 14001</>, "Certificação DQS / IQNet"], ["book", <>Inovação<br />Patente INPI</>, "Processo de filtragem próprio"], ["truck", <>Distribuidora oficial<br />no Brasil</>, "EPT Clean Oil · TTI"]].map(([i, b, t], k) => (
          <Fade key={k} i={k} className="hs" y={16}><Icon n={i} s={26} w={1.4} /><div><b>{b}</b><span>{t}</span></div></Fade>
        ))}
      </div>
      <div className="gold-bar" />
    </section>
  );
}

function Clients() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section className="clients" aria-label="Clientes">
      <div className="wrap cl-head"><motion.h2 className="cl-title" {...rev(0, 14)}>Quem confia na Purilub</motion.h2></div>
      <div className="marquee"><div className="mq-track">
        {row.map(([n, src], i) => (
          <div key={i} className="cl" title={n}><Img src={src} alt={n} className="cl-img" fallback={<span className="cl-txt">{n}</span>} /></div>
        ))}
      </div></div>
    </section>
  );
}

function Families() {
  return (
    <section className="sec" id="solucoes">
      <div className="wrap">
        <div className="sh">
          <div><Title n="01" label="Soluções mais pesquisadas" lines={["Tecnologia para cada etapa", "do ciclo de vida do óleo"]} /></div>
          <Fade as="p" i={3} className="sh-p">Cinco frentes técnicas que tratam a causa da falha, não o sintoma. Do óleo novo ao óleo em operação, com resultado comprovado em laudo.</Fade>
        </div>
        <div className="fam">
          {FAMILIES.map(f => (
            <L key={f.n} i={FAMILIES.indexOf(f)} className="fam-i" page={f.t}>
              <span className="mono fam-n">{f.n}</span>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
              <span className="fam-a"><Icon n="arrow" s={18} /></span>
            </L>
          ))}
        </div>
      </div>
    </section>
  );
}

function Approach() {
  const ref = useRef();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const steps = [["Coleta e análise", "Medimos água, partículas, acidez e potencial de verniz no nosso laboratório."], ["Plano técnico", "Indicamos serviço, equipamento ou filtro conforme o laudo e a sua operação."], ["Execução na planta", "Equipe, frota e equipamentos próprios, dentro das normas de segurança do cliente."], ["Laudo de resultado", "Novas análises comprovam a estabilização do óleo."]];
  return (
    <section className="appr">
      <div className="appr-bg" aria-hidden="true" />
      <div className="wrap appr-in">
        <div className="appr-l">
          <Title n="02" label="Como trabalhamos" lines={["Diagnóstico antes", "da solução"]} light />
          <p>Tratar óleo sem conhecer as condições dele é perda de tempo e de dinheiro. Por isso todo projeto Purilub começa pela análise e termina com o laudo.</p>
          <div className="appr-words"><span>Análise</span><i /><span>Tratamento</span><i /><span>Comprovação</span></div>
        </div>
        <ol className="appr-steps" ref={ref}><motion.span className="appr-prog" style={{ scaleY: scrollYProgress }} />{steps.map(([t, d], i) => (
          <motion.li key={t} {...rev(i)}><span className="mono">{String(i + 1).padStart(2, "0")}</span><div><h3>{t}</h3><p>{d}</p></div></motion.li>
        ))}</ol>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="sec" id="servicos">
      <div className="wrap">
        <div className="sh">
          <div><Title n="03" label="Serviços" lines={["Serviços executados", "dentro da sua planta"]} /></div>
          <Fade as="p" i={3} className="sh-p">Descontaminação de óleo, flushing, remoção de verniz e análise de óleo com estrutura completa: técnicos, frota e equipamentos próprios.</Fade>
        </div>
        <div className="svc">{SERVICES.map((s, k) => (
          <L key={s.t} i={k % 2 + Math.floor(k / 2) * 0.5} className="svc-i" page={s.t}>
            <span className="svc-ic"><Icon n={s.icon} s={22} w={1.6} /></span>
            <div><h3>{s.t}</h3><p>{s.d}</p></div>
            <Icon n="arrow" s={16} className="svc-ar" />
          </L>
        ))}</div>
      </div>
    </section>
  );
}

function Band() {
  return (
    <div className="band">
      <div className="wrap band-in">
        <div><span className="mono xs">NÃO SABE QUAL SOLUÇÃO ESPECIFICAR?</span><h2>Conte o problema.<br />A gente indica o caminho.</h2></div>
        <div className="band-r"><button className="btn btn-or lg" onClick={() => go("contato")}>Fale com um especialista <Icon n="arrow" s={18} /></button><a className="band-ph" href="tel:+551639819920"><Icon n="phone" s={16} /> 16 3981-9920</a></div>
      </div>
    </div>
  );
}

function Spec({ rows }) { return <dl className="spec">{rows.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl>; }

function Equipment() {
  const [cat, setCat] = useState("Todos");
  const [more, setMore] = useState(false);
  useEffect(() => setMore(false), [cat]);
  const list = (cat === "Todos" ? EQUIPMENTS : EQUIPMENTS.filter(e => e.c === cat)).filter(e => !["P-C2RS®", "P-EFO-SVR"].includes(e.t));
  return (
    <section className="sec alt" id="equipamentos">
      <div className="wrap">
        <div className="sh">
          <div><Title n="04" label="Equipamentos" lines={["Projetados e fabricados", "pela Purilub"]} /></div>
          <Fade as="p" i={3} className="sh-p">Unidades de filtragem, desidratação e remoção de verniz para comprar e operar na sua planta, ou para uso nos nossos serviços.</Fade>
        </div>
        <div className="feat">
          <motion.article className="fc" {...rev(0)}>
            <div className="fc-img"><img src={imgC2rs} alt="P-C2RS® 3000" /><span className="fc-tag or">Lançamento</span></div>
            <div className="fc-b">
              <span className="mono xs mut">DESIDRATAÇÃO · NITROGÊNIO</span>
              <h3>P-C2RS® 3000</h3>
              <p>Câmara de secagem de fluxo cruzado P-C2M2®: nitrogênio a −60 °C em contrafluxo remove a umidade de óleos hidráulicos, lubrificantes, isolantes e Diesel.</p>
              <L page="P-C2RS®">Ver ficha técnica <Icon n="arrow" s={15} /></L>
            </div>
          </motion.article>
          <motion.article className="fc" {...rev(1.5)}>
            <div className="fc-img"><img src={imgSvrCut} alt="P-EFO-SVR em corte com resina iônica" /><span className="fc-tag bl">EPT Clean Oil</span></div>
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

function EqCard({ e, k }) {
  const open = useInner();
  return (
    <motion.a layout href="#" className="ec" onClick={(ev) => { ev.preventDefault(); open(e.t); }} initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.45, delay: k * 0.04, ease }} whileHover={{ y: -4 }}>
      <div className="ec-img"><Img src={e.img} alt={e.t} /></div>
      <div className="ec-b"><div className="ec-top"><span className="mono xs mut">{e.c.toUpperCase()}</span>{e.tag && <span className={"pill " + (e.tag === "Lançamento" ? "or" : "")}>{e.tag}</span>}</div><h3>{e.t}</h3><p>{e.d}</p></div>
    </motion.a>
  );
}

function EqMore({ n }) {
  const open = useInner();
  return (
    <motion.a layout href="#" className="ec ec-more" onClick={(ev) => { ev.preventDefault(); open("Catálogo de equipamentos"); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} whileHover={{ y: -4 }}>
      <span className="ec-more-n">+{n - 15}</span>
      <b>Ver o catálogo completo</b>
      <span>{n + 2} equipamentos e filtros, com ficha técnica de cada um</span>
      <span className="ec-more-a"><Icon n="arrow" s={18} /></span>
    </motion.a>
  );
}

function Banner() {
  const rows = [["Vazões disponíveis", "1.000 · 1.500 · 1.900 · 2.300 · 2.700 · 3.500 lph"], ["Viscosidade máxima", "460 cSt @ 600 lph · 90 cSt @ 3.500 lph"], ["Filtração de linha", "2 estágios · Beta = 1.000"], ["Motor", "2 CV · 220 / 380 / 440 V · 3Ø · 60 Hz"], ["Dimensões / peso", "700 × 500 × 1.100 mm · 90 kg"]];
  return (
    <section className="banner">
      <div className="wrap">
        <motion.div className="bn" {...rev(0, 40)}>
          <div className="bn-head">
            <SlantPanel className="bn-panel" slant={0.42} r={70} />
            <span className="bn-sub">Unidade móvel de filtragem<br />até <b>3.500 lph</b> e <b>460 cSt</b></span>
            <h2>P-EFO-B21</h2>
          </div>
          <div className="bn-body">
            <div className="bn-txt">
              <p className="bn-lead">Carrinho de filtragem absoluta de uso geral para óleos lubrificantes, hidráulicos e isolantes. Com 50 cm de largura, passa por qualquer porta ou corredor: o modelo mais versátil para uso contínuo em planta.</p>
              <div className="bn-h">Principais diferenciais</div>
              <ul className="bn-ul">
                <li>Robusto e leve: 90 kg, apenas 4,1 kgf para iniciar o deslocamento</li>
                <li>Elementos absolutos Beta = 1.000 em 2 estágios, inclusive absorvedores de umidade</li>
                <li>Engates mini-mess, válvula de amostra, bacia de contenção e bandeja porta-ferramentas</li>
              </ul>
              <div className="bn-h">Dados técnicos</div>
              <dl className="tbl">{rows.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl>
              <div className="bn-cta"><L className="btn btn-or" page="P-EFO-B21">Solicitar proposta <Icon n="arrow" s={16} /></L><L page="P-EFO-B21 · ficha técnica">Ficha técnica completa <Icon n="arrow" s={15} /></L></div>
            </div>
            <div className="bn-img"><Img src={R + "2022/01/thumb_660x660_P-EFO.jpg"} alt="Unidade móvel de filtragem P-EFO-B21" className="bn-photo" fallback={<div className="bn-fb"><Icon n="gear" s={64} w={1} /></div>} /></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Diesel() {
  const apps = [["server", "Data centers"], ["monitor", "Salas de controle"], ["hospital", "Hospitais"], ["store", "Shopping centers"], ["building", "Condomínios"], ["elevator", "Elevadores"]];
  return (
    <section className="sec diesel" id="diesel">
      <div className="wrap ds-in">
        <div className="ds-l">
          <Title n="05" label="Óleo Diesel" lines={["Sistema de filtração e", "separação de água do Diesel"]} />
          <Fade as="p" i={2}>O Diesel estocado por longos períodos nos tanques dos geradores favorece a proliferação de bactérias e o acúmulo de água, entupindo filtros, bombas e bicos injetores. E o gerador falha justamente quando é mais necessário.</Fade>
          <Fade as="p" i={3}>Com o sistema Purilub, poucas horas de acionamento por semana mantêm o combustível limpo e o gerador pronto para a emergência.</Fade>
          <L className="btn btn-nv" page="Sistema de filtração e separação de água do Diesel">Conhecer o sistema <Icon n="arrow" s={16} /></L>
        </div>
        <motion.div className="ds-r" {...rev(1, 40)}>
          <motion.img src={imgDiesel} alt="Sistema de filtração e separação de água do Diesel Purilub" className="ds-img" initial={{ opacity: 0, y: 24, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease }} />
          <div className="ds-h">Garantia de suprimento de energia para:</div>
          <div className="ds-g">{apps.map(([i, t], k) => <motion.div key={t} className="ds-i" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 + k * 0.08, ease }} whileHover={{ y: -4 }}><span className="ds-ic"><Icon n={i} s={26} w={1.3} /></span><span>{t}</span></motion.div>)}</div>
        </motion.div>
      </div>
    </section>
  );
}

function Brands() {
  return (
    <section className="sec" id="marcas">
      <div className="wrap">
        <div className="sh">
          <div><Title n="06" label="Marcas representadas" lines={["Tecnologia internacional", "com suporte no Brasil"]} /></div>
          <Fade as="p" i={3} className="sh-p">A Purilub é distribuidora oficial de duas referências mundiais em controle de contaminação, com estoque, aplicação e suporte técnico local.</Fade>
        </div>
        <div className="brs">
          <L className="br" page="TTI" i={0}>
            <div className="br-img"><Img src={R + "2026/06/TTI-blog.png"} alt="TTI" /></div>
            <div className="br-b"><span className="mono xs mut">ESTADOS UNIDOS · DISTRIBUIDORA OFICIAL</span><h3>TTI</h3><p>Respiros dessecantes PowerBreather™ (Standard e CV) com filtros DuoGlass: barram umidade e poeira antes que entrem no reservatório.</p><span className="lnk">Conhecer os respiros TTI <Icon n="arrow" s={15} /></span></div>
          </L>
          <L className="br" page="EPT Clean Oil" i={1.5}>
            <div className="br-img"><img src={imgIcb} alt="Elementos ICB EPT Clean Oil" /></div>
            <div className="br-b"><span className="mono xs mut">CANADÁ · DISTRIBUIDORA OFICIAL</span><h3>EPT Clean Oil</h3><p>Resina iônica ICB® e sistemas SVR® para prevenção e mitigação de verniz em turbinas e sistemas hidráulicos.</p><span className="lnk">Conhecer a tecnologia EPT <Icon n="arrow" s={15} /></span></div>
          </L>
        </div>
      </div>
    </section>
  );
}

function Lab() {
  return (
    <section className="lab" id="laboratorio">
      <div className="lab-photo"><Img src={R + "2023/03/bg_solucoes.png"} alt="Análise de óleo em laboratório" className="lab-ph" fallback={<img src={imgD3} alt="" className="lab-ph" />} /></div>
      <div className="wrap lab-in">
        <motion.div className="lab-card" {...rev(0, 40)}>
          <div className="lab-l">
            <Title n="07" label="Laboratório próprio" lines={["Análise de óleo", "com laudo interpretado"]} />
            <p>Você recebe o diagnóstico e a recomendação técnica, não só uma tabela de números. É o ponto de partida de qualquer projeto.</p>
            <div className="lab-cta"><L className="btn btn-or" page="Enviar amostra">Enviar amostra para análise <Icon n="arrow" s={16} /></L><L page="Como coletar amostras">Como coletar <Icon n="arrow" s={14} /></L></div>
          </div>
          <ul className="lab-ul">{["Classe de pureza · ISO 4406 / NAS", "Teor de água", "Número ácido (TAN) e básico (TBN)", "Potencial de verniz (MPC)", "Viscosidade e ensaios físico-químicos"].map((i, k) => <motion.li key={i} {...rev(k + 2, 12)}><Icon n="check" s={16} w={2.2} />{i}</motion.li>)}</ul>
        </motion.div>
      </div>
    </section>
  );
}

function Sectors() {
  return (
    <section className="sec" id="setores">
      <div className="wrap">
        <div className="sh">
          <div><Title n="08" label="Setores" lines={["Onde o óleo move a operação,", "a Purilub está presente"]} /></div>
          <Fade as="p" i={3} className="sh-p">Atendemos plantas de alta exigência em todo o Brasil, das usinas hidrelétricas às siderúrgicas.</Fade>
        </div>
        <div className="sct">{SECTORS.map((s, i) => (
          <L key={s.t} i={i} className={"st" + (i === 0 ? " big" : "")} page={"Setor: " + s.t}>
            {s.img ? <Img src={s.img} alt={s.t} className="st-img" fallback={<span className="st-pat" />} /> : <span className="st-pat" />}
            <span className="st-ic"><Icon n={s.icon} s={22} w={1.6} /></span>
            <span className="st-b"><b>{s.t}</b><span>{s.s}</span></span>
            <span className="st-ar"><Icon n="arrow" s={18} /></span>
          </L>
        ))}</div>
      </div>
    </section>
  );
}

function Faq() {
  const [o, setO] = useState(0);
  return (
    <section className="sec faq-sec">
      <div className="wrap">
        <div className="faq-h"><Title n="09" label="Perguntas frequentes" lines={["Dúvidas técnicas", "mais comuns"]} /></div>
        <div className="faq">{FAQ.map((f, k) => (
          <motion.div key={f.q} className={"fq" + (o === k ? " on" : "")} {...rev(k, 16)}>
            <button className="fq-q" aria-expanded={o === k} onClick={() => setO(o === k ? -1 : k)}><span className="mono">{String(k + 1).padStart(2, "0")}</span>{f.q}<span className="fq-ic" /></button>
            <AnimatePresence initial={false}>{o === k && (
              <motion.div className="fq-a2" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }}><p>{f.a}</p>{f.cta && <button className="fq-cta" onClick={() => go("contato")}>{f.cta}<Icon n="arrow" s={15} /></button>}</motion.div>
            )}</AnimatePresence>
          </motion.div>
        ))}</div>
      </div>
    </section>
  );
}

function Contact() {
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
            <div className="fm-h"><b>Sobre o que você quer conversar?</b><div className="chips">{temas.map(t => <button type="button" key={t} className={"chip" + (f.tema === t ? " on" : "")} onClick={() => setF({ ...f, tema: f.tema === t ? "" : t })}>{t}</button>)}</div></div>
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

function Footer() {
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
            <div className="soc">{["LinkedIn", "Instagram", "YouTube"].map(s => <L key={s} className="soc-a" page={s}>{s}</L>)}</div></div>
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
        <div className="ft-legal"><span>© 2026 Purilub · Rentabilidade gota a gota · CNPJ [inserir]</span><span>Layout conceitual V2 · Daksa</span></div>
      </div>
      <div className="gold-bar" />
    </footer>
  );
}

function InnerModal({ page, onClose }) {
  useEffect(() => { const f = (e) => e.key === "Escape" && onClose(); window.addEventListener("keydown", f); return () => window.removeEventListener("keydown", f); }, []);
  return (
    <motion.div className="ov" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="inner" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={page} initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} transition={{ duration: 0.32, ease }}>
        <div className="mono xs mut">HOME / {page.toUpperCase()}</div>
        <h3>{page}</h3>
        <p className="mut">Página interna. Neste protótipo navegável, apenas a Home está construída. Cada menu, card e link já tem seu destino previsto na arquitetura do novo site.</p>
        <div className="inner-b"><button className="btn btn-nv" onClick={onClose}>Voltar para a Home</button><button className="btn btn-line" onClick={() => { onClose(); go("contato"); }}>Fale com um especialista</button></div>
      </motion.div>
    </motion.div>
  );
}

function App() {
  const [search, setSearch] = useState(false);
  const [inner, setInner] = useState(null);
  useEffect(() => { const f = (e) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearch(true); } }; window.addEventListener("keydown", f); return () => window.removeEventListener("keydown", f); }, []);
  return (
    <MotionConfig reducedMotion="user">
    <Inner.Provider value={setInner}>
      <ScrollProgress />
      <Header onSearch={() => setSearch(true)} />
      <main>
        <Hero />
        <Clients />
        <Services />
        <Approach />
        <Diesel />
        <Band />
        <Equipment />
        <Brands />
        <Lab />
        <Sectors />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <motion.a className="wa" href="#" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18, delay: 1.6 }} onClick={(e) => { e.preventDefault(); setInner("WhatsApp comercial"); }} aria-label="WhatsApp"><WA /></motion.a>
      <AnimatePresence>{search && <Search key="s" onClose={() => setSearch(false)} />}</AnimatePresence>
      <AnimatePresence>{inner && <InnerModal key="m" page={inner} onClose={() => setInner(null)} />}</AnimatePresence>
    </Inner.Provider>
    </MotionConfig>
  );
}

/* Modelo guardado: ficha técnica de equipamento (para uso em página interna) */
function FichaPage() {
  const [inner, setInner] = useState(null);
  return (
    <MotionConfig reducedMotion="user">
      <Inner.Provider value={setInner}>
        <Header onSearch={() => {}} />
        <main style={{ paddingTop: 78 }}><Banner /></main>
        <Footer />
        <AnimatePresence>{inner && <InnerModal key="m" page={inner} onClose={() => setInner(null)} />}</AnimatePresence>
      </Inner.Provider>
    </MotionConfig>
  );
}

createRoot(document.getElementById("root")).render(window.__PAGE__ === "ficha" ? <FichaPage /> : <App />);
