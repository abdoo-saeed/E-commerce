//get allBrands function
export async function getAllBrands() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/brands`,{
    
    headers: {
     
      "Content-Type": "application/json",
    },
    cache:"no-cache"
  })    



  if(!res.ok){
    return({error: res.statusText});
  }
const {data} = await res.json()
console.log(data)   
return data;

}



//get speciefic brand function
export async function getSpecificBrandProducts(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products?brand=${id}`
  );

  if (!res.ok) {
    return { error: res.statusText };
  }

  const data = await res.json();
  return data;
}
