import CardCnt from "../../components/Buyer/dashboard/CardCnt";
import '../../styles/Buyer/xx-large-screen.css'
import '../../styles/Buyer/x-large-screen.css'
import '../../styles/Buyer/medium-screen.css'
import '../../styles/Buyer/small-screen.css'
import '../../styles/Buyer/large-screen.css'
import SearchBar from "../../components/Buyer/Header/SeachBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Ads from "../../components/Buyer/dashboard/Ads";
import FlashAds from "../../components/Buyer/dashboard/FlashAds";
import FlashSales from "../../components/Buyer/dashboard/FlashSales";
import Recommended from "../../components/Buyer/dashboard/Recommended";
import FilterAside from "../../components/Buyer/dashboard/FilterAside";
import Main from "../../components/Buyer/dashboard/Main";
const Dashboard = () => {

    let [screenWidth, setScreenWidth] = useState(0)

    let navigate = useNavigate()

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])
    
    return ( 
        <div className="buyer-main-cnt">  
            {/*<BuyerAside />*/}
            


            <Ads />

            <FlashAds />

            {/* <FlashSales />

            <Recommended /> */}
            <Main />
        </div>
     );
}
 
export default Dashboard;