import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthenticateSeller } from "../../api/seller";
import menuSvg from '../../assets/menu-grid-svgrepo-com (1).svg'
import { GetSeller, ResetPwd } from '../../api/seller';
import { socket } from "../../socket";

 
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
        let isMenuVisible = menu.hasAttribute('id') ? true : false
        if(isMenuVisible){
            menu.removeAttribute('id')
        }else{
            menu.setAttribute('id', 'seller-aside')
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
            <div className="seller-header shadow-sm" style={{width: location.pathname.split('/').splice(-1)[0] === 'signup' || location.pathname.split('/').splice(-1)[0] === 'login' || location.pathname.split('/').splice(-1)[0] === 'reset-password' ? '100%' : '', color: 'orangered', textAlign: 'center', alignItems: 'center', display: 'flex', justifyContent: 'center'}}>

                {
                    activeHead
                }



                {
                    location.pathname.split('/').splice(-1)[0] === 'signup' || location.pathname.split('/').splice(-1)[0] === 'login' || location.pathname.split('/').splice(-1)[0] === 'reset-password'
                    ?  
                    <h3>Campus Express</h3>
                    : 
                    <button onClick={handleMenu} style={{display: screenWidth <= 760 ? 'block' : 'none', float: 'right', width: '50px', outline: 'none', border: 'none', marginTop: '4px',  padding: '10px', borderRadius: '5px', background: '#fff', color: '#fff', position: 'absolute', right: '10px', }}>
                        <img src={menuSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
                    </button>
                }
                

            </div>
        </>
     );
}
 
export default Header;                                                                                                      