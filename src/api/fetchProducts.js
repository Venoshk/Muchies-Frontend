export const fetchProducts = async () =>{
    const reponse = await fetch(`https://backend-pi-virid.vercel.app/`);
    const data = await reponse.json();
    return data;
};