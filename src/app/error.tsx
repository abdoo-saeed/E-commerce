"use client"
import React from 'react'



function Error({error}:{error:Error}) {
    

    return (
        <div className='mx-auto mt-4'>
            <h1>Error</h1>
            <p>Something went wrong.</p> 
            <p className='text-red-500'>{error.message}</p>    
        </div>
    )
}

export default Error
