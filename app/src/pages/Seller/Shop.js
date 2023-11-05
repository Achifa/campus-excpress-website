import img from '../../assets/download (3).jpeg'
import deleteSvg from '../../assets/delete-svgrepo-com (1).svg'

const Shop = () => {
    return ( 
        <>
            <div className="seller-libs">
               {
                [1,2,3,4,5,6].map((item, index) => {
                    return(
                        <div className="seller-libs-card shadow-sm">
                            <img src={img} style={{height: '100%', float: 'left', width: '250px'}} alt="" />

                            <div className="seller-libs-body">

                                <img src={deleteSvg} style={{height: '25px', width: '25px', position: 'absolute', right: '15px', top: '15px'}} alt="" />
                                <div className='seller-item-title'>
                                    <h4>THICK (Men's Gold Cuban Link Chain)</h4>
                                </div>


                                <div className="seller-item-price">
                                    <h3 style={{fontWeight: 'bolder'}}>&#8358;4500000 </h3>
                                </div>

                                <div className="seller-item-spec">
                                    <ul>
                                        <li>
                                            <div>0</div>
                                            <div>Impession</div>
                                        </li>
                                        <li>
                                            <div>0</div>
                                            <div>Views</div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="seller-items-date">
                                    2 days ago
                                </div>
                            </div>
                        </div>


                    )
                })
               }
            </div>
        </>
     );
}


 
export default Shop;