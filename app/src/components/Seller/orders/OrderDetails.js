import { useEffect, useState } from "react";
import { GetSellerOrder } from "../../../api/seller";
import OrderCard from "./OrderCard";

const OrderDetails = () => {
    let [orders, set_orders] = useState([])
    let [loaderText, setLoaderText] = useState('Loading...')

    useEffect(() => {
        let overlay = document.querySelector('.overlay')
        overlay.setAttribute('id', 'overlay');
        GetSellerOrder(window.localStorage.getItem('CE_seller_id'))
        .then(({data}) => {
            overlay.removeAttribute('id')
            set_orders(data)
            data.length < 1 
            ?
            setLoaderText('No item for sale, click here to start selling')
            :
            setLoaderText('')
        })
        .catch((err) => {
            console.log(err)
        })
    },[])
    return ( 
        <>
            <div className="seller-order-details-cnt" style={{display: 'flex', justifyContent: 'center'}}>
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