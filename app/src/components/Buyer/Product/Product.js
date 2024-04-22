import cartSvg from '../../../assets/cart-shopping-fast-svgrepo-com.svg'
import { 
    useEffect, 
    useState 
} from 'react'
import phn from '../../../assets/phone-rounded-svgrepo-com.svg'
import mssg from '../../../assets/messages-1-svgrepo-com (1).svg'
import deleteSvg from '../../../assets/delete-svgrepo-com (1).svg'
import WhatsAppSvg from '../../../assets/whatsapp-whats-app-svgrepo-com.svg'
import tweeterSvg from '../../../assets/twitter-svgrepo-com (2).svg'
import fbSvg from '../../../assets/facebook-1-svgrepo-com (1).svg'
import { 
    Link, 
    useLocation, 
    useNavigate 
} from 'react-router-dom'
import { 
    useDispatch, 
    useSelector 
} from 'react-redux'
import saveSvg from '../../../assets/favourite-alt-svgrepo-com (1).svg'
import imgSvg from '../../../assets/image-svgrepo-com (4).svg'; 
import ItemImgs from './ItemImgs'
import { 
    setCartTo 
} from '../../../redux/buyer_store/Cart'
import { 
    setSaveTo
} from '../../../redux/buyer_store/Save'
import { 
    DeleteItem, 
    GetSeller 
} from '../../../api/seller'
import SimilarItems from './SimilarItems'
import Description from './Description'
import { 
    SaveItem, 
    UploadChat 
} from '../../../api/buyer/post'
import { 
    UnSaveItem 
} from '../../../api/buyer/delete'
import { 
    GetItem, 
    GetProductThumbnail 
} from '../../../api/buyer/get'
import SaveButton from '../dashboard/SaveButton'
import { 
    Helmet 
} from 'react-helmet'
import Thumbnail from '../Thumbnail'




const Product = ({product_id}) => {

    let [screenWidth, setScreenWidth] = useState(0)

    useEffect(() => { 
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

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
    let [phone, set_phone] = useState(1)
    let [btnMode, setBtnMode] = useState(true)
    let [activeImg, setActiveImg] = useState(imgSvg)

    let {ItemImages} = useSelector(s => s.itemImages)
    let {ActiveImg} = useSelector(s => s.ActiveImg)

    let [role, setRole] = useState(0)

    let location = useLocation()
    const searchParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        if(searchParams.has('seller')){
            setRole(1)
        }else{
            setRole(0)
        }
    }, [location])



    useEffect(() => {
        let overlay = document.querySelector('.overlay')
        overlay.setAttribute('id', 'overlay');
        let product_id = searchParams.get('product_id')
        try {
            async function getData() {
                let result = await GetItem([product_id])
                if(result.length > 0){
                    setItem(result[0])
                }
                // set_stock(result[0].others ? JSON.parse(result[0].others).stock : 1)
                overlay.removeAttribute('id')
            }
            getData()
        } catch (error) {
            console.log(error)
        }

    }, [])
    let {Save} = useSelector(s => s.Save)

    let {Cart} = useSelector(s => s.Cart)

    let navigate = useNavigate();

    useEffect(() => {
        setActiveImg(ItemImages?.length > 0 ? ItemImages[ActiveImg].file : imgSvg)
    }, [ItemImages])

    useEffect(() => {
        setActiveImg(ItemImages?.length > 0 ? ItemImages[ActiveImg].file : imgSvg)
    }, [ActiveImg])

    let BtnStyles = {
        height: '50px',
        width: '100%',
        borderRadius: '5px',
        outline: 'none',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'center',
        padding: '0 20px 0 20px',
        color: '#fff',
        display: role === 0 ? 'flex' : 'none', 
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        fontSize: 'medium',
        fontWeight: '400',
        backgroundColor: 'orangered',
        margin: '20px 0 0 0'
    }

    useEffect(() => {
        let overlay = document.querySelector('.overlay')

        try {
            //overlay.setAttribute('id', 'overlay');
            
            async function getData() {
                let result = await GetSeller(item?.seller_id)
                set_phone(result?.phone)
                // set_stock(result[0].others ? JSON.parse(result[0].others).stock : 1)
                overlay.removeAttribute('id')
            }
            getData()
        } catch (error) {
            console.log(error)
        }

    },[item])

    let [savedData, setSavedData] = useState([])

    useEffect(() => {
        setSavedData(Save)
    }, [Save])

    let dispatch = useDispatch()

    function handleDelete(seller_id, product_id) {
        try {
            //overlay.setAttribute('id', 'overlay');
            
            DeleteItem(seller_id, product_id)
            .then((result) => {
                if(result){
                    navigate('/seller.shop')
                }
            })
            .catch((error) => {
                
                console.log('Error:', error.message); 
            }) 
            
        } catch (error) {
            console.log(error)
        }
    }

 
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


    async function Saver(e,product_id) { 
        let overlay = document.querySelector('.overlay')
        overlay.setAttribute('id', 'overlay');
        setBtnMode(btnMode) 
        let saveList = savedData;
       
        let duplicateSearch = saveList.filter(item => item.product_id === product_id)
        if(saveList.length > 0){
            if(duplicateSearch.length > 0){

                let result = await UnSaveItem(product_id, window.localStorage.getItem('CE_buyer_id'));
                dispatch(setSaveTo(result));
                setBtnMode(!btnMode) 
                overlay.removeAttribute('id')

            }else{
                
                let result = await SaveItem(product_id, window.localStorage.getItem('CE_buyer_id'))
                dispatch(setSaveTo(result))
                setBtnMode(!btnMode) 
                overlay.removeAttribute('id')

            }
        }else{

            let result = await SaveItem(product_id, window.localStorage.getItem('CE_buyer_id'))
            dispatch(setSaveTo(result))
            setBtnMode(!btnMode) 
            overlay.removeAttribute('id')

        }
    }

    function SendMssg(params) {
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
    let [metaImg, setMetaImg] = useState('')
    useEffect(() => {
        setMetaImg(ItemImages[0]?.file)
    }, [])
    


    let [immediate_purchase, set_immediate_purchase] = useState(1)

    return ( 
        <>

            <Helmet>
                <meta name="title" content={`${item.title}`} />
                <meta name="description" content={`${item.description}`} />
                {/* <meta name="google-site-verification" content="+nxGUDJ4QpAZ5l9Bsjdi102tLVC21AIh5d1Nl23908vVuFHs34=" /> */}
                <meta name="robots" content="index,follow" />
                <meta name="googlebot" content="index,follow" />
                
                <meta name="google" content="sitelinkssearchbox" />

                {/* FaceBook Tags */}
                <meta property="og:site_name" content={`${item.title}`} />
                <meta property="og:title" content={`${item.title}`} />
                <meta property="og:description" content={`${item.description}`} />
                <meta property="og:image" itemprop="image" content={metaImg} />
                <meta property="og:type" content="website" />
                <meta property="og:url"  content={`https://www.campusexpressng.com/product?product_id=${item.product_id}`} />
                {/* <meta property="og:updated_time" content="1440432930" /> */}

                {/* Twitter */}
                <meta name="twitter:title" content={`${item.title}`} />
                <meta name="twitter:description" content={`${item.description}`} />
                <meta name="twitter:image" content={metaImg} />
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
                    <p style={{color: 'orangered', textDecoration: 'underline'}}><b> {stock} Units</b></p>


                    <p style={{textAlign: 'left', justifyContent: 'left'}}>There Are Only {stock} Availble {item?.title}</p>

                    <div className="btn-cnt"> 
                        <button onClick={e => {e.preventDefault(); if(immediate_purchase > 1){set_immediate_purchase(immediate_purchase - 1)}}}>-</button>
                        <div  style={{height: '40px', width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{immediate_purchase}</div>
                        <button onClick={e => {e.preventDefault(); if(immediate_purchase <  stock){set_immediate_purchase(immediate_purchase + 1)}}}>+</button>
                    </div>
                    <br />

                    <p style={{textAlign: 'left', justifyContent: 'left'}}>You Are Buying {immediate_purchase} Unit Of {item?.title}</p>

                    <br />
                    <button style={{fontSize: 'small'}} onClick={
                        e => role === 0 ? navigate(`/checkout/${btoa(item.product_id)}/${btoa(item?.price * immediate_purchase)}/immediate_purchase-${immediate_purchase}`) : navigate(`/seller/editor?product_id=${item?.product_id}`)
                    }>Checkout SubTotal ({item?.price * immediate_purchase})</button>
                </div>
            </div>

            <br />
            <div className="buyer-product shadow-sm" style={{background: '#fff'}}>
                <div className="buyer-product-cnt" style={{display: 'flex', flexDirection: 'column'}}>

                    <div className="buyer-product-data">
                        <div id="left">
                            <div className="img-cnt" style={{backgroundImage: `url(${activeImg})`, borderRadius: '5px', backgroundRepeat: 'no-repeat', backgroundSize: '200px 200px', backgroundPosition: 'center'}}>
                                {/* <img src={activeImg} style={{height: '100%', width: '100%', borderRadius: '5px'}} alt="" /> */}
                            </div>
                            <ItemImgs product_id={searchParams.get('product_id')} />
                        </div>

                        <div id="right" style={{position: 'relative'}}>
 
                            <p style={{fontWeight: '400', fontFamily: 'times-new-roman', padding: '0px', fontSize: 'x-large'}}>{item?.title}</p>

                            <hr style={{margin: '15px'}} />

                            {/* <br /> */}

                            <div style={{background: '#fff4e0', padding: '10px', color: 'orangered', fontWeight: '500', position: 'relative', borderRadius: '5px', height: 'fit-content'}}>
                                
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

                                <div style={{position: 'absolute', top: '-30px', right: '20px'}}>
                                    <SaveButton data={item} Saver={Saver} Save={savedData} />
                                </div>

                                

                                {/* <p>+ shipping from ₦0 to AWKA TOWN</p>  */}
                            </div>

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
                                marginTop: '20px'
                            }}>
                            {/* onClick={e => role !== 0 ? DeleteProduct(e,item.product_id) : AddToCart(e,item.product_id)} */}
                                <button onClick={e => {role ?  handleDelete(searchParams.get('seller'), item.product_id) : SendMssg()}} style={{height: '50px', width: role ? '100%' : '45%', borderRadius: '5px', display: 'flex', alignItems: 'center', cursor: 'pointer',fontSize: 'x-small', justifyContent: 'space-evenly', background: 'orangered', color: '#fff'}}>
                                    {
                                        role === 0
                                        ?
                                        <>

                                            {/* <span>
                                                <img src={cartSvg} style={{height: '25px', width: '25px', position: 'relative', borderRadius: '2.5px',marginRight: '5px'}} alt="" />
                                            </span>
                                            <span>{[...Cart].filter(cart => cart.product_id === item.product_id)[0] ? 'Remove From Cart' : 'Add To Cart'}</span> */}
                                        
                                            <span>
                                                <img src={mssg} style={{height: '25px', width: '25px', position: 'relative', borderRadius: '2.5px',marginRight: '5px'}} alt="" />
                                            </span>
                                            <span>Message</span>
                                        
                                        
                                        </>
                                        :
                                        <>
                                            <span>Delete</span>

                                            <span>
                                                <img src={deleteSvg} style={{height: '20px', width: '20px', position: 'relative', borderRadius: '2.5px',marginRight: '5px'}} alt="" />
                                            </span>
                                        </>
                                    }
                                </button>

                                <Link to={`tel:+234${phone}`} style={{height: '50px', width: '45%', borderRadius: '5px', display: role ? 'none' : 'flex', alignItems: 'center', cursor: 'pointer', justifyContent: 'space-evenly', fontSize: 'x-small', background: 'orangered', color: '#fff'}}>
                                    {
                                        
                                        <>
                                            <span>
                                                <img src={phn} style={{height: '25px', width: '25px', position: 'relative',  margin: 'auto'}} alt="" />
                                            </span>
                                            <span style={{marginTop: '0'}}>
                                                Call
                                            </span>
                                        </>  

                                        
                                    }
                                </Link>

                            </div>


                           

                            {/* <section style={{fontWeight: '700', padding: '10px'}}>
                                
                                <small>Payment Must Be Made Via Campus Express Platform To Avoid Fraud Else You Can <b>Trade With The Seller Outside The Platform At Your Own Risk.</b></small>
                            </section> */}
                            <br />

                            <section style={{fontWeight: '500', display: role === 0 ? 'flex' : 'none', flexDirection: 'column', alignItems: 'flex-end', padding: '10px', position: 'relative', width: '100%',}}>
                                <small>Share With Your Friends</small>

                                <ul>
                                    <li onClick={e => {
                                        const url = window.location.href;
                                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(item.title)}&description=${encodeURIComponent(item.description)}&picture=${encodeURIComponent(activeImg)}`, '_blank');
                                    }} style={{border: 'none', padding: '0',cursor: 'pointer'}}>
                                        <img src={fbSvg} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
                                    </li>

                                    <li onClick={e => {
                                        const url = window.location.href;
                                        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(item.title)}&image=${metaImg}`;
                                        window.open(twitterUrl, '_blank');
                                    }} style={{border: 'none', padding: '0',cursor: 'pointer'}}>
                                        <img src={tweeterSvg} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
                                    </li>

                                    <li onClick={e => {
                                        const url = window.location.href;
                                        const shareBase64ImageToWhatsApp = (base64ImageData, title, description) => {
  // Convert Base64 image data to a Blob
                                            const byteCharacters = atob(base64ImageData.split(',')[1]);
                                            const byteArrays = [];
                                            for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                                                const slice = byteCharacters.slice(offset, offset + 512);
                                                const byteNumbers = new Array(slice.length);
                                                for (let i = 0; i < slice.length; i++) {
                                                byteNumbers[i] = slice.charCodeAt(i);
                                                }
                                                const byteArray = new Uint8Array(byteNumbers);
                                                byteArrays.push(byteArray);
                                            }
                                            const blob = new Blob(byteArrays, { type: 'image/jpeg' });
                                            const message = description.length > 0 ? `${title}\n\nDescription:  \n${description} \n ${url}` : `${title} \n ${url}`;
                                            const encodedMessage = encodeURIComponent(message);
                                            const imageUrl = URL.createObjectURL(blob);
                                            console.log(imageUrl)
                                            const whatsappUrl = `whatsapp://send?text=${encodedMessage}`;

                                            // Open WhatsApp with the share URL
                                            window.open(whatsappUrl, '_blank');


                                        }
                                        shareBase64ImageToWhatsApp(activeImg, item.title, item.description)


                                       
                                    }} style={{border: 'none', padding: '0',cursor: 'pointer'}}>
                                        <img src={WhatsAppSvg} style={{height: '25px', width: '25px', position: 'relative', margin: '0'}} alt="" />
                                    </li>
                                </ul>

                                
                            </section>


                        </div>
                    </div>      

                    <SimilarItems category={item.category} />

                    {
                        item.description.length > 0 
                        ?
                        <Description item={item} />
                        :
                        ''
                    }

                </div>
            </div>
        </>
     );
}
 
export default Product;