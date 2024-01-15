import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Aside() {

    let navigate = useNavigate()
  return (

    <>
        <div className='seller-aside-overlay'></div>

        <div className='seller-aside'>

            <h6>Main</h6>
            <ul>

                <li onClick={e => navigate('/seller/')}>
                    <span></span>  
                    <span>Dashboard</span>
                </li>

                <li className='seller__extra__menu' onClick={e => navigate('/seller/wallet')}>
                    <span></span>
                    <span>Balance: </span>
                </li>
                

                <h6>Menu Items</h6>

                <li onClick={e => navigate('/seller/messages')}>
                    <span></span>
                    <span>Messages</span>
                </li>

                

                <li onClick={e => navigate('/seller/shop')}>
                    <span></span>
                    <span>Ads</span>
                </li>

                <li onClick={e => navigate('/seller/editor')}>
                    <span></span>
                    <span>Create Ads</span>
                </li>

                <li className='seller__extra__menu' onClick={e => navigate('/seller/inbox')}>
                    <span></span>
                    <span>Inbox</span>
                </li>

                <li onClick={e => navigate('/seller/orders')}>
                    <span></span>
                    <span>Orders</span>
                </li>

                <li onClick={e => navigate('/seller/')}>
                    <span></span>
                    <span>Refunds/Return</span>
                </li>

                <li className='seller__extra__menu' onClick={e => navigate('/seller/settings')}>
                    <span></span>
                    <span>Account Settings</span>
                </li>

            
            </ul>
        </div>
    </>
  )
}
