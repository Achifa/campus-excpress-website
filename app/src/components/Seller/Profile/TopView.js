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
import { GetSeller, GetSellerPhoto } from '../../../api/seller/get'
export default function TopView() {
    

    let [screenWidth, setScreenWidth] = useState(0)
    let [photo, setPhoto] = useState(userPhoto)

    useEffect(() => { 
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

    let [userData, setUserData] = useState()
    
    useEffect(() => {
        async function getData(){
          let result = await GetSeller(window.localStorage.getItem('CE_seller_id'))
          setUserData(result)
          console.log(result)
        }
        getData()
      }, [])

      useEffect(() => {
        async function getPhoto(){
          let result = await GetSellerPhoto(window.localStorage.getItem('CE_seller_id'))
          setPhoto(result.file)
        }
        getPhoto()
      }, [])
    let navigate = useNavigate()


  return (
    <>
        <div className="seller-profile-left">
            
            <img style={{padding: '10px'}} src={photo}  alt="" />

            <img onClick={e => navigate('/seller.settings.profile')} src={editSvg} style={{position: 'absolute', height: '30px', width: '30px', border: 'none', right: '10px', top: '10px'}}  alt="" />

            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;

            <div>
                <div className="seller-profile-name">
                    {userData?.fname} {userData?.lname}
                </div>


                <div className="seller-profile-date">
                    {userData?.state}-{userData?.campus}
                </div>
                <div className="seller-profile-date">
                    Member since {userData?.date?(userData.date):'loading...'}
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
