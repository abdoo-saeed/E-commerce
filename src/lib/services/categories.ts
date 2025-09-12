//get allCategories function
export async function getAllCategories() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories`,{
    cache:"no-cache"
  })    



  if(!res.ok){
    return({error: res.statusText});
  }
const {data} = await res.json()
console.log(data)   
return data;

}


//get speciefiCategory function
export async function getSpecieficCategory(id:string) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products?category[in]=${id}`,{
    cache:"no-cache"
  })    



  if(!res.ok){
    return({error: res.statusText});
  }
const {data} = await res.json()
console.log(data)   
return data;

}