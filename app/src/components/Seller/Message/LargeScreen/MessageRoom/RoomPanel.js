import React, { useState } from 'react'
import { send_mssg } from '../../../../../api/seller'
import mssgSvg from '../../../../../assets/messages-svgrepo-com (1).svg'
export default function RoomPanel() {
    let [mssg,set_mssg] = useState('')

    send_mssg(window.localStorage.getItem('CE_seller_id'))
    .then((result) => {
        
    })
    .catch((err) => console.log(err))
  return (
    <>
        <div className="seller-chat-tools" style={{display: 'flex', background: '#fff', alignItems: 'center', height: '70px', justifyContent: 'space-between', padding: '10px', width: '99.9%', margin: 'auto'}}>
            <textarea onInput={e => set_mssg(e.target.value)} name="" style={{width: '60%', height: '100%', resize: 'none', padding: '10px 20px 10px 20px', outline: 'none', fontSize: 'large', fontWeight: '400', background: '#f9f9f9', borderRadius: '2px', outline: 'none', border: 'none'}} placeholder='Message...'></textarea>
            
            <button onClick={send_mssg} style={{float: 'right', width: '50px', height: '40px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', outline: 'none', border: 'none'}}>  
                <img src={mssgSvg} style={{height: '20px', width: '20px', }} alt="" />
            </button>
        </div>
    </>
  )
}
