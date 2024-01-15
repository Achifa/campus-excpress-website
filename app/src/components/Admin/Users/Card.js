import { useEffect, useState } from 'react';
import '../../../styles/Admin/user_card.css'
import { GetUsers } from '../../../api/admin';
import email__svg from '../../../assets/email-svgrepo-com.svg'
import phone__svg from '../../../assets/phone-rounded-svgrepo-com.svg'
import location__svg from '../../../assets/location-pin-svgrepo-com (2).svg'
import { useLocation } from 'react-router-dom';

const Card = ({item, index}) => {
    let [sellers,set_sellers] = useState([])

    let location = useLocation()
    useEffect(() => {
        if(location.search){
            window.location.href = `#${location.search.split('=')[1]}`

            document.querySelector(`#${location.search.split('=')[1]}`).style.border = '4px solid blue'
        }

    })
    
    return ( 
        <>
            <div id={item.seller_id} className="card" key={index}>
                
                <div className="card__key">
                    {index + 1}
                </div>
                
                <div className="card__img">
                    <section>
                        <div>
                            <img style={{height: '20px', width: '20px', margin: 'auto'}} src={phone__svg}  alt="" />
                        </div>
                        <div>
                            <img style={{height: '20px', width: '20px', margin: 'auto'}} src={email__svg} alt="" />
                        </div>
                    </section>
                </div>
                <div className="card__avatar">
                    <h4 style={{color: 'orangered'}}>{item.fname.split('').shift()[0]}{item.lname.split('').shift()[0]}</h4>
                </div>
                <div className="card__title">
                {item.fname} {item.lname}
                <div className="card__is__active" style={{background: item.isactive ? 'green' : 'red'}}>

                </div>
                </div>
                <div className="card__subtitle">
                    <img style={{height: '20px', width: '20px'}} src={location__svg} alt="" />
                    <div style={{textTransform: 'capitalize'}}>{item.state} {item.campus}</div>
                </div>
                <div className="card__wrapper">
                    <button className="card__btn">Suspend</button>
                    <button className="card__btn card__btn-solid">Delete</button>
                </div>
            </div>
        </>
     );
}
 
export default Card;