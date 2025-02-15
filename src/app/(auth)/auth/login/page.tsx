"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { showSuccessToastMessage } from "@/utils/toastify.utils";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const params = useSearchParams();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        // email,
        // password,
        // redirect: false,
        // callbackUrl: params?.get("callbackUrl") ?? "/dashboard",
        username: email,
        password: password,
        redirect: false,
        callbackUrl: "/dashboard",
      });
      if (res?.error === "CredentialsSignin") {
        toast.error("Username or Password is incorrect");
      } else if (!res?.error && res?.url) {
        showSuccessToastMessage("Logged in successfully");

        // console.log(res?.url);
        // setScaleXValue(1);
        // Delay the navigation to the dashboard by 2 seconds
        setTimeout(() => {
          if (res?.url) {
            router.replace(res?.url);
          }
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/register"}>
            Don't have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
