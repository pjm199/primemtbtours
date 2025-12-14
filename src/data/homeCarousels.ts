// src/data/homeCarousels.ts
import type { PrimeSection } from "../types/prime";
import raw from "./homeCarousels.json";

// Today: just return static JSON
export function getHomeCarousels(): PrimeSection[] {
  return raw as PrimeSection[];
}

// Tomorrow: replace with API / DB
// export async function getHomeCarousels(): Promise<PrimeSection[]> {
//   const res = await fetch("/api/home-carousels");
//   return (await res.json()) as PrimeSection[];
// }
