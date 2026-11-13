import { imgC2rs, imgSvr, imgIcb, imgDiesel } from "./assets";

export const R = "/img/wp/";
export const T = R + "elementor/thumbs/";

export const FAMILIES = [
  { n: "01", t: "Filtração de óleo", d: "Extra filtragem off-line que devolve lubrificantes e fluidos hidráulicos à classe de pureza ISO 4406 exigida." },
  { n: "02", t: "Desidratação", d: "Remoção de água livre e emulsionada por nitrogênio, termovácuo ou centrifugação, conforme o fluido." },
  { n: "03", t: "Remoção de verniz", d: "Resina iônica que retira os produtos de oxidação dissolvidos, a causa raiz do verniz em turbinas." },
  { n: "04", t: "Flushing e decapagem", d: "Limpeza de tubulações e sistemas antes da partida ou após reparos, em alta vazão e turbulência." },
  { n: "05", t: "Análise de óleo", d: "Laboratório próprio com laudo físico-químico interpretado por especialistas e recomendação técnica." },
];

export const SERVICES = [
  { icon: "drop", t: "Descontaminação de óleo", d: "Filtragem e desidratação off-line do óleo em uso." },
  { icon: "pipe", t: "Flushing", d: "Limpeza de linhas em alta velocidade de escoamento." },
  { icon: "flask2", t: "Decapagem", d: "Remoção química de óxidos e impurezas das tubulações." },
  { icon: "shield", t: "Prevenção de verniz", d: "Remove os precursores e corrige a acidez do óleo." },
  { icon: "spark", t: "Purificação de óleo novo", d: "Óleo novo filtrado e entregue pronto para operar." },
  { icon: "barrel", t: "Envase de óleos", d: "Envase que preserva o óleo enquadrado." },
  { icon: "bolt", t: "Tratamento de óleo isolante", d: "Recuperação do óleo de transformadores." },
  { icon: "flask", t: "Laboratório de análise", d: "Análise físico-química com laudo interpretado." },
  { icon: "people", t: "Assessoria e treinamentos", d: "Capacitação da sua equipe em lubrificação." },
  { icon: "wrench", t: "Reforma e upgrade", d: "Modernização de termovácuos e centrífugas." },
];

export const EQUIP_CATS = ["Todos", "Filtragem", "Purificação", "Verniz", "Filtros", "Especiais"];

export const EQUIPMENTS = [
  { c: "Purificação", t: "P-C2RS®", d: "Desumidificação com nitrogênio para óleos e Diesel. Até 100 ml de água por hora com cerca de 1 kW.", tag: "Lançamento", img: imgC2rs, local: true },
  { c: "Verniz", t: "P-EFO-SVR", d: "Sistema tipo diálise com resina iônica ICB® que remove a causa raiz do verniz, em tempo integral.", tag: "EPT Clean Oil", img: imgSvr, local: true },
  { c: "Purificação", t: "P-CVF", d: "Combinado centrífuga, termovácuo e filtração absoluta. 500 a 5.000 lph.", img: R + "2023/03/equipamento-P-CVF.webp" },
  { c: "Purificação", t: "P-TVF", d: "Combinado termovácuo e extra filtragem. 500 a 5.000 lph.", img: R + "2023/06/thumb_660x660_P-TVF.webp" },
  { c: "Filtragem", t: "P-EFO-B21", d: "Unidade móvel de filtragem até 3.500 lph e 460 cSt. Compacta (50 cm) e leve (90 kg).", tag: "Novo", img: R + "2022/01/thumb_660x660_P-EFO.webp" },
  { c: "Filtragem", t: "P-EFO · 6.700 lph", d: "Equipamento portátil para extra filtragem de óleos até 1.500 cSt.", img: R + "2022/01/P-EFO-960x960.webp" },
  { c: "Filtragem", t: "P-EFO(2R)", d: "Unidade de transferência e filtragem absoluta até 1.000 lph. Com 60 cm de largura, passa em qualquer porta.", img: "/img/equipamentos/p-efo-2r-unidade-de-filtragem-absoluta-1000-lph.webp", local: true },
  { c: "Filtragem", t: "P-EFO-DRUM", d: "Sistema de filtragem e transporte de óleo em tambores de 200 litros.", img: R + "2022/01/thumb_660x660_P-EFD-Drum200L.webp" },
  { c: "Filtragem", t: "P-TEF", d: "Equipamento portátil para extra filtragem de óleos.", img: R + "2023/03/thumb_660x660_PTEF.webp" },
  { c: "Purificação", t: "Centrífuga para óleo de corte", d: "Tratamento e reuso do refrigerante de usinagem.", img: R + "2023/03/prod1.webp" },
  { c: "Verniz", t: "ICB® RO", d: "Resina iônica para óleos de turbina (R&O), em turbinas a vapor ou a gás.", tag: "EPT Clean Oil", img: "/img/equipamentos/icb-ro-resina-ionica-oleo-de-turbina-verniz.webp", local: true },
  { c: "Verniz", t: "ICB® JET", d: "Resina iônica para lubrificantes de turbinas aeroderivadas.", tag: "EPT Clean Oil", img: "/img/equipamentos/icb-jet-resina-ionica-turbinas-aeroderivadas.webp", local: true },
  { c: "Verniz", t: "ICB® AW", d: "Resina iônica para óleos hidráulicos antidesgaste.", tag: "EPT Clean Oil", img: "/img/equipamentos/icb-aw-resina-ionica-oleo-hidraulico-antidesgaste.webp", local: true },
  { c: "Verniz", t: "ICB® FRF", d: "Resina iônica para fluidos de éster fosfato, resistentes ao fogo.", tag: "EPT Clean Oil", img: "/img/equipamentos/icb-frf-resina-ionica-ester-fosfato.webp", local: true },
  { c: "Filtros", t: "Spin-on Série B21", d: "Filtro hidráulico de sucção e retorno, BETA 1.000, até 160 lpm.", tag: "Lançamento", img: R + "2023/03/thumb_660x660_equipamentos.webp" },
  { c: "Filtros", t: "Respiros dessecantes TTI", d: "PowerBreather™ Standard e CV contra umidade e poeira no reservatório.", tag: "TTI", img: R + "2026/06/TTI-blog.webp" },
  { c: "Filtragem", t: "Filtração e separação de água do Diesel", d: "Sistema para tanques de geradores: data centers, hospitais, salas de controle e condomínios.", img: imgDiesel, local: true },
  { c: "Filtros", t: "Cartucho C05 · C15", d: "Filtros de retorno até 500 lpm e até 1.500 lpm." },
  { c: "Purificação", t: "P-COO", d: "Centrífuga para purificação de óleos. 500 a 5.000 lph." },
  { c: "Especiais", t: "Caminhão de flushing", d: "Unidade móvel de flushing de alta vazão que vai até a sua planta." },
  { c: "Especiais", t: "P-FEF · Bancadas de flushing", d: "Bancadas para flushing de tubulações e sistemas." },
  { c: "Especiais", t: "P-TMR® N₂", d: "Condicionamento e monitoramento com nitrogênio." },
  { c: "Especiais", t: "Unidades personalizadas", d: "Unidades de filtragem fixas ou móveis, projetadas para a sua planta." },
];

export const CLIENTS = [
  ["Suzano", T + "suzano-q349az6l0t72akm89mth8tjhdkek56816ufei0xbue.webp"],
  ["ArcelorMittal", T + "Arcelor_Mittal-q3496zd9z5q6y8f4lenk5btyhm3efhd3n2m42ouke0.webp"],
  ["Bracell", T + "bracell_logo_FA-q34979pi2c4chy03x14ger810uofs5i5chsgcqf8bg.webp"],
  ["CSN", T + "csn-q349800zdp4dj0xvnci0ckkxnn2proems421shc7nw.webp"],
  ["CEMIG", T + "cemig-logo-q3497eep0ias3zta5l5l981bzs19un0t151vr489h6.webp"],
  ["Engie", T + "engie-q3498xv67qep4zkq5r4kuc1j1ifxgs4ywrjj2fy1d4.webp"],
  ["Raízen", T + "raizen-q349a45wra0lnfvaaresgjd9rung35sw2kwdnw7bog.webp"],
  ["Embraer", T + "embraer-q3498s852q6z7bsx2ootfdgrh77q6likvzmm6s6ew8.webp"],
  ["Jirau Energia", T + "jirau-energia-rcwqwjbkmymnra1v3r2egqg9y5w75u4dmrxr67q9x8.webp"],
  ["EDP", T + "edp-q3498bb1npjtechhthdj6hqgs9j4c1netnvvjsvhu4.webp"],
  ["CTG", T + "ctg-q34984q6bvat52r1vwj571e8mkfju5xagrbh6v58p6.webp"],
  ["SKF", T + "sfk-q349aaqs349lwplq8c96fzphxjr0l1j0fhgs0txkb2.webp"],
  ["Schaeffler", T + "schaeffler-q349a8v3pg719hogjbfxb06kqs0a5nbjr85t2a0cj2.webp"],
  ["Shell", T + "Shell-Logo-q3gx56qlchjb6zve61cf6remi8kh0jma1ucfw1ce28.webp"],
  ["Vibra", T + "Vibra_Energia-q349b4tm5tes88e1cp98ns48xvmrfcuf7mcbdooyug.webp"],
  ["Voith", T + "voith-q349b5rgcng2juco77nv89vpj9i4n1y5jqzsuynklg.webp"],
  ["Andritz", T + "andritz-q3496uo30zjrc6lycumfav0nioqkczufyfcoob1j3k.webp"],
  ["São Martinho", T + "sao-martinho-q349a6zfbs4gm9r6uamo60nnk09jq9432yuu3q34zo.webp"],
  ["Guarani", T + "guarani-q34996bpx8qa1h8fscs7yrwodza8e22jxxewdxlhps.webp"],
  ["CESP", T + "cesp-q3497qmlhcriaxbj68fqnmybpsd1mpdbetj6zpq562.webp"],
  ["AES Tietê", T + "aes-tiete-q3496qwq9nem1qreyszx0vyt5593i7filwqqr773ya.webp"],
  ["WestRock", T + "west-rock-q349b7n4qbin729xw8h4d9emq18v2g5m80artiksao.webp"],
];

export const SECTORS = [
  { t: "Geração de energia", s: "Hidrelétricas, termelétricas e nuclear", img: "/img/setores/setor-geracao-de-energia-usina-termeletrica.webp", alt: "Usina termelétrica: filtração e purificação de óleo para geração de energia", icon: "bolt" },
  { t: "Papel e celulose", s: "Turbogeradores, prensas e hidráulica", img: "/img/setores/setor-papel-e-celulose-maquina-de-papel.webp", alt: "Máquina de papel em fábrica de papel e celulose", icon: "leaf" },
  { t: "Siderurgia", s: "Laminação, lingotamento e sistemas hidráulicos", img: "/img/setores/setor-siderurgia-laminacao-bobinas-de-aco.webp", alt: "Laminação e bobinas de aço em usina siderúrgica", icon: "gear" },
  { t: "Sucroenergético", s: "Moendas, redutores e turbinas", img: "/img/setores/setor-sucroenergetico-usina-de-cana-de-acucar.webp", alt: "Descarga de cana-de-açúcar em usina sucroenergética", icon: "factory" },
  { t: "Eólica", s: "Caixas multiplicadoras de aerogeradores", img: "/img/setores/setor-energia-eolica-aerogeradores.webp", alt: "Aerogeradores em parque de energia eólica", icon: "wind" },
  { t: "Mineração e indústria", s: "Equipamentos móveis e plantas de processo", img: "/img/setores/setor-mineracao-planta-de-beneficiamento.webp", alt: "Planta de beneficiamento de minério em mineração", icon: "truck" },
];

export const FAQ = [
  { q: "O que a Purilub faz?", a: "A Purilub purifica, filtra e desidrata óleos industriais (lubrificantes, hidráulicos, isolantes e Diesel), fabrica equipamentos de filtragem e purificação e mantém laboratório próprio de análise de óleo. Atua desde 1989 e é certificada ISO 9001:2015 e ISO 14001:2015." },
  { q: "É preciso parar a máquina para tratar o óleo?", a: "Na maioria dos casos, não. A filtragem off-line e sistemas como o P-EFO-SVR trabalham com o equipamento em operação." },
  { q: "Vale mais a pena tratar ou trocar o óleo?", a: "Quando a base do óleo está boa, tratar custa menos que trocar e ainda remove a contaminação que danificaria o óleo novo. A análise de laboratório mostra qual é o caso." },
  { q: "Quais marcas a Purilub representa?", a: "A Purilub é distribuidora oficial no Brasil da TTI (Estados Unidos), fabricante dos respiros dessecantes PowerBreather™, e da EPT Clean Oil (Canadá), dona da tecnologia de resina iônica ICB® para prevenção de verniz." },
  { q: "Com que frequência devo fazer a análise do óleo?", a: "Não existe uma regra única: a frequência depende da criticidade do equipamento, do volume de óleo e das condições de operação. Turbinas, redutores e sistemas hidráulicos de alta pressão pedem acompanhamento mais próximo. Com base no histórico da sua planta, nosso time define um plano de análises que antecipa falhas sem gerar custo desnecessário.", cta: "Monte seu plano de análises com um especialista" },
  { q: "O que é flushing e quando ele é necessário?", a: "Flushing é a limpeza interna de tubulações e sistemas hidráulicos ou de lubrificação pelo escoamento do óleo em alta velocidade e turbulência, arrastando partículas, carepa e resíduos de montagem. É indicado na partida de sistemas novos, após reparos ou troca de componentes e depois de contaminações graves. Feito antes da partida, evita que a sujeira da montagem destrua bombas, válvulas e rolamentos.", cta: "Solicite uma avaliação do seu sistema" },
  { q: "Como saber se meu óleo está formando verniz?", a: "O verniz se forma de maneira lenta e contínua, e muitas vezes só é percebido depois de anos de operação. Os sinais mais comuns são o aumento da temperatura dos mancais, vibração, válvulas que travam e filtros saturando antes do previsto. A confirmação vem do ensaio de potencial de verniz (MPC) em laboratório, que mostra o problema antes de ele virar parada.", cta: "Envie uma amostra e descubra o potencial de verniz" },
  { q: "A Purilub faz tratamento de óleo isolante de transformadores?", a: "Sim. Tratamos e recuperamos óleo isolante de transformadores em subestações, termelétricas e plantas industriais, removendo umidade e contaminantes que reduzem a rigidez dielétrica. O trabalho é acompanhado por análises de laboratório, para documentar o resultado e prolongar a vida útil do óleo e do equipamento.", cta: "Fale com um especialista sobre seu transformador" },
];

export const SEARCH_INDEX = [
  ...FAMILIES.map(s => ({ type: "Solução", t: s.t, d: s.d })),
  ...SERVICES.map(s => ({ type: "Serviço", t: s.t, d: s.d })),
  ...EQUIPMENTS.map(e => ({ type: "Equipamento", t: e.t, d: e.d })),
  { type: "Página", t: "Instruções de envio de amostras", d: "Como coletar e enviar o óleo para o laboratório" },
  { type: "Página", t: "Como interpretar um laudo de análise físico-química", d: "Laboratório" },
  { type: "Marca", t: "TTI · Respiros dessecantes PowerBreather™", d: "Distribuidora oficial no Brasil" },
  { type: "Marca", t: "EPT Clean Oil · Resina iônica ICB®", d: "Distribuidora oficial no Brasil" },
  { type: "Artigo", t: "A importância de filtrar o óleo Diesel", d: "Blog" },
  { type: "Artigo", t: "Índices de contaminação de óleos: classes de pureza", d: "Blog" },
  { type: "Artigo", t: "Mitigação da formação de verniz em sistemas lubrificados", d: "Blog" },
];

/* ===== VITRINE DA ABERTURA =====
   Para trocar as fotos pelos PNGs definitivos: substitua o campo "img" de cada item
   (ex.: import imgB21 from "./p-efo-b21.png"). PNG com fundo transparente fica ideal. */
export const SHOWCASE = [
  { id: "c2rs", name: "P-C2RS®", short: "P-C2RS®", tag: "Lançamento", sub: "Revolução em desidratação de óleos e combustíveis", img: imgC2rs,
    bullets: [["drop", "Remove até ", "100 ml de água", " por hora"], ["bolt", "Cerca de ", "1 kW", " para tratar 1.000 lph"], ["spark", "Nitrogênio a ", "−60 °C", " em contrafluxo"]] },
  { id: "svr", name: "P-EFO-SVR®", short: "P-EFO-SVR®", tag: "EPT Clean Oil", sub: "Prevenção e mitigação da formação de verniz", img: imgSvr,
    bullets: [["shield", "Elimina o verniz em ", "nível molecular", ""], ["gear", "Atua em ", "tempo integral", ", sem parar a turbina"], ["flask", "Resina iônica ", "ICB®", " patenteada"]] },
  { id: "b21", name: "P-EFO-B21", short: "P-EFO-B21", tag: "Novo", sub: "Unidade móvel de filtragem até 3.500 lph e 460 cSt", img: R + "2022/01/thumb_660x660_P-EFO.webp",
    bullets: [["truck", "Só ", "50 cm de largura", ": passa por qualquer porta"], ["award", "Robusta e leve: ", "90 kg", ""], ["shield", "Filtração absoluta ", "Beta = 1.000", " em 2 estágios"]] },
  { id: "diesel", name: "Sistema Diesel", short: "Diesel", tag: "Geradores", sub: "Filtração e separação de água do óleo Diesel", img: imgDiesel,
    bullets: [["server", "Data centers, hospitais e ", "salas de controle", ""], ["bolt", "Poucas horas de ", "acionamento por semana", ""], ["check", "Gerador ", "pronto para a emergência", ""]] },
];
