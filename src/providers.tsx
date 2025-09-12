"use client"
import React ,{ReactNode} from "react"
import { SessionProvider } from "next-auth/react"
import CartContextProvider from "./context/cartContext"

export default function Providers({children}:{children:ReactNode}) {
  

    return (
        <SessionProvider>

            <CartContextProvider> 
                {children}
            </CartContextProvider>
            
            </SessionProvider>
    )
}


