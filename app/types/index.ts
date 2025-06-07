export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductType {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  numOfReviews: number;
  averageRating: number;
  category: Category;
  inventory: number;
  description: string;
  featured: boolean;
  freeShipping: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  rating: number;
  comment: string;
  userId: UserId;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserId {
  _id: string;
  name: string;
  email: string;
}
