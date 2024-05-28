import React, { useEffect, useState } from 'react'
import SellerLayout from '../../layout/Seller'
import { get_chat } from '../../api/seller'
import MessageHead from '../../components/Seller/Message/SmallScreen/MessageList/MessageHead'

export default function Messages() {

    let [item, setItem] = useState([1,3,4,5,6,7,8,9])

    useEffect(() => {
        get_chat(window.localStorage.getItem('CE_seller_id'))
        .then((result) => setItem(result.data))
        .catch((err) => err) 
       
     }, [])
  return (
    <>
        <SellerLayout>
            <div className="seller-messages">
                <div className="seller-client-list">    
                    {
                        item.map((item, index) => {
                            return(
                                <MessageHead data={item} index={index} />
                            )
                        })
                    }
                </div>
            </div>
        </SellerLayout>
    </>
  )
}
