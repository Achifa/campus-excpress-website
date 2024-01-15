import { useEffect, useState } from "react";
import { GetSellerOrder } from '../../api/seller'

const Order = () => {
    let [orderList, setOrderList] = useState([])
    let [loaderText, setLoaderText] = useState('Loading...')

    useEffect(() => {
        let overlay = document.querySelector('.overlay')
        overlay.setAttribute('id', 'overlay');
        GetSellerOrder()
        .then(({data}) => {
            console.log(data)
            overlay.removeAttribute('id')
            data.length < 1 
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

            <div className="seller-main">
                <div className="seller-order-cnt">
                    

                    <>
                        <br />
                        <small style={{color: 'orangered'}}>{loaderText}</small>
                    </>
                </div>
            </div>
        </>
     );
}
 
export default Order;