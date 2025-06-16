import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prismaClient } from "./prisma";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (!user.email) return false;
      
      // Check if user exists
      const existingUser = await prismaClient.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        // Create new user if doesn't exist
        await prismaClient.user.create({
          data: {
            email: user.email,
            name: user.name,
            image: user.image,
          },
        });
      }

      return true;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
