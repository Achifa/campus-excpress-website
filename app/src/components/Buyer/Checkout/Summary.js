const Summary = ({Total,totalItem,deliveryPrice}) => {
    return ( 
        <>
            <div className="buyer-checkout-order-summary">
                <h4>Order Summary</h4>
                <hr />
                <div className="input-cnt">
                    <span>Item Total ({totalItem})</span>
                    <span>&#8358; {new Intl.NumberFormat('en-us').format(Total - 3000)}</span>
                </div>

                <div className="input-cnt">
                    <span>Delivery Fee</span>
                    <span>&#8358; {new Intl.NumberFormat('en-us').format(0)}</span>
                </div>

                <div className="input-cnt">
                    <span>Total </span>
                    <span>&#8358; {new Intl.NumberFormat('en-us').format(Total)}</span>
                </div>
            </div>
        </>
     );
}
 
export default Summary;