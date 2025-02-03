import { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { loginGoogleAsync } from "./fetching";
import { GoogleBody, ApiResult } from "./models";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      email?: string;
      sub?: string;
      jti?: string;
      apiData?: ApiResult; // Atributo personalizado
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // console.log('token', token);
      // console.log('session', session);

      if (session != undefined) {
        const body: GoogleBody = {
          email: token.email as string,
          sub: token.sub as string,
          jti: token.jti as string,
        };
  
        const apiResult: ApiResult = await loginGoogleAsync(body);

        session.user = {
          ...session.user,
          apiData: apiResult, 
        };
      }

      return session
    },
  },
}