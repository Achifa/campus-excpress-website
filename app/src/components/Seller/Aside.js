import { useNavigate } from 'react-router-dom';
import sellSvg from '../../assets/sell-svgrepo-com.svg'
import homeSvg from '../../assets/home-svgrepo-com (4).svg'
import settingsSvg from '../../assets/setting-svgrepo-com.svg'
import ordersSvg from '../../assets/order-completed-svgrepo-com.svg'
import walletSvg from '../../assets/wallet-money-svgrepo-com.svg'
import profileSvg from '../../assets/profile-circle-svgrepo-com (3).svg'
import shopSvg from '../../assets/shop-2-svgrepo-com.svg'
import mssgSvg from '../../assets/inbox-in-svgrepo-com.svg'

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
                            <span>
                                <img src={homeSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
                            </span>
                            &nbsp;                            &nbsp;
                            <span>Home</span>
                        </li>

                        <li onClick={e => navigate('/seller/editor')}>
                            <span>
                                <img src={sellSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
                            </span>
                            &nbsp;                            &nbsp;
                            <span>Create</span>
                        </li>

                        <li onClick={e => navigate('/seller/inbox')}>
                            <span>
                                <img src={mssgSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
                            </span>
                            &nbsp;                            &nbsp;
                            <span>Inbox</span>
                        </li>

                        <li onClick={e => navigate('/seller/shop')}>
                            <span>
                                <img src={shopSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
                            </span>
                            &nbsp;                            &nbsp;
                            <span>Shop</span>
                        </li>

                        <li onClick={e => navigate('/seller/orders')}>
                            <span>
                                <img src={ordersSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
                            </span>
                            &nbsp;                            &nbsp;
                            <span>Orders</span>
                        </li>

                    </ul>
                </div>

                <div className="seller-aside-nav-others">
                    <ul>
                        <li onClick={e => navigate('/seller/settings')}>
                            <span>
                                <img src={settingsSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
                            </span>
                            &nbsp;                            &nbsp;
                            <span>Settings</span>
                        </li>

                        <li onClick={e => navigate('/seller/wallet')}>
                            <span>
                                <img src={walletSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
                            </span>
                            &nbsp;                            &nbsp;
                            <span>Wallet</span>
                        </li>

                        <li onClick={e => navigate('/seller/profile')}>
                            <span>
                                <img src={profileSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
                            </span>
                            &nbsp;                            &nbsp;
                            <span>Profile</span>
                        </li>

                    </ul>
                </div>

            </div>
        </>
     );
}
 
export default Aside;