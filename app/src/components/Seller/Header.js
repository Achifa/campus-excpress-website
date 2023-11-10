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
            setActiveHead(<div>Welcome Fabian</div>)
        }else if(path === 'editor'){
            setActiveHead(<div>Set Up Your Product</div>)
        }else if(path === 'inbox'){
            setActiveHead(<div>27 Inbox</div>)
        }else if(path === 'shop'){
            setActiveHead(<div>30 Items Uploaded</div>)
        }else if(path === 'orders'){
            setActiveHead(<div>20 Orders</div>)
        }else if(path === 'settings'){
            setActiveHead(<div>Settings</div>)
        }else if(path === 'wallet'){
            setActiveHead(<div>&#8358;50,000</div>)
        }else if(path === 'profile'){
            setActiveHead(<div>Akpulu Fabian</div>)
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