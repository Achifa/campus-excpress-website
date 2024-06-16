import React from 'react'
import ellipsisSvg from '../../../assets/filter-edit-svgrepo-com.svg'

export default function CoinComp({Coin,userData,shop,updateActiveJsx}) {
  return (
    <>
      <div className="seller-profile-verification">
        <img src={ellipsisSvg} style={{
          height: '20px',
          width: '20px',
          position: 'absolute',
          right: '10px',
          top: '10px',
          transform: 'rotate(90deg)',
          cursor: 'pointer'
        }} alt="" onClick={e => {
        document.querySelector('.edit-overlay').setAttribute('id', 'edit-overlay')
        updateActiveJsx(<Coin email={userData.email} phone={userData.phone} name={`${userData.fname} ${userData.lname}`} seller_id={userData.seller_id}  />)
        
      }} />
        <div><b>Campus Coin</b></div>

        <div>
          {/* <div>ID: Verified</div> */}
          <div>Available Coin: {
            shop?.coin
          }</div>
          {/* <div>Student: False</div> */}
        </div>

      </div>
    </>
  )
}
