import NextAuth ,{User} from "next-auth"




declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

//declaration of user
  interface User {
    /** The user's postal address. */
    user:{
        name:string;
        email:string;
        role:string;
    },
    token:string;
  }


  interface Session {
    user:{
        name:string;
        email:string;
        role:string;
    },
    token:jwt;
  }
}