import { useEffect, useState } from "react";
import OrderDetails from "../../components/Seller/orders/OrderDetails";

const Order = () => {
   
    return ( 
        <>
            <div className="overlay">
                <div className="loader">
                </div>
            </div>

            <div className="seller-main">
                <div className="seller-order-cnt" >
                    <OrderDetails />

                    <>
                        <br />
                        {/* <small style={{color: 'orangered'}}>{loaderText}</small> */}
                    </>
                </div>
            </div>
        </>
     );
}
 
export default Order;