import { useEffect, useState } from "react";
import img from '../../../images/download (5).jpeg'
import filterSvg from '../../../assets/filter-edit-svgrepo-com.svg'

import { useLocation, useNavigate } from "react-router-dom";
import { socket } from "../../../socket";
import Menu from "./MenuBtn";
import Nav from "./Nav";
import usePath from "../../../hooks/usePath";
import { GetSeller } from "../../../api/seller/get";

 
const Header = () => {

    let navigate = useNavigate()

    let [screenWidth, setScreenWidth] = useState(0)
    let [activeHead, setActiveHead] = useState('')

    useEffect(() => { 
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

    useEffect(() => {
        // AuthenticateSeller(window.localStorage.getItem('CE_seller_id'))
        // .then((result) => {

        //     if(!result){
        //         navigate('/seller.login')
        //     }
        // })
        // .catch((err) => console.log(err))
    }, [])

    let handleMenu = e => {
        let menu = document.querySelector('.seller-aside');
        let overlay = document.querySelector('.seller-aside-overlay');
        let isMenuVisible = menu.hasAttribute('id') ? true : false
        let isOverlayVisible = menu.hasAttribute('id') ? true : false

        if(isMenuVisible && isOverlayVisible){
            menu.removeAttribute('id')
            overlay.removeAttribute('id')
        }else{
            overlay.setAttribute('id', 'seller-aside-overlay')
            setTimeout(() => {
            menu.setAttribute('id', 'seller-aside')
                
            }, 0);
        }

    }

    let location = useLocation()

    let path = usePath()

    let [userData, setUserData] = useState('')

    useEffect(() => {
        async function getData(){
            let result = await GetSeller(window.localStorage.getItem('CE_seller_id'))
            setUserData(result)
            console.log(result)
        }
        getData()
    }, [])

    let [greetings, setGreeting] = useState('Hello')

    socket.emit('getTime', {})

    socket.on('greetings', greeting => {
        setGreeting(greeting)
    })

    useEffect(() => {
        let path = location.pathname.split('/').splice(-1)[0]
        if(path === ''){
            setActiveHead(<h4 style={{fontFamily: 'cursive', textTransform: 'capitalize'}}>{greetings} {userData.lname}</h4>)
        }else if(path === 'editor'){
            setActiveHead(<h4 style={{fontFamily: 'cursive'}}>Sell</h4>)
        }else if(path === 'inbox'){
            setActiveHead(<h4 style={{fontFamily: 'cursive'}}>Inbox</h4>)
        }else if(path === 'shop'){
            setActiveHead(<h4 style={{fontFamily: 'cursive'}}>Items for sale</h4>)
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
                color: 'orangered',
                textAlign: 'center',
                alignItems: 'center',
                display: 'flex',
                // justifyContent: 'space-between',
                padding: '0',
                
                position: 'sticky',
                backgroundColor: '#fff',
                top: '0',
                fontWeight: '500',
                background: location.pathname.split('/').splice(-1)[0] === 'seller' ? 'orangered' : '#fff',
                zIndex: '1000',
                // height: location.pathname.split('/').splice(-1)[0] === 'seller' ? '40%' : '60px',
                backgroundImage: 'url(../../../images/download (5).jpeg)',
                backgroundClip: 'content-box',
                backgroundSize: 'contain'
            }}>
            
                {/* <img src={img} style={{height: screenWidth <= 760 ? '45px' : '50px', width: screenWidth <= 760 ? '45px' : '50px', color: '#fff', fontSize: 'medium', marginTop: screenWidth <= 760 ? '5px' : '0', display: 'flex'}} alt="" /> */}

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
                                {/* <img src={filterSvg} style={{
                                    height: '20px', 
                                    width: '20px', 
                                    color: '#fff',
                                    position : 'absolute',
                                    right: '20px',
                                    top: '20px', 
                                    fontSize: 'medium',
                                }} alt="" /> */}
                                Filter
                            </a>

                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Published</a></li>
                                <li><a className="dropdown-item" href="#">Rejected</a></li>
                                {/* <li><a className="dropdown-item" href="#">Pending</a></li> */}
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

                {
                    screenWidth > 760
                    ?
                    <>
                       

                        {/* <div className="input-cnt" style={{
                            width: '100%',
                            position: 'absolute',
                            bottom: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <input 
                            style={{
                                width: '400px',
                                display: screenWidth > 480 && location.pathname.split('/').splice(-1)[0] === 'seller' ? 'flex' : 'none',
                            }} type="search" name="" id="" placeholder="" />
                        </div> */}

                        {/* <ul style={{
                            listStyleType: 'none',
                            display: location.pathname.split('/').splice(-1)[0] === 'seller' ? 'flex' : 'none',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            position: 'absolute',
                            right: '20px',
                            top: '35px'
                        }}>

                            <li onClick={e => navigate('/seller.message')} style={{
                                background: '#fff',
                                color: 'orangered',
                                padding: '10px',
                                margin: '0 10px 0 10px',
                                borderRadius: '5px',
                                fontWeight: '500',
                                fontSize: 'medium',
                                cursor: 'pointer',
                                textTransform: 'capitalize'
                            }}>message</li>
                            <li onClick={e => navigate('/seller.shop')} style={{
                                background: '#fff',
                                color: 'orangered',
                                padding: '10px',
                                margin: '0 10px 0 10px',
                                borderRadius: '5px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                fontSize: 'medium',
                                textTransform: 'capitalize'
                            }}>ads</li>
                            <li onClick={e => navigate('/seller.profile')} style={{
                                background: '#fff',
                                color: 'orangered',
                                padding: '10px',
                                margin: '0 10px 0 10px',
                                cursor: 'pointer',
                                borderRadius: '5px',
                                fontWeight: '500',
                                fontSize: 'medium',
                                textTransform: 'capitalize'
                            }}>profile</li>

                        </ul> */}
                    </>
                    :
                    "" 
                }
                  

            </div>

            
        </> 
     );
}
export default Header;                                                                                                       