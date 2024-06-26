import React, { useContext, useEffect, useState } from 'react';
import { Products } from '../Products/Products';
import { Context } from '../context/Provider';
import { fetchProducts } from '../../api/fetchProducts';
import Loading from '../Loading/Loading';
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton.jsx';
import { Header } from '../Header/Header';
import { Sidebar } from '../Nav/Sidebar';

export const Menu = ({ type }) => {
    const { products, setProducts, loading, setLoading } = useContext(Context);
    const [error, setError] = useState(null);
    const [loadingProducts, setLoadingProducts] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setLoadingProducts(true);
            setProducts({});

            try {
                const res = await fetchProducts(type);
                setProducts(res.products);
                setError(null); // Limpa o erro em caso de sucesso
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
                setError('Erro ao buscar produtos. Por favor, tente novamente mais tarde.');
            } finally {
                setLoading(false);
                setLoadingProducts(false);
            }
        };

        loadProducts();
    }, [type, setProducts, setLoading]);

    const estimatedSkeletonCount =  2 // Número estimado de skeletons

    return (
        <>
            <Header/>
            <Sidebar/>
            {loadingProducts ? (
                Array.from({ length: estimatedSkeletonCount }).map((index) => <LoadingSkeleton key={index} />)
            ) : (
                <div className='menu mb-10 w-full flex flex-col items-center'>
                    <div className='w-3/6 text-center'>
                        {type ? (
                            <h2 className='font-bold text-3xl mb-5 mt-5'>Cardápio de <span className='text-red-600'>{type}</span></h2>
                        ) : (
                            <h2 className='font-bold text-3xl mb-5 mt-5'>Nossos <span className='text-red-600'>cardápios</span></h2>
                        )}
                    </div>

                    <div className='px-4 flex-col gap-10 mb-20 grid grid-cols-1 md:grid-cols-2 w-full'>
                        {Object.keys(products).map((product) => (
                                <Products key={product.id} data={products[product]} />
                          ))}
                    </div>
                    {error && <span>Errou ao busca protudo</span>}
                </div>
            )}
        </>
    );
};
