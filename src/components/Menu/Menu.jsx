import React, { useContext, useEffect, useState } from 'react'
import { Products } from '../Products/Products'
import { Context } from '../context/Provider'
import { fetchProducts } from '../../api/fetchProducts'
import Loading from '../Loading/Loading'

export const Menu = () => {
    const { products, setProducts, loading, setLoading } = useContext(Context);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setProducts({});

            try {
                const res = await fetchProducts();
                console.log(res)
                setProducts(res.productsWithImageUrl);
                setError(null); // Limpa o erro em caso de sucesso
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
                setError('Erro ao buscar produtos. Por favor, tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        }
        
        loadProducts();
    }, [ setProducts, setLoading]);

    return (
        <>
            {error && <div className="error-message">{error}</div>}
            {loading ? (
                <Loading />
            ) : (
                <div className='menu '>
                    <div className='px-2 grid gap-4 mb-20  grid-cols-1 md:grid-cols-2'>
                        {Object.keys(products).map((product) => (
                            <Products key={product} data={products[product]} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
