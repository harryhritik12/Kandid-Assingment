import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const user = await db.query.users.findFirst({
            where: (u, { eq }) => eq(u.email, credentials.email),
          });

          if (!user || !user.hashedPassword) return null;

          const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);
          if (!isValid) return null;

          return {
            id: user.id,
            name: user.name ?? user.email,
            email: user.email,
            role: user.role ?? "user",
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const existingUser = await db.query.users.findFirst({
            where: (u, { eq }) => eq(u.email, user.email!),
          });

          if (!existingUser) {
            await db.insert(users).values({
              email: user.email!,
              name: user.name || user.email!,
              role: "user",
            });
          }
        } catch (error) {
          console.error("Error saving Google user:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        try {
          const dbUser = await db.query.users.findFirst({
            where: (u, { eq }) => eq(u.email, user.email!),
          });
          token.role = dbUser?.role || "user";
          token.id = dbUser?.id;
        } catch (error) {
          console.error("JWT callback error:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
          email: session.user.email!,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };