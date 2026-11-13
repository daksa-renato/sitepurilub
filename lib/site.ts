/* Dados institucionais usados em metadados e JSON-LD.
   TODO (pendências do cliente, não inventar): CNPJ, número de WhatsApp, URL do YouTube, destino do formulário. */
export const SITE = {
  url: "https://www.purilub.com.br",
  name: "Purilub",
  title: "Purilub | Filtração e purificação de óleos industriais",
  description:
    "Filtração de óleo, desidratação, remoção de verniz, flushing e análise de óleo para a indústria. Distribuidora oficial TTI e EPT Clean Oil no Brasil.",
  phone: "+55-16-3981-9920",
  email: "comercial@purilub.com.br",
  foundingDate: "1989",
  sameAs: ["https://br.linkedin.com/company/purilub", "https://www.instagram.com/purilub"], // TODO: YouTube
  units: [
    { name: "Purilub · Matriz", street: "Rua Octávio Giovanetti, 811", city: "Pradópolis", region: "SP", postalCode: "14850-000" },
    { name: "Purilub · Filial", street: "Rodovia Presidente Dutra, 90-C · Boa Sorte", city: "Barra Mansa", region: "RJ", postalCode: "27338-000" },
  ],
};
