import CardCnt from "../../components/Buyer/dashboard/CardCnt";
import '../../styles/Buyer/xx-large-screen.css'
import '../../styles/Buyer/x-large-screen.css'
import '../../styles/Buyer/medium-screen.css'
import '../../styles/Buyer/small-screen.css'
import '../../styles/Buyer/large-screen.css'
import '../../styles/Buyer/buy_now.css'
import '../../styles/filter.css'
import '../../styles/Buyer/semi-medium-screen.css'
import { useEffect, useId, useState } from "react"; 
import { useSelector } from "react-redux";
// import Lodge from '../../components/Buyer/dashboard/Lodge'

import BuyerLayout from '../../layout/Buyer'
import { 
    useLocation, 
    useNavigate 
} from "react-router-dom";
import SearchOutput from "../../components/Buyer/Header/SearchOutput";
import { 
    Helmet 
} from "react-helmet-async";
// import FlashSales from "../../components/Buyer/Dashboard/FlashSales";
import Ads from "../../components/Buyer/dashboard/Ads";
import mssg from '../../assets/messages-1-svgrepo-com (1).svg'
import { 
    NewVisitor 
} from "../../api/buyer/post";
// import PaidAds from "../../components/Buyer/Dashboard/PaidAds";
 
const Dashboard = () => {

    let [screenWidth, setScreenWidth] = useState(0)
    let location = useLocation()
    let navigate = useNavigate()
    let [activeJSX, setActiveJSX] = useState(<CardCnt />)
 
    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
        // document.body.style.background='orangered'
    }, [])

    let reactId = useId();
    useEffect(() => {

        if(localStorage.getItem('new-visitor')){
            let user = JSON.parse(localStorage.getItem('new-visitor'))
            let id = window.localStorage.getItem('CE_buyer_id')

            let userId = user.id;
            let visit = user.visit;
            let dates = user.date;

            let newVisit = visit + 1;
            let newDate = [...dates, new Date()];
    
            let str = {id: userId, date: newDate, visit: newVisit, isRegistered: id !== '' ? true : false, buyer_id: id !== '' ? id : ''}
            localStorage.setItem('new-visitor', JSON.stringify(str))

            NewVisitor(str)

        }else{
            let newVisitorID = reactId;
            let date = new Date();
            let visit = 1
    
            let str = {id: newVisitorID, date: [date], visit: visit}
    
            localStorage.setItem('new-visitor', JSON.stringify(str))
            NewVisitor(str)

        }

        
    }, []);

    useEffect(() => {

        if(location.pathname.split('/')[1] === 'search'){
            setActiveJSX(<SearchOutput />)
        }else{
            setActiveJSX(<CardCnt />)
        }
    }, [location])


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
                                <Ads />
                                {/* <PaidAds /> */}

                                {/* <FlashAds /> */}
                                {/* <Lodge /> */}
                                {/* <FlashSales />  */}
                            </>
                        :
                        ''
                    }

                    <br />
                    <br />
                    {/* <FlashSales /> */}

                    {/* <Recommended /> */}
                    
                </div>

                <div className="buyer-main-content buyer-main-cnt" style={{
                    // padding: '10px 80px 10px 80px',
                    background: '#fff',
                    height: 'fit-content',
                }}>
                    
                  {
                    activeJSX
                  }
                </div>

                <button className="shadow" style={{position: 'fixed', bottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', right: '20px', width: '60px', height: '60px', background: '#fff', borderRadius: '50%'}} onClick={e => navigate('/buyer.message')}>  
                    {/* <span style={{height: 'fit-content', marginTop: '-19px', borderRadius: '50%', width: '20px', fontSize: 'small', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'orangered', color: '#fff'}}> */}
                       
                    {/* </span> */}
                    {/* <span> */}
                        <img src={mssg} style={{height: '25px', width: '25px'}} alt="" />
                    {/* </span> */}
                    {/* <span>Messages</span>  */}

                </button>
            </BuyerLayout>

        </> 
     );
} 
 
export default Dashboard;
