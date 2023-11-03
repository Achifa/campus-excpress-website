import img from '../../assets/download (3).jpeg'
import audioSvg from '../../assets/audio-input-microphone-svgrepo-com.svg'
import { useEffect, useState } from 'react'

const Settings = () => {

    let [chatList, setChatList] = useState([])

    

      
    
    return ( 
        <>
            <div className="seller-settings">
                <div className="seller-settings-list shadow-sm">
                    {
                        ['Profile Settings', 'Payment/Billing', 'Password/Security', 'Identity/Verification', 'Notification Settings', 'Subscriptions'].map(item =>  
                            <section className="shadow-sm">
                                <img src={img} alt="" />
                                <div  className='seller-list-settings-log'>
                                    <div style={{height: '100%', display: 'flex', alignItems: 'center', width: '100%', textAlign: 'left', fontWeight: '400', fontSize: 'medium'}}>
                                        <span style={{fontSize: 'small', fontWeight: '500'}}>{item}</span>
                                        <span style={{fontSize: 'small', height: '20px', width: '20px', position: 'absolute', right: '5px', fontWeight: '500', borderRadius: '50%', background: 'orangered', color: '#fff', textAlign: 'center'}}>2</span>    
                                    </div>
                                </div>
                                
                            </section>
                        )
                    }
                   

                </div>
                <div className="seller-chat-room">
                    <div className="seller-chat-header">
                        
                    </div>
                    
                    <div className="seller-chat-box">
                      
                    </div>
                    
                </div>
            </div>
        </>
     );
}
 
export default Settings;