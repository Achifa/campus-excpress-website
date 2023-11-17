import img from '../../assets/download (3).jpeg'
import deleteSvg from '../../assets/delete-svgrepo-com (1).svg'
import { useEffect, useState } from 'react'
import jsAgo from 'js-ago'
import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 
import cartSvg from '../../assets/cart-shopping-fast-svgrepo-com.svg'
import { SHOP } from '../../api/seller';

const SavedItem = () => {   
    let [Items, setItems] = useState([])
    let [activeImg, setActiveImg] = useState(imgSvg)


    useEffect(() => {
        
        SHOP("CE-d7571f")
        .then((result) => { 
            setItems(result)
        })
        .catch((err) => {
            console.log(err)
        })

        
    }, [])
    return ( 
        <>
            <div className="buyer-savedItem">
               {
                Items.map((item, index) => {
                    return(
                        <div key={index} className="buyer-savedItem-card shadow-sm">
                            <img src={activeImg} alt="" />
                            
                            <div className="buyer-savedItem-remove-btn">
                                <span>Viewed 2 days ago</span>
                            </div>

                            <div className="buyer-savedItem-body">
                                <img src={deleteSvg} alt="" />

                                
                                <div className='buyer-item-title'>
                                    <p>{item.title}</p>
                                </div>

                                <div className='buyer-item-seller'>
                                    <span>Seller: Jason.N.N</span>
                                </div>


                                <div className="buyer-item-price">
                                    <span style={{fontWeight: 'bold'}}>&#8358;{new Intl.NumberFormat('en-us').format(item.price)} </span>
                                </div>

                                

                                <div className="buyer-items-btn">
                                    <button>
                                        <span>
                                            <img src={cartSvg} style={{height: '25px', width: '25px', position: 'relative', borderRadius: '2.5px',marginRight: '5px'}} alt="" />
                                        </span>
                                        <span style={{marginTop: '8px', fontSize: 'small'}}>
                                            Add To Cart
                                        </span>
                                    </button>
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


 
export default SavedItem;