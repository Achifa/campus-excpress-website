import '../../../styles/Buyer/aside.css'
import closeSvg from '../../../assets/close-square-svgrepo-com (1).svg'
import items from '../../../items.json'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import orderSvg from '../../../assets/order-svgrepo-com (1).svg'
import cartSvg from '../../../assets/cart-shopping-fast-svgrepo-com (1).svg'
import settingsSvg from '../../../assets/settings-svgrepo-com (3).svg'
import adsSvg from '../../../assets/ad-svgrepo-com.svg'
import savedSvg from '../../../assets/bookmark-outlined-saved-svgrepo-com.svg'
import inboxSvg from '../../../assets/inbox-in-svgrepo-com.svg'
import walletSvg from '../../../assets/wallet-2-svgrepo-com.svg'
import sellSvg from '../../../assets/sell-svgrepo-com (1).svg'
import logoutSvg from '../../../assets/logout-2-svgrepo-com.svg'

const Aside = () => {

    let [categoriesList, setCategoriesList] = useState([])
    let navigate = useNavigate()
    let {category} = useSelector(s => s.Category)

    useEffect(() => {
        setCategoriesList(items.items.category)
    },[])

    let dispatch = useDispatch()

    useEffect(() => {
        
    }, [category])

    let list1 = [{text:'Order', img: orderSvg}, {text: 'Inbox', img: inboxSvg}, {text: 'Saved Item', img: savedSvg},  {text: 'Cart', img: cartSvg}]
    let list2 = [{text: 'My Account', img: ''},{text: 'Help Center', img: ''}, {text: 'Refund & Return', img: ''}, {text: 'Cancel An Order', img: ''}, {text: 'Track An Order', img: ''}, {text: 'Payment Option', img: ''}, {text: 'Contact Us', img: ''}, {text: 'Logout', img: logoutSvg}]
    let list3 = categoriesList

    let CEservices = list1.map((item, i) => 
        <li onClick={e => navigate(`${item}`)} key={i}>
            <span>
                <img src={item.img} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
            </span>
            &nbsp;
            &nbsp;
            <span style={{fontSize: 'small'}}>{item.text}</span>
        </li>
    )

    let Help = list2.map((item, i) => 
        <li onClick={e => navigate(`${item}`)} key={i}>
            <span>
                <img src={item.img} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
            </span>
            &nbsp;
            &nbsp;
            <span style={{fontSize: 'small'}}>{item.text}</span>
        </li>
    )

    let Categories = list3.map((item, i) => 
        <li onClick={e => navigate(`$.text{item}`)} key={i}>
            <span>
                {/* <img src={item.img} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" /> */}
            </span>
            &nbsp;
            &nbsp;
            <span style={{fontSize: 'small'}}>{Object.keys(item)[0]}</span>
        </li>
    )

    function closeAside(params) {
        document.querySelector('.aside-overlay').removeAttribute('id')
    
    }


    return ( 
        <>

            <div className="aside-overlay">

                <div onClick={closeAside} className="aside-close">
                    <img src={closeSvg} style={{height: '30px', width: '30px'}} alt="" />
                </div>
                <div className="aside-cnt">
                    <ul>
                        {
                            
                            <>
                                <h5 style={{textAlign: 'left', width: '100%', fontWeight: '500', fontSize: 'x-large', marginTop: '10px', color: 'orangered'}}>
                                    Campus Express
                                </h5>

                                <hr />
                                <p style={{textAlign: 'left', width: '100%', fontWeight: '400', fontSize: 'medium'}}>Campus Express Services</p>
                                {
                                    CEservices
                                }

                                <hr />
                                <p style={{textAlign: 'left', width: '100%', fontWeight: '400', fontSize: 'medium'}}>Categories</p>
                                {
                                    Categories
                                }

                                <hr />
                                <p style={{textAlign: 'left', width: '100%', fontWeight: '400', fontSize: 'medium'}}>Campus Express Help Center</p>

                                {
                                    Help
                                }
                            </>
                            
                        }
                    </ul>
                </div>
            </div>
        </>
     );
}
 
export default Aside;