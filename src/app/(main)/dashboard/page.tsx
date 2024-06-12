"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();

  console.log(session);

  if (!session?.data?.user) {
    router.push("/");
  }

  return (
    <div className="w-full max-h-full flex flex-col justify-center items-center">
      <h1>Name: {session?.data?.user?.name}</h1>
      <h1>Email: {session?.data?.user?.email}</h1>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="p-5 bg-slate-500 m-2 rounded"
      >
        logout
      </button>
    </div>
  );
};

export default Dashboard;
