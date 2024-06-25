import React, { useContext, useEffect, useState } from 'react'
import { Products } from '../Products/Products'
import { Context } from '../context/Provider'
import { fetchProducts } from '../../api/fetchProducts'
import Loading from '../Loading/Loading'

export const Menu = ({type}) => {
    const { products, setProducts, loading, setLoading } = useContext(Context);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setProducts({});

            try {
                const res = await fetchProducts(type);
                console.log(res)
                setProducts(res.products);
                setError(null); // Limpa o erro em caso de sucesso
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
                setError('Erro ao buscar produtos. Por favor, tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        }
        
        loadProducts();
    }, [type, setProducts, setLoading]);

    return (
        <>
            {error && <div className="error-message">{error}</div>}
            {loading ? (
                <Loading />
            ) : (
                
                <div className='menu flex flex-col items-center'>

                    <div className='text-center font-bold text-3xl mb-5 mt-5 w-3/4'>
                        {type ? (
                            <h2>Cardapio de <span className='text-red-600'>{type}</span></h2>
                        ) : 
                            <h2>Nossos melhores <span className='text-red-600'>lanches</span></h2>}
                    </div>
                   
                   

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
