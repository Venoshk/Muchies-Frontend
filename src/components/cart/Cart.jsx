import React, { useContext } from 'react'
import { Context } from '../context/Provider'
import './Cart.css'
import { CartItem } from '../CartItem/CartItem';
import formateCurrency from '../../utils/formateCurrency';
import { GrClose } from "react-icons/gr";
export const Cart = () => {

    const {cartItems, setCartItems, isCartVisible, setIsCartVisible} = useContext(Context)

    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.qualify), 0);

  return (
    <div className={`cart ${isCartVisible ? 'cart--active' : ''}`}>
      <div className='flex items-center justify-between flex-row mt-10'>
        <h2 className='text-white text-center text-2xl'>Carrinho</h2>
        <button onClick={() => setIsCartVisible(!isCartVisible)}>
            <GrClose/>
        </button>
      </div>

      <div className='mt-10'>
        {cartItems.map((item) => <CartItem key={item.id} data={item}/>)}
      </div>      
        
      <p className='font-bold text-2xl absolute bottom-10 w-full border'>Total a pagar: <span className='text-red-600 bg-transparent'>{formateCurrency(totalPrice, 'BRL')}</span></p>
    </div>
  )
}
