import { useEffect, useState } from "react";
import OrderDetails from "../../components/Seller/orders/OrderDetails";
import SellerLayout from "../../layout/Seller";

const Order = () => {
   
    return ( 
        <>
            <div className="overlay">
                <div className="loader">
                </div>
            </div>

            <div className="seller-main">
                <SellerLayout>

                    <div className="seller-order-cnt" >
                        <OrderDetails />

                        <>
                            <br />
                            {/* <small style={{color: 'orangered'}}>{loaderText}</small> */}
                        </>
                    </div>
                </SellerLayout>

            </div>
        </>
     );
}
 
export default Order;