import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from '../Nav/Sidebar';
import { Provider } from '../context/Provider';
import { Header } from '../Header/Header';
import { Home } from '../../Router/Home';
import { Hamburgueres } from '../../Router/Hamburgueres';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Pizzas } from '../../Router/Pizzas';
import { Hotdogs } from '../../Router/Hotdogs';

export const Main = () => {
  return (
    <main className='flex flex-col justify-center items-center'>
      <Provider>
        <Router>
          <Header />
          <Sidebar />
          
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/hamburguer' exact element={<Hamburgueres />} />
            <Route path='/pizza' exact element={<Pizzas />} />
            <Route path='/hotdog' exact element={<Hotdogs />} />
          </Routes>
        </Router>
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
