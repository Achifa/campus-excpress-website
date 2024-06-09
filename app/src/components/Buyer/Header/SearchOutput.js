import React, { useEffect, useState } from 'react'
import backSvg from "../../../assets/back-svgrepo-com (3).svg";
import { useNavigate } from 'react-router-dom';
import searchSvg from '../../../assets/search-svgrepo-com.svg'

import { GetSearchWord } from '../../../api/buyer/get';
import { useSelector } from 'react-redux';
export default function SearchOutput() {

    let {SearchList} = useSelector(s => s.SearchList);


    let [searchRes, setSearchRes] = useState([])
    let navigate = useNavigate()

    let [searchChar, setSearchChar] = useState('')
    useEffect(() => {
    
        setSearchRes(SearchList)
    }, [SearchList])

      
  return (
    <>
        <div style={{
            marginTop: '50px',
            paddingTop: '20px',
            background: '#fff'
        }} className="buyer-main-content buyer-main-cnt">

            
            <div className="search-content">
                {
                    searchRes?.length > 0
                    ?
                    searchRes.map((item, index) => 
                        <div style={{
                            height: 'auto',
                            width: '100%',
                            padding: '10px',
                            borderLeft: '1px solid #FF4500', 
                            marginBottom: '10px',
                        }} onClick={e => window.location.href=(`/product?product_id=${item.product_id}`)} key={index} className='shadow-sm'>
                            {item.title}
                        </div>
                    )
                    :
                    <div style={{
                        height: 'calc(100vh - 200px)', 
                        width: '100%',
                        top: '200px',
                        display: 'flex', 
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        fontSize: 'large',
                        // background: 'red',
                        fontWeight: 'bold', 
                        color: '#FF4500',
                    }}>
                        <img src={searchSvg} style={{height: '50px', width: '50px'}}  alt="" />
                            <br />
                        <div style={{width: '100%', textAlign: 'center', display: 'flex', justifyContent: 'center',alignItems: 'center',}}>
                            Search Result Will Appear Here
                        </div>
                    </div>
                }
            </div>
        </div>
        
    </> 
  )
}
