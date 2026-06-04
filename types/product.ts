export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
