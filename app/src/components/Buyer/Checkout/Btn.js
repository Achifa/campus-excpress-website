const Btn = ({Total}) => {

    return ( 
        <>
            <button className="checkout-btn">
                <span>Confirm Order </span>
                <span>({new Intl.NumberFormat('en-us').format(Total)})</span>
            </button>
        </>
     );
}
 
export default Btn;