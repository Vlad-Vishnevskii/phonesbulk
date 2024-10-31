export type ProductAttributes = {
  brand?: string;
  capacity: string;
  grade: string;
  price: number;
  status?: null;
  model: string;
  qty?: number;
  bestprice?: boolean | null;
  bestseller?: boolean | null;
};

export type ProductData = {
  id: number;
  attributes: ProductAttributes;
  quantity?: number;
};
