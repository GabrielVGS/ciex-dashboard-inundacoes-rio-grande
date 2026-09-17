import { readFileSync } from "fs";
import { join } from "path";
import type { PerdasData } from "./PerdasClient";
import { cenarioVisivel } from "@/lib/cenarios";

// Descarta os cenários ocultos no servidor, antes que os dados sejam enviados
// aos clientes da página completa ou da rota modal.
function filtrarCenarios(dados: PerdasData): PerdasData {
  return Object.fromEntries(
    Object.entries(dados).map(([municipio, cenarios]) => [
      municipio,
      Object.fromEntries(Object.entries(cenarios).filter(([cenario]) => cenarioVisivel(cenario))),
    ])
  );
}

export function getPerdasData(): PerdasData {
  try {
    const p = join(process.cwd(), "public", "dados_convertidos", "perdas_operacionais.json");
    return filtrarCenarios(JSON.parse(readFileSync(p, "utf8")));
  } catch {
    return {};
  }
}
