import { auth } from "./auth";
import { useAuthStore } from "@/lib/use-auth-store";
export function parseJwt(token: string) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url?.replace("-", "+").replace("_", "/");
  let isServer = typeof window === "undefined" ? true : false;

  return isServer
    ? JSON.parse(Buffer.from(base64Url ?? "{}", "base64").toString())
    : JSON.parse(window.atob(base64 ?? "{}"));
}
export interface SessionData {
  sub: string;
  privs: string;
  companyCode: string;
  userId: number;
  displayName: string;
  iat: number;
  exp: number;
}
export async function canAccess(permissions: string[]) {
  let isServer = typeof window === "undefined" ? true : false;
  const session = isServer ? await auth() : useAuthStore.getState();
  let matchAll = true;
  let matchAny = false;

  const sessionData: SessionData = parseJwt(session?.token ?? "");
  permissions.forEach((permission) => {
    if (sessionData.privs.includes(permission)) matchAny = true;
    else matchAll = false;
  });

  return { matchAll, matchAny };
}
export const allowedImageTypes = ["image/jpg", "image/jpeg", "image/png"];
