import { useEffect, useRef, useState } from "react";
import { GetItem } from "../../api/buyer";
import { useLocation } from "react-router-dom";
import PayStack from "./PayStack";
import { usePaystackPayment } from "react-paystack";
import CEStack from "./CEStack";

const CheckOut = () => {
    let [item, setItem] = useState('')
    let [Total, setTotal] = useState(0)
    let [payment, setPayMent] = useState('')
    let [paymentMethodSelected, setPaymentMethodSelected] = useState(false)
    let [fname, setFname] = useState('')
    let [lname, setLname] = useState('')
    let [email, setEmail] = useState('')
    let [phone, setPhone] = useState('')
    let [amount, setAmount] = useState('0.00')
    let [totalItem, setTotalItem] = useState(0)

    let deliveryPrice = useRef(3000)
    let location = useLocation()

   
    useEffect(() => {
        if(atob(location.pathname.split('/')[2]).split("-").length > 1){

            GetItem(atob(location.pathname.split('/')[2]).split("-"))
            .then((result) => {

                //console.log(atob(location.pathname.split('/')[2]))
                let prices = []
                result.map((item) => prices.push(eval(item.price)))
                let total  = parseInt(atob(location.pathname.split('/')[3])) + parseInt(deliveryPrice.current);
                setItem(result)
                setTotal(total)
                console.log(total)
            })
            .catch(err => console.log(err))
        }else{
            GetItem(atob(location.pathname.split('/')[2]).split("-"))
            .then((result) => {
                let prices = []
                //result.map((item) => prices.push(eval(item[0].price)))
                let total  = parseInt(atob(location.pathname.split('/')[3])) + parseInt(deliveryPrice.current);
                setItem(result)
                setTotal(total)
            })
            .catch(err => console.log(err))
        }

        //console.log('total cost: ',atob(location.pathname.split('/')[2]).split("-").length);
        setTotalItem(atob(location.pathname.split('/')[2]).split("-").length);
        
    }, [])


    function handleDeposit(params) {
        let overlay = document.querySelector('.seller-overlay');
        overlay.setAttribute('id', 'seller-overlay')
    }

    function SetPaymentMethod(type) {
        if(type !== 'paystack'){
            setPayMent(<CEStack amt={Total} />)
            setPaymentMethodSelected(true)
        }else{
            setPayMent(<PayStack amt={Total} />)
            setPaymentMethodSelected(true)
        }
    }

    useEffect(() => {
        if(paymentMethodSelected === true){
            document.querySelector('.checkout-btn').disabled = false
        }else{
            document.querySelector('.checkout-btn').disabled = true
        }
    },[paymentMethodSelected])

    return ( 
        <>
            <div className="seller-overlay">
                {payment}
            </div>
            <div className="buyer-checkout">
                <div className="buyer-checkout-payment-method">
                    <h4>Payment Method</h4>
                    <hr />
                    <div className="input-cnt">
                        <input type="radio" onInput={e => SetPaymentMethod('cewallet')} name="paymentMethod" id="ceWallet" />
                        <label htmlFor="ceWallet">Pay Via Campus Wallet</label>

                    </div>

                    <div className="input-cnt">
                        <input type="radio" onInput={e => SetPaymentMethod('paystack')} name="paymentMethod" id="Card" />
                        <label htmlFor="Card">Pay Via With Card, Bank Transfer, USSD</label>

                    </div>

                </div>
                <div className="buyer-checkout-customer-address">
                    <h4>Customer Address</h4>
                    <hr />
                    <div className="input-cnt">
                        <input type="radio" checked name="" id="" />
                        <label htmlFor="">Unizik, Awka, Anambra State</label>

                    </div>

                   
                </div>
                <div className="buyer-checkout-delivery-info">
                    <h4>Delivery Details</h4>
                    <hr />
                    <div className="input-cnt">
                        <ul>
                            <li>
                                <div><b>Pick Up Station</b></div>
                                <div><small>Unizik School Gate, Awka</small></div>
                            </li>
                        </ul>

                    </div>

                    <div className="input-cnt">
                        <ul>
                            <li>
                                <div><b>Pick Date</b></div>
                                <div><small>Delivers Between 24 November and 30 November.</small></div>
                            </li>
                        </ul>

                    </div>
                </div>
                <div className="buyer-checkout-order-summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <div className="input-cnt">
                        <span>Item Total ({totalItem})</span>
                        <span>&#8358; {new Intl.NumberFormat('en-us').format(Total - 3000)}</span>
                    </div>

                    <div className="input-cnt">
                        <span>Delivery Fee</span>
                        <span>&#8358; {new Intl.NumberFormat('en-us').format(deliveryPrice.current)}</span>
                    </div>

                    <div className="input-cnt">
                        <span>Total </span>
                        <span>&#8358; {new Intl.NumberFormat('en-us').format(Total)}</span>
                    </div>
                </div>
            </div>

            <div className="buyer-checkout-btn" onClick={e => handleDeposit()}>
                <button className="checkout-btn">
                    <span>Confirm Order </span>
                    <span>({new Intl.NumberFormat('en-us').format(Total)})</span>
                </button>
            </div>

        </>
     );
}
 
export default CheckOut;