import Cart from "../../components/Buyer/Cart/Cart";

const CartPage = () => {
    return ( 
        <>
            <div className="buyer-cart-cnt" style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around'}}>
                <Cart />      
            </div>      
        </>
     );
} 
 
export default CartPage;