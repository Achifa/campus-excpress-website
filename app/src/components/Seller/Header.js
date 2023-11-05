import { useEffect, useState } from "react";

const Header = () => {

    let [screenWidth, setScreenWidth] = useState(0)

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
    return ( 
        <>
            <div className="seller-header shadow-sm">

                <button onClick={handleMenu} style={{display: screenWidth <= 760 ? 'block' : 'none', float: 'right', outline: 'none', border: 'none', marginTop: '4px',  padding: '10px', borderRadius: '5px', background: 'orangered', color: '#fff'}}>
                    Menu
                </button>
                

            </div>
        </>
     );
}
 
export default Header;                                                                                                      