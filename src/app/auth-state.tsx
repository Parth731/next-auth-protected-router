"use client";

import { useAuthStore } from "../lib/use-auth-store";
import { useSession } from "next-auth/react";

const AuthState = () => {
  const { data } = useSession();
  console.log(data);
  if (data) useAuthStore.setState(data);

  return <></>;
};

export default AuthState;
