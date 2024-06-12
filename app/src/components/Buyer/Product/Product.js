import cartSvg from '../../../assets/cart-shopping-fast-svgrepo-com.svg'
import { 
    useEffect, 
    useState 
} from 'react'

import { 
    Link, 
    useLocation, 
    useNavigate 
} from 'react-router-dom'
import { 
    useDispatch, 
    useSelector 
} from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 

import imgSvg from '../../../assets/image-svgrepo-com (4).svg'; 
import ItemImgs from './ItemImgs'

import { 
   
    UploadChat 
} from '../../../api/buyer/post'

import { 
    Helmet 
} from 'react-helmet-async'
import Contact from './Contact'
import Share from './Share'
import { useFlutterwave } from 'flutterwave-react-v3'



const Product = ({item,phone}) => {

    let [screenWidth, setScreenWidth] = useState(0)

    useEffect(() => { 
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

    function SendMssg() {
        let overlay = document.querySelector('.overlay')
        overlay.setAttribute('id', 'overlay');
        if(screenWidth > 760){
            try {
                let result = UploadChat(window.localStorage.getItem('CE_buyer_id'), item.seller_id)
                overlay.removeAttribute('id')
                navigate(`/buyer.message/${item.seller_id}`, {seller_id: item.seller_id})
    
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                let result = UploadChat(window.localStorage.getItem('CE_buyer_id'), item.seller_id)
                overlay.removeAttribute('id')
                navigate(`/buyer.room/${item.seller_id}?room=''`, {seller_id: item.seller_id})
    
            } catch (error) {
                console.log(error)
            }
        }
      
    }

   

    let [activeImg, setActiveImg] = useState(imgSvg)

    let {ItemImages} = useSelector(s => s.itemImages)
    let {ActiveImg} = useSelector(s => s.ActiveImg)

    let [role, setRole] = useState(0)

    let location = useLocation()
    const searchParams = new URLSearchParams(window.location.search);

    let [metaImg, setMetaImg] = useState('')
    useEffect(() => {
        setMetaImg(ItemImages[0]?.file)
    }, [])
    let {buyerData} = useSelector(s => s.buyerData)
   
    // let {Save} = useSelector(s => s.Save)

    let navigate = useNavigate();

    useEffect(() => {
      console.log('buyerData: ', buyerData)
    }, [buyerData])

    useEffect(() => {
        setActiveImg(ItemImages?.length > 0 ? ItemImages[ActiveImg].file : imgSvg)
    }, [ItemImages])

    useEffect(() => {
        setActiveImg(ItemImages?.length > 0 ? ItemImages[ActiveImg].file : imgSvg)
    }, [ActiveImg])

    useEffect(() => {
        setActiveImg('')
        // setActiveImg('')
    }, [searchParams.get('product_id')])

   

    

    let [savedData, setSavedData] = useState([])

    // useEffect(() => {
    //     setSavedData(Save)
    // }, [Save])

    let dispatch = useDispatch()

    // function AddToCart(e,product_id) {
    //     e.target.disabled = true;

    //     let cartList = [...Cart];
    //     let duplicateSearch = cartList.filter(item => item.product_id === product_id)
    //     if(cartList.length > 0){
    //         if(duplicateSearch.length > 0){
    //             let newList = cartList.filter(item => item !== duplicateSearch[0])
    //             //dispatch(setCartTo(newList))
    //             DeleteItemFromCart(product_id, window.localStorage.getItem('CE_buyer_id'))
    //             .then((result) => {
    //                 dispatch(setCartTo(result))
    //                 e.target.disabled = false;
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             })
    //         }else{
    //             dispatch(setCartTo([...Cart, product_id]))
    //             AddItemToCart(product_id, window.localStorage.getItem('CE_buyer_id'))
    //             .then((result) => {
    //                 dispatch(setCartTo(result))
    //                 e.target.disabled = false;
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             })
    //         }
    //     }else{
    //         AddItemToCart(product_id, window.localStorage.getItem('CE_buyer_id'))
    //         .then((result) => {
    //             dispatch(setCartTo(result))
    //             e.target.disabled = false;
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    //     }
    // }


    // async function Saver(e,product_id) { 
    //     let overlay = document.querySelector('.overlay')
    //     overlay.setAttribute('id', 'overlay');
    //     setBtnMode(btnMode) 
    //     let saveList = savedData;
       
    //     let duplicateSearch = saveList.filter(item => item.product_id === product_id)
    //     if(saveList.length > 0){
    //         if(duplicateSearch.length > 0){

    //             let result = await UnSaveItem(product_id, window.localStorage.getItem('CE_buyer_id'));
    //             dispatch(setSaveTo(result));
    //             setBtnMode(!btnMode) 
    //             overlay.removeAttribute('id')

    //         }else{
                
    //             let result = await SaveItem(product_id, window.localStorage.getItem('CE_buyer_id'))
    //             dispatch(setSaveTo(result))
    //             setBtnMode(!btnMode) 
    //             overlay.removeAttribute('id')

    //         }
    //     }else{

    //         let result = await SaveItem(product_id, window.localStorage.getItem('CE_buyer_id'))
    //         dispatch(setSaveTo(result))
    //         setBtnMode(!btnMode) 
    //         overlay.removeAttribute('id')

    //     }
    // }

    const config = {
        public_key: 'FLWPUBK-502f1f73c8abf430f161a528241c198a-X',
        tx_ref: Date.now(),
        amount: parseInt(item?.price) + 45,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: buyerData?.email,
            phone_number: buyerData?.phone,
            name: buyerData?.name,
            ce_id: item?.seller_id
        },
        customizations: {
        title: 'Campus Express',
        description: 'Campus Purchase',
        logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

    const handleFlutterPayment = useFlutterwave(config);
   

    let [immediate_purchase, set_immediate_purchase] = useState(1)

    function handleOrder() {
        let buyer = window.localStorage.getItem('CE_buyer_id');
        if(buyer === null || buyer === '' || buyer === 'null'){
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
        }else{
            handleFlutterPayment({
                callback: (response) => {
                console.log(response);
                // closePaymentModal() // this will close the modal programmatically
                },
                onClose: () => {}
            });
        }
    }

    return ( 
        <>

            <Helmet>
                <meta name="title" content={`${item?.title}`} />
                <meta name="description" content={`${item?.description}`} />
                {/* <meta name="google-site-verification" content="+nxGUDJ4QpAZ5l9Bsjdi102tLVC21AIh5d1Nl23908vVuFHs34=" /> */}
                <meta name="robots" content="index,follow" />
                <meta name="googlebot" content="index,follow" />
                
                <meta name="google" content="sitelinkssearchbox" />

                {/* FaceBook Tags */}
                <meta property="og:site_name" content={`${item?.title}`} />
                <meta property="og:title" content={`${item?.title}`} />
                <meta property="og:description" content={`${item?.description}`} />
                <meta property="og:image" itemprop="image" content={`https://ce-app-server.vercel.app/share-image?product_id=${item?.product_id}`} />
                <meta property="og:type" content="website" />
                <meta property="og:url"  content={`https://www.campusexpressng.com/product?product_id=${item?.product_id}`} />
                {/* <meta property="og:updated_time" content="1440432930" /> */}

                {/* Twitter */}
                <meta name="twitter:title" content={`${item?.title}`} />
                <meta name="twitter:description" content={`${item?.description}`} />
                <meta name="twitter:image" content={`https://ce-app-server.vercel.app/share-image?product_id=${item?.product_id}`} />
                <meta name="twitter:card" content="summary_large_image" />

            </Helmet>
          
            <div className="overlay">
                <div className="loader">
                </div>
            </div>
            <div className="buy_now_overlay" onClick={e => {
                if(e.target === document.querySelector('.buy_now_overlay')){document.querySelector('.buy_now_overlay').removeAttribute('id')}
            }}>
                <div className="buy_now_cnt">
                    {/* <p style={{color: 'orangered', textDecoration: 'underline'}}><b> {stock} Units</b></p>


                    <p style={{textAlign: 'left', justifyContent: 'left'}}>There Are Only {stock} Availble {item?.title}</p> */}

                    <div className="btn-cnt"> 
                        <button onClick={e => {e.preventDefault(); if(immediate_purchase > 1){set_immediate_purchase(immediate_purchase - 1)}}}>-</button>
                        <div  style={{height: '40px', width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{immediate_purchase}</div>
                        {/* <button onClick={e => {e.preventDefault(); if(immediate_purchase <  stock){set_immediate_purchase(immediate_purchase + 1)}}}>+</button> */}
                    </div>
                    <br />

                    <p style={{textAlign: 'left', justifyContent: 'left'}}>You Are Buying {immediate_purchase} Unit Of {item?.title}</p>

                    <br />
                    <button style={{fontSize: 'small'}} onClick={
                        e => role === 0 ? navigate(`/checkout/${btoa(item.product_id)}/${btoa(item?.price * immediate_purchase)}/immediate_purchase-${immediate_purchase}`) : navigate(`/seller/editor?product_id=${item?.product_id}`)
                    }>Checkout SubTotal ({item?.price * immediate_purchase})</button>
                </div>
            </div>

            <div className="buyer-product-data">
                <div id="left">
                    {
                        activeImg !== ''
                        ?
                            <div className="img-cnt" style={{backgroundImage: `url(${activeImg})`, borderRadius: '5px', backgroundRepeat: 'no-repeat', backgroundSize: '200px 200px', backgroundPosition: 'center'}}>
                            </div>
                        :
                            <img src={imgSvg} style={{height: '100%', width: '100%', borderRadius: '5px'}} alt="" />


                    }
                    {
                        item 
                        ?
                        <ItemImgs product_id={searchParams.get('product_id')} />
                        :
                        ''
                    }
                </div>

                <div id="right" style={{position: 'relative'}}>

                    <p style={{fontWeight: '400', fontFamily: 'times-new-roman', padding: '0px', fontSize: 'x-large'}}>{item?.title}</p>

                    <hr style={{margin: '15px'}} />

                    {/* <br /> */}

                    {   
                        item ?

                        <div style={{background: '#fff4e0', padding: '10px',    color: 'orangered', fontWeight: '500', position: 'relative', borderRadius: '5px', height: 'fit-content'}}>
                            
                            <p style={{fontWeight: '400', padding: '0px', fontSize: 'xx-large'}}>
                                <small>&#8358;</small>{new Intl.NumberFormat('en-us').format(item?.price)}
                            </p>

                            <br />

                            <h3 style={{fontWeight: '500', fontSize: '3vh', textDecoration: 'underline', padding: '0px', textTransform: 'capitalize'}}>{item?.status}</h3>

                            <br />
                            <section style={{display: 'flex', justifyContent: 'flex-start'}}>
                                {/* <div style={{fontSize: 'small'}}>
                                    <span ><span style={{color: '#626262', fontSize: 'small'}}>Shop Id :</span> <span style={{color: 'orangered', fontSize: 'small'}}>CE_4590-ddf</span></span> 
                                </div>
                                &nbsp;
                                &nbsp; */}
                                <div style={{fontSize: 'small'}}>
                                    <span><span style={{color: '#626262', fontSize: 'small'}}>Product Id: </span> <span style={{color: 'orangered', fontWeight: '700', fontSize: 'small'}}>{item?.product_id}</span></span>
                                </div>
                                &nbsp;
                                &nbsp;
                                {/* <div style={{fontSize: 'small'}}>
                                    <span><span style={{color: '#626262', fontSize: 'small'}}>Shop Rating:</span> <span style={{color: 'orangered', fontSize: 'x-small'}}>Jacob N.N</span></span>
                                </div> */}
                            </section>

                            {/* <div style={{position: 'absolute', top: '-30px', right: '20px'}}>
                                <SaveButton data={item} Saver={Saver} Save={savedData} />
                            </div> */}

                            

                            {/* <p>+ shipping from ₦0 to AWKA TOWN</p>  */}
                        </div>
                        :
                        <>
                            <Skeleton height={60}baseColor="#fff4e0" highlightColor="#FF4500" count={1} />
                            <Skeleton height={15}baseColor="#fff4e0" highlightColor="#FF4500" count={3} />

                        </>
                    }

                    {/* <hr /> */}
                    {/* <br /> */}

                    {/* <div style={BtnStyles} onClick={e => {
                        document.querySelector('.buy_now_overlay').setAttribute('id', 'buy_now_overlay')
                    }}>
                        Buy Now
                    </div> */}

                    {/* <div style={BtnStyles} onClick={e => {
                        document.querySelector('.buy_now_overlay').setAttribute('id', 'buy_now_overlay')
                    }}>
                        <>
                            <span>
                                <img src={saveSvg} style={{height: '35px', width: '35px', position: 'relative',  margin: 'auto'}} alt="" />
                            </span>
                            <span style={{marginTop: '0'}}>
                                {[...Save].filter(savedItem => savedItem?.product_id === item?.product_id)[0] ? 'Unsave' : 'Save'}
                            </span>
                        </>
                    </div> */}

                    <br />
                    {
                        screenWidth > 481
                        ?
                        <>
                            <Contact phone={phone} role={role} SendMssg={SendMssg}  />
                            <br />
                            <button onClick={handleOrder}>Order Now</button>
                        </>
                        :
                        ''
                    }
                    <Share activeImg={activeImg} item={item} role={role} metaImg={metaImg} />


                    

                </div>
            </div>

        </>
     );
}
 
export default Product;