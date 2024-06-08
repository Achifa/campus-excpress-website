import React, { useEffect, useState } from 'react'
import Header from '../components/Buyer/Header/Header'
import { useDispatch } from 'react-redux'
import { setBuyerTo } from '../redux/buyer_store/Buyer'

const BuyerLayout = (props) => {

    let dispatch = useDispatch()
    useEffect(() => {
        let buyer = window.localStorage.getItem('CE_buyer_id');
        if(buyer === null && buyer === ''){
            dispatch(setBuyerTo(
                {
                    isRegistered: false,
                    ref: null
                },
            ))
        }else{
            dispatch(setBuyerTo(
                {
                    isRegistered: true,
                    ref: buyer
                },
            ))
        }
    }, [])

    
    return (
        <>
            <Header />
            
            {props.children}
        </>

    )
}

export default BuyerLayout
