import Wallets from "../../components/Seller/Wallet/Wallet";
import '../../styles/Seller/overlays.css';
import '../../styles/Seller/x-large-screen.css'
import '../../styles/Seller/large-screen.css'
import '../../styles/Seller/medium-screen.css'
import '../../styles/Seller/small-screen.css'
import SellerLayout from "../../layout/Seller";
const Wallet = () => {
    return ( 
        <>
            <div className="seller-main">
                <SellerLayout>

                    <Wallets />

                </SellerLayout>

            </div>
        </>
     );
}
 
export default Wallet;