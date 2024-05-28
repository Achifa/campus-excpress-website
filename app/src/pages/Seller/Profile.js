import '../../styles/Seller/x-large-screen.css'
import '../../styles/Seller/large-screen.css'
import '../../styles/Seller/medium-screen.css'
import '../../styles/Seller/small-screen.css'
import SellerLayout from "../../layout/Seller";
import TopView from "../../components/Seller/Profile/TopView";
import Body from "../../components/Seller/Profile/Body";
const Me = () => {
    return ( 
        <>
            <SellerLayout>
                <div className="seller-main">
                    <div className="seller-profile-cnt" style={{height: '100%'}}>

                        <TopView />
                        <Body />
                        
                    </div>

                </div>
            </SellerLayout>
        </>
     );
}
 
export default Me;