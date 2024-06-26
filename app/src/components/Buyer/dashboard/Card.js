import { 
    useDispatch, 
    useSelector 
} from 'react-redux'
import img from '../../../assets/eye-svgrepo-com (1).svg'
import locationSvg from '../../../assets/location-svgrepo-com-1.svg'
import { 
    useEffect,
    useState
} from 'react'

import cartSvg from '../../../assets/cart-shopping-fast-svgrepo-com (1).svg'
import orderSvg from '../../../assets/order-completed-svgrepo-com.svg'
import Thumbnail from '../Thumbnail'
import conditionSvg from '../../../assets/condition-point-svgrepo-com.svg'
import { 
    useNavigate 
} from 'react-router-dom'
import { 
    setSaveTo 
} from '../../../redux/buyer_store/Save'
import timsSvg from '../../../assets/date-2-svgrepo-com.svg'
import { DeleteItemFromCart, UnSaveItem } from '../../../api/buyer/delete'
import { AddItemToCart, SaveItem } from '../../../api/buyer/post'
import SaveButton from './SaveButton'
import js_ago from 'js-ago'
import { isBuyerLoggedIn } from '../LoggedIn'
import { setCartTo } from '../../../redux/buyer_store/Cart'

const Card = ({item, index}) => {

    let BtnStyles = {
        height: '35px',
        width: '100%',
        borderRadius: '5px',
        outline: 'none',
        // padding: '0',
        border: 'none',
        float: 'left',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 'small',
        fontWeight: '500',
        backgroundColor: 'orangered',
        margin: '0'
    }

    let [screenWidth, setScreenWidth] = useState(0)
    let [btnMode, setBtnMode] = useState(true)
    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])
   
    let { 
        savedItem
    } = useSelector(s => s.savedItem)

    let { 
        Cart
    } = useSelector(s => s.Cart)

    let {
        buyerData
    } = useSelector(s => s.buyerData)

    let dispatch = useDispatch()
    let [savedListBool, setSavedListBool] = useState(false)
    async function Saver(e,product_id) { 
        if(buyerData.isRegistered){
            // alert()
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
            setBtnMode(btnMode) 
            // let saveList = savedItem;
           
            let duplicateSearch = savedItem.filter(item => item.product_id === product_id)
            // console.log('savedItem: ', savedItem.length > 0, savedItem)

            if(savedItem.length > 0){
                console.log('duplicateSearch: ', duplicateSearch.length > 0)

                if(duplicateSearch.length > 0){
    
                    let result = await UnSaveItem(product_id, window.localStorage.getItem('CE_buyer_id'));
                    dispatch(setSaveTo(result));
                    setBtnMode(!btnMode) 
                    overlay.removeAttribute('id')
                    // console.log(result)
                    
    
                }else{
                    
                    let result = await SaveItem(product_id, window.localStorage.getItem('CE_buyer_id'))
                    dispatch(setSaveTo(result))
                    setBtnMode(!btnMode) 
                    overlay.removeAttribute('id')
                    // console.log(result)

    
                }
            }else{
    
                let result = await SaveItem(product_id, window.localStorage.getItem('CE_buyer_id'))
                dispatch(setSaveTo(result))
                setBtnMode(!btnMode) 
                overlay.removeAttribute('id')
    
            }
        }else{

        }
        
    }

    function AddToCart(e,product_id) {
        
        e.currentTarget.disabled = true;
        console.log(e.target)
        console.log(e.currentTarget)

        let cartList = [...Cart];
        let duplicateSearch = cartList.filter(item => item.product_id === product_id)
        if(cartList.length > 0){
            if(duplicateSearch.length > 0){
                let newList = cartList.filter(item => item !== duplicateSearch[0])
                //dispatch(setCartTo(newList))
                DeleteItemFromCart(product_id, window.localStorage.getItem('CE_buyer_id'))
                .then((result) => {
                    dispatch(setCartTo(result))
                    e.currentTarget.disabled = false;
                })
                .catch((err) => {
                    console.log(err)
                })
            }else{
                dispatch(setCartTo([...Cart, product_id]))
                AddItemToCart(product_id, window.localStorage.getItem('CE_buyer_id'))
                .then((result) => {
                    dispatch(setCartTo(result))
                    e.currentTarget.disabled = false;
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

    useEffect(() => {
        // setSavedItems('savedItem: ', savedItem)
        if(savedItem.length > 0){
            let result = savedItem.filter(savedItem => savedItem.product_id === item.product_id)
            result.length > 0 ? setSavedListBool(true) : setSavedListBool(false)
        }else{
            setSavedListBool(false)
        }
    }, [savedItem])
    

    let [elem, set_elem] = useState('') 

    return ( 
        <>
            {
                elem
            }
            <div className="cols" key={index} id={item.product_id} >
                <div className="card shadow-sm" key={index} style={{height: 'auto', marginBottom: '10px', borderRadius: '10px'}}>
                    
                    
                    
                   {
                    item
                    ?
                    <Thumbnail product_id={item.product_id} />
                    :
                    ''
                   }

                    <div className="card-body" style={{position: 'relative'}}>
                        
                        {
                            screenWidth > 479
                            ?
                            <small style={{
                                fontSize: 'x-small',
                                fontWeight: '500',
                                fontFamily: 'Times New Roman',
                                maxHeight: '36px',
                                lineHeight: '18px',
                                color: '#000',
                                display: 'webkitBox',
                                
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: '2',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }} onClick={e => window.location.href=(`/product?product_id=${item.product_id}`)} >{item.title}</small>
                            : 
                            <small style={{
                                fontSize: 'small',
                                fontWeight: '500',
                                fontFamily: 'Times New Roman',
                                maxHeight: '36px',
                                lineHeight: '18px',
                                color: '#000',

                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: '2',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }} onClick={e => window.location.href=(`/product?product_id=${item.product_id}`)} >{item.title}</small>
                        }

                        {/* <br /> */}

                        {/* <hr  /> */}
                        
                        {
                            screenWidth > 479
                            ?
                            <h6 onClick={e => window.location.href=(`/product?product_id=${item.product_id}`)} style={{marginBottom: '10px', marginTop: '10px', fontWeight: '400', fontSize: 'small', color: '#000', fontFamily: 'Times New Roman'}}>&#8358;{
                                new Intl.NumberFormat('en-us').format(item.price)
                            }</h6>
                            : 
                            <h6 onClick={e => window.location.href=(`/product?product_id=${item.product_id}`)} style={{marginBottom: '10px', fontWeight: '700', color: '#000'}}>&#8358;{new Intl.NumberFormat('en-us').format(item.price)}</h6>
                        }

                        <div onClick={e => window.location.href=(`/product?product_id=${item.product_id}`)} style={{display: 'flex',background: '#fff', color: 'orangered',  alignItems: 'center', justifyContent: 'left', padding: '0'}}>
                            <span  style={{background: '#fff', color: '#000', borderRadius: '5px', top: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', left: '20px', padding: '5px 0 5px 0'}}>
                                <span  style={{background: '#fff',color: 'orangered', padding: '0'}}>

                                    <img src={conditionSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />

                                </span>
                                &nbsp;

                                <span  style={{background: '#fff',color: 'rgb(98, 98, 98)', padding: '0',  fontSize: 'x-small', fontWeight: '500'}}> 
                                    {JSON.parse(item.others)?.condition}
                                </span>
                            </span>
                            
                        </div>

                        {/* <SaveButton data={item} Saver={Saver} Save={
                            savedListBool
                            } /> */}

                        

                        {/* <div style={{position: 'absolute', right: '5px', bottom: '5px', fontSize: 'small', background: '#fff', color: '#626262'}}>
                            <span>
                                <img src={orderSvg} style={{height: '20px', width: '20px', marginBottom: '3px'}} alt="" />

                            </span>
                            &nbsp;
                            <span>
                                20 Orders
                            </span>
                        </div> */}
                    </div>

                    
                    {/*<br />*/} 

                    

                    <span  style={{background: '#fff',display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'left', position: 'relative',color: '#000', borderRadius: '5px', padding: '2.5px', zIndex: '1000', padding: '0 5px 0 5px', overflow: 'hidden'}}>
                        <span  style={{background: '#fff',color: 'orangered', padding: '0'}}>
                            <img src={locationSvg} style={{height: screenWidth  > 480 ? '15px' : '12px', width: screenWidth  > 480 ? '20px' : '12px', marginBottom: '5px'}} alt="" />

                        </span>

                        &nbsp;
                        {/* &nbsp; */}

                        <span  style={{background: '#fff', color: '#FF4500', padding: '0',  fontSize: screenWidth > 480 ? 'x-small' : 'xx-small', fontWeight: '500', overflow: 'hidden', height: '15px'}}> 
                            {JSON.parse(item.others)?.locale}
                        </span>
                    </span>

                    

                    <div className="" style={{height: 'fit-content', display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', padding: '0 5px 0 5px', margin: '10px 0 0 0'}}>
                       <div style={{
                         display: 'flex', justifyContent: 'left', width: '50%', alignItems: 'center',
                       }}>
                            <img src={img} style={{height: '15px', width: '15px', borderRadius: '10px'}} alt="" />
                            &nbsp;
                            <div style={{height: 'fit-content', width: 'fit-content', fontWeight: '400', fontSize: 'x-small'}} > {item.views} views</div>
                       </div>

                        <div style={{color: '#626262', fontSize: 'x-small', fontWeight: '500', height: '30px', display: 'flex', justifyContent: 'left', flexWrap: 'nowrap', width: '50%', alignItems: 'center'}}>
                            <span>
                                <img src={timsSvg} style={{height: '15px', width: '15px', marginBottom: '3px'}} alt="" />
                            </span>
                            &nbsp;
                            &nbsp;
                            <span style={{fontSize: 'x-small'}}>
                                {
                                    js_ago(new Date(item.date))
                                }
                            </span>
                        </div>
                    </div>

                    <button style={BtnStyles} onClick={e => {
                        let response = isBuyerLoggedIn('dashboard');
                        if(!response.bool){set_elem(response.elem)} else{set_elem(AddToCart(e,item.product_id))}
                    }}>

                        <span>
                            <img src={cartSvg} style={{height: '20px', width: '20px', position: 'relative', borderRadius: '2.5px',marginRight: '5px'}} alt="" />
                        </span>

                        &nbsp;
                        &nbsp;
                        <span style={{fontSize: 'x-small'}}>{[...Cart].filter(cart => cart.product_id === item.product_id)[0] ? 'Remove From Cart' : 'Add To Cart'}</span>
                    </button>

                </div>
            </div> 
        </>
     );
}
 
export default Card;