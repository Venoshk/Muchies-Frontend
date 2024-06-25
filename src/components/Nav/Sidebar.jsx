import { Button } from "../Buttons/button"
import { CiPizza } from "react-icons/ci";
import { CiHotdog } from "react-icons/ci";
import { FaHamburger } from "react-icons/fa";
import './Sidebar.css'
import { useContext } from "react";
import { Context } from "../context/Provider";
import { FaHome } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
export const Sidebar = () => {

     const {select} = useContext(Context)
   
  return (
    <nav>
          <Button link={'/'} className={select === 'home' ? 'select' : ''} title={'home'}>
               <FaHome/> 
          </Button>

          <Button link={'/pizza'} className={select === 'pizzas' ? 'select' : ''} title={'pizzas'}>
               <CiPizza/> 
          </Button>

          <Button link={'/hotdog'} className={select === 'hotdog' ? 'select' : ''} title={'hotdog'}>
               <CiHotdog/> 
          </Button>

          <Button link={'/hamburguer'} className={select === 'hamburguer' ? 'select' : ''} title={'hamburguer'}>
               <FaHamburger/>
          </Button>

    </nav>
  )
}

