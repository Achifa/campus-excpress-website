import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";

const OrderDetails = () => {
    let [orders, set_orders] = useState([])
    let [loaderText, setLoaderText] = useState('Loading...')

    useEffect(() => {
        let overlay = document.querySelector('.overlay')
        //overlay.setAttribute('id', 'overlay');
        
    },[])
    return ( 
        <>
            <div className="seller-order-details-cnt" style={{display: 'flex', justifyContent: 'left'}}>
                {
                    orders.map((item, index) => 
                    
                        <OrderCard index={index } data={item} /> 
                    )
                }
            </div>
        </>
     );
}
 
export default OrderDetails;