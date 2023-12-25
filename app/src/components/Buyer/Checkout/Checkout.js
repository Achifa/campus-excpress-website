import { useEffect, useRef, useState } from "react";
import { GetItem } from "../../../api/buyer";
import { useLocation } from "react-router-dom";
import PayStack from "../Forms/PayStack";
import { usePaystackPayment } from "react-paystack";
import CEStack from "../CEStack";
import Summary from "./Summary";
import Info from "./Info";
import Method from "./Method";
import Address from "./Address";
import Btn from "./Btn";

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

    function setPayment(data) {
        SetPaymentMethod(data)
    }

    return ( 
        <>
            <div className="seller-overlay">
                {payment}
            </div>
            <div className="buyer-checkout">
                <Address setPayment={setPayment} />
                <Method />
                <Info />
                <Summary totalItem={totalItem} deliveryPrice={deliveryPrice} Total={Total} />
            </div>

            <div className="buyer-checkout-btn" onClick={e => handleDeposit()}>
                <Btn deliveryPrice={deliveryPrice} />
            </div>

        </>
     );
}
 
export default CheckOut;