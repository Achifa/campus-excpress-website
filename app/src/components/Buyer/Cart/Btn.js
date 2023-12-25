import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Btn = ({subTotal}) => {
    let navigate = useNavigate();

    return ( 
        <>
            <button onClick={e => navigate(`/checkout/${url}/${btoa(subTotal)}`)}>
                <span>Checkout SubTotal&nbsp; </span>
                <span>({new Intl.NumberFormat('en-us').format(subTotal)})</span>
            </button>
        </>
     );
}
 
export default Btn;