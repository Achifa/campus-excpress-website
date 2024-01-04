const Address = ({setPayment}) => {
    return (  
        <>
            <div className="buyer-checkout-payment-method">
                <h4>Payment Method</h4>
                <hr />
                <div className="input-cnt">
                    <input type="radio" onInput={e => setPayment('wallet')} name="paymentMethod" id="ceWallet" />
                    <label htmlFor="ceWallet"><small>Pay With Campus Wallet</small></label>

                </div>

                <div className="input-cnt">
                    <input defaultChecked type="radio" onInput={e => setPayment('bank')} name="paymentMethod" id="Card" />
                    <label htmlFor="Card"><small>Pay With Card, Bank Transfer, USSD</small></label>

                </div>

            </div>
        </>
    );
}
 
export default Address;