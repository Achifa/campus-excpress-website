import { useEffect, useState } from "react";
import Withdrawal from "../Withdrawal";
import PayStack from "../../Payments/PayStack_For_Buyer";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";

const CheckoutSummary = ({Total, Method, type, price, buyer}) => {

    const config = {
        public_key: 'FLWPUBK-502f1f73c8abf430f161a528241c198a-X',
        tx_ref: Date.now(),
        amount: price,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: buyer.email,
            phone_number: buyer.phone,
            name: buyer.fname + " " + buyer.lname,
            ce_id: buyer.buyer_id,
            cart: {
                unit: 1,
                seller_id: '',
                product_id: ''
            },
            src: window.location.pathname.split('/').length > 4 ?  window.location.pathname.split('/')[4]: false       
        },
        customizations: {
        title: 'Campus Express',
        description: 'Payment for items in cart',
        logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    function openFlw() {
        handleFlutterPayment({
            callback: (response) => {
                console.log(response);
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {}
        });
    }

    let [screenWidth, setScreenWidth] = useState(0);
    useEffect(() => {let width = window.innerWidth;setScreenWidth(width)},[]);
    function handleDeposit() {let overlay = document.querySelector('.overlay');overlay.setAttribute('id', 'overlay')};
    
    
    return ( 

        <>
            <div className="overlay" style={{padding: '20px'}} onClick={e => e.target === document.querySelector('.overlay') ? e.currentTarget.removeAttribute('id'): ''}>
                {
                    Method
                }
            </div>

            <div className="buyer-checkout-cnt" style={{display: screenWidth > 759 ? 'flex' :'none'}}>

                <div style={{borderBottom: "none"}}>
                    <span>Checkout Summary</span>
                </div>

                <div>
                    <small style={{float: "left"}}>Sub total</small>
                    <small style={{float: "right"}}>
                        <small>₦</small>{Total}</small>
                </div> 

                <div style={{fontSize: "small"}}>
                    <small style={{float: "left"}}>Charges</small>
                    <small style={{float: "right"}}>
                        <small>Free</small>
                    </small>
                </div>

                <div style={{height: "80px"}}>
                    <button className="shadow-sm" onClick={ e => type !== 'wallet' ? openFlw() : handleDeposit()}>
                        <span>Checkout SubTotal&nbsp; </span>
                        <span><small>(₦</small>{Total})</span>
                    </button>
                </div>
                
            </div>

                {
                    screenWidth > 759
                ?

                    ''
                :
                    <button className="shadow-sm" onClick={ e => type !== 'wallet' ? openFlw() : handleDeposit()}>
                        <span>Checkout SubTotal&nbsp; </span>
                        <span><small>(&#8358; </small>{new Intl.NumberFormat('en-us').format(Total)})</span>
                    </button>
                

                }
        </>
     );
}
 
export default CheckoutSummary;