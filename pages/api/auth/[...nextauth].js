import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
   providers: [
       Providers.Twitter({
           clientId: process.env.TWITTER_CONSUMER_KEY,
           clientSecret: process.env.TWITTER_CONSUMER_SECRET
       })
   ],
//    cookie: {
//     secure: process.env.NODE_ENV && process.env.NODE_ENV === 'production',
//     },
//     session: {
//         jwt: true,
//         maxAge: 30 * 24 * 60 * 60

//     },
   callbacks: {
       async jwt(token, user, account = {}, profile, isNewUser) {
           if ( account.provider && !token[account.provider]) {
               token[account.provider] = {};
           }

           if ( account.accessToken) {
               token[account.provider].accessToken = account.refreshToken;
           }
        // if (typeof user !== typeof undefined)
        // {
        //     token.user = user;
        // }
        return token
       }
   },
   secret: process.env.NEXTAUTH_SECRET

});
