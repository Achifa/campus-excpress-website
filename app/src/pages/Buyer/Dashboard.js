import BuyerAside from "../../components/Buyer/Aside";
import Aside from "../../components/Buyer/Aside";
import Category from "../../components/Buyer/Category";
import Home from "../../components/Buyer/Dashboard";
import Header from "../../components/Buyer/Header";
import '../../styles/Buyer/xx-large-screen.css'
import '../../styles/Buyer/x-large-screen.css'
import '../../styles/Buyer/medium-screen.css'
import '../../styles/Buyer/small-screen.css'
import '../../styles/Buyer/large-screen.css'
import SearchBar from "../../components/SeachBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const Dashboard = () => {

    let [screenWidth, setScreenWidth] = useState(0)

    let navigate = useNavigate()

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])
    
    return ( 
        <>  
            {/*<BuyerAside />*/}
            {
                screenWidth > 479
                ?
                ''
                :
                <SearchBar />
            }

            <Category />
            
            <Home />
        </>
     );
}
 
export default Dashboard;