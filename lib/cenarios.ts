// Cenários mantidos fora do build de produção — projeção hipotética (+50%) ou
// simulação ainda em validação —, mas disponíveis em desenvolvimento
// (`npm run dev`).
//
// Para expô-los num build de produção — p. ex. numa homologação — defina
// NEXT_PUBLIC_CENARIOS_HIPOTETICOS=1 no momento do build: o valor é inlinado por
// `next build`, não lido em runtime.
export const CENARIOS_HIPOTETICOS = [
  "Cenário Maio 2024 + 50%",
  "Nível da Lagoa + Chuva Acumulada – 16/05/2024",
];

export const MOSTRAR_CENARIOS_HIPOTETICOS =
  process.env.NODE_ENV !== "production" ||
  process.env.NEXT_PUBLIC_CENARIOS_HIPOTETICOS === "1";

/** Um cenário é visível se não for hipotético ou se os hipotéticos estiverem liberados. */
export const cenarioVisivel = (nome: string) =>
  MOSTRAR_CENARIOS_HIPOTETICOS || !CENARIOS_HIPOTETICOS.includes(nome);
