import img from '../../assets/download (3).jpeg'
import fbSvg from '../../assets/facebook-1-svgrepo-com (1).svg'
import tweeterSvg from '../../assets/twitter-svgrepo-com (2).svg'
import WhatsAppSvg from '../../assets/whatsapp-whats-app-svgrepo-com.svg'


const Product = () => {

    let BtnStyles = {
        height: '50px',
        width: '20%',
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px',
        outline: 'none',
        border: 'none',
        float: 'left',
        color: '#fff',
        fontSize: 'small',
        fontWeight: '500',
        backgroundColor: 'orangered',
        margin: '0'
    }
    return ( 
        <>
            <div className="buyer-product">
                <div className="buyer-product-cnt">
                    <div className="buyer-product-data">
                        <div id="left">
                            <div className="img-cnt">
                                <img src={img} style={{height: '100%', width: '100%', borderRadius: '5px'}} alt="" />
                            </div>
                            <div className="img-list-cnt">
                                <div>
                                    <img src={img} style={{height: '100%', width: '100%', borderRadius: '5px'}} alt="" />
                                </div>
                                <div>
                                    <img src={img} style={{height: '100%', width: '100%', borderRadius: '5px'}} alt="" />
                                </div>
                                <div>
                                    <img src={img} style={{height: '100%', width: '100%', borderRadius: '5px'}} alt="" />
                                </div>
                                <div>
                                    <img src={img} style={{height: '100%', width: '100%', borderRadius: '5px'}} alt="" />
                                </div>
                                <div>
                                    <img src={img} style={{height: '100%', width: '100%', borderRadius: '5px'}} alt="" />
                                </div>
                                <div>
                                    <img src={img} style={{height: '100%', width: '100%', borderRadius: '5px'}} alt="" />
                                </div>
                            </div>
                        </div>

                        <div id="right">

                            <h3>Men's Gold Cuban Link Chain  Labelled with designers For Fashion And Can Serve As Corporate Outfit</h3>

                            <section>
                                <div>
                                    <span><span style={{color: '#626262'}}>Seller :</span> <span style={{color: 'orangered'}}>Jacob N.N</span></span> <span>&#x2022;</span> <span><span style={{color: '#626262'}}>Product Code: </span> <span style={{color: 'orangered', fontWeight: '700'}}>2220081</span></span>
                                </div>
                                <div>
                                    <span><span style={{color: '#626262'}}>Seller Rating:</span> <span style={{color: 'orangered'}}>Jacob N.N</span></span>
                                </div>

                               
                            </section>
                            <hr />

                            <h2 style={{fontWeight: '700', padding: '20px'}}>
                                &#8358;20000
                            </h2>

                            <hr />
                            <br />

                            <button style={BtnStyles}>
                                <h4>Buy</h4> 
                            </button>

                           

                            <section style={{fontWeight: '700', padding: '20px'}}>
                                &nbsp;
                                <hr />
                                <small>Payment Must Be Made Via Campus Express Platform To Avoid Fraud Else You Can <b>Trade With The Seller Outside The Platform At Your Own Risk.</b></small>
                            </section>

                            <section style={{fontWeight: '500', display: 'flex', flexDirection: 'column', padding: '20px', position: 'relative', width: '100%',}}>
                                <div>Share With Your Friends</div>
                                <ul>
                                    <li style={{border: 'none', padding: '0',cursor: 'pointer'}}>
                                        <img src={fbSvg} style={{height: '35px', width: '35px', position: 'relative', margin: '0'}} alt="" />
                                    </li>

                                    <li style={{border: 'none', padding: '0',cursor: 'pointer'}}>
                                        <img src={tweeterSvg} style={{height: '35px', width: '35px', position: 'relative', margin: '0'}} alt="" />
                                    </li>

                                    <li style={{border: 'none', padding: '0',cursor: 'pointer'}}>
                                        <img src={WhatsAppSvg} style={{height: '35px', width: '35px', position: 'relative', margin: '0'}} alt="" />
                                    </li>
                                </ul>

                                <button style={{position: 'absolute', right: '2px', bottom: '20px', width: 'fit-content', padding: '10px 20px 10px 20px'}}>
                                    Make An Offer
                                </button>
                            </section>


                        </div>
                    </div>

                    <div className="buyer-product-description">
                        <h4 style={{padding:'10px'}}>Description</h4>
                        <section style={{padding: '10px'}}>
                            Ray Ban Foldable Wayfarer sunglasses Tortoise

                            classic and style, eye protection and comfort at the same time. All great and elegant feeling with the private dark shades/ lens. The foldable feature makes it amazing and can be folded in the pocket safely. Includes the box , the cloth lens cleaner and the sunglasses.  

                            Ray Ban Foldable Wayfarer sunglasses Tortoise

                            classic and style, eye protection and comfort
                        </section>
                    </div>

                    <div className="buyer-product-related-items">
                        <h4 style={{padding:'10px'}}>Similar Items You May Like</h4>


                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        
                    </div>

                    <div className="buyer-product-seller-details">

                        <section className="buyer-seller-history">
                            <h4>Seller's History  (10)</h4>
                            <br />

                            <ul>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                            </ul>

                        </section>

                        {/*<section className="buyer-seller-products">
                            <h4>Seller's Products  (10)</h4>
                            <ul>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                                <li className="shadow-sm"></li>
                            </ul>
    </section>*/}

                    </div>

                </div>
            </div>
        </>
     );
}
 
export default Product;