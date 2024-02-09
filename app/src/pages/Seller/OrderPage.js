import React from 'react'
import OrderItem from '../../components/Seller/orders/OrderItem'
import OrderItemData from '../../components/Seller/orders/OrderItemData'
import { useLocation } from 'react-router-dom'

export default function OrderPage() {

  return (
    <div style={{padding: '20px'}}>
      <OrderItem/>
      <OrderItemData />
    </div>
  )
}
