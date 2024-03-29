import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WalletData } from '../../../api/seller'
import user from '../../../assets/user-alt-1-svgrepo-com.svg'
import settings from '../../../assets/setting-svgrepo-com.svg'
import history from '../../../assets/history-svgrepo-com (1).svg'
import reviews from '../../../assets/report-flag-1419-svgrepo-com.svg'
import wallet from '../../../assets/wallet-2-svgrepo-com.svg'
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
                {/* <img src={logo} style={{height: '150px', width: '150px', color: '#fff', fontSize: 'medium', display: 'flex'}} alt="" /> */}
                <div>CE</div>

            </div> 
            {/* <hr /> */}
            <ul>

                <li onClick={e => navigate('/seller/')}>
                    <span>
                        {/* <img src={user} style={{height: '25px', width: '25px', color: '#fff', fontSize: 'medium', display: 'flex'}} alt="" /> */}

                    </span>  
                    <span>Dashboard</span>
                </li>

                {/* <li className='seller__extra__menu' >
                    <span>
                        <img src={wallet} style={{height: '25px', width: '25px', color: '#fff', fontSize: 'medium', display: 'flex'}} alt="" />

                    </span> 
                    <span>Balance: &#8358; {balance}</span>
                </li> */}

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

                {/* <li onClick={e => navigate('/seller.orders')}>
                    <span></span>
                    <span>Orders</span>
                </li> */}

                {/* <li onClick={e => navigate('/seller.')}>
                    <span></span>
                    <span>Refunds/Return</span>
                </li> */}

               

                <li className='seller__extra__menu' onClick={e => navigate('/seller.profile')}>
                    <span></span>
                    <span>Account</span>
                </li>

            
            </ul>
        </div>
    </>
  )
}
