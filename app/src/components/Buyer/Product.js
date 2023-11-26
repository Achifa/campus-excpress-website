import cartSvg from '../../assets/cart-shopping-fast-svgrepo-com.svg'
import { useEffect, useState } from 'react'
import img from '../../assets/download (3).jpeg'
import fbSvg from '../../assets/facebook-1-svgrepo-com (1).svg'
import tweeterSvg from '../../assets/twitter-svgrepo-com (2).svg'
import WhatsAppSvg from '../../assets/whatsapp-whats-app-svgrepo-com.svg'
import { AddItemToCart, DeleteItemFromCart, GetItem, SaveItem, UnSaveItem } from '../../api/buyer'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import saveSvg from '../../assets/save-svgrepo-com1.svg'
import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 
import ItemImgs from './ItemImgs'
import { setCartTo } from '../../redux/buyer/Cart'
import { setSaveTo } from '../../redux/buyer/Save'




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
        
        GetItem([location.pathname.split('/')[2]])
        .then((result) => {
            setItem(result[0])
        })
        .catch(err => console.log(err))

    }, [])

  let {Cart} = useSelector(s => s.Cart)

  let navigate = useNavigate();

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
        cursor: 'pointer',
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

    let dispatch = useDispatch()

 
    function AddToCart(e,product_id) {
        e.target.disabled = true;

        let cartList = [...Cart];
        let duplicateSearch = cartList.filter(item => item.product_id === product_id)
        if(cartList.length > 0){
            if(duplicateSearch.length > 0){
                let newList = cartList.filter(item => item !== duplicateSearch[0])
                //dispatch(setCartTo(newList))
                DeleteItemFromCart(product_id, window.localStorage.getItem('CE_buyer_id'))
                .then((result) => {
                    dispatch(setCartTo(result))
                    e.target.disabled = false;
                })
                .catch((err) => {
                    console.log(err)
                })
            }else{
                dispatch(setCartTo([...Cart, product_id]))
                AddItemToCart(product_id, window.localStorage.getItem('CE_buyer_id'))
                .then((result) => {
                    dispatch(setCartTo(result))
                    e.target.disabled = false;
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }else{
            AddItemToCart(product_id, window.localStorage.getItem('CE_buyer_id'))
            .then((result) => {
                dispatch(setCartTo(result))
                e.target.disabled = false;
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    let {Save} = useSelector(s => s.Save)

    function Saver(e,product_id) {
        e.target.disabled = true;

        let saveList = [...Save];
        let duplicateSearch = saveList.filter(item => item.product_id === product_id)
        if(saveList.length > 0){
            if(duplicateSearch.length > 0){
                // let newList = saveList.filter(item => item !== duplicateSearch[0])
                // dispatch(setSaveTo(newList))
                UnSaveItem(product_id, window.localStorage.getItem('CE_buyer_id'))
                .then((result) => {
                    console.log(result)
                    dispatch(setSaveTo(result))
                    e.target.disabled = false;
                })
                .catch((err) => {
                    console.log(err)
                })
            }else{
                
                SaveItem(product_id, window.localStorage.getItem('CE_buyer_id'))
                .then((result) => {
                    console.log(result)

                    dispatch(setSaveTo(result))
                    e.target.disabled = false;
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }else{
            SaveItem(product_id, window.localStorage.getItem('CE_buyer_id'))
            .then((result) => {
                dispatch(setSaveTo(result))
                e.target.disabled = false;
            })
            .catch((err) => {
                console.log(err)
            })
        }
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

                            <div style={BtnStyles} onClick={e => navigate(`/checkout/${btoa(item.product_id)}/${btoa(item.price)}`)}>
                                Buy Now
                            </div>

                            <br />

                            <div style={{
                                height: '70px',
                                width: '100%',
                                borderRadius: '10px',
                                outline: 'none',
                                border: 'none',
                                textAlign: 'center',
                                color: '#fff',

                                display: 'flex', 
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                position: 'relative',
                                fontSize: 'medium',
                                fontWeight: '500',
                                backgroundColor: '#fff',
                                margin: '0'
                            }}>
                                <button onClick={e => AddToCart(e,item.product_id)} style={{height: '60px', width: '45%', borderRadius: '5px', display: 'flex', alignItems: 'center', cursor: 'pointer', justifyContent: 'center', background: 'orangered', color: '#fff'}}>
                                    <span>
                                        <img src={cartSvg} style={{height: '25px', width: '25px', position: 'relative', borderRadius: '2.5px',marginRight: '5px'}} alt="" />
                                    </span>
                                    <span>{[...Cart].filter(cart => cart.product_id === item.product_id)[0] ? 'Remove From Cart' : 'Add To Cart'}</span>
                                </button>
                                <button onClick={e => Saver(e,item.product_id)} style={{height: '60px', width: '45%', borderRadius: '5px', display: 'flex', alignItems: 'center', cursor: 'pointer', justifyContent: 'center', background: 'orangered', color: '#fff'}}>
                                    <span>
                                        <img src={saveSvg} style={{height: '35px', width: '35px', position: 'relative',  margin: 'auto'}} alt="" />
                                    </span>
                                    <span style={{marginTop: '0'}}>
                                        {[...Save].filter(savedItem => savedItem.product_id === item.product_id)[0] ? 'Unsave' : 'Save'}
                                    </span>
                                </button>
                            </div>


                           

                            {/* <section style={{fontWeight: '700', padding: '10px'}}>
                                
                                <small>Payment Must Be Made Via Campus Express Platform To Avoid Fraud Else You Can <b>Trade With The Seller Outside The Platform At Your Own Risk.</b></small>
                            </section> */}

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