// import CardCnt from "../../components/Buyer/dashboard/CardCnt";
import '../../styles/Buyer/xx-large-screen.css'
import '../../styles/Buyer/x-large-screen.css'
import '../../styles/Buyer/medium-screen.css'
import '../../styles/Buyer/small-screen.css'
import '../../styles/Buyer/large-screen.css'
import '../../styles/Buyer/semi-medium-screen.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
// import Lodge from '../../components/Buyer/Dashboard/Lodge'
import FlashAds from '../../components/Buyer/Dashboard/FlashAds'
import Ads from '../../components/Buyer/Dashboard/Ads'
import Main from '../../components/Buyer/Dashboard/Main'
 
const Dashboard = () => {

    let [screenWidth, setScreenWidth] = useState(0)
 
    let navigate = useNavigate() 

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

    let {category} = useSelector(s => s.Category)
    console.log(category)
   
    return ( 
        <div className="buyer-main-cnt">  
            {/*<BuyerAside />*/}
            


            {
                category === 'trends'
                ?
                    <>
                        <Ads />

                        <FlashAds />
                        {/* <Lodge /> */}
                    </>
                :
                ''
            }

            {/* <FlashSales />

            <Recommended /> */}
            <Main />
        </div>
     );
}
 
export default Dashboard;