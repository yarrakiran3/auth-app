import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import LinkedIn from "next-auth/providers/linkedin"
import Credentials from "next-auth/providers/credentials"
import {  getUserFromOAuthUsers, saveUserToOAuthUsers } from "@/app/lib/actions"


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google(
    {
      clientId:process.env.AUTH_GOOGLE_ID,
      clientSecret:process.env.AUTH_GOOGLE_SECRET,

      async profile(profile){
          // For signUp, we have to check wether the user is already present or not
          
        // console.log("This is from google login",profile)
        return {...Google}
      }
    }
  ),
  GitHub(
      {
      clientId:process.env.AUTH_GITHUB_ID,
      clientSecret:process.env.AUTH_GITHUB_SECRET,

        async profile(profile){
          // console.log("This is from github login",profile)
          // console.log(profile.id)
          return {...GitHub}
        }
      }
  ),
  LinkedIn({
    clientId:process.env.AUTH_LINKEDIN_ID,
    clientSecret:process.env.AUTH_LINKEDIN_SECRET,

      async profile(profile){
        // console.log("This is from LINKEDIN login",profile)
        // console.log(profile.id)
        return {...LinkedIn}
      }
  }
  ),
  
    
  Credentials({
        // This is for using default PAGES given by NextAuth
        // credentials:{
        //     email:{label:"Email", placeholder:"Email", type:"email"},
        //     password:{label:"Password", placeholder:"Password", type:"password"}
        // },
        async authorize(credentials){
        // console.log("This is from credentials authorize callback",credentials)
        const provider='credentials';
        const updated_credentials={...credentials};
        updated_credentials.provider=provider;
        return updated_credentials;
        }
        
  })],

 
  callbacks:{

     jwt({ token, user,profile ,account}) {
      
      // console.log("This is from token block",profile)
      // Include user info if it exists
        // console.log(user);
        // console.log(profile)

        if ((user||profile)&&(user!==null||profile!==null)&&(user!==undefined||profile!==undefined)) {
          const someId=user.id||profile?.id;
          // console.log("User id - token id ",someId)
          token.id=user.id||profile?.id;
          token.name=user.name||profile?.name;
          token.email=user.email||profile?.email;
          token.provider=account?.provider;
          console.log(token)
          return token
        }else {
          console.log("No user or it is from 2nd call")
        }

        
     
      
        return token;
    },


     session({ session, token }) {
      // Populate session with token data
      // console.log("sesssion user data before adding id to session ", session)
      // console.log("This is from session")

      session.user.email=String(token.email);
      session.user.id=String(token.provider)
      
      // console.log("sesssion user data is ", session)
      return session;
    },
    
   authorized({auth,request:{nextUrl}}){
        // console.log(auth)
        const isLoggedIn= !!auth?.user;
        // const isOnDashboard = nextUrl.pathname.startsWith('/');
        const { pathname } = nextUrl
       console.log("This message is from authorized callback")

        if ((pathname.startsWith('/auth/signin')||pathname.startsWith('/auth/signup')) && isLoggedIn) {
          console.log("We are logged in and on sign in page, so it moves to dashboard")
          return Response.redirect(new URL('/dashboard', nextUrl));
        } 
        return !!auth;                          
    },

     async signIn({profile,account,user,credentials}){
      // console.log("Hello")

      // console.log("This is from signin callbak credentials from signin callbak", credentials);
      // console.log("This is from signin callbak account", account);
      // console.log("This is from signin callbak profile", profile);
      // console.log("This is from signin callbak user", user);

      if(account?.provider!=='credentials'){
        // We are only cdoing this for OAuth as we already done validation for credential users
        const name =String(profile?.name);
        const mail=String(profile?.email);
        const provider=String(account?.provider);
        console.log(mail);
        console.log(provider)

        // Checking if user already exists
        const user= await getUserFromOAuthUsers(mail,provider);

        if(user&&user!==undefined&&user!==null&&user>0){
          //  User already present so directly rediret
          console.log("User already exists, SIgning in directly")
            return true;
        } else{
          // If the user is not already present -- then save to database
          console.log("User doesnt exist, Saving details to db and logging in")
          const saveuser = await saveUserToOAuthUsers(mail,name,provider);

          return true
        }

      }else{
        return true;
      }
    }
  },

  pages:{
    signIn:"/auth/signin",
  },

  
})