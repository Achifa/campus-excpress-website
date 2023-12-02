import img from '../../assets/download (3).jpeg'
import locationSvg from '../../assets/location-svgrepo-com-1.svg'
import deleteSvg from '../../assets/delete-svgrepo-com (1).svg'


const Orders = () => {
    return ( 
        <>
            <div className="seller-order-cnt">
                {/* <div className="seller-order-card shadow-sm">
                    <img src={img} alt="" />
                    
                    <div className="seller-order-body">
                        <img src={deleteSvg}alt="" />

                        <div className="seller-order-title">
                            <p>THICK (Men's Gold Cuban Link Chain)</p>
                        </div>
                        <div className="seller-order-id">
                            <p style={{fontWeight: 'bold'}}>Order code: #00013fg5A900</p>
                        </div>

                        <div className="seller-order-status">
                            Failed Order
                        </div>


                        <div className="seller-order-date">
                            2 days ago
                        </div>

                    </div>
                
                </div> */}

                <>
                    <br />
                    <small style={{color: 'orangered'}}>No order availble !</small>
                </>
            </div>
        </>
     );
}
 
export default Orders;