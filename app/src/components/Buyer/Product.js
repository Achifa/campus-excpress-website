import { useEffect, useState } from 'react'
import img from '../../assets/download (3).jpeg'
import fbSvg from '../../assets/facebook-1-svgrepo-com (1).svg'
import tweeterSvg from '../../assets/twitter-svgrepo-com (2).svg'
import WhatsAppSvg from '../../assets/whatsapp-whats-app-svgrepo-com.svg'
import { GetItem } from '../../api/buyer'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 
import ItemImgs from './ItemImgs'




const Product = () => {
    let [item, setItem] = useState(
        {
            id: '',
            product_id: '',
            date: '',
            seller_id: '',
            title: '',
            category: '',
            type: '',
            condition: '',
            stock: '',
            locale: '',
            price: '',
            description: '',
            package: ''
        }
    )

    let [activeImg, setActiveImg] = useState(imgSvg)

    let {ItemImages} = useSelector(s => s.itemImages)
    let {ActiveImg} = useSelector(s => s.ActiveImg)

    let location = useLocation()

    useEffect(() => {
        
        GetItem(location.pathname.split('/')[2])
        .then((result) => {
            setItem(result)
        })
        .catch(err => console.log(err))

    }, [])

    useEffect(() => {
        setActiveImg(ItemImages.length > 0 ? ItemImages[ActiveImg].file : imgSvg)
    }, [ItemImages])

    useEffect(() => {
        setActiveImg(ItemImages.length > 0 ? ItemImages[ActiveImg].file : imgSvg)
    }, [ActiveImg])

    let BtnStyles = {
        height: '70px',
        width: '100%',
        borderRadius: '10px',
        outline: 'none',
        border: 'none',
        textAlign: 'center',
        color: '#fff',
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        fontSize: 'large',
        fontWeight: '1000',
        backgroundColor: 'orangered',
        margin: '0'
    }


    return ( 
        <>
            <div className="buyer-product">
                <div className="buyer-product-cnt">
                    <div className="buyer-product-data">
                        <div id="left">
                            <div className="img-cnt">
                                <img src={activeImg} style={{height: '100%', width: '100%', borderRadius: '5px'}} alt="" />
                            </div>
                            <ItemImgs />
                        </div>

                        <div id="right">
 
                            <h3>{item['title']}</h3>

                            <section>
                                <div>
                                    <span><span style={{color: '#626262'}}>Seller :</span> <span style={{color: 'orangered'}}>Jacob N.N</span></span> <span>&#x2022;</span> <span><span style={{color: '#626262'}}>Product Code: </span> <span style={{color: 'orangered', fontWeight: '700'}}>{item.product_id}</span></span>
                                </div>
                                <div>
                                    <span><span style={{color: '#626262'}}>Seller Rating:</span> <span style={{color: 'orangered'}}>Jacob N.N</span></span>
                                </div>

                               
                            </section>
                            <hr />

                            <h2 style={{fontWeight: '700', padding: '20px'}}>
                                &#8358;{new Intl.NumberFormat('en-us').format(item.price)}
                            </h2>

                            <hr />
                            <br />

                            <div style={BtnStyles}>
                                Buy Now
                            </div>

                           

                            <section style={{fontWeight: '700', padding: '10px'}}>
                                
                                <small>Payment Must Be Made Via Campus Express Platform To Avoid Fraud Else You Can <b>Trade With The Seller Outside The Platform At Your Own Risk.</b></small>
                            </section>

                            <section style={{fontWeight: '500', display: 'flex', flexDirection: 'column', padding: '10px', position: 'relative', width: '100%',}}>
                                <div>Share With Your Friends</div>
                                <ul>
                                    <li style={{border: 'none', padding: '0',cursor: 'pointer'}}>
                                        <img src={fbSvg} style={{height: '35px', width: '35px', position: 'relative', margin: '0'}} alt="" />
                                    </li>

                                    <li style={{border: 'none', padding: '0',cursor: 'pointer'}}>
                                        <img src={tweeterSvg} style={{height: '35px', width: '35px', position: 'relative', margin: '0'}} alt="" />
                                    </li>

                                    <li style={{border: 'none', padding: '0',cursor: 'pointer'}}>
                                        <img src={WhatsAppSvg} style={{height: '35px', width: '35px', position: 'relative', margin: '0'}} alt="" />
                                    </li>
                                </ul>

                                
                            </section>


                        </div>
                    </div>              
                    <div className="buyer-product-description">
                        <h4 style={{padding:'10px', height: 'fit-content'}}>Description</h4>
                        <section style={{padding: '10px'}}>
                            {item.description}
                        </section>
                    </div>

                    <div className="buyer-product-related-items">
                        <h4 style={{padding:'10px'}}>Similar Items You May Like</h4>


                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        
                    </div>

                    <div className="buyer-product-seller-details">

                        <section className="buyer-seller-history">
                            <h4>Seller's History  (10)</h4>
                            <br />

                            <ul>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                            </ul>

                        </section>

                        {/*<section className="buyer-seller-products">
                            <h4>Seller's Products  (10)</h4>
                            <ul>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                            </ul>
    </section>*/}

                    </div>

                </div>
            </div>
        </>
     );
}
 
export default Product;