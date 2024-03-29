// import CardCnt from "../../components/Buyer/dashboard/CardCnt";
import '../../styles/Buyer/xx-large-screen.css'
import '../../styles/Buyer/x-large-screen.css'
import '../../styles/Buyer/medium-screen.css'
import '../../styles/Buyer/small-screen.css'
import '../../styles/Buyer/large-screen.css'
import '../../styles/Buyer/buy_now.css'
import '../../styles/Buyer/semi-medium-screen.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
// import Lodge from '../../components/Buyer/Dashboard/Lodge'

import BuyerLayout from '../../layout/Buyer'
// import Ads from '../../components/Buyer/Dashboard/Ads'
import CardCnt from '../../components/Buyer/Dashboard/CardCnt'
 
const Dashboard = () => {

    let [screenWidth, setScreenWidth] = useState(0)
 
    let navigate = useNavigate() 
 
    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
        document.body.style.background='orangered'
    }, [])

    let {category} = useSelector(s => s.Category)
    console.log(category)
   
    return ( 
        <>

            <BuyerLayout>
                <div className="buyer-main-cnt" style={{
                    height: 'fit-content',
                    background: '#fff',
                }}>  
                    {/*<BuyerAside />*/} 
                    
                

                    {
                        category === 'trends'
                        ?
                            <>
                                {/* <Ads /> */}
                                {/* <PaidAds /> */}

                                {/* <FlashAds /> */}
                                {/* <Lodge /> */}
                            </>
                        :
                        ''
                    }

                    {/* <br /> */}
                    {/* <FlashSales /> */}

                    {/* <Recommended /> */}
                    
                </div>

                <div className="buyer-main-content buyer-main-cnt" style={{
                    // padding: '10px 80px 10px 80px',
                    background: '#fff',
                    height: '100vh',
                }}>
                    {
                        screenWidth >  760
                        ?
                        ''
                        : 
                        ''
                    }
                    <CardCnt />
                </div>
            </BuyerLayout>

        </> 
     );
} 
 
export default Dashboard;