import { useState, createContext } from "react";

export const Context = createContext();

export const Provider = ({children}) => {
    const [select, setSelect]                         = useState("");
    const [products, setProducts]                     = useState([]);
    const [loading, setLoading]                       = useState(true);
    const [isCartVisible, setIsCartVisible]           = useState(false);
    const [cartItems, setCartItems]                   = useState([]);
    const [isOpen, setIsOpen] = useState(null);

    const value = {
        select,setSelect,
        products, setProducts,
        loading, setLoading,
        cartItems, setCartItems,
        isCartVisible, setIsCartVisible,
        isOpen, setIsOpen
    }

    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}