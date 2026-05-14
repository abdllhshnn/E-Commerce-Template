export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number | null;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  badge: 'new' | 'sale' | null;
  discountPercent: number;
  inStock: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  image: string;
}

export interface HeroBanner {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  tag?: string;
}

export interface PromoBanner {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  gradient: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
}
