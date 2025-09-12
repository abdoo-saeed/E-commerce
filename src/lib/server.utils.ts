"use server"

import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"



export const getUserToken = async () =>{
//to get the token
     const sessionToken =(await cookies()).get("next-auth.session-token")?.value;

    //decode the the token because it is already encrypted
  const token = await decode({token:sessionToken, secret:process.env.AUTH_SECRET!})

    
    return token?.token as string
    
}


