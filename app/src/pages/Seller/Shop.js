import edit from '../../assets/edit-svgrepo-com.svg'
import deleteSvg from '../../assets/delete-svgrepo-com (1).svg'
import { useEffect, useState } from 'react'
import { DeleteItem, SHOP } from '../../api/seller'
import jsAgo from 'js-ago'
import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 
import Thumbnail from '../../components/Seller/Thumbnail'
import { useNavigate } from 'react-router-dom'
import '../../styles/Seller/overlay.css' 

const Shop = () => {
    let navigate = useNavigate()

    let [Items, setItems] = useState([])
    let [activeImg, setActiveImg] = useState(imgSvg)
    let [loaderText, setLoaderText] = useState('Loading...')


    useEffect(() => {

        let overlay = document.querySelector('.overlay')
        overlay.setAttribute('id', 'overlay');
        
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
        overlay.setAttribute('id', 'overlay');
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
            <div className="seller-libs">
               {
                Items.length > 0
                ?
                Items.map((item, index) => {
                    return(
                        <div key={index} className="seller-libs-card shadow-sm">
                            <Thumbnail product_id={item.product_id} seller_id={item.seller_id} />

                            <div className="seller-libs-body">

                                <img style={{right: '50px', height: '50px', width: '50px'}} onClick={e => navigate(`/seller/editor?product_id=${item.product_id}`)} src={edit} alt="" /> 
                                <img onClick={e => DeleteProduct(e,item.product_id)} src={deleteSvg} alt="" /> 
                               
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
                :
                <>
                    <br />
                    <small onClick={e => navigate('/seller/editor') } style={{color: 'orangered', cursor: 'pointer'}}>{loaderText}</small>
                </>
               }
            </div>
        </>
     );
}


 
export default Shop;