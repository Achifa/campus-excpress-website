import React, { useState } from 'react'
import Header from '../components/Buyer/Header/Header'

const BuyerLayout = (props) => {

    
    return (
        <>
            <Header />
            
            {props.children}
        </>

    )
}

export default BuyerLayout
