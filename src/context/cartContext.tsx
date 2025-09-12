"use client"
import {useSession} from 'next-auth/react'
import { getUserCart } from '@/lib/services/cart';
import React ,{createContext, ReactNode, useEffect, useState ,useContext} from "react"
import { ICart } from "@/types/Cart.type"




interface cartContextType
{
    getCartData:()=> Promise<void>;
    cart:any;
    cartCount: number;
}


export const cartContext =createContext<cartContextType | undefined>(undefined)

export default function CartContextProvider({children}:{children:ReactNode}) { 

    const [cart, setCart] = useState<any>(null);

    const [cartCount,setCartCount] = useState(0)

    const {data}= useSession()
    const getCartData = async ()=>{

        try {
            const cart = await getUserCart()
            // console.log(cart);
            
            setCart(cart)
            setCartCount(cart?.numOfCartItems)

            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        if(data?.user){
            getCartData()
        }

    },[data?.user])

 
const value ={getCartData, cart , cartCount} 

    return (
        <cartContext.Provider value={value}>
            {children}
        </cartContext.Provider>
        
    )
}


export const useCart =()=> {

    const context = useContext(cartContext)
    if(context===undefined){
        throw Error("must login first")
    }
    return context
}


