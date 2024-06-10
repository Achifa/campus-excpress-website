import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../../styles/Seller/overlay.css' 
import Card from "./Card";
import items from '../../../items.json'
import { GetOverview } from "../../../api/seller/get";
import sellSvg from '../../../assets//sell-svgrepo-com.svg'

const Home = () => {

    let [screenWidth, setScreenWidth] = useState(0)
 
    let navigate = useNavigate() 
 
    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width) 
    }, [])


    let [total_sold, set_total_sold] = useState('...')
    let [total_for_sale, set_total_for_sale] = useState('...')
    let [total_unsold, set_total_unsold] = useState('...')
    let [total_reported, set_total_reported] = useState('...')
    let [seller_id, setseller_id] = useState('')

    useEffect(() => {


        
        let overlay = document.querySelector('.overlay')
        overlay.setAttribute('id', 'overlay');
        
        GetOverview(window.localStorage.getItem("CE_seller_id"))
        .then((result) => {
            
            set_total_for_sale(result.total_sale)
            set_total_reported(result.total_reported)
            set_total_sold(result.total_sold)
            set_total_unsold(result.total_unsold)
            overlay.removeAttribute('id')

        })
        .catch((err) => {
            console.log(err)
        })
        .catch(err => console.log(err))

        
    }, [])

    

   
    return ( 
        <>

            <div className="overlay">
                <div className="loader">
                </div>
            </div>
            
            <div className="seller-home" style={{position: 'relative'}}>
                <div style={{padding: '10px', borderRadius: '5px', display: screenWidth > 760 ? 'none' : 'flex',  background: '#FF4500', color: '#fff', fontSize: 'large', position: 'fixed', right: '15px', bottom: '100px'}} onClick={e => navigate(`/seller.editor`) }>
                    <span>Sell</span>
                    &nbsp;
                    <span>
                        <img src={sellSvg} style={{height: '25px', width: '25px'}} alt="" />
                    </span>
                </div>
                <div className="seller-home-overview">

                    <ul>

                        <li style={{
                            fontSize: 'unset'
                        }}>
                            <h1>{total_for_sale}</h1>
                            <div><h6>Total Products For Sale </h6></div>

                        </li>

                        <li style={{
                            fontSize: 'unset'
                        }}> 
                            <h1>{total_sold}</h1>

                            <div><h6>Total Products Sold</h6></div>
                        </li>

                        <li style={{
                            fontSize: 'unset'
                        }}>
                            <h1>{total_unsold}</h1>
                            <div><h6>Total Products Unsold</h6></div>

                        </li>

                        <li > 
                            <div><h3>{total_reported}</h3></div>
                            <div><h6>Total Products Reported</h6></div>

                        </li>
                        
                       
                    </ul> 

                </div>

                

            </div>

            
        </>
     );
}
 
export default Home; 