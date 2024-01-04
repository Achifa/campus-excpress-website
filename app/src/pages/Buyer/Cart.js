import Cart from "../../components/Buyer/Cart/Cart";

const CartPage = () => {
    return ( 
        <>
            <div className="buyer-cart-cnt" style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around', background: '#f9f9f9'}}>
                <Cart />      
            </div>      
        </>
     );
} 
 
export default CartPage;