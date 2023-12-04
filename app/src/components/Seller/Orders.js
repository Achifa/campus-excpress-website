import img from '../../assets/download (3).jpeg'
import locationSvg from '../../assets/location-svgrepo-com-1.svg'
import deleteSvg from '../../assets/delete-svgrepo-com (1).svg'
import { useEffect, useState } from 'react'
import { GetSellerOrder } from '../../api/seller'
import '../../styles/Seller/overlay.css' 


const Orders = () => {

    let [orderList, setOrderList] = useState([])
    let [loaderText, setLoaderText] = useState('Loading...')

    useEffect(() => {
        let overlay = document.querySelector('.overlay')
        overlay.setAttribute('id', 'overlay');
        GetSellerOrder()
        .then((result) => {
            setOrderList(result)
            overlay.removeAttribute('id')
            result.length < 1 
            ?
            setLoaderText('No item for sale, click here to start selling')
            :
            setLoaderText('')
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    return ( 
        <>
            <div className="overlay">
                <div className="loader">
                </div>
            </div>
            <div className="seller-order-cnt">
                {/* <div className="seller-order-card shadow-sm">
                    <img src={img} alt="" />
                    
                    <div className="seller-order-body">
                        <img src={deleteSvg}alt="" />

                        <div className="seller-order-title">
                            <p>THICK (Men's Gold Cuban Link Chain)</p>
                        </div>
                        <div className="seller-order-id">
                            <p style={{fontWeight: 'bold'}}>Order code: #00013fg5A900</p>
                        </div>

                        <div className="seller-order-status">
                            Failed Order
                        </div>


                        <div className="seller-order-date">
                            2 days ago
                        </div>

                    </div>
                
                </div> */}

                <>
                    <br />
                    <small style={{color: 'orangered'}}>{loaderText}</small>
                </>
            </div>
        </>
     );
}
 
export default Orders;