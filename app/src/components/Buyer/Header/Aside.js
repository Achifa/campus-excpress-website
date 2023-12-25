import '../../../styles/Buyer/aside.css'
import closeSvg from '../../../assets/close-square-svgrepo-com (1).svg'
import items from '../../../items.json'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


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

    let list1 = ['My Account', 'Order', 'Inbox', 'Saved Item', 'Voucher', 'Logout']
    let list2 = ['Help Center', 'Refund & Return', 'Cancel An Order', 'Track An Order', 'Payment Option', 'Contact Us']
    let list3 = categoriesList

    let CEservices = list1.map((item, i) => 
        <li onClick={e => navigate(`${item}`)} key={i}>
            <span></span>
            &nbsp;
            &nbsp;
            <span style={{fontSize: 'small'}}>{item}</span>
        </li>
    )

    let Help = list2.map((item, i) => 
        <li onClick={e => navigate(`${item}`)} key={i}>
            <span></span>
            &nbsp;
            &nbsp;
            <span style={{fontSize: 'small'}}>{item}</span>
        </li>
    )

    let Categories = list3.map((item, i) => 
        <li onClick={e => navigate(`${item}`)} key={i}>
            <span></span>
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