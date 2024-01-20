import cartSvg from '../../../assets/cart-shopping-fast-svgrepo-com.svg'
import { useEffect, useState } from 'react'
import img from '../../../assets/download (3).jpeg'
import fbSvg from '../../../assets/facebook-1-svgrepo-com (1).svg'
import tweeterSvg from '../../../assets/twitter-svgrepo-com (2).svg'
import WhatsAppSvg from '../../../assets/whatsapp-whats-app-svgrepo-com.svg'
import { AddItemToCart, DeleteItemFromCart, GetItem, SaveItem, UnSaveItem } from '../../../api/buyer'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import saveSvg from '../../../assets/save-svgrepo-com1.svg'
import imgSvg from '../../../assets/image-svgrepo-com (4).svg'; 
import ItemImgs from './ItemImgs'
import { setCartTo } from '../../../redux/buyer/Cart'
import { setSaveTo } from '../../../redux/buyer/Save'
import { DeleteItem } from '../../../api/seller'
import SimilarItems from './SimilarItems'
import Description from './Description'




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

    let [stock, set_stock] = useState(1)

    let [activeImg, setActiveImg] = useState(imgSvg)

    let {ItemImages} = useSelector(s => s.itemImages)
    let {ActiveImg} = useSelector(s => s.ActiveImg)

    let [role, setRole] = useState(0)

    let location = useLocation()

    useEffect(() => {
        if(location.search !== ''){
            setRole(1)
        }else{
            setRole(0)
        }
    }, [location])

    useEffect(() => {
        let overlay = document.querySelector('.overlay')
        overlay.setAttribute('id', 'overlay');
        
        GetItem([location.pathname.split('/')[2]])
        .then((result) => {
            setItem(result[0])
            set_stock(result[0].others ? JSON.parse(result[0].others).stock : 1)
            overlay.removeAttribute('id')
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
        height: '50px',
        width: '100%',
        borderRadius: '5px',
        outline: 'none',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'center',
        color: '#fff',
        display: role === 0 ? 'flex' : 'none', 
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        fontSize: 'medium',
        fontWeight: '400',
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

    function get_stock(params) {
        
    }

    let [immediate_purchase, set_immediate_purchase] = useState(1)

    return ( 
        <>
          
            <div className="overlay">
                <div className="loader">
                </div>
            </div>
            <div className="buy_now_overlay" onClick={e => {
                if(e.target === document.querySelector('.buy_now_overlay')){document.querySelector('.buy_now_overlay').removeAttribute('id')}
            }}>
                <div className="buy_now_cnt">
                    <p style={{color: 'orangered', textDecoration: 'underline'}}><b> {stock} Units</b></p>


                    <p style={{textAlign: 'left', justifyContent: 'left'}}>There Are Only {stock} Availble {item.title}</p>

                    <div className="btn-cnt"> 
                        <button onClick={e => {e.preventDefault(); if(immediate_purchase > 1){set_immediate_purchase(immediate_purchase - 1)}}}>-</button>
                        <div  style={{height: '40px', width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{immediate_purchase}</div>
                        <button onClick={e => {e.preventDefault(); if(immediate_purchase <  stock){set_immediate_purchase(immediate_purchase + 1)}}}>+</button>
                    </div>
                    <br />

                    <p style={{textAlign: 'left', justifyContent: 'left'}}>You Are Buying {immediate_purchase} Unit Of {item.title}</p>

                    <br />
                    <button style={{fontSize: 'small'}} onClick={
                        e => role === 0 ? navigate(`/checkout/${btoa(item.product_id)}/${btoa(item.price * immediate_purchase)}/immediate_purchase`) : navigate(`/seller/editor?product_id=${item.product_id}`)
                    }>Checkout SubTotal ({item.price * immediate_purchase})</button>
                </div>
            </div>
            <div className="buyer-product">
                <div className="buyer-product-cnt" style={{display: 'flex', flexDirection: 'column'}}>
                    <div className="buyer-product-data">
                        <div id="left">
                            <div className="img-cnt" style={{backgroundImage: `url(${activeImg})`, borderRadius: '5px', backgroundRepeat: 'no-repeat', backgroundSize: '200px 200px', backgroundPosition: 'center'}}>
                                {/* <img src={activeImg} style={{height: '100%', width: '100%', borderRadius: '5px'}} alt="" /> */}
                            </div>
                            <ItemImgs />
                        </div>

                        <div id="right">
 
                            <p style={{fontWeight: '400', padding: '0px', fontSize: 'x-large'}}>{item['title']}</p>

                            <section style={{display: 'flex', justifyContent: 'center'}}>
                                <div style={{fontSize: 'x-small'}}>
                                    <span ><span style={{color: '#626262', fontSize: 'x-small'}}>Shop ID :</span> <span style={{color: 'orangered', fontSize: 'x-small'}}>CE_4590-ddf</span></span> 
                                </div>
                                &nbsp;
                                &nbsp;
                                <div style={{fontSize: 'x-small'}}>
                                    <span><span style={{color: '#626262', fontSize: 'x-small'}}>Product Code: </span> <span style={{color: 'orangered', fontWeight: '700', fontSize: 'x-small'}}>{item.product_id}</span></span>
                                </div>
                                &nbsp;
                                &nbsp;
                                <div style={{fontSize: 'x-small'}}>
                                    <span><span style={{color: '#626262', fontSize: 'x-small'}}>Shop Rating:</span> <span style={{color: 'orangered', fontSize: 'x-small'}}>Jacob N.N</span></span>
                                </div>

                                
                            </section>

                            <hr style={{margin: '15px'}} />

                            {/* <br /> */}

                            <div style={{background: '#fff4e0', padding: '10px', color: 'orangered', fontWeight: '500', borderRadius: '5px', height: 'fit-content'}}>
                                <p style={{fontWeight: '400', padding: '0px', fontSize: 'xx-large'}}>
                                    <small>&#8358;</small>{new Intl.NumberFormat('en-us').format(item.price)}
                                </p>
                                <p style={{fontWeight: '500', padding: '0px'}}>{stock} Units Available</p>

                                <p>+ shipping from ₦0 to AWKA TOWN</p> 
                            </div>

                            {/* <hr /> */}
                            <br />

                            <div style={BtnStyles} onClick={e => {
                                document.querySelector('.buy_now_overlay').setAttribute('id', 'buy_now_overlay')
                            }}>
                                Buy Now
                            </div>


                            <div style={{
                                height: '60px',
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
                                marginTop: '40px'
                            }}>
                                <button onClick={e => role !== 0 ? DeleteProduct(e,item.product_id) : AddToCart(e,item.product_id)} style={{height: '50px', width: '45%', borderRadius: '5px', display: 'flex', alignItems: 'center', cursor: 'pointer',fontSize: 'x-small', justifyContent: 'center', background: 'orangered', color: '#fff'}}>
                                    {
                                        role === 0
                                        ?
                                        <>

                                            <span>
                                                <img src={cartSvg} style={{height: '25px', width: '25px', position: 'relative', borderRadius: '2.5px',marginRight: '5px'}} alt="" />
                                            </span>
                                            <span>{[...Cart].filter(cart => cart.product_id === item.product_id)[0] ? 'Remove From Cart' : 'Add To Cart'}</span>
                                        </>
                                        :
                                        'Delete'
                                    }
                                </button>
                                <button onClick={e => role !== 0 ? navigate(`/seller/editor?product_id=${item.product_id}`) : Saver(e,item.product_id)} style={{height: '50px', width: '45%', borderRadius: '5px', display: 'flex', alignItems: 'center', cursor: 'pointer', justifyContent: 'center', fontSize: 'x-small', background: 'orangered', color: '#fff'}}>
                                    {
                                        role === 0 
                                        ?
                                        <>
                                            <span>
                                                <img src={saveSvg} style={{height: '35px', width: '35px', position: 'relative',  margin: 'auto'}} alt="" />
                                            </span>
                                            <span style={{marginTop: '0'}}>
                                                {[...Save].filter(savedItem => savedItem.product_id === item.product_id)[0] ? 'Unsave' : 'Save'}
                                            </span>
                                        </>

                                        :
                                        'Edit'
                                    }
                                </button>
                            </div>


                           

                            {/* <section style={{fontWeight: '700', padding: '10px'}}>
                                
                                <small>Payment Must Be Made Via Campus Express Platform To Avoid Fraud Else You Can <b>Trade With The Seller Outside The Platform At Your Own Risk.</b></small>
                            </section> */}

                            {/* <section style={{fontWeight: '500', display: role === 0 ? 'flex' : 'none', flexDirection: 'column', padding: '10px', position: 'relative', width: '100%',}}>
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

                                
                            </section> */}


                        </div>
                    </div>      
                    <SimilarItems />

                    <Description item={item} />


                </div>
            </div>
        </>
     );
}
 
export default Product;