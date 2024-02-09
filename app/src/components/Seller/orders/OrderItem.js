import React from 'react'
import { useLocation } from 'react-router-dom'
import Product from '../Product/Product'

export default function OrderItem() {
    let location = useLocation()
  return (
    <div className='order-item-cnt' style={{padding: '.5px'}}>

        <Product product_id={[location.pathname.split('/').splice(-1)[0]]} />
      
    </div>
  )
}
 