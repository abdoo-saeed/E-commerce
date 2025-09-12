
//get allproducts function
export async function getAllProducts() {
 
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products`,{  
    cache:"no-cache"
  })    



  if(!res.ok){
    return({error: res.statusText});
  }
const {data} = await res.json()
console.log(data)   
return data;

}

//get productdetails function
export async function getProductDetails(id: string) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/${id}`,{
    
  })    



  if(!res.ok){
    return({error: res.statusText});
  }
const {data} = await res.json()
console.log(data)   
return data;

}







