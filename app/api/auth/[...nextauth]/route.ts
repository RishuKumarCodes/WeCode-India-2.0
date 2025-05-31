import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

// ==>> will uncomment these lines after the mongodb or Prisma backend setup.

// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "../../../../lib/mongodb";

const handler = NextAuth({
  // adapter: MongoDBAdapter(clientPromise),
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
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
export { handler as GET, handler as POST };
