import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setMenuTo } from '../../../redux/seller_store/settings_option'
import user from '../../../assets/user-alt-1-svgrepo-com.svg'
import editSvg from '../../../assets/edit-svgrepo-com.svg'
import history from '../../../assets/history-svgrepo-com (1).svg'
import reviews from '../../../assets/rating-svgrepo-com.svg'
import wallet from '../../../assets/money-total-line-svgrepo-com.svg'
import pwd from '../../../assets/password-svgrepo-com.svg'
import notice from '../../../assets/notification-svgrepo-com (2).svg'
import userPhoto from '../../../assets/user-svgrepo-com (2).svg'

import img from '../../../images/images (3).jpeg'
import { useNavigate } from 'react-router-dom'
export default function TopView() {
    let dispatch = useDispatch()
    let list = [
        ['Personal Info', 'personal_data', user],
        // ['Profile Info', 'profile_data'],
        // ['Settings', 'settings', settings],
        // ['Contact Info', 'contact_info', ''],
        ['History', 'history', history],
        ['Reviews', 'reviews', reviews],
        ['Security', 'pwd', pwd],
        ['Notifications', 'notice', notice],
        ['Payments', 'payment', wallet]
    ]


    let [screenWidth, setScreenWidth] = useState(0)
    let [activeHead, setActiveHead] = useState('')

    useEffect(() => { 
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

    
    function handle_menu_change(e) {
        // alert(e.currentTarget)
        console.log(e.currentTarget.dataset.id)
        dispatch(setMenuTo(e.currentTarget.dataset.id))
    }
  let navigate = useNavigate()


  return (
    <>
        <div className="seller-profile-left">
            
            <img style={{padding: '10px'}} src={userPhoto}  alt="" />

            <img onClick={e => navigate('/seller.settings.profile')} src={editSvg} style={{position: 'absolute', height: '30px', width: '30px', border: 'none', right: '10px', top: '10px'}}  alt="" />

            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;

            <div>
                <div className="seller-profile-name">
                    Akpulu fabian
                </div>


                <div className="seller-profile-date">
                    Awka, Nigeria - {
                        new Date().toUTCString()
                    }
                </div>

                {/* <div className="seller-profile-date">
                    akpulufabian@gmail.com &#8226; Unverified
                </div>
                <div className="seller-profile-date">
                    08032639894 &#8226; Unverified
                </div> */}
                
            </div>

        </div>
    </>
  )
}
