import { useEffect, useState } from "react";
import filterSvg from '../../../assets/filter-edit-svgrepo-com.svg'
// import dayjs from 'dayjs'
import greetPlugin from 'dayjs-greet'
import { useLocation, useNavigate } from "react-router-dom";
import usePath from "../../../hooks/usePath";
import { useDispatch, useSelector } from "react-redux";

 
const Header = () => {

    let {sellerData} = useSelector(s=> s.sellerData);

    let navigate = useNavigate()
    let location = useLocation()

    let path = usePath()
    dayjs.extend(greetPlugin)

    let [activeHead, setActiveHead] = useState('') 
    
   
    useEffect(() => {
        console.log(sellerData)
    }, [sellerData])

    useEffect(() => {

        let path = location.pathname.split('/').splice(-1)[0].split('.').splice(-1)[0]
        if(path === ''){
            setActiveHead(<h4 style={{fontFamily: 'cursive', textTransform: 'capitalize'}}> {sellerData?.fname} {sellerData?.lname}</h4>)
        }else if(path === 'editor'){
            setActiveHead(<h4 style={{fontFamily: 'cursive'}}>Sell</h4>)
        }else if(path === 'inbox'){
            setActiveHead(<h4 style={{fontFamily: 'cursive'}}>Inbox</h4>)
        }else if(path === 'shop'){
            setActiveHead(<h4 style={{fontFamily: 'cursive'}}>Listing</h4>)
        }
        else if(path === 'orders'){
        //     setActiveHead(<h4 style={{fontFamily: 'cursive'}}>Orders</h4>)
        // }else if(path === 'settings'){ 
            setActiveHead(<h4 style={{fontFamily: 'cursive'}}>Settings</h4>)
        }else if(path === 'wallet'){
            setActiveHead(<h4 style={{fontFamily: 'cursive'}}>Wallet</h4>)
        }else if(path === 'profile'){
            setActiveHead(<h4 style={{fontFamily: 'cursive'}}>Profile</h4>)
        }
    }, [location])

    
    return ( 
        <>
            <div className="seller-header shadow-sm" style={{
                width: location.pathname.split('/').splice(-1)[0] === 'seller.signup' || location.pathname.split('/').splice(-1)[0] === 'seller.login' || location.pathname.split('/').splice(-1)[0] === 'seller.reset-password' ? '100vw' : '',
                color: '#fff',
                textAlign: 'center',
                alignItems: 'center',
                display: 'flex',
                padding: '0',
                position: 'sticky',
                backgroundColor: '#fff',
                top: '0',
                fontWeight: '500',
                background: 'orangered',
                zIndex: '1000',
                backgroundImage: 'url(../../../images/download (5).jpeg)',
                backgroundClip: 'content-box',
                backgroundSize: 'contain'
            }}>
                <span>
                    <h2 style={{margin: '0 10px 0 10px', textTransform: 'capitalize'}}>{activeHead}</h2>
                </span>

                {
                    location.pathname.split('/').splice(-1)[0] === 'seller.shop' 
                    ?
                    <>
                        
                        <div className="dropdown" style={{
                            position: 'absolute',
                            right: '10px',
                            top: '12px'
                        }}>
                            <a className="btn btn-danger dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{background: 'orangered'}}>
                                <img src={filterSvg} style={{
                                    height: '20px', 
                                    width: '20px', 
                                    color: '#fff',
                                    position : 'absolute',
                                    right: '20px',
                                    top: '20px', 
                                    fontSize: 'medium',
                                }} alt="" />
                                Filter
                            </a>

                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Published</a></li>
                                <li><a className="dropdown-item" href="#">Rejected</a></li>
                                <li><a className="dropdown-item" href="#">Pending</a></li>
                            </ul>
                        </div>
                    </>
                    :
                    ''
                }

                {
                    location.pathname.split('/').splice(-1)[0] !== 'seller.signup' || location.pathname.split('/').splice(-1)[0] !== 'seller.login' || location.pathname.split('/').splice(-1)[0] !== 'seller.reset-password'
                    ?  
                    ''
                    : 
                    <span onClick={e=> path === 'signup' || path === 'login' ? navigate(`/seller.${path === 'signup' ? 'login' : 'signup'}`) : ''} 
                    style={{
                        color: 'orangered',
                        cursor: 'pointer',
                        float: 'right',
                        background: 'rgb(255,244,224)',
                        fontSize: 'small',
                        padding: '10px',
                        borderRadius: path === 'signup' || path === 'login' ? '5px' : '50%',
                        display: path === 'signup' || path === 'login' ? 'flex' : 'none'
                    }}>
                        {
                            path === 'signup' || path === 'login'
                            ?
                                <span 
                                style={{
                                    textTransform: 'capitalize'
                                }}>{path === 'signup' ? 'Login' : 'Signup'}</span>
                            : 

                            ''
                        }
                    </span>
                } 

               

            </div>

            
        </> 
     );
}
export default Header;                                                                                                       