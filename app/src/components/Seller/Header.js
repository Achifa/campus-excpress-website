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
            setActiveHead(<h4>{greetings} {userData.lname}</h4>)
        }else if(path === 'editor'){
            setActiveHead(<h4>Sell</h4>)
        }else if(path === 'inbox'){
            setActiveHead(<h4>Inbox</h4>)
        }else if(path === 'shop'){
            setActiveHead(<h4>Items for sale</h4>)
        }else if(path === 'orders'){
            setActiveHead(<h4>Orders</h4>)
        }else if(path === 'settings'){ 
            setActiveHead(<h4>Settings</h4>)
        }else if(path === 'wallet'){
            setActiveHead(<h4>Wallet</h4>)
        }else if(path === 'profile'){
            setActiveHead(<h4>Profile</h4>)
        }
    }, [location])

    
    return ( 
        <>
            <div className="seller-header shadow-sm">

                {
                    activeHead
                }



                {
                    location.pathname.split('/').splice(-1)[0] === 'signup' || location.pathname.split('/').splice(-1)[0] === 'login' || location.pathname.split('/').splice(-1)[0] === 'reset-password'
                    ?  
                    <h5>Campus Express</h5>
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