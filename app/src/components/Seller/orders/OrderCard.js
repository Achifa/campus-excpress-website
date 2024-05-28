import img from '../../../assets/download (3).jpeg'
import deleteSvg from '../../../assets/delete-svgrepo-com (1).svg'
import '../../../styles/Seller/overlay.css'  
import { GET_PRODUCT_THUMBNAIL, GetSellerOrder } from '../../../api/seller'
import { useEffect, useState } from 'react'
import '../../../styles/Admin/order_card.css'
import js_ago from 'js-ago'
import { Link, useNavigate } from 'react-router-dom'
const OrderCard = ({data, index}) => {
    let [img, set_img] = useState('');

    let navigate = useNavigate()
    useEffect(() => {
        GET_PRODUCT_THUMBNAIL(data.item.product_id)
        .then((result) => {
            set_img(result.file)
        })
        .catch((err) => {
            console.log(err);
        })
    })
    
    return ( 
        <>

            <div className="order__card">
                
                <div className="img" style={{backgroundImage: `url(${img})`, backgroundClip: 'content-box', backgroundSize: 'contain'}}>
                    <div className="save" style={{padding: '5px'}}>
                        <img src={deleteSvg}alt="" />
                    </div>
                </div>

                <div className="text">
                    <p className="h3">{data.item.title}</p>
                    <p className="p"> 5 buyers ordered this item </p>

                    <div className="icon-box" style={{width: 'fit-content', padding: '5px'}}>
                    
                    <Link to={`/seller/order-page/${data.item.product_id}`} target='_blank' className="span" style={{width: 'fit-content', marginLeft: '0'}}>View Order Now
                    </Link></div>
                </div>

                
            </div>  

            {/* <div key={index} className="seller-order-card shadow-sm" target='_blank'>
                <Link to={`/seller/order-page/${data.item.product_id}`} target='_blank'>
                    <img src={img} alt="" />
                    
                    <div className="seller-order-body">
                        <img src={deleteSvg}alt="" />

                        <div className="seller-order-title">
                            <p>{data.item.title}</p>
                        </div>
                        <div className="seller-order-id">
                            <p style={{fontWeight: 'bold'}}>Order code: {data.order[0].order_id}</p>
                        </div>

                        <div className="seller-order-status">
                            {data.order[0].status}
                        </div>


                        <div className="seller-order-date">
                            {js_ago(new Date(data.order[0].date))}
                        </div>

                    </div>
            
                </Link>
            </div> */}
        </>
     );
}
 
export default OrderCard;