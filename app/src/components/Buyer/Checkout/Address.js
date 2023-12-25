const Address = ({setPayment}) => {
    return (  
        <>
            <div className="buyer-checkout-payment-method">
                <h4>Payment Method</h4>
                <hr />
                <div className="input-cnt">
                    <input type="radio" onInput={e => setPayment('cewallet')} name="paymentMethod" id="ceWallet" />
                    <label htmlFor="ceWallet">Pay Via Campus Wallet</label>

                </div>

                <div className="input-cnt">
                    <input type="radio" onInput={e => setPayment('paystack')} name="paymentMethod" id="Card" />
                    <label htmlFor="Card">Pay Via With Card, Bank Transfer, USSD</label>

                </div>

            </div>
        </>
    );
}
 
export default Address;