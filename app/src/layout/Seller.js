import React from 'react'
import Header from '../components/Seller/Header'

const SellerLayout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>

    )
}

export default SellerLayout
