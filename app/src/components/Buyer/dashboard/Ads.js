
import Category, { setCategoryTo } from "../../../redux/buyer/Category";
import ads from '../../../images/Slider.png'
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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const Ads = () => {
    let [screenWidth, setScreenWidth] = useState(0)
 
    let navigate = useNavigate() 

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])
    let dispatch = useDispatch()

 
    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

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
    let Categories = categories.map((item, i) => 
        <li style={{textAlign: 'left', position: 'relative', width: '100%', cursor: 'pointer', display: 'flex', justifyContent: 'flex-start', height: '30px'}} data-category={item[0]} onClick={e => {navigate(`/?category=${item[0].toLowerCase()}`); dispatch(setCategoryTo(item[0].toLowerCase()))}} key={i}>
            <span style={{width: '25px', float: 'left', position: 'absolute', left: '5px'}}> 
                <img src={(item[1])} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
            </span>
            <span style={{fontSize: 'small', whiteSpace: 'nowrap', float: 'right', width: 'calc(100% - 30px)', textAlign: 'left', marginLeft: '45px'}}>{(item[0])}</span>
        </li>
    )

    // useEffect(() => {
    //     let canvas = document.querySelector('canvas');
    //     let ctx = canvas.getContext('2d');
    //     var img = new Image();
    //     // Set the source of the image
    //     img.style.height = '200px'
    //     img.style.width = screenWidth
    //     img.src = ads;  
 
    //     ctx.drawImage(img, 0, 0, 400, 220);   

    // }, [])  


    return (   
        <>
            <div className="buyer-ads-cnt" style={{marginTop: '10px'}}>
                <section style={{background: '#fff', padding: '5px', overflow: 'auto'}}>
                    <ul style={{listStyleType: 'none', margin: '0', padding: '10px 0 10px 0', overflow: 'auto'}}>
                        {
                            Categories
                        }
                    </ul>  
                </section>
                <section className="img-cnt" >
                    <img src={ads}  alt="" /> 
                    {/* <canvas style={{height: '100%', width: '100%'}} id="ads-canvas"></canvas> */}
                </section>
            </div>
        </>   
     );
} 
 
export default Ads; 