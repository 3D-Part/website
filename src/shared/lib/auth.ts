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
        fullName: { label: "fullName", type: "text" },
      },

      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        return {
          id: credentials.email,
          name: credentials.fullName,
          email: credentials.email,
        } as User;
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
