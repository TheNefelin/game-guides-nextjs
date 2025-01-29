import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log('token', token);
      console.log('session', session);
      
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
