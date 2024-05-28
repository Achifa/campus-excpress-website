    import { useFlutterwave } from 'flutterwave-react-v3';
    import React, { useEffect, useState } from 'react'
import { GetSeller } from '../../api/seller/get';

export default function Flw() {

    let [fname, setFname] = useState('')
    let [lname, setLname] = useState('')
    let [email, setEmail] = useState('')
    let [phone, setPhone] = useState('')
    let [amount, setAmount] = useState('0.00')

    let [userData, setUserData] = useState('')

    useEffect(() => {
        async function getData(){
            let result = await GetSeller(window.localStorage.getItem('CE_seller_id'))
            setFname(result.fname)
            setLname(result.lname)
            setEmail(result.email)
            setPhone('0'+result.phone)
        }
        getData()
      }, [])

    const config = {
        public_key: 'FLWPUBK-502f1f73c8abf430f161a528241c198a-X',
        tx_ref: Date.now(),
        amount: amount,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
        email: email,
        phone_number: phone,
        name: `${fname} ${lname}`,
        },
        customizations: {
        title: 'Campus Express',
        description: 'Deposit to sellers Wallet',
        logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

    const handleFlutterPayment = useFlutterwave(config)

        // you can call this function anything
    const onSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
        };
    
        // you can call this function anything
        const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
        }
  return (
    <div>
        <form id="paymentForm">

            <h5 style={{color: 'orangered'}}>Deposit Form</h5>


            <div className="seller-input-cnt">
                <section>
                    <label htmlFor="">FirstName</label>
                    <input value={fname} onInput={e => setFname(e.target.value)} placeholder='FirstName...' type="text" />
                </section>
                <section>
                    <label htmlFor="">LastName</label>
                    <input value={lname} onInput={e => setLname(e.target.value)}  placeholder='LastName' type="text" />
                </section>
            </div>

            <div className="seller-input-cnt">
                <section style={{width: '100%'}}>
                    <label htmlFor="">Amount</label>
                    <input onInput={e => setAmount(e.target.value)}  placeholder='Amount...' type="text" />
                </section>
                
            </div>
            <div className="seller-input-cnt">
                <section style={{width: '100%'}}>
                    <label htmlFor="">Email</label>
                    <input value={email} onInput={e => setEmail(e.target.value)}  placeholder='Email...' type="text" />
                </section>
                
            </div>
            <div className="seller-input-cnt">
                <section style={{width: '100%'}}>
                    <label htmlFor="">Phone</label>
                    <input value={phone} onInput={e => setPhone(e.target.value)}  placeholder='Phone...' type="text" />
                </section>
                
            </div>

            <div className="seller-input-cnt">
                        
                <button style={{width: '45%'}} onClick={e => {e.preventDefault(); handleFlutterPayment(onSuccess, onClose)}}>Pay</button>

                <button style={{width: '45%'}} onClick={e => {
                    e.preventDefault();
                    let overlay = document.querySelector('.seller-overlay');
                    overlay.removeAttribute('id')
                }}>Cancel</button>
                
            </div>
        </form>
    </div>
  )
}
