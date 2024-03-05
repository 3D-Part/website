/* eslint-disable react-hooks/rules-of-hooks */
import { NextAuthOptions, User, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AuthAPI from "@/shared/services/auth";

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Auth",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
        type: { label: "type", type: "text" },
        fullName: { label: "fullName", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        if (credentials.type === "signIn") {
          try {
            const data = await AuthAPI.login({
              email: credentials.email,
              password: credentials.password,
            });
          } catch (error) {}
        } else {
          try {
            const data = await AuthAPI.signUp({
              email: credentials.email,
              password: credentials.password,
              fullName: credentials.fullName,
            });
            console.log("NEXT-AUTH-LEMI", data);

            return {
              id: credentials.email,
              name: credentials.fullName,
              email: credentials.email,
            } as User;
          } catch (error) {
            console.log(error);
          }
        }

        // const dbUser = await prisma.user.findFirst({
        //   where: { email: credentials.email },
        // });

        //Verify Password here
        //We are going to use a simple === operator
        //In production DB, passwords should be encrypted using something like bcrypt...
        // if (dbUser && dbUser.password === credentials.password) {
        //   const { password, createdAt, id, ...dbUserWithoutPassword } = dbUser;
        //   return dbUserWithoutPassword as User;
        // }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if (!session) return redirect("/");
}

export function loginIsRequiredClient() {
  if (typeof window !== "undefined") {
    const session = useSession();
    const router = useRouter();
    if (!session) router.push("/");
  }
}
