import { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { loginGoogleAsync } from "./fetching";
import { ApiResult, GoogleBody, LoggedGoogleToken } from "./models";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      email?: string;
      sub?: string;
      jti?: string;
      apiData?: LoggedGoogleToken; // Atributo personalizado
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
          googleSUB: token.sub as string,
          googleJTI: token.jti as string,
        };
  
        const apiResult: ApiResult<LoggedGoogleToken> = await loginGoogleAsync(body);
        // console.log(apiResult)

        session.user = {
          ...session.user,
          apiData: apiResult.data, 
        };
      }

      return session
    },
  },
}