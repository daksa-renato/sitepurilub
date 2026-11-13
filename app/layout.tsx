import type { Metadata, Viewport } from "next";
import "../styles/fonts.css";
import "../styles/styles.css";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE.url + "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [{ url: "/img/img_c2rs.jpg", alt: "Equipamento P-C2RS da Purilub" }],
  },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
  icons: { icon: "/img/logo_icon.png" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

/* Fallback no-motion: se o navegador não estiver animando (aba em segundo plano, pré-visualizadores),
   marca <html class="no-motion"> e o CSS força todo o conteúdo visível. Não remover. */
const NO_MOTION = `(function(){var n=0;function c(){n++;if(n<12)requestAnimationFrame(c)}requestAnimationFrame(c);setTimeout(function(){if(n<6)document.documentElement.classList.add("no-motion")},1500)})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        {children}
        <script dangerouslySetInnerHTML={{ __html: NO_MOTION }} />
      </body>
    </html>
  );
}
