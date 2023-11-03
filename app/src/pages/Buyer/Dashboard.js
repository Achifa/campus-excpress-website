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
const Dashboard = () => {
    return ( 
        <>  
            {/*<BuyerAside />*/}
            <Category />
            
            <Home />
        </>
     );
}
 
export default Dashboard;