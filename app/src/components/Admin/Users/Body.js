import React, { useEffect, useState } from 'react'
import Card from './Card'
import { GetUsers } from '../../../api/admin'

export default function Body() {
    let [sellers,set_sellers] = useState([])


    useEffect(() => {
        GetUsers()
        .then(({buyers, sellers}) => {
            set_sellers(sellers)
        })
        .catch(err => console.log(err))
    }, [])
  return (
    <div className='admin-main'>
      {
        sellers.map((item, index) => <Card index={index} item={item} />)
      }
    </div>
  )
}
