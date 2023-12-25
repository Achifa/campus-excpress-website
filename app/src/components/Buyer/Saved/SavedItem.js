import img from '../../../assets/download (3).jpeg'
import deleteSvg from '../../../assets/delete-svgrepo-com (1).svg'
import { useEffect, useState } from 'react'
import jsAgo from 'js-ago'
import imgSvg from '../../../assets/image-svgrepo-com (4).svg'; 
import { SHOP } from '../../../api/seller';
import { AddItemToCart, DeleteItemFromCart, GetSavedItemsData } from '../../../api/buyer';
import js_ago from 'js-ago';
import { setCartTo } from '../../../redux/buyer/Cart';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';

const SavedItem = () => {   
    let [Items, setItems] = useState([])
    let [activeImg, setActiveImg] = useState(imgSvg)


    useEffect(() => {
        
        GetSavedItemsData(window.localStorage.getItem('CE_buyer_id'))
        .then((result) => { 
            setItems(result);
            console.log(result)
        })
        .catch((err) => {
            console.log(err)
        })

        
    }, [])


    
   
    return ( 
        <>
            <div className="buyer-savedItem">
               {
                Items.length > 0
                ?
                    Items.map((item, index) => {
                        return( <Card item={item} index={index} items={Items} activeImg={activeImg} /> )
                    })
                    
                :

                <div className="buyer-savedItem-card shadow-sm">
                                
                    <div className='buyer-item-title'>
                        <p>No Saved Items</p>
                    </div>
                </div>
               }
            </div>
        </>
     );
}


 
export default SavedItem;