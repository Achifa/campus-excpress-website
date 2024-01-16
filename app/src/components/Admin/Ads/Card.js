import React, { useEffect, useState } from 'react'
import Thumbnail from '../../Buyer/Thumbnail'
import '../../../styles/Admin/user_card.css'
import { useNavigate } from 'react-router-dom'
import { DeleteItem, verify_item } from '../../../api/admin';
import { openNotice } from '../../Functions/notice';

export default function Card({item,index}) {
    let navigate = useNavigate();
  return (
    <>
        <div className="notice-cnt" style={{margin: 'auto'}}>
            <span style={{margin: "0 15px 0 .5px"}}>Update Was Successful</span>
            <button className="notice-cnt-btn" style={{width: '40px', height: '30px', background: 'red', borderRadius: '2px', fontWeight: '500', fontSize: 'small'}}>
                close
            </button>
        </div>
        <div key={index} style={{padding: '40px 0 0 0'}}>
        <div class="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 mb-10 shadow-md">
                <div class="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                    <Thumbnail product_id={item.product_id} />
                </div>
                <div class="p-6">
                    <h6 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    {
                        item.title
                    }
                    </h6>
                    <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased line-clamp-4 h-20 overflow-hidden">
                        {
                            item.description
                        }
                    </p>
                </div>

                <div className="card__wrapper">
                    <button className="card__btn" onClick={e => {
                        verify_item('publish','Valid',item.product_id)
                        .then(() => {
                            openNotice()
                        })
                        .catch((err) => console.log(err))
                    }}>Suspend</button>
                    <button onClick={e => {
                        DeleteItem(item.product_id)
                        .then(() => {
                            e.target.parentElement.parentElement.parentElement.remove()
                        })
                        .catch((err) => console.log(err))
                    }} className="card__btn card__btn-solid">Delete</button>
                </div>

                <br />

                <div class="p-6 pt-0">
                    <button onClick={e => navigate(`/admin/users?seller_id=${item.seller_id}`)} data-ripple-light="true" type="button" class="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                    view seller
                    </button>
                </div>
            </div>
        </div>

    </>
  )
}
