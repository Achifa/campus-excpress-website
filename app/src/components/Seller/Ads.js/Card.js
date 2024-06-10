import React, { useEffect, useState } from 'react'
import '../../../styles/adsCard.css'
import '../../../styles/Seller/listing.css'
import { useNavigate } from 'react-router-dom'
import Thumbnail from '../Thumbnail';
import locationSvg from '../../../assets/location-svgrepo-com-1.svg'

import conditionSvg from '../../../assets/condition-point-svgrepo-com.svg'
import ItemImages from '../../../redux/buyer_store/ItemImages';
import { DeleteItem } from '../../../api/seller/delete';

export default function Card({item,index}) {
    let navigate = useNavigate();
    let [screenWidth, setScreenWidth] = useState(0)
   

    function handleListing() {
        document.querySelector('.listing-overlay').setAttribute('id', 'listing-overlay')
        // navigate(`/product?product_id=${item.product_id}`)
    }
  return (
    
    <>
        <div className="listing-overlay" onClick={
            (e)=>{
                if(e.target === document.querySelector('.listing-overlay')){
                    document.querySelector('.listing-overlay').removeAttribute('id')
                }
            }
        }>
            <div className="listing-cnt">
                {/* <div style={{width: '100%', textAlign: 'left', display: 'flex'}}>
                    <div className="input-cnt" style={{width: '35px', height: '35px', textAlign: 'left'}}>
                        <input type="checkbox" name="" id="" />
                        <span>Mark This Item If Sold</span>
                    </div>
                </div> */}
                <div className="listing-card-top">
                    <div className="listing-thumbnail-cnt">
                        <Thumbnail product_id={item.product_id} />
                    </div>

                    <div className="listing-title-cnt">
                        {item.title}
                        {/* <div style={{width: '100', color: 'orange', position: 'absolute', bottom: '0', fontSize: 'small', textAlign: 'center', marginTop: '20px', background: '#fff4e0', padding: '5px'}}>Please Delete This Item If It's Not Available</div> */}


                    </div>

                </div>

                <div className="listing-card-desc" style={{width: '100%', textAlign: 'left'}}>
                    {
                        item.description.length > 0
                        ?
                        item.description
                        :
                        <div style={{width: '100%', textAlign: 'left'}}>No Description For This Item</div>
                    }
                </div>

                <div className="listing-card-btn">
                    <button onClick={e => navigate(`/seller.editor?product_id=${item.product_id}`)}>
                        <span>Edit</span>
                        <span></span>
                    </button>
                    <button  onClick={async(e) => { 
                            let response = await  DeleteItem(window.localStorage.getItem('CE_seller_id'), item.product_id)
                            if(response){
                                document.querySelector('.listing-overlay').removeAttribute('id')
                                let list = [...document.querySelectorAll('.card')]
                                
                                let card = list.filter(data => data.dataset?.id === item.product_id)
                                card[0].remove()

                            }
                        }
                    }>
                        <span>Delete</span>
                        <span></span>
                    </button>
                </div>


            </div>
        </div>

        <div class="ads-card" style={{
            border: item.state.state === 'published' ? '1px solid green' : '1px solid red',
            justifyContent: 'left'
        }} data-id={
            item.product_id
        }  onClick={handleListing}>
            <div class="top-section">
                <div style={{height: '150px', borderRadius: '10px'}}>
                    <Thumbnail product_id={item.product_id} />
                </div>
            </div>
            <div class="bottom-section">
                <span class="title" style={{fontSize: 'small', }}>
                    {item.title}
                </span>
                <div class="row row1">
                    <div class="item">
                    <span class="big-text">100</span>
                    <span class="regular-text">Impressions</span>
                    </div>
                    <div class="item">
                    <span class="big-text">50</span>
                    <span class="regular-text">Views</span>
                    </div>
                    <div class="item">
                    <span class="big-text">38</span>
                    <span class="regular-text">Calls</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
