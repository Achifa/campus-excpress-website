import { useEffect, useState } from "react";

const CheckoutSummary = ({Total}) => {

    let [screenWidth, setScreenWidth] = useState(0)


    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])
    return ( 
        <>
            <div className="buyer-checkout-cnt" style={{display: screenWidth > 759 ? 'flex' :'none'}}>
                <div style={{borderBottom: "1px solid rgb(238, 238, 238)"}}>
                    <span>Checkout Summary</span>
                </div>
                <div>
                    <small style={{float: "left"}}>Sub total</small>
                    <small style={{float: "right"}}>
                        <small>₦</small>0</small>
                </div> 
                <div style={{fontSize: "small"}}>
                    <small>Delivery is free</small>
                </div>
                <div style={{height: "80px"}}>
                    <button className="shadow-sm">
                        <span>Checkout SubTotal&nbsp; </span>
                        <span><small>(₦</small>0)</span>
                    </button>
                </div>
                
            </div>

                {
                    screenWidth > 759
                ?

                    ''
                :
                    <button className="shadow-sm">
                        <span>Checkout SubTotal&nbsp; </span>
                        <span><small>(&#8358; </small>{new Intl.NumberFormat('en-us').format(Total)})</span>
                    </button>
                

                }
        </>
     );
}
 
export default CheckoutSummary;