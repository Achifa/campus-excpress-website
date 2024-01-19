const PaymentMethod = ({set_up_payment_source}) => {
    return (  
        <>
            <div className="buyer-checkout-payment-method">
                <h4>Payment Method</h4>
                <hr />
                <div className="input-cnt">
                    <input type="radio" onInput={e => set_up_payment_source('wallet')} name="paymentMethod" id="ceWallet" />
                    <label htmlFor="ceWallet"><small>Pay With Campus Wallet</small></label>

                </div>

                <div className="input-cnt">
                    <input defaultChecked type="radio" onInput={e => set_up_payment_source('bank')} name="paymentMethod" id="Card" />
                    <label htmlFor="Card"><small>Pay With Card, Bank Transfer, USSD</small></label>

                </div>

            </div>
        </>
    );
}
 
export default PaymentMethod;