import img from '../../assets/download (3).jpeg'

const Shop = () => {
    return ( 
        <>
            <div className="seller-libs">
               {/* <div className="seller-libs-header ">
                    <div className='shadow-sm' style={{height: '100%', width: '100%'}}>

                    </div>
    </div>*/}


                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-x-lg-5 g-2 p-2">
                    <div className="cols">
                        <div className="card">
                        

                            <img src={img} style={{height: '200px', width: '100%', }} alt="" />
                            <div className="card-body" style={{position: 'relative'}}>
                                <div className="seller-item-title">THICK ( Men's Gold Cuban Link Chain )</div>
                                
                                <div className="seller-item-price">&#8358; 4500000</div>

                                <div className="seller-items-engagements">
                                    <div style={{marginLeft: '0'}}>0 impression</div>
                                    <div>0 views</div>
                                    <div>0 comments</div>
                                    <div>0 shares</div>
                                    <div>0 orders</div>
                                </div>
                            </div>
                            <div className="card-footer" style={{position: 'relative'}}>

                                <div style={{height: 'fit-content', width: 'fit-content', fontWeight: '500'}} >Posted 2 days ago</div>
                            </div>

                        </div>
                    </div>

                    
                </div>
            </div>
        </>
     );
}


 
export default Shop;