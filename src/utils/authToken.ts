import { auth } from "@/lib/auth";
import { useAuthStore } from "@/lib/use-auth-store";

export const authToken = async () => {
  let isServer = typeof window === "undefined" ? true : false;
  const accessToken = isServer ? await auth() : useAuthStore.getState();
  return accessToken?.token;
};
