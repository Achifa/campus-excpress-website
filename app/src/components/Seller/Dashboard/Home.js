import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OVERVIEW } from "../../../api/seller";
import '../../../styles/Seller/overlay.css' 
import Card from "./Card";

const Home = () => {

    let navigation = useNavigate()

    let [total_sold, set_total_sold] = useState('...')
    let [total_for_sale, set_total_for_sale] = useState('...')
    let [total_unsold, set_total_unsold] = useState('...')
    let [total_reported, set_total_reported] = useState('...')
    let [seller_id, setseller_id] = useState('')

    useEffect(() => {
        let overlay = document.querySelector('.overlay')

        overlay.setAttribute('id', 'overlay');
        
        OVERVIEW(window.localStorage.getItem("CE_seller_id"))
        .then((result) => {
            
            set_total_for_sale(result.total_sale)
            set_total_reported(result.total_reported)
            set_total_sold(result.total_sold)
            set_total_unsold(result.total_unsold)
            console.log(result)
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
            
            <div className="seller-home">
                {/* <div className="seller-home-overview">

                    <ul>

                        <li style={{borderRight: '1px solid orangered'}}>
                            <div><h3>{total_for_sale}</h3></div>
                            <div><h6>Total Products For Sale </h6></div>

                        </li>

                        <li style={{borderRight: '1px solid orangered'}}>
                            <div><h3>{total_sold}</h3></div>

                            <div><h6>Total Products Sold</h6></div>
                        </li>

                        <li style={{borderRight: '1px solid orangered'}}>
                            <div><h3>{total_unsold}</h3></div>
                            <div><h6>Total Products Unsold</h6></div>

                        </li>

                        <li >
                            <div><h3>{total_reported}</h3></div>
                            <div><h6>Total Products Reported</h6></div>

                        </li>
                        
                       
                    </ul> 

                </div> */}

                <div className="seller-home-list" style={{display: 'flex', flexDirection: 'row', borderRadius: '0', flexWrap: 'wrap', overflow: 'hidden', height: '100vh', justifyContent: 'space-evenly', alignItems: 'center'}}>
                
                    <Card title={total_for_sale} summary={'Total Products For Sale '} />
                    <Card title={total_sold} summary={'Total Products Sold'} />
                    <Card title={total_unsold} summary={'Total Products Unsold'} />
                    <Card title={total_reported} summary={'Total Products Reported'} />
                   
                </div>

                <div style={{display: 'flex', background: '#fff', flexDirection: 'row', height: '200px', justifyContent: 'space-evenly', alignItems: 'center'}} className="seller-home-revenue">
                   
                
                 
                </div> 

            </div>
        </>
     );
}
 
export default Home; 