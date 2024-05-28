import React from 'react'
import MessageHead from '../../components/Seller/Message/LargeScreen/MessageList/MessageHead'
import RoomBody from '../../components/Seller/Message/LargeScreen/MessageRoom/RoomBody'
import SellerLayout from '../../layout/Seller'
import ListHead from '../../components/Seller/Message/LargeScreen/MessageList/ListHead'
import RoomHead from '../../components/Seller/Message/LargeScreen/MessageRoom/RoomHead'
import RoomPanel from '../../components/Seller/Message/LargeScreen/MessageRoom/RoomPanel'

export default function MessageLg() {
  return (
    <>
        {/* <SellerLayout> */}
            <div className="seller-messages">
                <ListHead />

                <div className="seller-client-list">
                    <MessageHead />
                </div>
                
            </div>

            <div className="seller-chat-room">
                <RoomHead />

                <RoomBody />

                <RoomPanel />
        
            </div>
        {/* </SellerLayout> */}
    </>
  )
}
