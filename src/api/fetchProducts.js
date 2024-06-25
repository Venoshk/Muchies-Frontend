export const fetchProducts = async (type) => {
    const query = type ? `?type=${type}` : '';
    const response = await fetch(`https://backend-pi-virid.vercel.app/${query}`);
    const data = await response.json();
    return data;
};