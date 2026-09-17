// Cenários hipotéticos — projeções ainda em validação que ficam fora do build de
// produção, mas seguem disponíveis em desenvolvimento (`npm run dev`).
//
// Para expô-los num build de produção — p. ex. numa homologação — defina
// NEXT_PUBLIC_CENARIOS_HIPOTETICOS=1 no momento do build: o valor é inlinado por
// `next build`, não lido em runtime.
export const CENARIOS_HIPOTETICOS = ["Cenário Maio 2024 + 50%"];

export const MOSTRAR_CENARIOS_HIPOTETICOS =
  process.env.NODE_ENV !== "production" ||
  process.env.NEXT_PUBLIC_CENARIOS_HIPOTETICOS === "1";

/** Um cenário é visível se não for hipotético ou se os hipotéticos estiverem liberados. */
export const cenarioVisivel = (nome: string) =>
  MOSTRAR_CENARIOS_HIPOTETICOS || !CENARIOS_HIPOTETICOS.includes(nome);
