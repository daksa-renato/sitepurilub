import { Home } from "@/components/Home";
import { FAQ } from "@/lib/data";
import { SITE } from "@/lib/site";

const org = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": SITE.url + "/#organization",
  name: SITE.name,
  url: SITE.url + "/",
  logo: SITE.url + "/img/logo_color.png",
  slogan: "Rentabilidade gota a gota",
  description: SITE.description,
  foundingDate: SITE.foundingDate,
  email: SITE.email,
  telephone: SITE.phone,
  sameAs: SITE.sameAs,
  hasCredential: ["ISO 9001:2015", "ISO 14001:2015"].map((name) => ({ "@type": "EducationalOccupationalCredential", name, credentialCategory: "certification" })),
};
const units = SITE.units.map((u) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: u.name,
  parentOrganization: { "@id": SITE.url + "/#organization" },
  url: SITE.url + "/",
  image: SITE.url + "/img/logo_color.png",
  telephone: SITE.phone,
  email: SITE.email,
  address: { "@type": "PostalAddress", streetAddress: u.street, addressLocality: u.city, addressRegion: u.region, postalCode: u.postalCode, addressCountry: "BR" },
}));
const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: (FAQ as { q: string; a: string }[]).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Page() {
  return (
    <>
      {[org, ...units, faq].map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
      <Home />
    </>
  );
}
