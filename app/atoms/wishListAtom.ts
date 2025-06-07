import { atomWithStorage } from "jotai/utils";
import { ProductType } from "../types";

export const wishListAtom = atomWithStorage<ProductType[]>("wishlist", []);
