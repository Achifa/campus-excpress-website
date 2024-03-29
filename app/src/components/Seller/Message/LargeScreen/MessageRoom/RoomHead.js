import js_ago from 'js-ago'
import React from 'react'

export default function RoomHead({activeRoom}) {
  return (
    <>
        <div className="seller-chat-header">
        <section >
            <div style={{
                height: '50px',
                width: '50px',
                borderRadius: '50%',
                float: 'left',
                background: '#ff4e80',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5vh',
                fontWeight: '500'
            }}>
                {
                  activeRoom?.seller_data?.fname.split('')[0]
                } 
                .
                {
                  activeRoom?.seller_data?.lname.split('')[0]
                }
            </div>

            <div className="seller-client-list-chat-log">
                <div style={{height: '50%', display: 'flex', alignItems: 'center', width: '100%', textAlign: 'left'}}>
                    <span style={{fontSize: 'medium', fontWeight: '500'}}>{activeRoom.seller_data.fname} {activeRoom.seller_data.lname}</span>
                    <span style={{fontSize: 'small', position: 'absolute', right: '15px'}}>{js_ago(new Date(activeRoom.mssg.date))}</span>   
                </div>
                <div style={{height: '50%', display: 'flex', alignItems: 'center', width: '100%', textAlign: 'left'}}>
                    <span>{activeRoom.mssg.mssg}</span>
                    <span style={{fontSize: 'small', height: '20px', width: '20px', position: 'absolute', right: '15px', fontWeight: '500', borderRadius: '50%', background: 'orangered', color: '#fff', textAlign: 'center'}}>2</span>  
                </div>
            </div>
        </section>
        </div>
    </>
  )
}
