export interface Product {
  code: string;
  name: string;
  available: boolean;
  visible: boolean;
  details: ProductDetail;
  fullPriceInCents: string;
  salePriceInCents: string;
  rating: number;
  image: string;
  stockAvailable: boolean;
}

interface ProductDetail {
  name: string;
  description: string;
}

export type WishlistItem = Product;
