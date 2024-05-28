import React from 'react'

export default function Reviews() {
  return (
    <>
        <div className="seller-profile-reviews">
            <section>
                {/* <h3>Reviews</h3> */}
            </section>
            <section className='seller-review-box'>
                {
                    [1,2,3,4,5,6,7,8].map((item,index) => 
                    
                        <div className="seller-review-cnt">
                        
                        </div>
                    )

                }
            </section>
        </div>
    </>
  )
}
