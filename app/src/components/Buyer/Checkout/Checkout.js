import { useEffect, useRef, useState } from "react";
import { GetBuyer, GetItem } from "../../../api/buyer";
import { useLocation } from "react-router-dom";
import Summary from "./Summary";
import PaymentMethod from "./PaymentMethod";
import CheckoutSummary from "./CheckoutSummary";
import CEStack from "../../Payments/CEStack";
import PayStack from "../../Payments/PayStack_For_Buyer";

const CheckOut = () => {
    let [Total, setTotal] = useState(0)
    let [payment, setPayMent] = useState(<PayStack price={Total}  />)
    
    let [buyer, set_buyer] = useState('')
    let [totalItem, setTotalItem] = useState(0)

    let location = useLocation()
    let [product_id, set_product_id] = useState([])

   
    useEffect(() => {
        if(atob(location.pathname.split('/')[2]).split("-").length > 1){

            GetItem(atob(location.pathname.split('/')[2]).split("-"))
            .then((result) => {
               
                let product_id = []
                result.map((item) => product_id.push(({product_id: item.product_id, stock: 1})));
                set_product_id(product_id)
                // console.log(result)
                let total  = parseInt(atob(location.pathname.split('/')[3]));
                setTotal(total)
            })
            .catch(err => console.log(err))
        }else{
            GetItem(atob(location.pathname.split('/')[2]).split("-"))
            .then((result) => {

                let product_id = []
                result.map((item) => product_id.push(({product_id: item.product_id, stock: 1})));
                set_product_id(product_id)

                let total  = parseInt(atob(location.pathname.split('/')[3]));
                setTotal(total)

            })
            .catch(err => console.log(err))
        }

        setTotalItem(atob(location.pathname.split('/')[2]).split("-").length);
        
    }, []) 

    useEffect(() => {
        GetBuyer(window.localStorage.getItem('CE_buyer_id'))
        .then((result) => {
        set_buyer(result)
        })
        .catch((err) => {
        console.log(err)
        })
    }, [])
    
  
    function set_up_payment_source(data) {if(data === 'wallet'){setPayMent(<CEStack price={Total} product_id={product_id}  />)}else{setPayMent(<PayStack price={Total} product_id={product_id} />)}}

    return ( 
        <>
            <div className="seller-overlay">
                {payment}
            </div>
            <div className="buyer-checkout">
                <PaymentMethod set_up_payment_source={set_up_payment_source} />
                {/* <Method /> */}
                {/* <Info /> */}
                <Summary totalItem={totalItem} Total={Total} />
            </div>

            <CheckoutSummary Method={payment} Total={Total} buyer_id={buyer.buyer_id} />

            {/* <div className="buyer-checkout-btn" onClick={e => handleDeposit()}>
                <Btn deliveryPrice={deliveryPrice} />
            </div> */}

        </>
     );
}
 
export default CheckOut;