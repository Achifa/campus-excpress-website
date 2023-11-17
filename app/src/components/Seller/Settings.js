import img from '../../assets/download (3).jpeg'
import audioSvg from '../../assets/audio-input-microphone-svgrepo-com.svg'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Settings = () => {

    let [chatList, setChatList] = useState([])

    
      
    
    return ( 
        <>
            <div className="seller-settings">
                {
                    ['Password/Security', 'Identity/Verification', 'Notification Settings', 'Subscriptions'].map(item =>  
                        <section className="shadow-sm">
                            
                            <div  className='seller-list-settings-log'>
                                <div style={{height: '100%', display: 'flex', alignItems: 'center', width: '100%', textAlign: 'left', fontWeight: '400', fontSize: 'medium'}}>
                                    <span style={{fontSize: 'medium', fontWeight: '500'}}>{item}</span>
                                    <span style={{fontSize: 'small', height: '20px', width: '20px', position: 'absolute', right: '10px', fontWeight: '500', borderRadius: '50%', background: 'orangered', color: '#fff', textAlign: 'center'}}>2</span>    
                                </div>
                            </div>
                            
                        </section>
                    )
                }
                   
            </div>
        </>
     );
}
 
export default Settings;