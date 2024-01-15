import React, { useEffect, useState } from 'react'
import Card from './Card'
import { GetUsers } from '../../../api/admin'

export default function Body() {
   
  return (
    <div className='admin-main'>
      {
        [1,2,3,4,5,6].map((item) => 
        
          <Card />
        )
      }
    </div>
  )
}
