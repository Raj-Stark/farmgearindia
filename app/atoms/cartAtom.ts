import { atomWithStorage } from "jotai/utils";

interface CartItem {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  inventory: number;
  cartTotal: number;
  metaData?: Record<string, string>;
}

export const cartAtom = atomWithStorage<CartItem[]>("cart", []);
