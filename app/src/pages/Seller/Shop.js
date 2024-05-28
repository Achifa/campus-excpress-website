import edit from '../../assets/edit-svgrepo-com.svg'
import deleteSvg from '../../assets/delete-svgrepo-com (1).svg'
import { useEffect, useState } from 'react'
import { DeleteItem, SHOP } from '../../api/seller'
import jsAgo from 'js-ago'
import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 
import Thumbnail from '../../components/Seller/Thumbnail'
import { useNavigate } from 'react-router-dom'
import '../../styles/Seller/overlay.css' 
import Body from '../../components/Seller/Ads.js/Body'
import SellerLayout from '../../layout/Seller'

const Shop = () => {
    let navigate = useNavigate()

    let [Items, setItems] = useState([])
    let [activeImg, setActiveImg] = useState(imgSvg)
    let [loaderText, setLoaderText] = useState('Loading...')


    useEffect(() => {

        let overlay = document.querySelector('.overlay')
        //overlay.setAttribute('id', 'overlay');
        
        SHOP(window.localStorage.getItem("CE_seller_id"))
        .then((result) => { 
            setItems(result)
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

        
    }, [])

    function DeleteProduct(e,product_id) {
        let overlay = document.querySelector('.overlay')
        //overlay.setAttribute('id', 'overlay');
        DeleteItem(window.localStorage.getItem('CE_buyer_id'),product_id)
        .then((result) => {
            console.log(result)
            // e.target.disabled = false;
            overlay.removeAttribute('id')
            navigate('/seller/shop')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return ( 
        <>
            <div className="overlay">
                <div className="loader">
                </div>
            </div>

            <div className="seller-main">
                <SellerLayout>

                    <div className="seller-libs">
                    {

                        <Body />
                    }
                    </div> 
                </SellerLayout>

            </div>
        </>
     );
} 


 
export default Shop;