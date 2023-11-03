import img from '../../assets/download (3).jpeg'
import locationSvg from '../../assets/location-svgrepo-com-1.svg'


const Orders = () => {
    return ( 
        <>
            <div className="seller-order-cnt">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-x-lg-5 g-2 p-2">
                    <div className="cols">
                        <div className="card">
                            <div style={{height: 'fit-content', width: 'fit-content', position: 'absolute', left: '10px', color: '#fff', top: '10px', fontWeight: '500', fontSize: 'medium', background: 'orangered', padding: '5px', borderRadius: '5px', zIndex: '1000'}} >
                                <img src={locationSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />

                                &nbsp;

                                <span style={{fontSize: 'small'}}>Unizik, Awka</span>
                            </div>

                            <img src={img} style={{height: '200px', width: '100%', }} alt="" />
                            <div className="card-body">
                                <div className="order-title">THICK ( Men's Gold Cuban Link Chain )</div>
                                <div style={{height: 'fit-content', width: 'fit-content', position: 'absolute', right: '10px', color: 'orangered', bottom: '18px', fontWeight: '400', fontSize: 'medium'}} >2 out of 10 orders</div>
                                <div className="order-price">&#8358; 4500000</div>
                            </div>
                            <div className="card-footer">
                                <img src={img} style={{height: '30px', width: '30px', borderRadius: '50%'}} alt="" />

                                <div style={{height: 'fit-content', width: 'fit-content', position: 'absolute', left: '50px', bottom: '12px', fontWeight: '500', fontSize: 'small'}} >Jacob.N.N</div>

                                <div style={{height: 'fit-content', width: 'fit-content', position: 'absolute', right: '10px', top: '15px', fontWeight: '500', fontSize: 'small'}} >Ordered 2 days ago</div>
                            </div>

                        </div>
                    </div>

                    
                </div>
            </div>
        </>
     );
}
 
export default Orders;