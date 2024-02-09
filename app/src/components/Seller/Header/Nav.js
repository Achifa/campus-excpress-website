import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";

export default function Nav() {
  let [screenWidth, setScreenWidth] = useState(0)
  let navigate = useNavigate()

  useEffect(() => {
    let width = window.innerWidth;
    setScreenWidth(width)
}, [])

  return (
    <nav style={{height: '50px', width: '100%', display: screenWidth> 760 ? 'none' : 'flex', position: 'sticky', top: '60px', borderTop: '1px solid #fff4e0', alignItems: 'center', justifyContent: 'center', background: '#fff'}}>
      <div onClick={e => navigate('/seller/')} style={{width: '20%', fontSize: 'small', textAlign: 'center'}}>Home</div>
      <div onClick={e => navigate('/seller/shop')} style={{width: '20%', fontSize: 'small', textAlign: 'center'}}>Ads</div>
      <div onClick={e => navigate('/seller/editor')} style={{width: '20%', fontSize: 'small', textAlign: 'center'}}>Sell</div>
      <div onClick={e => navigate('/seller/orders')} style={{width: '20%', fontSize: 'small', textAlign: 'center'}}>Orders</div>
      <div onClick={e => navigate('/seller/messages')} style={{width: '20%', fontSize: 'small', textAlign: 'center'}}>Messages</div>
    </nav>
  )
} 
