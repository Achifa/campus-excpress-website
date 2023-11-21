import img from '../../assets/download (3).jpeg'
import deleteSvg from '../../assets/delete-svgrepo-com (1).svg'
import { useEffect, useState } from 'react'
import jsAgo from 'js-ago'
import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 
import { SHOP } from '../../api/seller';
import { AddItemToCart, DeleteItemFromCart, GetCart, GetCartItems, UpdateCartUnit } from '../../api/buyer';
import { useDispatch, useSelector } from 'react-redux';
import { setCartTo } from '../../redux/buyer/Cart';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    let [Items, setItems] = useState([])
    let [activeImg, setActiveImg] = useState(imgSvg)
    let [subTotal, setSubTotal] = useState('0.00')
    let [unit, setUnit] = useState([])
    let [url, setUrl] = useState('')


    function getTotalPrice() {
        let list = [...document.querySelectorAll(".buyer-items-stock")];
        let values = []
        list.map((item) => values.push(parseInt(item.children[1].innerHTML) * parseInt(item.dataset.price)))
        let total = sum(values, values.length)
        setSubTotal(total)
        console.log(total)
    }

    function sum(arr, n)
    {
        // base or terminating condition
        if (n <= 0) {
        return 0;
        }
    
        // Calling method recursively
        return sum(arr, n-1 ) + arr[n-1];
    }
    useEffect(() => {
        
        GetCartItems(window.localStorage.getItem('CE_buyer_id'))
        .then((result) => { 
            setItems(result);
            let prices = []
            let unitList = []

            result.map((item) => prices.push(eval(item.item.price)))
            result.forEach((product) => unitList.push({product_id: product.item.product_id, unit: parseInt(product.cart.unit)}))
            setUnit(unitList)
            let s = sum(prices, prices.length);
            setSubTotal(s)
        })
        .catch((err) => {
            console.log(err)
        })
        
    }, [])

    //let {Cart} = useSelector(s => s.Cart)
    let dispatch = useDispatch()

    function AddToCart(e,product_id) {
        e.target.disabled = true;

        DeleteItemFromCart(product_id, window.localStorage.getItem('CE_buyer_id'))
        .then((result) => {
            dispatch(setCartTo(result))
            console.log(result)
            e.target.disabled = false;
            e.target.parentElement.remove()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // function StockChange(type,item) {
    //     if(type === 'add'){
    //         let oldUnit = unit.filter(data => data.product_id === item[0].product_id)[0].unit;
            
    //         if(oldUnit < item[0].stock){
    //             //unit.filter(data => data.product_id === item[0].product_id)[0].unit = oldUnit + 1;

    //             document.querySelector(`#ce${item[0].product_id}`).innerHTML = unit.filter(data => data.product_id === item[0].product_id)[0].unit = oldUnit + 1;
    //             getTotalPrice()
    //         }

    //     }else{
    //         let oldUnit = unit.filter(data => data.product_id === item[0].product_id)[0].unit;

    //         if(oldUnit > 1){
    //             //unit.filter(data => data.product_id === item[0].product_id)[0].unit = oldUnit + 1;
    //             document.querySelector(`#ce${item[0].product_id}`).innerHTML = unit.filter(data => data.product_id === item[0].product_id)[0].unit = oldUnit - 1;
    //             getTotalPrice()
    //         }
            
    //     }
    // }

    function UpdateCart(type,item) {
        let oldUnit = unit.filter(data => data.product_id === item.item.product_id)[0].unit;
                    
                   
        
        function Handler(params) {
            UpdateCartUnit(type,window.localStorage.getItem('CE_buyer_id'),item.item.product_id)
            .then((result) => { 
                if(type === 'add'){
                    let oldUnit = unit.filter(data => data.product_id === item.item.product_id)[0].unit;
                    
                    if(oldUnit < item.item.stock){
                        //unit.filter(data => data.product_id === item.item.product_id).item.unit = oldUnit + 1;
        
                        document.querySelector(`#ce${item.item.product_id}`).innerHTML = unit.filter(data => data.product_id === item.item.product_id)[0].unit = oldUnit + 1;
                        getTotalPrice()
                    }
        
                }else{
                    let oldUnit = unit.filter(data => data.product_id === item.item.product_id)[0].unit;
        
                    if(oldUnit > 1){
                        //unit.filter(data => data.product_id === item.item.product_id).item.unit = oldUnit + 1;
                        document.querySelector(`#ce${item.item.product_id}`).innerHTML = unit.filter(data => data.product_id === item.item.product_id)[0].unit = oldUnit - 1;
                        getTotalPrice()
                    }
                    
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }

        if(type === 'add'){
            if(oldUnit < item.item.stock){
                Handler()
            }
        }else{
            if(oldUnit > 1){
                Handler()
            }
        }

    }
    let navigate = useNavigate();

   useEffect(() => {
        getTotalPrice();
        let id = [];
        let list = [...document.querySelectorAll(".buyer-items-stock")]
        list.map((item) => id.push(item.children[0].dataset.id));
        setUrl(btoa(id.join('-')))
        console.log(btoa(id.join('-')))
   },[unit])
    
    return ( 
        <>
            <div className="buyer-cart">
               {
                Items.map((item, index) => {
                    return(
                        <div key={index} className="buyer-cart-card shadow-sm">
                            <img src={activeImg} alt="" />
                            <button  className="buyer-cart-remove-btn" style={{background: 'orangered'}} onClick={e => AddToCart(e,item.item.product_id)}>
                                Remove
                            </button>

                            <div className="buyer-cart-body">

                                
                                <div className='buyer-item-title'>
                                    <p>{item.item.title}</p>
                                </div>

                                <div className='buyer-item-seller'>
                                    <span>Seller: Jason.N.N</span>
                                </div>

                                <div className="buyer-item-price">
                                    <span style={{fontWeight: 'bold'}}>&#8358;{new Intl.NumberFormat('en-us').format(item.item.price)} </span>
                                </div>

                                <div className="buyer-item-units">
                                    <span>{item.item.stock} units Available</span>
                                </div>

                                <div className="buyer-item-spec">
                                    
                                </div>

                                <div className="buyer-items-stock" data-price={item.item.price}>
                                    <button onClick={e => UpdateCart('minus',item)} data-id={item.item.product_id} disabled={unit < 2 ? true : false}>-</button>

                                    <div id={`ce${item.item.product_id}`}>
                                        {item.cart.unit}
                                    </div>

                                    <button onClick={e => UpdateCart('add',item)} disabled={item.item.stock > 1 && unit.filter(data => data.product_id === item.item.product_id)[0].unit <= item.item.stock ? false : true}>+</button>
                                </div>
                            </div>
                        </div>


                    )
                })
               }
            </div>

            <div className="buyer-cart-checkout">
                <button onClick={e => navigate(`/checkout/${url}/${btoa(subTotal)}`)}>
                    <span>Checkout SubTotal&nbsp; </span>
                    <span>({new Intl.NumberFormat('en-us').format(subTotal)})</span>
                </button>
            </div>
        </>
     );
}


 
export default Cart;