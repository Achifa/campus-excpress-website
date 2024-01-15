import { useEffect, useState } from "react";
import img from '../../../images/Campus express (3).png'

import { useLocation, useNavigate } from "react-router-dom";
import { AuthenticateSeller } from "../../../api/seller";
import { GetSeller, ResetPwd } from '../../../api/seller';
import { socket } from "../../../socket";
import Menu from "./MenuBtn";
import Nav from "./Nav";

 
const Header = () => {

    let navigate = useNavigate()

    let [screenWidth, setScreenWidth] = useState(0)
    let [activeHead, setActiveHead] = useState('')

    useEffect(() => { 
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

    useEffect(() => {
        AuthenticateSeller(window.localStorage.getItem('CE_seller_id'))
        .then((result) => {

            if(!result){
                navigate('seller/login')
            }
        })
        .catch((err) => console.log(err))
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

    let [userData, setUserData] = useState('')

    useEffect(() => {
        GetSeller(window.localStorage.getItem('CE_seller_id'))
        .then((result) => {
            setUserData(result)
            console.log(result)
        }) 
        .catch((err) => console.log(err))
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
        }else if(path === 'orders'){
            setActiveHead(<h4 style={{fontFamily: 'cursive'}}>Orders</h4>)
        }else if(path === 'settings'){ 
            setActiveHead(<h4 style={{fontFamily: 'cursive'}}>Settings</h4>)
        }else if(path === 'wallet'){
            setActiveHead(<h4 style={{fontFamily: 'cursive'}}>Wallet</h4>)
        }else if(path === 'profile'){
            setActiveHead(<h4 style={{fontFamily: 'cursive'}}>Profile</h4>)
        }
    }, [location])

    
    return ( 
        <>
            <div className="seller-header" style={{width: location.pathname.split('/').splice(-1)[0] === 'signup' || location.pathname.split('/').splice(-1)[0] === 'login' || location.pathname.split('/').splice(-1)[0] === 'reset-password' ? '100%' : '', color: 'orangered', textAlign: 'center', alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
                <img src={img} style={{height: '35px', width: '35px', position: 'absolute', left: '10px', top: '5px',  color: '#fff', fontSize: 'medium', display: screenWidth <= 760 ? 'flex' : 'none'}} alt="" />

                


                {
                    location.pathname.split('/').splice(-1)[0] === 'signup' || location.pathname.split('/').splice(-1)[0] === 'login' || location.pathname.split('/').splice(-1)[0] === 'reset-password'
                    ?  
                    <h3>Campus Express</h3>
                    : 
                    <Menu handleMenu={handleMenu} />
                }
                 

            </div>

            <div className="seller-nav" style={{marginTop: '15px', position: 'relative'}}>
                <Nav />
            </div>
        </>
     );
}
 
export default Header;                                                                                                      