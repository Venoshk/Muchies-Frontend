import { BsCartDash } from "react-icons/bs";
import "./AlertCard.css";

export const AlertCard = ({title, message}) => {
  return (
    <div className='flex items-center justify-center h-[700px]'>
         <div className="card">
        <div className="header">
            <div className="image">
                <BsCartDash/>
            </div>

            <div className="content">
                <span className="title">{title}</span>
                <p className="message">{message}</p>
            </div>
        </div>
    </div>
    </div>
   
  );
};
