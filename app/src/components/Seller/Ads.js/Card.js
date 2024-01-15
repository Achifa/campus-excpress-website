import React, { useEffect, useState } from 'react'
import '../../../styles/Admin/user_card.css'
import { useNavigate } from 'react-router-dom'
import Thumbnail from '../Thumbnail';

export default function Card({item,index}) {
    let navigate = useNavigate();
  return (
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
                <button className="card__btn">
                    <div>0</div>
                    <div>Impression</div>
                </button>
                <button className="card__btn card__btn-solid">
                    <div>0</div>
                    <div>Views</div>
                </button>
            </div>

            <br />

            <div class="p-6 pt-0">
                <button onClick={e => navigate(`/admin/users?seller_id=${item.seller_id}`)} data-ripple-light="true" type="button" class="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                view
                </button>
            </div>
        </div>
    </div>
  )
}
