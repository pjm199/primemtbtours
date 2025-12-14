// src/types/prime.ts
export type PrimeCardItem = {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  badging?: string;
  imageUrl: string;
  tags?: string[];
};

export type PrimeSection = {
  id: string;
  title: string;
  items: PrimeCardItem[];
};
