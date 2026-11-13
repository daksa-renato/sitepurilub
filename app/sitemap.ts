import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
/* Acrescentar aqui as rotas internas à medida que forem criadas (/servicos/..., /equipamentos/..., etc.). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE.url + "/", changeFrequency: "monthly", priority: 1 }];
}
