import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { StreamChat } from 'stream-chat';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
        const apiKey = "w3pgxt7fwrmm";
        const apiSecret = "tymedsswfve7edc33bcx3j2ywr7tw2fwwbpg5h4pwpb4c7q43rmv6p2jdk9e529q";
        const chatClient = new StreamChat(apiKey, apiSecret);
        session.user.token = chatClient.createToken(token.sub);
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});