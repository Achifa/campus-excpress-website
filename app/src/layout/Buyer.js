import React, { useEffect, useState } from 'react'
import Header from '../components/Buyer/Header/Header'
import { useDispatch } from 'react-redux'
import { setBuyerTo } from '../redux/buyer_store/BuyerData'
import { v4 as uuid } from "uuid";
import { useLocation, useNavigate } from 'react-router-dom';
import { GetBuyer } from '../api/buyer/get';

const BuyerLayout = (props) => {

    let dispatch = useDispatch()
    let location = useLocation()
    let navigate = useNavigate()

    useEffect(() => {
        let buyer = window.localStorage.getItem('CE_buyer_id');
        if(buyer === null || buyer === '' || buyer === 'null'){
            window.localStorage.setItem('unknownBuyer',`CE-unknown-buyer-${uuid()}`);
            dispatch(setBuyerTo(null))
        }else{
            async function getData(){
                window.localStorage.removeItem('unknownBuyer')
                let result = await GetBuyer(window.localStorage.getItem('CE_seller_id'))
                dispatch(setBuyerTo(result))
            } 
            getData()
        }
    }, [location])

    
    return (
        <>
            <Header />
            
            {props.children}
        </>

    )
}

export default BuyerLayout
