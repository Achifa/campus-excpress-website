import { 
    useDispatch, 
    useSelector 
} from 'react-redux'
import img from '../../../assets/download (3).jpeg'
import locationSvg from '../../../assets/location-svgrepo-com-1.svg'
import { 
    useEffect,
    useState
} from 'react'
import Thumbnail from '../Thumbnail'
import saveSvg from '../../../assets/save-svgrepo-com.svg'
import conditionSvg from '../../../assets/condition-point-svgrepo-com.svg'
import { 
    useNavigate 
} from 'react-router-dom'
import { 
    setSaveTo 
} from '../../../redux/buyer_store/Save'
import { 
    isBuyerLoggedIn 
} from '../LoggedIn'
import { UnSaveItem } from '../../../api/buyer/delete'
import { SaveItem } from '../../../api/buyer/post'
import SaveButton from './SaveButton'

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

    let {
        category
    } = useSelector(s => s.Category)

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
            <div className="cols" >
                <div className="card" key={index} style={{height: 'fit-content', marginBottom: '10px'}}>
                    
                    <span  style={{background: 'orangered',display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute',color: '#000', borderRadius: '5px', top: screenWidth > 400 ? '15px' : '10px', left: screenWidth > 400 ? '15px' : '8px', padding: '2.5px', zIndex: '1000', padding: '0 5px 0 5px'}}>
                        <span  style={{background: 'orangered',color: 'orangered', padding: '0'}}>
                            <img src={locationSvg} style={{height: screenWidth  > 480 ? '15px' : '12px', width: screenWidth  > 480 ? '20px' : '12px', marginBottom: '5px'}} alt="" />

                        </span>

                        &nbsp;
                        {/* &nbsp; */}

                        <span  style={{background: 'orangered', color: '#fff', padding: '0',  fontSize: screenWidth > 480 ? 'x-small' : 'xx-small', fontWeight: '500'}}> 
                            UNIZIK, Awka
                        </span>
                    </span>
                    
                    <Thumbnail product_id={item.product_id} />

                    <div className="card-body" style={{position: 'relative'}}>
                        
                        {
                            screenWidth > 479
                            ?
                            <small style={{
                                fontSize: 'x-small',
                                fontWeight: '500',
                                fontFamily: 'Times New Roman',
                                height: '20px',
                                lineHeight: '18px',
                                color: '#000'
                            }} onClick={e => navigate(`/product/${item.product_id}`)} >{item.title}</small>
                            : 
                            <small style={{
                                fontSize: 'small',
                                fontWeight: '500',
                                fontFamily: 'Times New Roman',
                                height: '20px',
                                lineHeight: '18px',
                                color: '#000'
                            }} onClick={e => navigate(`/product/${item.product_id}`)} >{item.title}</small>
                        }

                        {/* <br /> */}

                        {/* <hr  /> */}
                        
                        {
                            screenWidth > 479
                            ?
                            <h6 onClick={e => navigate(`/product/${item.product_id}`)} style={{marginBottom: '10px', marginTop: '10px', fontWeight: '400', fontSize: 'small', color: '#000', fontFamily: 'Times New Roman'}}>&#8358;{
                                new Intl.NumberFormat('en-us').format(item.price)
                            }</h6>
                            : 
                            <h6 onClick={e => navigate(`/product/${item.product_id}`)} style={{marginBottom: '10px', fontWeight: '700', color: '#000'}}>&#8358;{new Intl.NumberFormat('en-us').format(item.price)}</h6>
                        }

                        <div onClick={e => navigate(`/product/${item.product_id}`)} style={{display: 'flex',background: '#fff', color: 'orangered',  alignItems: 'center', justifyContent: 'left', padding: '0'}}>
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

                    {/* <button style={BtnStyles} onClick={e => {
                        let response = isBuyerLoggedIn('dashboard');
                        if(!response.bool){set_elem(response.elem)} else{set_elem(AddToCart(e,item.product_id))}
                    }}>

                    

                        <span>
                            <img src={cartSvg} style={{height: '25px', width: '25px', position: 'relative', borderRadius: '2.5px',marginRight: '5px'}} alt="" />
                        </span>
                        <span style={{fontSize: 'x-small'}}>{[...Cart].filter(cart => cart.product_id === item.product_id)[0] ? 'Remove From Cart' : 'Add To Cart'}</span>
                    </button> */}
                    {/*<br />*/} 

                    {/* <div className="card-footer">
                        <img src={img} style={{height: '30px', width: '30px', borderRadius: '10px'}} alt="" />

                        <div style={{height: 'fit-content', width: 'fit-content', position: 'absolute', left: '40px', bottom: '5px', fontWeight: '800', fontSize: 'small'}} >Jacob.N.N</div>

                        <div style={{position: 'absolute', right: '5px', bottom: '5px', color: '#626262', fontSize: 'small', fontWeight: '500'}}>
                            <span>
                                <img src={timeSvg} style={{height: '20px', width: '20px', marginBottom: '3px'}} alt="" />

                            </span>
                            &nbsp;
                            <span>
                                2 days ago
                            </span>
                        </div>
                    </div> */}

                </div>
            </div> 
        </>
     );
}
 
export default Card;