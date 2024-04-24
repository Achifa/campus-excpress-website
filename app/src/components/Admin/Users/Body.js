import React, { useEffect, useState } from 'react'
import Card from './Card'
import { GetUsers } from '../../../api/admin/get'

export default function Body() {
    let [sellers,set_sellers] = useState([])


    useEffect(() => {
        async function getData() {
          let result = await GetUsers()
          console.log(result)
          set_sellers(result.sellers)
        }
        getData()
    }, [])
  return (
    <div className='admin-main'>
      {
        sellers.map((item, index) => <Card index={index} item={item} />)
      }
    </div>
  )
}
