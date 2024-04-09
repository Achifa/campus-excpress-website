import '../../../styles/Buyer/aside.css'
import closeSvg from '../../../assets/close-square-svgrepo-com (1).svg'
import items from '../../../items.json'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import login from '../../../assets/login.svg'
import loginw from '../../../assets/loginw.svg'

import orderSvg from '../../../assets/order-svgrepo-com (1).svg'
import historySvg from '../../../assets/history-svgrepo-com (1).svg'
import settingsSvg from '../../../assets/settings-svgrepo-com (3).svg'
import adsSvg from '../../../assets/ad-svgrepo-com.svg'
import savedSvg from '../../../assets/bookmark-outlined-saved-svgrepo-com.svg'
import inboxSvg from '../../../assets/inbox-alt-svgrepo-com (1).svg'
import walletSvg from '../../../assets/wallet-2-svgrepo-com.svg'
import sellSvg from '../../../assets/sell-svgrepo-com (1).svg'
// import inboxSvg from '../../../assets/inbox-in-svgrepo-com.svg'
import logoutSvg from '../../../assets/logout-2-svgrepo-com.svg'

import foodSvg from '../../../assets/food-market-purchasing-svgrepo-com.svg'
import electronicsSvg from '../../../assets/broadcast-device-electronics-svgrepo-com.svg'
import vehicleSvg from '../../../assets/car-hand-drawn-outlined-vehicle-svgrepo-com.svg'
import phoneSvg from '../../../assets/phone-rounded-svgrepo-com.svg'
import laptopSvg from '../../../assets/laptop-svgrepo-com.svg'
import lodgeSvg from '../../../assets/apartment-left-svgrepo-com.svg'
import appliancesSvg from '../../../assets/appliances-svgrepo-com.svg'
import furnitureSvg from '../../../assets/furniture-svgrepo-com.svg'
import fashionSvg from '../../../assets/casual-clothing-fashion-svgrepo-com.svg'
import utensilSvg from '../../../assets/utensils-svgrepo-com.svg'
import petSvg from '../../../assets/pets-svgrepo-com.svg'
import phoneassSvg from '../../../assets/phone-repair-symbol-svgrepo-com.svg'
import laptopassSvg from '../../../assets/laptop-fix-svgrepo-com.svg'
import cosmeticsSvg from '../../../assets/medical-medicine-health-23-svgrepo-com.svg'
import tabletsSvg from '../../../assets/tablet-svgrepo-com.svg'

import helpSvg from '../../../assets/help-svgrepo-com.svg'
import refundSvg from '../../../assets/return-svgrepo-com.svg'
import cancelSvg from '../../../assets/cancel-delivery-svgrepo-com.svg'
import userSvg from '../../../assets/user-alt-1-svgrepo-com.svg'
import contactSvg from '../../../assets/costumer-support-call-svgrepo-com.svg'
import { setCategoryTo } from '../../../redux/buyer_store/Category'


const Aside = () => {

    let [categoriesList, setCategoriesList] = useState([])
    let navigate = useNavigate()
    let {category} = useSelector(s => s.Category)
    let [buyer, set_buyer] = useState('')

    let categories = [
        ["Food", foodSvg],
        ["Electronics", electronicsSvg],
        ["Fashion", fashionSvg],
        ["Health/Beauty", cosmeticsSvg],
        ["Mobile Phones", phoneSvg],
        ["Tablets", tabletsSvg],
        ["Laptops/Desktops", laptopSvg],
        ["Laptops/Desktops Accessories", laptopassSvg],
        ["Phone/Tablet Accessories", phoneassSvg],
        ["Pets", petSvg],
        ["Vehicle", vehicleSvg],
        ["Lodge/Apartments", lodgeSvg],
        ["Furnitures", furnitureSvg],
        ["Appliances", appliancesSvg],
        ["Utensils",utensilSvg]
    ]

    useEffect(() => {
        setCategoriesList(items.items.category)
    },[])

    useEffect(() => {
        try {
            set_buyer(JSON.parse(window.localStorage.getItem('buyerData')))
            // alert(JSON.stringify(window.localStorage.getItem('buyerData')))
        } catch (error) {
            console.log(error)
        }
      },[])

    let dispatch = useDispatch()

    

    let list1 = [
        {uri: '',text: 'Messages', img: inboxSvg}, 
        {uri: 'favourites',text: 'Favourites', img: savedSvg},  
        {uri: '',text: 'History', img: historySvg}
    ]
    let list2 = [
        {uri: '',text: 'My Account', img: userSvg},
        {uri: '',text: 'Help Center', img: helpSvg}, 
        {uri: '',text: 'Refund & Return', img: refundSvg}, 
        {uri: '',text: 'Cancel An Order', img: cancelSvg}, 
        {uri: '',text: 'Contact Us', img: contactSvg}, 
        {uri: 'logout',text: buyer.fname ? 'Logout' : 'Login', img: buyer.fname ? logoutSvg : login}
    ]
    
    let list3 = categoriesList

    let CEservices = list1.map((item,i) => 
        <li onClick={e => navigate(`${item.uri}`)} key={i} style={{display: 'flex', }}>
            <span>
                <img src={item.img} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
            </span>
            &nbsp;
            &nbsp;
            <span style={{fontSize: 'small'}}>{item.text}</span>
        </li>
    )

    let Help = list2.map((item, i) => 
        <li onClick={e => i === list2.length - 1 ?  () => {window.localStorage.removeItem('buyerData'); alert('You are logged out.')} : navigate(`${item}`)} key={i} style={{display: 'flex', }}>
            <span>
                <img src={item.img} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
            </span>
            &nbsp;
            &nbsp;
            <span style={{fontSize: 'small'}}>{item.text}</span>
        </li>
    )

    let Categories = categories.map((item,i) => 
        <li style={{display: 'flex', }} data-category={item[0]} onClick={e => {navigate(`/?category=${item[0].toLowerCase()}`); dispatch(setCategoryTo(item[0].toLowerCase()))}} key={i}>
            <span>
            
                <img src={(item[1])} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
            </span>
            &nbsp;
            &nbsp;
            <span style={{fontSize: 'small'}}>{(item[0])}</span>
        </li>
    )

    function closeAside(params) {
        document.querySelector('.aside-overlay').removeAttribute('id')
    
    }
 

    return ( 
        <>

            <div className="aside-overlay" style={{zIndex: '11000'}}>

                <div onClick={closeAside} className="aside-close">
                    <img src={closeSvg} style={{height: '30px', width: '30px'}} alt="" />
                </div>
                <div className="aside-cnt" style={{position: 'relative', overflow: 'hidden', padding: '0'}}>
                    <div style={{textAlign: 'left', width: '100%', height: 'fit-content', fontWeight: '500', display: 'flex', flexDirection: 'column', fontSize: 'large', marginTop: '0', padding: '10px', color: '#fff', background: 'orangered'}}>
                        <span style={{borderRadius: '50%', background: '#fff4e0', width: '50px', height: '50px', color: 'orangered', display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: 'center'}}><h3 style={{padding: '0', margin: '0'}}>{
                            buyer.fname ? buyer?.fname.split('')[0] + buyer.lname.split('')[0] : '?'
                        }</h3></span>
                        <span>
                            {
                                buyer.fname 
                                ?  
                                buyer.fname + " " + buyer.lname 
                                : 
                                <>
                                <span onClick={e => navigate('/login')} style={{cursor: 'pointer'}}>
                                    <img src={loginw} style={{height: '20px', transform: 'rotate(180deg)', color: '#fff', width: '20px', marginBottom: '5px', }} alt="" />
                                </span>
                                &nbsp;
                                {/* &nbsp; */}
                                <span onClick={e => navigate('/login')} style={{fontSize: 'small', cursor: 'pointer'}}>Login</span>
                                </>
                            }
                        </span>
                    </div>

                    <div style={{height: 'calc(100% - 100px)', overflow: 'auto'}}>

                        <ul style={{overflowX: 'auto', padding: '10px'}}>
                            {
                                
                                <>
                                    {/* <hr /> */}
                                    
                                    <p style={{textAlign: 'left', width: '100%', fontWeight: '400', fontSize: 'medium', marginTop: '10px', color: 'orangered', fontWeight: '500'}}>Services</p>
                                    {
                                        CEservices
                                    }

                                    {/* <hr /> */}
                                    <p style={{textAlign: 'left', width: '100%', fontWeight: '400', fontSize: 'medium', marginTop: '10px', color: 'orangered', fontWeight: '500'}}>Categories</p>
                                    {
                                        Categories
                                    }

                                    {/* <hr /> */}
                                    <p style={{textAlign: 'left', width: '100%', fontWeight: '400', fontSize: 'medium', marginTop: '10px', color: 'orangered', fontWeight: '500'}}>Help Center</p>

                                    {
                                        Help
                                    }
                                </>
                                
                            }
                        </ul>

                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Aside;  