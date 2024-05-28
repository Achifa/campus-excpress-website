import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Seller/Header/Header'
import Aside from '../components/Seller/Aside/Aside'
import Nav from '../components/Seller/Header/Nav'

const SellerLayout = ({ children }) => {
    let location = useLocation()
    let [screenWidth, setScreenWidth] = useState(0)
    let [activeHead, setActiveHead] = useState('')

    useEffect(() => { 
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])
    return (
        <>
            <Header />
            {/* <Aside /> */}

            
            {children}

            {
                //location.pathname.split('/').splice(-1)[0] !== 'seller' && location.pathname.split('/').splice(-1)[0] !== 'seller.shop' && location.pathname.split('/').splice(-1)[0] !== 'seller.messages'
                //?
                //''
                //:

                screenWidth > 760
                ?
                ''
                :
                location.pathname.split('/').splice(-1)[0] === 'seller.editor' 
                ?
                ''
                :
                new URLSearchParams(window.location.search).get('product_id')
                ?
                ''
                : 
                <Nav />
            }
        </>  

    )
}

export default SellerLayout
