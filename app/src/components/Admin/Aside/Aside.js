import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Aside() {

    let navigate = useNavigate()
  return (
    <div className='admin-aside'>

       
        <ul>

            <li onClick={e => navigate('/admin')}>
                <span></span>
                <span>Dashboard</span>
            </li>


            <li onClick={e => navigate('/admin.messages')}>
                <span></span>
                <span>Messages</span>
            </li>

            <li onClick={e => navigate('/admin.ads')}>
                <span></span>
                <span>Ads</span>
            </li>

            <li onClick={e => navigate('/admin.inbox')}>
                <span></span>
                <span>Inbox</span>
            </li>

            <li onClick={e => navigate('/admin.users')}>
                <span></span>
                <span>Users</span>
            </li>

            <li onClick={e => navigate('/admin/')}>
                <span></span>
                <span>Refunds/Return</span>
            </li>

           
        </ul>
    </div>
  )
}
