import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OVERVIEW } from "../../../api/seller";
import '../../../styles/Seller/overlay.css' 
import Card from "./Card";

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

        //overlay.setAttribute('id', 'overlay');
        
        OVERVIEW(window.localStorage.getItem("CE_seller_id"))
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
            
            <div className="seller-home">
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

                <button onClick={e => navigate('/seller.editor')} style={{
                    height: 'fit-content',
                    width: 'fit-content',
                    padding: '10px',
                    position: 'fixed',
                    bottom: '85px',
                    borderRadius: '5px',
                    background: 'orangered',
                    color: '#fff',
                    right: screenWidth > 760 ? '70px' : '30px'
                }}>
                    Create
                </button>


            </div>

            
        </>
     );
}
 
export default Home; 