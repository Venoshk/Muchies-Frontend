import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from '../Nav/Sidebar';
import { Provider } from '../context/Provider';
import { Header } from '../Header/Header';
import { Home } from '../../Router/Home';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Main = () => {
  return (
    <main className='flex flex-col justify-center items-center'>
      <Provider>
        <Router>
          <Header />
          <Sidebar />
          <h2 className='text-center mt-4 text-2xl font-bold mb-8'>Nossos melhores lanches</h2>
          <Routes>
            <Route path='/' exact element={<Home />} />
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
