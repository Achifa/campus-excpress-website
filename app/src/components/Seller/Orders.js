import img from '../../assets/download (3).jpeg'
import locationSvg from '../../assets/location-svgrepo-com-1.svg'
import deleteSvg from '../../assets/delete-svgrepo-com (1).svg'


const Orders = () => {
    return ( 
        <>
            <div className="seller-order-cnt">
                <div className="seller-order-card shadow-sm">
                    <img src={img} style={{height: '100%', float: 'left', width: '250px'}} alt="" />
                    
                    <div className="seller-order-body">
                        <img src={deleteSvg} style={{height: '25px', cursor: 'pointer', width: '25px', position: 'absolute', right: '15px', top: '15px'}} alt="" />

                        <div className="seller-order-title">
                            <h4>THICK (Men's Gold Cuban Link Chain)</h4>
                        </div>
                        <div className="seller-order-price">
                            <h3 style={{fontWeight: 'bolder'}}>&#8358;4500000 </h3>
                        </div>

                        <div className="seller-order-date">
                            2 days ago
                        </div>

                    </div>
                
                </div>
            </div>
        </>
     );
}
 
export default Orders;