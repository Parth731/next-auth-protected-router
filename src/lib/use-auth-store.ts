import type { Session } from "next-auth";
import { create } from "zustand";

export const useAuthStore = create<Session>((set) => ({
  expires: "",
}));
