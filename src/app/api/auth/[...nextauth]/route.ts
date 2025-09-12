import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signin`,
          {

            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );
        console.log(response);

        const data = await response.json();
        if (response.ok) {
          return { id: "1", user: data.user, token: data?.token };
        } else {
          throw Error(data?.message || "there is an error in the data");
        }
      },
    }),
  ],
  callbacks: {
    // increpting data returned from api  in a token saved in the cokiess i can reach any where
    async jwt({ token, user }) {
      if (user) {
              token.User = user.user;
              token.token = user.token;
      }



      return token;
    },
    //
    async session({ session, token }) {
      session.user = token.user as {
        name: string;
        email: string;
        role: string;
      };
      session.token = token.token;
      return session;
    },
  },

  pages: {
    signIn: "/Auth/login",
  },
});

export { handler as GET, handler as POST };
