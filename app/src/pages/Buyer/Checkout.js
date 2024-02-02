import { useEffect, useState } from "react";
import CheckOut from "../../components/Buyer/Checkout/Checkout";
import { ErrorBoundary } from "react-error-boundary";

const Checkout = () => {
    let [screenWidth, setScreenWidth] = useState(0)


    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])
    return ( 
        <>

            <div className="buyer-cart-cnt" style={{display: 'flex', alignItems: 'flex-start', flexDirection: screenWidth > 760 ? 'row' : 'column', justifyContent: 'space-around'}}>
                <CheckOut />

            </div>

        </> 
     );
}
 
export default Checkout; 