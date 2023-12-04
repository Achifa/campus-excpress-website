import { useNavigate } from 'react-router-dom';
import sellSvg from '../../assets/sell-svgrepo-com.svg'
import homeSvg from '../../assets/home-svgrepo-com (4).svg'
import settingsSvg from '../../assets/setting-svgrepo-com.svg'
import ordersSvg from '../../assets/order-completed-svgrepo-com.svg'
import walletSvg from '../../assets/wallet-money-svgrepo-com.svg'
import profileSvg from '../../assets/profile-circle-svgrepo-com (3).svg'
import shopSvg from '../../assets/shop-2-svgrepo-com.svg'
import mssgSvg from '../../assets/inbox-in-svgrepo-com.svg'
import { useEffect } from 'react';

const Aside = () => {

    let navigate = useNavigate();

    let handleMenu = e => {
        let menu = document.querySelector('.seller-aside');
        let isMenuVisible = menu.hasAttribute('id') ? true : false
        if(isMenuVisible){
            menu.removeAttribute('id')
        }else{
            menu.setAttribute('id', 'seller-aside')
        }

    }

    function setActiveMenu(e) {
        let list = [...document.querySelectorAll('.aside-list-item')];
        let activeElem = list.filter(item => item.lastChild.hasAttribute('id'))[0];
        activeElem.lastChild.removeAttribute('id')
        
        e.currentTarget.lastChild.setAttribute('id', 'aside-list-item')
        handleMenu()
    }

    useEffect(() => {
        
    },[])
    return ( 
        <>
            <div className="seller-aside">
                <div className="seller-aside-logo">
                    Campus Express
                </div>
                
                <div className="seller-aside-nav">
                    <ul>
                        <li  className="aside-list-item" onClick={e => {setActiveMenu(e);; navigate('/seller/')}}>
                            <span>
                                <img src={homeSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
                            </span>
                            &nbsp;                            &nbsp;
                            <span id='aside-list-item'>Home</span>
                        </li>

                        <li className="aside-list-item" onClick={e => {setActiveMenu(e); navigate('/seller/editor')}}>
                            <span>
                                <img src={sellSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
                            </span>
                            &nbsp;                            &nbsp;
                            <span>Create</span>
                        </li>

                        <li className="aside-list-item" onClick={e => {setActiveMenu(e); navigate('/seller/inbox')}}>
                            <span>
                                <img src={mssgSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
                            </span>
                            &nbsp;                            &nbsp;
                            <span>Inbox</span>
                        </li>

                        <li className="aside-list-item" onClick={e => {setActiveMenu(e); navigate('/seller/shop')}}>
                            <span>
                                <img src={shopSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
                            </span>
                            &nbsp;                            &nbsp;
                            <span>Shop</span>
                        </li>

                        <li className="aside-list-item" onClick={e => {setActiveMenu(e); navigate('/seller/orders')}}>
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
                        <li className="aside-list-item" onClick={e => {setActiveMenu(e); navigate('/seller/settings')}}>
                            <span>
                                <img src={settingsSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
                            </span>
                            &nbsp;                            &nbsp;
                            <span>Settings</span>
                        </li>

                        <li className="aside-list-item" onClick={e => {setActiveMenu(e); navigate('/seller/wallet')}}>
                            <span>
                                <img src={walletSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
                            </span>
                            &nbsp;                            &nbsp;
                            <span>Wallet</span>
                        </li>

                        {/* <li onClick={e => {setActiveMenu(e); navigate('/seller/profile')}}>
                            <span>
                                <img src={profileSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
                            </span>
                            &nbsp;                            &nbsp;
                            <span>Profile</span>
                        </li> */}

                    </ul>
                </div>

            </div>
        </>
     );
}
 
export default Aside;