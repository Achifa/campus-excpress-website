import { 
    useDispatch, 
    useSelector 
} from 'react-redux'
import img from '../../../assets/seen-svgrepo-com (1).svg'
import locationSvg from '../../../assets/location-svgrepo-com-1.svg'
import { 
    useEffect,
    useState
} from 'react'
import Thumbnail from '../Thumbnail'
import conditionSvg from '../../../assets/condition-point-svgrepo-com.svg'
import { 
    useNavigate 
} from 'react-router-dom'
import { 
    setSaveTo 
} from '../../../redux/buyer_store/Save'
import timsSvg from '../../../assets/date-2-svgrepo-com.svg'
import { 
    isBuyerLoggedIn 
} from '../LoggedIn'
import { UnSaveItem } from '../../../api/buyer/delete'
import { SaveItem } from '../../../api/buyer/post'
import SaveButton from './SaveButton'
import js_ago from 'js-ago'
const Card = ({item, index}) => {
    let [screenWidth, setScreenWidth] = useState(0)
    let [btnMode, setBtnMode] = useState(true)
 
    let BtnStyles = {
        height: screenWidth > 480 ? '40px' : '40px',
        width: '100%',
        borderRadius: '2.5px',
        outline: 'none',
        border: 'none',
        float: 'right',
        color: '#fff',
        fontSize: 'small',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        fontWeight: '500',
        backgroundColor: 'orangered',
        margin: '0'
    }
    let {
        Cart
    } = useSelector(s => s.Cart)
    let {
        Save
    } = useSelector(s => s.Save)

    // let {
    //     category
    // } = useSelector(s => s.Category)
 
    let navigate = useNavigate()
    let dispatch = useDispatch()

    let [savedData, setSavedData] = useState([])

    useEffect(() => {
        setSavedData(Save)
    }, [Save])

    

    // let [items, setItems] = useState([])

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

    // function AddToCart(e,product_id) {
        
    //     e.currentTarget.disabled = true;
    //     console.log(e.target)
    //     console.log(e.currentTarget)

    //     let cartList = [...Cart];
    //     let duplicateSearch = cartList.filter(item => item.product_id === product_id)
    //     if(cartList.length > 0){
    //         if(duplicateSearch.length > 0){
    //             let newList = cartList.filter(item => item !== duplicateSearch[0])
    //             //dispatch(setCartTo(newList))
    //             DeleteItemFromCart(product_id, window.localStorage.getItem('CE_buyer_id'))
    //             .then((result) => {
    //                 dispatch(setCartTo(result))
    //                 e.currentTarget.disabled = false;
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             })
    //         }else{
    //             dispatch(setCartTo([...Cart, product_id]))
    //             AddItemToCart(product_id, window.localStorage.getItem('CE_buyer_id'))
    //             .then((result) => {
    //                 dispatch(setCartTo(result))
    //                 e.currentTarget.disabled = false;
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

    let [elem, set_elem] = useState('')

    return ( 
        <>
            {
                elem
            }
            <div className="cols" id={item.product_id} >
                <div className="card shadow" key={index} style={{height: 'fit-content', marginBottom: '10px', borderRadius: '10px'}}>
                    
                    
                    
                    <Thumbnail product_id={item.product_id} />

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
                            }} onClick={e => navigate(`/product?product_id=${item.product_id}`)} >{item.title}</small>
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
                            }} onClick={e => navigate(`/product?product_id=${item.product_id}`)} >{item.title}</small>
                        }

                        {/* <br /> */}

                        {/* <hr  /> */}
                        
                        {
                            screenWidth > 479
                            ?
                            <h6 onClick={e => navigate(`/product?product_id=${item.product_id}`)} style={{marginBottom: '10px', marginTop: '10px', fontWeight: '400', fontSize: 'small', color: '#000', fontFamily: 'Times New Roman'}}>&#8358;{
                                new Intl.NumberFormat('en-us').format(item.price)
                            }</h6>
                            : 
                            <h6 onClick={e => navigate(`/product?product_id=${item.product_id}`)} style={{marginBottom: '10px', fontWeight: '700', color: '#000'}}>&#8358;{new Intl.NumberFormat('en-us').format(item.price)}</h6>
                        }

                        <div onClick={e => navigate(`/product?product_id=${item.product_id}`)} style={{display: 'flex',background: '#fff', color: 'orangered',  alignItems: 'center', justifyContent: 'left', padding: '0'}}>
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

                        <SaveButton data={item} Saver={Saver} Save={savedData} />

                        

                        {/*<div style={{position: 'absolute', right: '5px', bottom: '5px', fontSize: 'small', background: '#fff', color: '#626262'}}>
                            <span>
                                <img src={orderSvg} style={{height: '20px', width: '20px', marginBottom: '3px'}} alt="" />

                            </span>
                            &nbsp;
                            <span>
                                20 Orders
                            </span>
    </div>*/}
                    </div>

                    
                    {/*<br />*/} 

                    

                    <span  style={{background: '#fff',display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'left', position: 'relative',color: '#000', borderRadius: '5px', padding: '2.5px', zIndex: '1000', padding: '0 5px 0 5px'}}>
                        <span  style={{background: '#fff',color: 'orangered', padding: '0'}}>
                            <img src={locationSvg} style={{height: screenWidth  > 480 ? '15px' : '12px', width: screenWidth  > 480 ? '20px' : '12px', marginBottom: '5px'}} alt="" />

                        </span>

                        &nbsp;
                        {/* &nbsp; */}

                        <span  style={{background: '#fff', color: '#FF4500', padding: '0',  fontSize: screenWidth > 480 ? 'x-small' : 'xx-small', fontWeight: '500'}}> 
                            {JSON.parse(item.others)?.locale}
                        </span>
                    </span>

                    {/* <button style={BtnStyles} onClick={e => {
                        let response = isBuyerLoggedIn('dashboard');
                        if(!response.bool){set_elem(response.elem)} else{set_elem(AddToCart(e,item.product_id))}
                    }}>

                    

                        <span>
                            <img src={cartSvg} style={{height: '25px', width: '25px', position: 'relative', borderRadius: '2.5px',marginRight: '5px'}} alt="" />
                        </span>
                        <span style={{fontSize: 'x-small'}}>{[...Cart].filter(cart => cart.product_id === item.product_id)[0] ? 'Remove From Cart' : 'Add To Cart'}</span>
                    </button> */}

                    <div className="" style={{height: 'fit-content', display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', padding: '0 5px 0 5px', margin: '10px 0 0 0'}}>
                       <div style={{
                         display: 'flex', justifyContent: 'left', width: '50%', alignItems: 'center',
                       }}>
                            <img src={img} style={{height: '15px', width: '15px', borderRadius: '10px'}} alt="" />

                            <div style={{height: 'fit-content', width: 'fit-content', fontWeight: '400', fontSize: 'x-small'}} >40 views</div>
                       </div>

                        <div style={{color: '#626262', fontSize: 'x-small', fontWeight: '500', display: 'flex', justifyContent: 'left', width: '50%', alignItems: 'center'}}>
                            <span>
                                <img src={timsSvg} style={{height: '15px', width: '15px', marginBottom: '3px'}} alt="" />

                            </span>
                            &nbsp;
                            <span>
                                {
                                    js_ago(new Date(item.date))
                                }
                            </span>
                        </div>
                    </div>

                </div>
            </div> 
        </>
     );
}
 
export default Card;