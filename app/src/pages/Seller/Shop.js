import img from '../../assets/download (3).jpeg'
import deleteSvg from '../../assets/delete-svgrepo-com (1).svg'
import { useEffect, useState } from 'react'
import { SHOP } from '../../api/seller'
import jsAgo from 'js-ago'
import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 

const Shop = () => {
    let [Items, setItems] = useState([])
    let [activeImg, setActiveImg] = useState(imgSvg)


    useEffect(() => {
        
        SHOP(window.localStorage.getItem("CE_seller_id"))
        .then((result) => { 
            setItems(result)
        })
        .catch((err) => {
            console.log(err)
        })

        
    }, [])
    return ( 
        <>
            <div className="seller-libs">
               {
                Items.map((item, index) => {
                    return(
                        <div key={index} className="seller-libs-card shadow-sm">
                            <img src={activeImg} alt="" />

                            <div className="seller-libs-body">

                                <img src={deleteSvg} alt="" />
                                <div className='seller-item-title'>
                                    <p>{item.title}</p>
                                </div>


                                <div className="seller-item-price">
                                    <p style={{fontWeight: 'bold'}}>&#8358;{new Intl.NumberFormat('en-us').format(item.price)} </p>
                                </div>

                                <div className="seller-item-spec">
                                    <ul>
                                        <li>
                                            <div>0</div>
                                            <div>Impession</div>
                                        </li>
                                        <li>
                                            <div>0</div>
                                            <div>Views</div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="seller-items-date">
                                    {jsAgo(new Date(item.date))}
                                </div>
                            </div>
                        </div>


                    )
                })
               }
            </div>
        </>
     );
}


 
export default Shop;