import { atom } from "jotai";

export const paymentMethodAtom = atom<"cod" | "online">("cod");
