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
            setActiveHead(<h3>Welcome Fabian</h3>)
        }else if(path === 'editor'){
            setActiveHead(<h3>Upload new iem fo sale</h3>)
        }else if(path === 'inbox'){
            setActiveHead(<h3>27 Inbox</h3>)
        }else if(path === 'shop'){
            setActiveHead(<h3>Items fo sale</h3>)
        }else if(path === 'orders'){
            setActiveHead(<h3>Orders</h3>)
        }else if(path === 'settings'){
            setActiveHead(<h3>Settings</h3>)
        }else if(path === 'wallet'){
            setActiveHead(<h3>Wallet</h3>)
        }else if(path === 'profile'){
            setActiveHead(<h3>Akpulu Fabian</h3>)
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