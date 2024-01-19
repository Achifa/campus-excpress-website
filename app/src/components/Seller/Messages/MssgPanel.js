import React, { useState } from 'react'
import audioSvg from '../../../assets/audio-input-microphone-svgrepo-com.svg'
import mssgSvg from '../../../assets/send-message-svgrepo-com.svg'
import { send_mssg } from '../../../api/seller'

export default function MssgPanel() {

    let [mssg,set_mssg] = useState('')

    send_mssg(window.localStorage.getItem('CE_seller_id'))
    .then((result) => {
        
    })
    .catch((err) => console.log(err))

  return (
    <>
        <div className="seller-chat-tools" style={{display: 'flex', background: '#fff', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', left: '0', padding: '5px', bottom: '0', width: '99.9%', margin: 'auto'}}>
            <textarea onInput={e => set_mssg(e.target.value)} name="" style={{width: '60%', height: '100%', resize: 'none', padding: '10px 20px 10px 20px', outline: 'none', fontSize: 'large', fontWeight: '400', background: '#f9f9f9', borderRadius: '8px'}} placeholder='Message...'></textarea>
            <button onClick={send_mssg} style={{float: 'right', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', outline: 'none', border: 'none'}}>  
                <img src={mssgSvg} style={{height: '20px', width: '20px', }} alt="" />
            </button>
        </div>
    </>
  )
}
