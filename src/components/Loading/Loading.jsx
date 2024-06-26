import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./Loading.css"
function Loading(){
    return(
        <div className="loader text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-600 mx-auto"></div>
            <h2 className="text-zinc-900 dark:text-white mt-4">Enviando...</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
                Enviando seu pedido!
            </p>
        </div>

    )
};

export default Loading;