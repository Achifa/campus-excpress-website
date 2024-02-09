import React from 'react'
import locationSvg from '../../../assets/location-pin-svgrepo-com (2).svg'
import dateSvg from '../../../assets/date-2-svgrepo-com.svg'
import userSvg from '../../../assets/user-rounded-svgrepo-com.svg'
import stockSvg from '../../../assets/stock-svgrepo-com.svg'
import { useState, useEffect } from 'react'
import { get_buyer_that_ordered_item } from '../../../api/seller'
import { useLocation } from 'react-router-dom'
import js_ago from 'js-ago'
export default function OrderItemData() {
    let location = useLocation()

    let [list, set_list] = useState([])
 
    useEffect(() => {
        get_buyer_that_ordered_item(location.pathname.split('/').splice(-1)[0])
        .then(({data}) => {
            console.log(data)
            set_list(data)
        })
        .catch(err => console.log(err))
    }, [location])

  return (
    <div className='order-item-data-cnt'>
        {
            list.map((item, index) => {
                return(
                    <div className='order-item-data shadow-sm mb-5' key={index}>
                        <br />

                        <div style={{display: 'flex', height: '40px'}}> 
                            <span>
                                <img src={userSvg} style={{height: '20px', width: '20px'}} alt="" />

                            </span>
                            &nbsp;
                            &nbsp;
                            <span>{item.buyer.fname} {item.buyer.lname}</span> 
                        </div>

                        <div style={{display: 'flex', height: '40px', justifyContent: 'space-between', alignItems: 'center'}}> 
                            <span style={{display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                                <span>
                                    <img src={locationSvg} style={{height: '20px', width: '20px'}} alt="" />
                                </span>
                                &nbsp;
                                <span>{item.buyer.campus}, {item.buyer.state}</span>
                            </span>
                            <span style={{display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                                <span>
                                    <img src={dateSvg} style={{height: '20px', width: '20px'}} alt="" />

                                </span>
                                &nbsp;
                                <span>{js_ago(new Date(item.buyer.date))}</span>
                            </span>
                        </div>

                        <div style={{display: 'flex', height: '40px', justifyContent: 'space-between', alignItems: 'center'}}> 
                            <span style={{display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                                <span>
                                    <img src={stockSvg} style={{height: '20px', width: '20px'}} alt="" />
            
                                </span> 
                                &nbsp;
                                <span>{item.item.stock} <span style={{fontSize: 'x-small', fontWeight: 'bold', background: 'orangered', padding: '0 2px 0 2px', color: '#fff', borderRadius: '1px'}}>Quantity Ordered</span></span>
                            </span>
                            <span style={{display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                                <span>
                                    
                                &#8358;
                                </span>
                                &nbsp;
                                <span>{item.item.price * parseInt(item.item.stock)}</span>
                            </span>
                        </div>
                        <br />

                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}> 
                            <button style={{width: '45%'}}>Decline</button>
                            <button style={{width: '45%'}}>Accept</button>
                        </div>

                    </div>
                )
            })
        }
      
    </div>
  )
}
