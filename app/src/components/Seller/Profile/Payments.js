import React, { useEffect, useState } from 'react'
import '../../../styles/Seller/Payment.css'
import { WalletData } from '../../../api/seller';
export default function Payments() {

    let [Transactions, setTransactions] = useState([]);
    let [balance, setBalance] = useState('0.00');

    useEffect(() => {
        let overlay = document.querySelector('.overlay')
        //overlay.setAttribute('id', 'overlay');
        WalletData(window.localStorage.getItem("CE_seller_id"))
        .then(({walletBalance, TransactionHistory}) => {
            setBalance(`${walletBalance[0].wallet_balance}.00`)
            //setTransactions([...JSON.parse(TransactionHistory[0].document)])
            let files = TransactionHistory.map(item => JSON.parse(item.document))
            setTransactions(files)
            overlay.removeAttribute('id')
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

  return (
    <>
      <div className="seller-profile-reviews">

        

        <div className="seller-wallet-bottom shadow-sm">
            <br />

            <div style={{display: 'flex'}}> 
                <span>Cash Out</span>
                <span>
                    
                </span>
            </div>
            <br />
            <h4><b>Transactions</b></h4>
            <br />
            
            {
                Transactions.length > 0
                ?
                Transactions.map((item, key) => 
                    <div key={key}>
                        <section>
                            <span style={{float: 'left'}}>Source Bank: {item.authorization.bank}</span>
                            <span style={{float: 'right'}}>Amount: <small>&#8358;</small>{item.metadata.amount}</span>
                        </section> 
                        <br />

                        <section>Transaction Type: {item.authorization.channel}</section>

                        <section>
                            <span style={{float: 'left'}}>Initiated On: {item.created_at}</span>
                            <span style={{float: 'right'}}>Sender: {item.authorization.sender_name}</span>
                        </section> 
                    </div>
                    
                )
                :
                <div>
                    <section>No Transactions At The Moment...</section>
                    
                </div>
            }
        </div>
      </div>
    </>
  )
}
