import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Header = () => {

    let [screenWidth, setScreenWidth] = useState(0)
    let [activeHead, setActiveHead] = useState('')

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
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

    useEffect(() => {
        let path = location.pathname.split('/').splice(-1)[0]
        if(path === ''){
            setActiveHead(<h4>Good Evening Fabian</h4>)
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
            setActiveHead(<h4>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                rofile</h4>)
        }
    }, [location])
    return ( 
        <>
            <div className="seller-header shadow-sm">

                {
                    activeHead
                }



                <button onClick={handleMenu} style={{display: screenWidth <= 760 ? 'block' : 'none', float: 'right', outline: 'none', border: 'none', marginTop: '4px',  padding: '10px', borderRadius: '5px', background: 'orangered', color: '#fff'}}>
                    Menu
                </button>
                

            </div>
        </>
     );
}
 
export default Header;                                                                                                      