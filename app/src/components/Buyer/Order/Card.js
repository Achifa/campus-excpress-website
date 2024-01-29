import ellipsisSvg from '../../../assets/ellipsis-svgrepo-com.svg'
import Thumbnail from './Thumbnail';
import js_ago from 'js-ago' 
const Card = ({index, item}) => {
    return ( 
        <>
            <div className="seller-order-card shadow-sm" style={{position: 'relative'}}>
                <Thumbnail product_id={item.order.product_id} />

                <div style={{position: 'absolute', top: '5px', right: '5px', padding: '4px'}}>
                    <img src={ellipsisSvg} style={{height: '10px', width: '10px'}} alt="..." />
                </div>
                
                <div className="seller-order-body" style={{width: 'calc(70%)'}}>
                    {/* <img src={deleteSvg}alt="" /> */}

                    <div className="seller-order-title" style={{display: 'flex', alignItems: 'center', fontWeight: '500'}}>
                        <p>{item.product.title}</p>
                    </div>
                    <div className="seller-order-id" style={{display: 'flex', alignItems: 'flex-start'}}>
                        <p style={{fontWeight: '500', fontSize: 'x-small'}}>Order-code: {item.order.order_id}</p>
                    </div>
{/* <hr /> */}
                    <div className="seller-order-status">
                        {item.order.status}
                    </div>


                    <div className="seller-order-date" style={{bottom: '5px'}}>
                        {js_ago(new Date(item.order.date))}
                    </div>

                </div>
            
            </div>
        </>
     );
}
 
export default Card;