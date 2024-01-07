import React, { useEffect, useState } from 'react'
import backSvg from "../../../assets/back-svgrepo-com (3).svg";
import { useNavigate } from 'react-router-dom';
import { GetSearchWord } from '../../../api/buyer';
export default function Search() {

    let [searchRes, setSearchRes] = useState([])
    let navigate = useNavigate()

    let [searchChar, setSearchChar] = useState('')
    useEffect(() => {
    
        if(searchChar !== '' && searchChar !== ' '){ 
          GetSearchWord(searchChar === '' || searchChar === ' ' ? '' : searchChar)
          .then((result) => { 
              setSearchRes(result)
              console.log(result)
          })
          .catch((err) => {
            console.log(err)
          })
    
        }
      }, [searchChar])

      
  return (
    <>
        <div className="search-cnt">

            <div className="input-cnt">
                <div style={{float: 'left'}} onClick={e => navigate('/')}>
                    <img src={backSvg} style={{height: '25px', width: '25px', position: 'relative', borderRadius: '2.5px'}} alt="" />
                </div>
                <input onInput={e => (setSearchChar(e.target.value))} type="search" placeholder='What Are You Looking For' />
                <div style={{float: 'right'}}>
                    <button style={{height: '90%', width: '100%', padding: '0'}}>search</button>
                </div>
            </div>

            <div className="search-content">
                {
                    searchRes.map((item, index) => 
                        <div key={index} className=''>
                            {item.title}
                        </div>
                    )
                }
            </div>
        </div>
        
    </> 
  )
}
