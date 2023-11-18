import { Link } from 'react-router-dom';
import img from '../../assets/download (3).jpeg'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PinInput from 'react-pin-input';
import { AuthorizeWalletAccess, WalletData } from '../../api/seller';
const Wallets = () => {
    let navigate = useNavigate();

    let [pin, setPin] = useState('');
    let [balance, setBalance] = useState('0.00');


    useEffect(() => {
        WalletData(window.localStorage.getItem("CE_seller_id"))
        .then(({walletBalance, TransactionHistory}) => {
            setBalance(walletBalance[0].wallet_balance)
        })
        .catch((err) => {
            console.log(err)
        })
    })

    

    let [wallet, setWallet] = useState(false)
    return ( 
        <>
            <div className="seller-wallet-cnt">

                <div className="seller-wallet-top shadow-sm">
                    <p><span style={{fontSize: 'medium', marginBottom: '20px'}}>Current Balance</span> <span><small>&#8358;</small>&nbsp;{balance}</span></p>
                    <div>
                        <span style={{fontSize: 'medium', height: '50%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center'}}>Subscription</span>
                       
                    </div>
                </div>

                <div className="seller-wallet-middle shadow-sm">
                    <div>
                        <section><Link to={'https://flutterwave.com/pay/campus-express'} target='_blank'>Withdraw</Link></section>
                        <br />
                        <section><small>Withdraw funds from campus express every Tuesday.</small></section>
                    </div>
                    <div>
                        <section><Link to={'https://flutterwave.com/pay/campus-express'} target='_blank'>Deposit</Link></section>
                        <br />

                        <section><small>Fund your campus express account.</small></section>
                    </div>
                    <div>
                        <section><Link to={'https://flutterwave.com/pay/campus-express'} target='_blank'>Transfer</Link></section>
                        <br />

                        <section><small>Enjoy our banking services by transfering to any bank.</small></section>
                    </div>
                </div>

                <div className="seller-wallet-bottom shadow-sm">

                    <h4>Transactions</h4>
                    <br />
                    <div>
                        <section>Withdraw</section>
                        <br />
                        <section><small>Withdraw funds from campus express every Tuesday.</small></section>
                    </div>
                    <div>
                        <section>Payments</section>
                        <br />

                        <section><small>View payments from clients.</small></section>
                    </div>
                    <div>
                        <section>Tranfer</section>
                        <br />

                        <section><small>Enjoy our banking services by transfering to any bank.</small></section>
                    </div>
                </div>

            </div>
        </>
     );
}
 
export default Wallets;
