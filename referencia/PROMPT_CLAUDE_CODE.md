# PROMPT PARA O CLAUDE CODE · Nova Home Purilub (V2)

> Cole este arquivo inteiro no Claude Code, com esta pasta (`Purilub_Site_V2_FINAL`) aberta como diretório de trabalho.

---

## 1. Missão

Você vai transformar o protótipo aprovado da nova Home da **Purilub** (empresa brasileira de filtração, purificação e desidratação de óleos industriais, desde 1989) em um projeto de produção.

**Regra número 1: fidelidade total.** O layout, os textos, as cores, a tipografia, os espaçamentos, a ordem das seções e as animações já foram aprovados pelo cliente, item por item. Não redesenhe, não "melhore", não reescreva textos, não acrescente nem remova seções. Se algo parecer estranho, **pergunte antes de mudar**.

## 2. Fontes da verdade (nesta ordem)

1. `prototipo_home.html` · protótipo final, abre direto no navegador. É **a referência visual e de comportamento**. Abra no Chrome, em 1440 px e em 375 px, e compare com o seu resultado a cada etapa.
2. `src/` · código-fonte React exato que gerou o protótipo:
   - `src/App.jsx` · todos os componentes e animações (Framer Motion)
   - `src/data.js` · todos os conteúdos (serviços, equipamentos, vitrine, clientes, setores, FAQ, índice de busca)
   - `src/icons.jsx` · ícones em SVG (traço)
   - `src/styles.css` · CSS final
   - `src/assets/` · logos e imagens locais
   - `fonts/` · Montserrat 400, 500, 600, 700 (woff2)
3. `prototipo_modelo_ficha_equipamento.html` · design **guardado** da ficha técnica do P-EFO-B21. **Não entra na Home.** Será o template das páginas internas de equipamento (componente `Banner` em `App.jsx`).

> Atenção ao `styles.css`: ele foi construído por camadas. Regras mais abaixo **sobrescrevem** as de cima (cores, fontes, tamanhos). O resultado final correto é o que aparece no protótipo. Na Etapa 1 copie o CSS **como está**; só reorganize depois de comprovar paridade visual.

## 3. Etapa 1 · Rodar a referência (obrigatório antes de qualquer coisa)

A pasta já é um projeto Vite + React funcional:

```bash
npm install
npm run dev      # abre a Home idêntica ao protótipo
npm run build    # já testado: compila sem erros
```

Confirme que `npm run dev` fica igual ao `prototipo_home.html`. Essa é a sua linha de base.

## 4. Etapa 2 · Projeto de produção

**Stack:** Next.js 14+ (App Router) com `output: "export"` (HTML estático, essencial para SEO e GEO), React 18, `framer-motion` 11, CSS global (o `styles.css` atual). Sem Tailwind e sem bibliotecas de UI. **Não** troque o Framer Motion por outra biblioteca.

Passos:
1. Criar o projeto Next.js e copiar `styles.css`, `fonts.css`, `fonts/` e `assets/`. Para imagens, use `next/image` com `unoptimized` ou `<img>` normal, porque o export é estático.
2. Quebrar `App.jsx` em componentes (um arquivo por seção) **sem alterar JSX, classes, textos nem props de animação**. Componentes com estado e animação levam `"use client"`.
3. A página `/` renderiza as seções na ordem da seção 7 deste documento.
4. O `layout.tsx` contém: `<html lang="pt-BR">`, metadados, fontes e o script de fallback `no-motion` (ver 8.3).
5. A navegação interna por âncoras (`go("contato")`, `go("servicos")`…) faz scroll suave com compensação de 76 px do header fixo. Mantenha.
6. Links para páginas internas ainda não existem. No protótipo eles abrem um modal "Página interna" (`InnerModal`). **Em produção:** troque o modal por `<Link>` para a rota prevista (ver seção 10) e mantenha o modal apenas para rotas ainda não criadas.

## 5. Identidade visual (valores finais)

**Cores**

| Token | Hex | Uso |
|---|---|---|
| `--blue` | `#1A4F92` | painéis azuis, rótulos de seção, links, faixa "Conte o problema" |
| `--navy-d` | `#18295A` | títulos, seção "Como trabalhamos" |
| `--navy-x` | `#0F1D42` | rodapé, contato |
| `--sky` | `#EAF0F8` | fundos de ícones, hover de menu |
| `--or` | `#B47F12` | dourado da marca: botões principais, faixa dourada, destaques |
| `--or-d` / `--or-l` | `#94680A` / `#E2B44E` | hover / dourado claro em fundo escuro |
| cinzas | `--g25 #FAFBFC` … `--g700 #384152` | textos de apoio e linhas |

**Tipografia:** **Montserrat em todo o site** (é obrigatória uma regra `html body * { font-family: Montserrat… !important }`). **Nenhuma fonte condensada** e nenhuma monoespaçada. Pesos: 700 títulos, 600 botões/rótulos, 500 menu, 400 texto.
- H1 (abertura): `clamp(32px, 3.2vw, 48px)`, 700, letter-spacing −0.03em, branco, 2 linhas fixas: "Filtração e purificação" / "de óleos industriais".
- H2 (seções): `clamp(28px, 2.7vw, 40px)`, 700, −0.025em, `--navy-d`, sempre quebrado em 2 linhas definidas no código.
- Rótulo de seção: ícone da gota do logotipo (`logo_icon.png`, ou `logo_icon_w.png` em fundo escuro) + linha animada de 56 px (degradê dourado→azul) + texto em CAIXA-ALTA 15 px, 600, espaçamento 0.16em, azul. **Sem numeração.**

**Breakpoints:** 1180 px (tablet) e 880 px (celular). Container: `max-width: 1280px`, padding lateral de 40 px (22 px no celular).

**Proibido:** fundos quadriculados (foram removidos do projeto), faixas azuis atrás dos rótulos, numeração nos rótulos, etiquetas (pills) na vitrine, fonte condensada.

## 6. Componentes-chave (comportamento exato)

### 6.1 Header (fixo, sempre branco, 78 px)
Logo colorido à esquerda. Menu: **Serviços ▾, Equipamentos ▾, Marcas ▾, Laboratório, Sobre**. ("Soluções" foi removido.) À direita: lupa (abre a busca; o atalho Cmd/Ctrl+K funciona mas **não é exibido**) e o botão dourado "Fale com um especialista". Mega menu com 3 colunas de links e um card com foto à direita; ele abre ao passar o mouse, fecha 180 ms depois de o mouse sair e anima com fade/slide (AnimatePresence). No celular vira drawer lateral com `<details>`.

### 6.2 Barra de progresso de leitura
Fixa no topo, 3 px, dourada, `scaleX` ligado ao `scrollYProgress` com spring.

### 6.3 Painel azul inclinado (`SlantPanel`), crítico
A borda inclinada com canto inferior direito arredondado é **calculada em pixels reais** via ResizeObserver: arco circular tangente à diagonal e à base. **Nunca** use SVG com `preserveAspectRatio="none"`, nem `skew` com `border-radius`: o cliente reprovou os cantos tortos. Copie a função exatamente (parâmetros na abertura: `slant 0.27`, `r 130`; largura do painel 58% da área).

### 6.4 Título de seção (`Title`)
O H2 é revelado linha a linha por máscara (`overflow:hidden` + `y: 110% → 0`). **O gatilho `whileInView` fica no `<motion.h2>` pai, com variants propagando para as linhas.** Nunca coloque `whileInView` no span interno: ele começa fora da máscara e nunca é considerado visível (esse bug já aconteceu e deixou títulos invisíveis).

### 6.5 Vitrine da abertura (`HeroShowcase`), à direita do painel azul
- 4 slides (`SHOWCASE` em `data.js`): P-C2RS®, P-EFO-SVR®, P-EFO-B21, Sistema Diesel. **Começa em um slide aleatório.**
- Autoplay de 6,5 s (motion value `prog` animado de 0 a 1, que chama o próximo slide no fim); pausa com o mouse em cima; arrasto horizontal (drag) troca de slide.
- Transição: a imagem nova entra com `clip-path: circle(0% → 78% at 50% 64%)` em 1,15 s, mais uma onda dourada (ripple) que se expande; a imagem anterior sai com fade + `scale 0.9` + `blur 8px`, deslocando para o lado contrário. Nome do produto com máscara; subtítulo em fade.
- Layout: nome (Montserrat 700, 40 px, azul) e subtítulo no topo à direita. **Sem etiquetas e sem caixa de destaques.** Imagem grande ao centro sobre um orb azul-claro. Embaixo, numa linha só: setas ← → redondas, contador "01 / 04" e, **alinhado à direita, o CTA "Conhecer o {produto}"** (pílula com contorno azul e círculo dourado com seta; no hover o fundo azul preenche da esquerda para a direita, o texto fica branco e a seta gira −45°). **Sem barras de progresso visíveis.**
- O CTA ainda não tem destino (`preventDefault`). Em produção, ligar a `/equipamentos/{slug}`.

### 6.6 Faixa de destaques (abaixo da abertura), padrão obrigatório: 2 linhas azuis + 1 cinza
| Ícone | Azul (2 linhas) | Cinza |
|---|---|---|
| award | Mais de **35** anos / de experiência (35 conta de 0 a 35) | No tratamento de óleos |
| shield | Qualidade / ISO 9001 · 14001 | Certificação DQS / IQNet |
| book | Inovação / Patente INPI | Processo de filtragem próprio |
| truck | Distribuidora oficial / no Brasil | EPT Clean Oil · TTI |

Depois dela vem uma faixa dourada de 10 px.

## 7. Ordem das seções da Home (não alterar)

1. **Abertura:** painel azul (selo "Desde 1989 · ISO 9001 e ISO 14001", H1, texto, botões "Fale com um especialista" e "Conheça as soluções", que leva a `#servicos`), contornos de gota desenhados (pathLength), vitrine à direita, faixa de destaques e faixa dourada.
2. **Quem confia na Purilub:** título centralizado (Montserrat 700, caixa-alta, 26 px) e marquee de logos (60 s, pausa no hover, logos em cinza que ficam coloridos no hover). Sem link "Ver todos".
3. **Serviços** (`#servicos`): grade de **5 colunas × 2 linhas**, compacta (ícone de 42 px, título de 15 px, descrição curta de no máximo 2 linhas, seta só no hover). Textos em `SERVICES`.
4. **Como trabalhamos:** fundo `--navy-d` com brilhos radiais (sem grade), 4 passos e linha dourada de progresso vertical ligada ao scroll.
5. **Óleo Diesel** (`#diesel`): à esquerda, título, 2 parágrafos e o botão "Conhecer o sistema"; à direita, um cartão com a foto `img_diesel.webp` (sombra suave), "Garantia de suprimento de energia para:" e **6 ícones numa linha** (Data centers, Salas de controle, Hospitais, Shopping centers, Condomínios, Elevadores).
6. **Faixa azul** "Conte o problema. / A gente indica o caminho." + botão dourado + telefone.
7. **Equipamentos** (`#equipamentos`): 2 cards de destaque (P-C2RS® 3000 e P-EFO-SVR, **sem tabela técnica e sem miniaturas**); abas Todos/Filtragem/Purificação/Verniz/Filtros/Especiais com pílula deslizante (`layoutId`); grade de 4 colunas mostrando **só 8 cards (2 linhas)** e o botão **"Exibir mais (+N)"** / "Exibir menos" (que volta o scroll para a seção). A grade anima com `layout` + `AnimatePresence mode="popLayout"`. Trocar de aba volta para 8.
8. **Marcas representadas:** cards TTI (EUA) e EPT Clean Oil (Canadá).
9. **Laboratório** (`#laboratorio`): foto de fundo + **cartão largo e baixo em 2 colunas** (título, texto e botões à esquerda; lista de análises numa caixa clara à direita).
10. **Setores:** bento grid de 3 colunas (energia ocupa 2×2).
11. **Perguntas frequentes:** título "Dúvidas técnicas / mais comuns", **8 perguntas** em acordeão com altura animada; as perguntas 5 a 8 têm um link dourado (`cta`) que leva a `#contato`.
12. **Contato** (`#contato`): fundo azul-marinho liso, lista de contatos e formulário com chips de tema, validação (nome, empresa, e-mail, mensagem) e estado de sucesso animado. **Em produção:** ligar a um endpoint ou CRM (perguntar qual).
13. **Rodapé:** logo branco, colunas de links, faixa **Certificações e credenciais** (5 itens com fundo incolor, ícones de linha branca em círculo e divisores finos: ISO 9001:2015, ISO 14001:2015, DQS · IQNet · UL, Patente INPI, TTI · EPT Clean Oil), endereços (matriz em Pradópolis/SP e filial em Barra Mansa/RJ), linha "A Purilub é distribuidora oficial da TTI e da EPT Clean Oil no Brasil", copyright e faixa dourada.
14. **Botão flutuante do WhatsApp:** entra com spring depois de 1,6 s.

**Ocultos (o código existe, mas NÃO renderizam na Home):** `Families` ("Soluções mais pesquisadas") e `Banner` (ficha P-EFO-B21, usado só em `/equipamentos/p-efo-b21`).

## 8. Animações: regras

1. Use **Framer Motion** exatamente como está em `App.jsx` (o helper `rev(i, y)` faz fade + subida com stagger de 0,07 s; o `ease` padrão é `[0.2, 0.7, 0.2, 1]`).
2. Envolva tudo com `<MotionConfig reducedMotion="user">`.
3. **Fallback `no-motion`:** o script inline mede o `requestAnimationFrame`; se o navegador não animar (aba em segundo plano, pré-visualizadores), adiciona `.no-motion` ao `<html>`, e o CSS força tudo visível (opacidade, transform, clip-path, pathLength). Mantenha esse script e essas regras: sem eles, o conteúdo pode ficar invisível.
4. Não use `whileInView` em elemento que começa escondido dentro de `overflow:hidden` (ver 6.4).

## 9. Imagens

- **Locais (já na pasta):** logos, P-C2RS (foto do folheto), P-EFO-SVR, elementos ICB e `img_diesel.webp` (PNG transparente convertido, 900 px, 76 KB).
- **Remotas** (URLs em `data.js`, do site atual `purilub.com.br/wordpress/wp-content/uploads/...`): logos de clientes, fotos do catálogo, TTI, laboratório e termelétrica. **Em produção:** baixe cada uma para `/public/img/`, converta para WebP (máx. 900 px, qualidade 80) e troque a URL. O componente `Img` tem fallback elegante para imagem quebrada: mantenha.
- O cliente vai enviar PNGs com fundo transparente dos equipamentos para a vitrine e o catálogo. Basta trocar o campo `img`.
- Todas as `<img>` precisam de `alt` descritivo, `loading="lazy"` (exceto as da primeira dobra) e `width`/`height` definidos.

## 10. SEO e GEO (obrigatório em produção)

- **Um único H1** (o da abertura). H2 por seção e H3 nos cards: já estão assim, não mude.
- `metadata`: title "Purilub | Filtração e purificação de óleos industriais", a description presente no `index.html`, Open Graph e canonical `https://www.purilub.com.br/`.
- **JSON-LD:** `Organization` (fundação em 1989, ISO 9001/14001, `sameAs` LinkedIn/Instagram/YouTube), `LocalBusiness` × 2 (os endereços do rodapé) e **`FAQPage` gerado a partir de `FAQ` em `data.js`**.
- HTML estático (export) com todo o texto no HTML inicial. Nada de conteúdo só no client.
- Rotas previstas para os links internos, preservando os slugs do site atual sempre que existirem: `/servicos/{slug}`, `/equipamentos/{slug}`, `/laboratorio`, `/marcas/tti`, `/marcas/ept-clean-oil`, `/setores/{slug}`, `/quem-somos`, `/contato`. Gerar `sitemap.xml` e `robots.txt`.
- Performance alvo: Lighthouse ≥ 90 em mobile; fontes woff2 locais com `font-display: swap`.

## 11. Pendências (NÃO invente; deixe marcado com TODO)

CNPJ, número de WhatsApp, destino do formulário (e-mail/CRM), PNGs finais dos equipamentos, logos oficiais monocromáticos (DQS, IQNet, UL, TTI, EPT) se o cliente fornecer, autorização de uso dos logos de clientes, conteúdo das páginas internas.

## 12. Checklist de aceite (verifique item a item e me reporte)

- [ ] `npm run build` sem erros e sem warnings de hidratação.
- [ ] Comparação lado a lado com `prototipo_home.html` em 1440 px e 375 px: mesma ordem, textos idênticos, mesmas cores e fontes (Montserrat em tudo).
- [ ] Canto do painel azul perfeito (arco tangente) em 1280, 1440 e 1920 px.
- [ ] Todos os H2 aparecem ao rolar (nenhum título invisível).
- [ ] Vitrine: começa em slide aleatório, autoplay, pausa no hover, arrastar funciona, setas e contador funcionam, CTA à direita com o efeito de hover.
- [ ] Equipamentos: 8 cards + "Exibir mais", abas com pílula deslizante.
- [ ] FAQ com 8 perguntas, CTAs levando ao contato, JSON-LD FAQPage válido (teste de pesquisa aprimorada do Google).
- [ ] Rodapé com credenciais em linha branca, sem quadrados brancos.
- [ ] Sem fundo quadriculado em lugar nenhum.
- [ ] `prefers-reduced-motion` respeitado e fallback `no-motion` funcionando.
- [ ] Nenhum texto, cor ou seção alterada sem aprovação.

**Se algo não estiver claro ou entrar em conflito com este documento, pare e pergunte. Não tome decisões de design por conta própria.**
