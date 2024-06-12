import CredentialsProvider from "next-auth/providers/credentials";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import axios from "axios";
import axiosInstance from "@/utils/axiosSetup";

type Tmp = any;
declare module "next-auth" {
  interface User extends Tmp {}
  interface Session extends DefaultSession, Tmp {}
}
type Credentials = Partial<Record<"username" | "password", unknown>>;

export const config = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log("credentials =>", credentials);
        const { email, password }: any = credentials;

        // const res = await axios.get(
        //   "https://jsonplaceholder.typicode.com/posts"
        // );

        // console.log(res?.data);

        try {
          let res = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: "emilys",
              password: "emilyspass",
              expiresInMins: 30, // optional, defaults to 60
            }),
          });

          const data = await res.json();
          console.log(data);

          const user = {
            id: "31",
            name: "parth",
            email: "parth@gmail.com",
            password: "parth123",
            accesstoken: data?.token,
            refreshToken: data?.refreshToken,
          };

          if (
            credentials?.username === user.email &&
            credentials?.password === user.password
          ) {
            return user;
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 604800,
  },
  callbacks: {
    async authorized({ auth }: any) {
      console.log(auth);
      return !!auth?.token;
    },
    // jwt(params: any) {
    //   // console.log(params,'jwt');
    //   if (params?.user) {
    //     params.token = {
    //       ...params.token,
    //       token: params?.user?.data?.loginToken,
    //       userDto: {
    //         id: params?.user?.data?.userId,
    //         userName: params?.user?.data?.userName,
    //       },
    //     };
    //   }
    //   return params?.token;
    // },
    // session(params: any) {
    //   if (params?.token) {
    //     params.session = {
    //       ...params.session,
    //       token: params.token.token as Tmp["token"],
    //       userDto: params.token.userDto as Tmp["userDto"],
    //     };
    //   }
    //   return params?.session;
    // },
    jwt(params) {
      console.log(params?.user);
      // console.log("1");
      if (params?.user) {
        params.token = {
          ...params.token,
          token: params?.user?.accesstoken,
          userDto: {
            id: params?.user?.id,
            userName: params?.user?.name,
          },
        };
      }
      return params?.token;
    },
    session(params: any) {
      // console.log("2");
      console.log(params);
      if (params?.token) {
        params.session = {
          ...params.session,
          token: params.token.token as Tmp["token"],
          userDto: params.token.userDto as Tmp["userDto"],
        };
      }
      return params?.session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  trustHost: true,
} satisfies NextAuthConfig;

export const { handlers, auth } = NextAuth(config);
