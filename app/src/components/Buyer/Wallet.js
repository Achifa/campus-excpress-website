import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { usePaystackPayment } from 'react-paystack';
import { useEffect, useState } from 'react';
import { AuthorizeWalletAccess, WalletData, createBill } from '../../api/seller';
import PayStack from './PayStack';
import { socket } from '../../socket';

const Wallets = () => {
    
    let navigate = useNavigate();
    let [pin, setPin] = useState('');
    let [balance, setBalance] = useState('0.00');
    let [Transactions, setTransactions] = useState([]);

    useEffect(() => {
        WalletData(window.localStorage.getItem("CE_buyer_id"))
        .then(({walletBalance, TransactionHistory}) => {
            setBalance(`${walletBalance[0].wallet_balance}.00`)
            //setTransactions([...JSON.parse(TransactionHistory[0].document)])
            let files = TransactionHistory.map(item => JSON.parse(item.document))
            setTransactions(files)
            console.log(files)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    const config = {
        reference: (new Date()).getTime().toString(),
        email: "akpulufabian@gmail.com",
        amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        publicKey: 'pk_live_c8a885e2b4bda68ee5940a527431030c4b32f6dd',
        metadata: {
            seller_id: `${window.localStorage.getItem("CE_seller_id")}`
        }
    };
    
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

    const initializePayment = usePaystackPayment(config);

    function handleDeposit(params) {
       let overlay = document.querySelector('.seller-overlay');
       overlay.setAttribute('id', 'seller-overlay')
    }

    useEffect(() => {
        socket.on('transaction_verification', ({amount, seller_id}) => {
            if(window.localStorage.getItem("CE_seller_id") === seller_id){
                setBalance(`${amount}.00`)
            }
        })
    }, [])

    return ( 
        <>
            <div className="seller-overlay">
                <PayStack />
            </div>
            
            <div className="seller-wallet-cnt">

                <div className="seller-wallet-top shadow-sm">
                    <p><span style={{fontSize: 'medium', marginBottom: '20px'}}>Current Balance</span> <span><small>&#8358;</small>&nbsp;{balance}</span></p>
                    <div>
                        <span style={{fontSize: 'medium', height: '50%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center'}}>Withdraw Funds</span>

                        <span onClick={e => handleDeposit()} style={{fontSize: 'medium', height: '50%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center'}}>Deposit Funds</span>
                       
                    </div>

                    
                </div>

               {/* <div className="seller-wallet-middle shadow-sm">
                    <div>
                        <section><Link to={'https://sandbox-flw-web-v3.herokuapp.com/pay/campus-express-seller-wallet'} target='_blank'>Withdraw</Link></section>
                        <br />
                        <section><small>Withdraw funds from campus express every Tuesday.</small></section>
                    </div>
                    <div>
                        <section><Link to={'https://sandbox-flw-web-v3.herokuapp.com/pay/campus-express-seller-wallet'} target='_blank'>Deposit</Link></section>
                        <br />

                        <section><small>Fund your campus express account.</small></section>
                    </div>
                    <div>
                        <section><button onClick={e => 
                            initializePayment(onSuccess, onClose)
                        }>Transfer</button></section>
                        <br />

                        <section><small>Enjoy our banking services by transfering to any bank.</small></section>
                    </div>
                </div>*/}

                <div className="seller-wallet-bottom shadow-sm">

                    <h4>Transactions</h4>
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
     );
}
 
export default Wallets;
