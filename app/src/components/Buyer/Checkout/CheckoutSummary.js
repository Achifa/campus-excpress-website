import { useEffect, useState } from "react";
import PayStack from "../../Payments/PayStack";
import Withdrawal from "../Withdrawal";

const CheckoutSummary = ({Total, Method}) => {

    let [screenWidth, setScreenWidth] = useState(0)


    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

   

    let [form, setForm] = useState('')

    function handleDeposit() {
        let overlay = document.querySelector('.overlay');
        overlay.setAttribute('id', 'overlay')
        setForm(<PayStack price={Total} />)

    }

    function handlePayment() {
        let overlay = document.querySelector('.overlay');
        overlay.setAttribute('id', 'overlay')
        setForm(<Withdrawal balance={Total} />)

    }

    return ( 

        <>
            <div className="overlay" style={{padding: '20px'}} onClick={e => e.target === document.querySelector('.overlay') ? e.currentTarget.removeAttribute('id'): ''}>
                {
                    form
                }
            </div>

            <div className="buyer-checkout-cnt" style={{display: screenWidth > 759 ? 'flex' :'none'}}>
                <div style={{borderBottom: "1px solid rgb(238, 238, 238)"}}>
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
                    <button className="shadow-sm" onClick={Method ? handlePayment : handleDeposit}>
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
                    <button className="shadow-sm" onClick={Method ? handlePayment : handleDeposit}>
                        <span>Checkout SubTotal&nbsp; </span>
                        <span><small>(&#8358; </small>{new Intl.NumberFormat('en-us').format(Total)})</span>
                    </button>
                

                }
        </>
     );
}
 
export default CheckoutSummary;