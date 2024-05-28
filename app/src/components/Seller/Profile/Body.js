import React, { useEffect, useState } from 'react'
import User from './User'
import Bio from './Bio'
import ellipsisSvg from '../../../assets/ellipsis-svgrepo-com.svg'

import { useSelector } from 'react-redux'
import Settings from './Settings'
import Reviews from './Reviews'
import History from './History'
import Contact from './Contact'
import PasswordReset from './PasswordReset'
import NoticeSetup from './NoticeSetup'
import Payments from './Payments'
import { GetSeller } from '../../../api/seller'

export default function Body() {

  let [fname, setFname] = useState('')
  let [lname, setLname] = useState('')
  let [email, setEmail] = useState('')
  let [phone, setPhone] = useState('')
  let [state, setState] = useState('')
  let [campus, setCampus] = useState('')

  let [categories, setcategories] = useState([
    'shoes','bags','clothes'
  ])

  useEffect(() => {
    let overlay = document.querySelector('.overlay')
    //overlay.setAttribute('id', 'overlay');
    GetSeller(window.localStorage.getItem('CE_seller_id'))
    .then((result) => {
        setFname(result.fname)
        setLname(result.lname)
        setEmail(result.email)
        setPhone(result.phone)
        setCampus(result.campus)
        setState(result.state)
        overlay.removeAttribute('id')

    })
    .catch((err) => console.log(err))
}, [])

   
  return (
    <>
      <div className="overlay">
        <div className="loader">
        </div>
      </div>
      <div className="seller-profile-right shadow-sm"> 

          <div className="seller-profile-basics">
            <img src={ellipsisSvg} style={{
              height: '20px',
              width: '20px',
              position: 'absolute',
              right: '50px',
              cursor: 'pointer'
            }} alt="" />
            <ul>
              <li style={{
                marginBottom: '10px'
              }}>{fname} {lname}</li>
              <li style={{
                fontWeight: '400'
              }}><small>{campus}, {state}</small></li>
              <li style={{
                fontWeight: '400'
              }}><small>{email}&nbsp; &#x2022; &nbsp;not verified</small></li>
              <li style={{
                fontWeight: '400'
              }}><small>{phone}&nbsp; &#x2022; &nbsp;not verified</small></li>
            </ul>
          </div>
          <hr style={{width: '90%', margin: 'auto'}} />

          
      </div>
    </>
  )
} 
