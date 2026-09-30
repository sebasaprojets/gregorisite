import { clsx, type ClassValue } from "clsx";

// Junta classes condicionais. Os componentes evitam classes conflitantes,
// então não é preciso o tailwind-merge (economiza ~7 KB no celular).
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
