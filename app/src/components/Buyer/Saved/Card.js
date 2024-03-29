import img from '../../../assets/download (3).jpeg'
import deleteSvg from '../../../assets/delete-svgrepo-com (1).svg'
import { 
    useEffect,
    useState 
} from 'react'
import js_ago from 'js-ago';
import { 
    useDispatch, 
    useSelector 
} from 'react-redux';
import cartSvg from '../../../assets/cart-shopping-fast-svgrepo-com.svg'
import { 
    DeleteItemFromCart 
} from '../../../api/buyer/delete';
import { 
    setCartTo 
} from '../../../redux/buyer_store/Cart';
import { 
    AddItemToCart 
} from '../../../api/buyer/post';
import { GetSavedItem } from '../../../api/buyer/get';
import { setSaveTo } from '../../../redux/buyer_store/Save';
import Thumbnail from '../Thumbnail';
import { useNavigate } from 'react-router-dom';

const Card = ({activeImg,item,index}) => {
    let dispatch = useDispatch()
    let {Cart} = useSelector(s => s.Cart)
    let navigate = useNavigate()
    

    async function AddToCart(e,product_id) {
        e.target.disabled = true;

        let cartList = [...Cart];
        let duplicateSearch = cartList.filter(item => item.product_id === product_id)
        if(cartList.length > 0){
            if(duplicateSearch.length > 0){
                try {
                    let result = await DeleteItemFromCart(product_id, window.localStorage.getItem('CE_buyer_id'))
                    dispatch(setCartTo(result))
                    e.target.disabled = false;
                } catch (error) {
                    console.log(error)
                }
            }else{
                try {
                    dispatch(setCartTo([...Cart, product_id]))
                    let result = await AddItemToCart(product_id, window.localStorage.getItem('CE_buyer_id'))
                    dispatch(setCartTo(result))
                    e.target.disabled = false;
                } catch (error) {
                    console.log(error)
                    
                }
            }
        }else{
            try {
                let result = await AddItemToCart(product_id, window.localStorage.getItem('CE_buyer_id'))
                dispatch(setCartTo(result))
                e.target.disabled = false;
            } catch (error) {
                console.log(error)
                
            }
        }
    }

    return ( 
        <>
             <div key={index} onClick={e => navigate(`/product/${item.saved_item[0].product_id}`)} className="buyer-savedItem-card shadow-sm">
                <div>
                    <Thumbnail product_id={item.saved_item[0].product_id}/>
                </div>
                
                {/* <div className="buyer-savedItem-remove-btn">
                    <span>Saved {item[0] ? js_ago(new Date(item[0].date)) : ''}</span>
                </div> */}

                <div className="buyer-savedItem-body">
                    <img src={deleteSvg} alt="" />

                    
                    <div className='buyer-item-title'>
                        <p style={{fontWeight: '500', fontSize: 'medium'}}>{item.saved_item ? item.saved_item[0].title : ''}</p> 
                    </div>

                    


                    <div className="buyer-item-price">
                        <span style={{fontWeight: '500', fontSize: 'medium'}}>&#8358;{item.saved_item ?  new Intl.NumberFormat('en-us').format(item.saved_item[0].price) : ''} </span>
                    </div> 

                    <div className='buyer-item-seller'>
                        <span style={{fontWeight: '500', fontSize: 'medium'}}>Seller: {item.seller.fname} {item.seller.lname}</span>
                    </div>

                    {/* <div className="buyer-items-btn">
                    <button  onClick={e => AddToCart(e,item[0].product_id)}>
                        <span>
                            <img src={cartSvg} style={{height: '25px', width: '25px', position: 'relative', borderRadius: '2.5px',marginRight: '5px'}} alt="" />
                        </span>
                        <span>{[...Cart].filter(cart => cart.product_id === item.product_id)[0] ? 'Remove From Cart' : 'Add To Cart'}</span>
                        </button>
                    </div> */}
                </div>
            </div>
        </>
     );
}
 
export default Card;