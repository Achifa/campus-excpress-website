import { useEffect, useState } from "react";
import Withdrawal from "../Withdrawal";
import PayStack from "../../Payments/PayStack_For_Buyer";

const CheckoutSummary = ({Total, Method}) => {

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
                    <button className="shadow-sm" onClick={handleDeposit}>
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
                    <button className="shadow-sm" onClick={handleDeposit}>
                        <span>Checkout SubTotal&nbsp; </span>
                        <span><small>(&#8358; </small>{new Intl.NumberFormat('en-us').format(Total)})</span>
                    </button>
                

                }
        </>
     );
}
 
export default CheckoutSummary;