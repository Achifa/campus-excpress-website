import img from '../../assets/download (3).jpeg'
import audioSvg from '../../assets/audio-input-microphone-svgrepo-com.svg'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Settings = () => {

    let [chatList, setChatList] = useState([])

    let navigate = useNavigate();
    
    // {text: 'Identity/Verification', link: 'verification'},
    // {text: 'Notification Setup', link: 'notification-setup'}, 
    
    return ( 
        <>
            <div className="seller-settings">
                {
                    [{text: 'Password/Security', link: 'password-reset'}, {text: 'Profile Settings', link: 'profile-setup'}].map(item =>  
                        <section className="shadow-sm" onClick={e => navigate(`?type=${item.link}`)}>
                            
                            <div  className='seller-list-settings-log'>
                                <div style={{height: '100%', display: 'flex', alignItems: 'center', width: '100%', textAlign: 'left', fontWeight: '400', fontSize: 'medium'}}>
                                    <span style={{fontSize: 'medium', fontWeight: '500'}}>{item.text}</span>
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