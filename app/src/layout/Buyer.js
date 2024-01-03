import React from 'react'
import Header from '../components/Buyer/Header'

const BuyerLayout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>

    )
}

export default BuyerLayout