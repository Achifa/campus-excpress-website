import CardCnt from "../../components/Buyer/Dashboard/CardCnt";
import '../../styles/Buyer/xx-large-screen.css'
import '../../styles/Buyer/x-large-screen.css'
import '../../styles/Buyer/medium-screen.css'
import '../../styles/Buyer/small-screen.css'
import '../../styles/Buyer/large-screen.css'
import '../../styles/Buyer/buy_now.css'
import '../../styles/filter.css'
import '../../styles/Buyer/semi-medium-screen.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Helmet from 'react-helmet'
import { useSelector } from "react-redux";
// import Lodge from '../../components/Buyer/Dashboard/Lodge'

import BuyerLayout from '../../layout/Buyer'
import Filter from "../../components/Buyer/Header/Filter";
 
const Dashboard = () => {

    let [screenWidth, setScreenWidth] = useState(0)
 
    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
        document.body.style.background='orangered'
    }, [])

    let {storedCategory} = useSelector(s => s.storedCategory)
   
    return ( 
        <>

            <BuyerLayout>

                <Helmet>
                    <meta name="title" content={`Campus Express (Connecting Campus Express)`} />
                    <meta name="description" content={`Shop category is ${storedCategory}`} />
                    {/* <meta name="google-site-verification" content="+nxGUDJ4QpAZ5l9Bsjdi102tLVC21AIh5d1Nl23908vVuFHs34=" /> */}
                    <meta name="robots" content="index,follow" />
                    <meta name="googlebot" content="index,follow" />
                    <meta name="google" content="sitelinkssearchbox" />

                    {/* FaceBook Tags */}
                    <meta property="og:site_name" content="Campus Express (Connecting Campus Express)" />
                    <meta property="og:title" content="Campus Express (Connecting Campus Express)" />
                    <meta property="og:description" content={`Shop category is ${storedCategory}`} />
                    {/* <meta property="og:image" itemprop="image" content="http://pollosweb.wesped.es/programa_pollos/play.png" /> */}
                    <meta property="og:type" content="website" />
                    <meta property="og:url"  content="https://www.campusexpressng.com" />
                    {/* <meta property="og:updated_time" content="1440432930" /> */}

                    {/* Twitter */}
                    <meta name="twitter:title" content="Campus Express (Connecting Campus Express)" />
                    <meta name="twitter:description" content={`Shop category is ${storedCategory}`} />
                    <meta name="twitter:card" content="summary_large_image" />
                </Helmet>

                <div className="buyer-main-cnt" style={{
                    height: 'fit-content',
                    background: '#fff',
                }}>  
                
                    {/*<BuyerAside />*/} 
                    
                

                    {
                        storedCategory === 'trends'
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
                    
                  <CardCnt />
                </div>
            </BuyerLayout>

        </> 
     );
} 
 
export default Dashboard;
