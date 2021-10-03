import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
   providers: [
       Providers.Twitter({
           clientId: process.env.TWITTER_CONSUMER_KEY,
           clientSecret: process.env.TWITTER_CONSUMER_SECRET
       })
   ],
   callbacks: {
       async jwt(token, user, account, profile, isNewUser) {
           console.log(user)
           console.log(token);
           console.log(account);
           return token
       }
   }
});
