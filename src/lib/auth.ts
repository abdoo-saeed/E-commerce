// /lib/auth.ts
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    // Example credentials provider (replace with your real provider config)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "john@doe.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // dummy example - use your API to validate user
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        })
        const user = await res.json()
        if (res.ok && user) return user
        return null
      },
    }),
    // add other providers here (Google, GitHub, etc.)
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/Auth/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },
    async session({ session, token }) {
      // attach user info to session
      if (token?.user) session.user = token.user as any
      return session
    },
  },

  // make sure you set NEXTAUTH_SECRET in .env
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
