import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from '../context/Provider';
import { Home } from '../../Router/Home';
import { Hamburgueres } from '../../Router/Hamburgueres';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Pizzas } from '../../Router/Pizzas';
import { Hotdogs } from '../../Router/Hotdogs';
import { Error } from '../../Router/Error';
import { ConfirmForm } from '../../Router/Form';

export const Main = () => {
  return (
    <main className='flex flex-col justify-center items-center'>
      <Provider>
        
        <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/hamburguer' element={<Hamburgueres />} />
            <Route path='/pizza'  element={<Pizzas />} />
            <Route path='/hotdog'  element={<Hotdogs />} />
            <Route path='/formulario' element={<ConfirmForm/>}/> 
            <Route path='*' element={<Error/>}/>
          </Routes>

        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
          theme="dark"
          transition={Bounce}
        />
      </Provider>
    </main>
  );
};
