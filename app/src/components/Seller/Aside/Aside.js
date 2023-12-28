import { useNavigate } from 'react-router-dom';
import sellSvg from '../../../assets/sell-svgrepo-com.svg'
import homeSvg from '../../../assets/home-svgrepo-com (4).svg'
import settingsSvg from '../../../assets/setting-svgrepo-com.svg'
import ordersSvg from '../../../assets/order-completed-svgrepo-com.svg'
import walletSvg from '../../../assets/wallet-money-svgrepo-com.svg'
import profileSvg from '../../../assets/profile-circle-svgrepo-com (3).svg'
import shopSvg from '../../../assets/shop-2-svgrepo-com.svg'
import mssgSvg from '../../../assets/inbox-in-svgrepo-com.svg'
import { useEffect, useState } from 'react';
import { GetSeller } from '../../../api/seller';
import closeSvg from '../../../assets/close-square-svgrepo-com (1).svg'

const Aside = () => {

    let navigate = useNavigate();

    let handleMenu = e => {
        let menu = document.querySelector('.seller-aside-overlay');
        let isMenuVisible = menu.hasAttribute('id') ? true : false
        if(isMenuVisible){
            menu.removeAttribute('id')
        }else{
            menu.setAttribute('id', 'seller-aside-overlay')
        }

    }

    function setActiveMenu(e) {
        let list = [...document.querySelectorAll('.aside-list-item')];
        let activeElem = list.filter(item => item.lastChild.hasAttribute('id'))[0];
        activeElem.lastChild.removeAttribute('id')
        
        e.currentTarget.lastChild.setAttribute('id', 'aside-list-item')
        handleMenu()
    }

    let [user, setUser] = useState('...')

    useEffect(() => {
        GetSeller(window.localStorage.getItem('CE_seller_id'))
        .then((result) => {
            setUser(result)
            console.log(result)
        }) 
        .catch((err) => console.log(err))
    }, [])

    function closeAside(params) {
        document.querySelector('.seller-aside-overlay').removeAttribute('id')
    
    }
    return ( 
        <>
            <div className="seller-aside-overlay">
                <div onClick={closeAside} className="aside-close">
                    <img src={closeSvg} style={{height: '30px', width: '30px'}} alt="" />
                </div>
                <div className="seller-aside">
                    <div className="seller-aside-logo">
                        <span>
                            <h4>
                                {
                                    user.fname?.split('')[0] + user.lname?.split('')[0] 
                                }
                            </h4>
                        </span>
                        <span>
                            <small>
                                {
                                    user.fname + " " + user.lname 
                                }
                            </small>
                        </span>

                    </div>
                    
                    <div className="seller-aside-nav">
                        <ul>
                            <li  className="aside-list-item" onClick={e => {setActiveMenu(e);; navigate('/seller/')}}>
                                <span>
                                    <img src={homeSvg} style={{height: '15px', width: '15px', marginBottom: '5px'}} alt="" />
                                </span>
                                &nbsp;                            &nbsp;
                                <span id='aside-list-item'>Home</span>
                            </li>

                            <li className="aside-list-item" onClick={e => {setActiveMenu(e); navigate('/seller/editor')}}>
                                <span>
                                    <img src={sellSvg} style={{height: '15px', width: '15px', marginBottom: '5px'}} alt="" />
                                </span>
                                &nbsp;                            &nbsp;
                                <span>Sell</span>
                            </li>

                            <li className="aside-list-item" onClick={e => {setActiveMenu(e); navigate('/seller/inbox')}}>
                                <span>
                                    <img src={mssgSvg} style={{height: '15px', width: '15px', marginBottom: '5px'}} alt="" />
                                </span>
                                &nbsp;                            &nbsp;
                                <span>Inbox</span>
                            </li>

                            <li className="aside-list-item" onClick={e => {setActiveMenu(e); navigate('/seller/shop')}}>
                                <span>
                                    <img src={shopSvg} style={{height: '15px', width: '15px', marginBottom: '5px'}} alt="" />
                                </span>
                                &nbsp;                            &nbsp;
                                <span>Shop</span>
                            </li>

                            <li className="aside-list-item" onClick={e => {setActiveMenu(e); navigate('/seller/orders')}}>
                                <span>
                                    <img src={ordersSvg} style={{height: '15px', width: '15px', marginBottom: '5px'}} alt="" />
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
                                    <img src={settingsSvg} style={{height: '15px', width: '15px', marginBottom: '5px'}} alt="" />
                                </span>
                                &nbsp;                            &nbsp;
                                <span>Settings</span>
                            </li>

                            <li className="aside-list-item" onClick={e => {setActiveMenu(e); navigate('/seller/wallet')}}>
                                <span>
                                    <img src={walletSvg} style={{height: '15px', width: '15px', marginBottom: '5px'}} alt="" />
                                </span>
                                &nbsp;                            &nbsp;
                                <span>Wallet</span>
                            </li>

                            

                            {/* <li onClick={e => {setActiveMenu(e); navigate('/seller/profile')}}>
                                <span>
                                    <img src={profileSvg} style={{height: '15px', width: '15px', marginBottom: '5px'}} alt="" />
                                </span>
                                &nbsp;                            &nbsp;
                                <span>Logout</span>
                            </li> */}

                        </ul>
                    </div>

                </div>
            </div>
        </>
     );
}
 
export default Aside;