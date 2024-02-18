import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WalletData } from '../../../api/seller'
import logo from '../../../assets/WhatsApp Image 2024-02-13 at 09.50.21_734cf0aa.jpg'
export default function Aside() {

    let navigate = useNavigate()
    let [balance, setBalance] = useState('0.00');

    useEffect(() => {
        WalletData(window.localStorage.getItem("CE_seller_id"))
        .then(({walletBalance, TransactionHistory}) => {
            setBalance(`${walletBalance[0].wallet_balance}.00`)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])
  return (

    <>
        <div className='seller-aside-overlay'></div>

        <div className='seller-aside'>
            <div className='seller-logo'>
                <img src={logo} style={{height: '150px', width: '150px', color: '#fff', fontSize: 'medium', display: 'flex'}} alt="" />
                {/* <div>CE</div> */}

            </div> 
            {/* <hr /> */}
            <ul>

                <li onClick={e => navigate('/seller/')}>
                    <span></span>  
                    <span>Dashboard</span>
                </li>

                <li className='seller__extra__menu' onClick={e => navigate('/seller.wallet')}>
                    <span></span>
                    <span>Balance: &#8358; {balance}</span>
                </li>

                <br />
                

                <hr />

                <br />

                <li onClick={e => navigate('/seller.messages')}>
                    <span></span>
                    <span>Messages</span>
                </li>

                

                <li onClick={e => navigate('/seller.shop')}>
                    <span></span>
                    <span>Ads</span>
                </li>

                <li onClick={e => navigate('/seller.editor')}>
                    <span></span>
                    <span>Sell</span>
                </li>

                {/* <li className='seller__extra__menu' onClick={e => navigate('/seller.inbox')}>
                    <span></span>
                    <span>Inbox</span>
                </li> */}

                <li onClick={e => navigate('/seller.orders')}>
                    <span></span>
                    <span>Orders</span>
                </li>

                {/* <li onClick={e => navigate('/seller.')}>
                    <span></span>
                    <span>Refunds/Return</span>
                </li> */}

                <li className='seller__extra__menu' onClick={e => navigate('/seller.settings')}>
                    <span></span>
                    <span>Settings</span>
                </li>

                <li className='seller__extra__menu' onClick={e => navigate('/seller.settings')}>
                    <span></span>
                    <span>Account</span>
                </li>

            
            </ul>
        </div>
    </>
  )
}
