import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Aside() {

    let navigate = useNavigate()
  return (
    <div className='admin-aside'>

        <br />
        <h6>Main</h6>
        <ul>

            <li onClick={e => navigate('/admin/dashboard')}>
                <span></span>
                <span>Dashboard</span>
            </li>

            <li onClick={e => navigate('/admin/')}>
                <span></span>
                <span>Wallet summary</span>
            </li>
            
        </ul>

        <h6>Menu Items</h6>
        <ul>

            <li onClick={e => navigate('/admin/messages')}>
                <span></span>
                <span>Messages</span>
            </li>

            <li onClick={e => navigate('/admin/ads')}>
                <span></span>
                <span>Ads</span>
            </li>

            <li onClick={e => navigate('/admin/inbox')}>
                <span></span>
                <span>Inbox</span>
            </li>

            <li onClick={e => navigate('/admin/users')}>
                <span></span>
                <span>Users</span>
            </li>

            <li onClick={e => navigate('/admin/orders')}>
                <span></span>
                <span>Orders</span>
            </li>

            <li onClick={e => navigate('/admin/')}>
                <span></span>
                <span>Refunds/Return</span>
            </li>

            <li onClick={e => navigate('/admin/')}>
                <span></span>
                <span>Account Settings</span>
            </li>
            
        </ul>
    </div>
  )
}
