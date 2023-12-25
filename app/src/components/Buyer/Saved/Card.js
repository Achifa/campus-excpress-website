import img from '../../../assets/download (3).jpeg'
import deleteSvg from '../../../assets/delete-svgrepo-com (1).svg'
import { useState } from 'react'
import js_ago from 'js-ago';
import { AddItemToCart, DeleteItemFromCart } from '../../../api/buyer';
import { setCartTo } from '../../../redux/buyer/Cart';
import { useDispatch, useSelector } from 'react-redux';
import cartSvg from '../../../assets/cart-shopping-fast-svgrepo-com.svg'

const Card = ({activeImg,item,index}) => {
    let dispatch = useDispatch()
    let {Cart} = useSelector(s => s.Cart)

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

    return ( 
        <>
             <div key={index} className="buyer-savedItem-card shadow-sm">
                <img src={activeImg} alt="" />
                
                <div className="buyer-savedItem-remove-btn">
                    <span>Saved {item[0] ? js_ago(new Date(item[0].date)) : ''}</span>
                </div>

                <div className="buyer-savedItem-body">
                    <img src={deleteSvg} alt="" />

                    
                    <div className='buyer-item-title'>
                        <p>{item[0] ? item[0].title : ''}</p>
                    </div>

                    <div className='buyer-item-seller'>
                        <span>Seller: Jason.N.N</span>
                    </div>


                    <div className="buyer-item-price">
                        <span style={{fontWeight: 'bold'}}>&#8358;{item[0] ?  new Intl.NumberFormat('en-us').format(item[0].price) : ''} </span>
                    </div> 

                    

                    <div className="buyer-items-btn">
                    <button  onClick={e => AddToCart(e,item[0].product_id)}>
                        <span>
                            <img src={cartSvg} style={{height: '25px', width: '25px', position: 'relative', borderRadius: '2.5px',marginRight: '5px'}} alt="" />
                        </span>
                        <span>{[...Cart].filter(cart => cart.product_id === item.product_id)[0] ? 'Remove From Cart' : 'Add To Cart'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Card;