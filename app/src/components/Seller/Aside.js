import { useNavigate } from 'react-router-dom';
import shopSvg from '../../assets/business-office-business-store-front-place-of-business-svgrepo-com.svg'

const Aside = () => {

    let navigate = useNavigate();
    return ( 
        <>
            <div className="seller-aside">
                <div className="seller-aside-logo">
                    
                </div>
                
                <div className="seller-aside-nav">
                    <ul>
                        <li onClick={e => navigate('/seller/')}>
                            <span></span>
                            <span>Home</span>
                        </li>

                        <li onClick={e => navigate('/seller/editor')}>
                            <span></span>
                            <span>Create</span>
                        </li>

                        <li onClick={e => navigate('/seller/messages')}>
                            <span></span>
                            <span>Messages</span>
                        </li>

                        <li onClick={e => navigate('/seller/shop')}>
                            <span></span>
                            <span>Shop</span>
                        </li>

                        <li onClick={e => navigate('/seller/orders')}>
                            <span></span>
                            <span>Orders</span>
                        </li>

                    </ul>
                </div>

                <div className="seller-aside-nav-others">
                    <ul>
                        <li onClick={e => navigate('/seller/settings')}>
                            <span></span>
                            <span>Settings</span>
                        </li>

                        <li onClick={e => navigate('/seller/wallet')}>
                            <span></span>
                            <span>Wallet</span>
                        </li>

                        <li onClick={e => navigate('/seller/profile')}>
                            <span></span>
                            <span>Profile</span>
                        </li>

                    </ul>
                </div>

            </div>
        </>
     );
}
 
export default Aside;