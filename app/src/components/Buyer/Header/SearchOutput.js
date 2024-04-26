import React, { useEffect, useState } from 'react'
import backSvg from "../../../assets/back-svgrepo-com (3).svg";
import { useNavigate } from 'react-router-dom';
import searchSvg from '../../../assets/search-svgrepo-com.svg'

import { GetSearchWord } from '../../../api/buyer/get';
import { useSelector } from 'react-redux';
export default function SearchOutput() {

    let {searchList} = useSelector(s => s.searchList);


    let [searchRes, setSearchRes] = useState([])
    let navigate = useNavigate()

    let [searchChar, setSearchChar] = useState('')
    useEffect(() => {
    
        setSearchRes((searchList))
    }, [searchList])

      
  return (
    <>
        <div className="search-cnt">

            
            <div className="search-content">
                {
                    searchRes.length > 0
                    ?
                    searchRes.map((item, index) => 
                        <div key={index} className=''>
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
                        <div>
                            Search Result Will Appear Here
                        </div>
                    </div>
                }
            </div>
        </div>
        
    </> 
  )
}
