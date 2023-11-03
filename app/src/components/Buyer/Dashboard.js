import { useEffect, useState } from "react";
import img from '../../assets/download (3).jpeg'
import locationSvg from '../../assets/location-svgrepo-com-1.svg'
import timeSvg from '../../assets/clock-svgrepo-com.svg'
import saveSvg from '../../assets/save-svgrepo-com.svg'
import orderSvg from '../../assets/order-svgrepo-com (1).svg'
import conditionSvg from '../../assets/condition-point-svgrepo-com.svg'
import { useNavigate } from "react-router-dom";

const Home = () => {
    let [screenWidth, setScreenWidth] = useState(0)

    let navigate = useNavigate()

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])
    return ( 
        <>
            <div className="buyer-dashboard-body">

                {
                    [1,2,3,4,5,6,7,8].map((item) => 
                        <div className="cols" >
                            <div className="card" onClick={e => navigate('/buyer/product')}>
                                <span  style={{background: 'orangered', position: 'absolute',color: '#000', borderRadius: '5px', top: '20px', left: '20px', padding: '5px'}}>
                                    <span  style={{background: 'orangered',color: 'orangered', padding: '0'}}>
                                        <img src={locationSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />

                                    </span>
                                    &nbsp;

                                    <span  style={{background: 'orangered',color: '#fff', padding: '0',  fontSize: 'small', fontWeight: '500'}}>
                                        UNIZIK, Awka
                                    </span>
                                </span>
                                <img src={img} style={{height: '250px', width: '100%', borderRadius: '2.5px'}} alt="" />

                                <div className="card-body">
                                    <h3 >Men's Gold Cuban Link Chain  Labelled with designers For Fashion And Can Serve As Corporate Outfit</h3>

                                    <hr />
                                    
                                    <h4 style={{marginBottom: '10px', fontWeight: '700'}}>&#8358;20000</h4>

                                    <div style={{display: 'flex',background: '#fff', color: 'orangered',  alignItems: 'center', padding: '0'}}>
                                    <span  style={{background: '#fff', color: '#000', borderRadius: '5px', top: '20px', left: '20px', padding: '5px'}}>
                                        <span  style={{background: '#fff',color: 'orangered', padding: '0'}}>
                                            <img src={conditionSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />

                                        </span>
                                        &nbsp;

                                        <span  style={{background: '#fff',color: 'rgb(98, 98, 98)', padding: '0',  fontSize: 'small', fontWeight: '500'}}>
                                            Used
                                        </span>
                                    </span>
                                        
                                        
                                    </div>


                                    <div style={{position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', right: '5px', bottom: '35px', background: '#fff', color: '#626262'}}>
                                        <img src={saveSvg} style={{height: '35px', width: '35px', position: 'relative',  margin: 'auto'}} alt="" />
                                        <section style={{marginTop: '-8px'}}>
                                            save
                                        </section>
                                    </div>

                                    <div style={{position: 'absolute', right: '5px', bottom: '5px', fontSize: 'small', background: '#fff', color: '#626262'}}>
                                        <span>
                                            <img src={orderSvg} style={{height: '20px', width: '20px', marginBottom: '3px'}} alt="" />

                                        </span>
                                        &nbsp;
                                        <span>
                                            20 Orders
                                        </span>
                                    </div>
                                </div>

                                <button>
                                    Add To Cart
                                </button>
                                {/*<br />*/}

                                {/*<div className="card-footer">
                                    <img src={img} style={{height: '30px', width: '30px', borderRadius: '10px'}} alt="" />

                                    <div style={{height: 'fit-content', width: 'fit-content', position: 'absolute', left: '40px', bottom: '5px', fontWeight: '800', fontSize: 'small'}} >Jacob.N.N</div>

                                    <div style={{position: 'absolute', right: '5px', bottom: '5px', color: '#626262', fontSize: 'small', fontWeight: '500'}}>
                                        <span>
                                            <img src={timeSvg} style={{height: '20px', width: '20px', marginBottom: '3px'}} alt="" />

                                        </span>
                                        &nbsp;
                                        <span>
                                            2 days ago
                                        </span>
                                    </div>
        </div>*/}

                            </div>
                        </div> 
                    )
                }
                
            </div>

        </>
     );
}
 
export default Home;