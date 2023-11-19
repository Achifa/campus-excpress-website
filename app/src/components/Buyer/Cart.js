import img from '../../assets/download (3).jpeg'
import deleteSvg from '../../assets/delete-svgrepo-com (1).svg'
import { useEffect, useState } from 'react'
import jsAgo from 'js-ago'
import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 
import { SHOP } from '../../api/seller';

const Cart = () => {
    let [Items, setItems] = useState([])
    let [activeImg, setActiveImg] = useState(imgSvg)
    let [subTotal, setSubTotal] = useState('0.00')


    useEffect(() => {
        
        SHOP("CE-d7571f")
        .then((result) => { 
            setItems(result);
            let prices = []

            result.map((item) => prices.push(eval(item.price)))


            function sum(arr, n)
            {
                // base or terminating condition
                if (n <= 0) {
                return 0;
                }
            
                // Calling method recursively
                return sum(arr, n-1 ) + arr[n-1];
            }
            let s = sum(prices, prices.length);
            setSubTotal(s)


        })
        .catch((err) => {
            console.log(err)
        })

        
    }, [])
    return ( 
        <>
            <div className="buyer-cart">
               {
                Items.map((item, index) => {
                    return(
                        <div key={index} className="buyer-cart-card shadow-sm">
                            <img src={activeImg} alt="" />
                            <div className="buyer-cart-remove-btn">
                                Remove
                            </div>

                            <div className="buyer-cart-body">

                                
                                <div className='buyer-item-title'>
                                    <p>{item.title}</p>
                                </div>

                                <div className='buyer-item-seller'>
                                    <span>Seller: Jason.N.N</span>
                                </div>


                                <div className="buyer-item-price">
                                    <span style={{fontWeight: 'bold'}}>&#8358;{new Intl.NumberFormat('en-us').format(item.price)} </span>
                                </div>

                                <div className="buyer-item-units">
                                    <span>2 units Available</span>
                                </div>

                                <div className="buyer-item-spec">
                                    
                                </div>

                                <div className="buyer-items-stock">
                                    <div>-</div>
                                    <div>0</div>
                                    <div>+</div>
                                </div>
                            </div>
                        </div>


                    )
                })
               }
            </div>

            <div className="buyer-cart-checkout">
                <button >
                    <span>Checkout SubTotal&nbsp; </span>
                    <span>({new Intl.NumberFormat('en-us').format(subTotal)})</span>
                </button>
            </div>
        </>
     );
}


 
export default Cart;