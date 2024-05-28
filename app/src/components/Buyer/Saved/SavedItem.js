import img from '../../../assets/download (3).jpeg'
import deleteSvg from '../../../assets/delete-svgrepo-com (1).svg'
import { 
    useEffect, 
    useState 
} from 'react'
import jsAgo from 'js-ago'
import imgSvg from '../../../assets/image-svgrepo-com (4).svg'; 
import js_ago from 'js-ago';
import Card from './Card';
import { 
    GetSavedItem 
} from '../../../api/buyer/get';
import BuyerLayout from '../../../layout/Buyer';

const SavedItem = () => {   
    let [Items, setItems] = useState([])
    let [activeImg, setActiveImg] = useState(imgSvg)      

  
    useEffect(() => {
        // GetCart(window.localStorage.getItem('CE_buyer_id'))
        // .then((result) => {
        //     dispatch(setCartTo(result))
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
    
       try {
         async function fetchData(params) {
          let result = await GetSavedItem(window.localStorage.getItem('CE_buyer_id'))
          setItems(result)
          console.log('saved item: ',result)
         }
         fetchData()
       } catch (error) {
          console.log(error)
       }
    
      }, [])

    
   
    return ( 
        <>
            <BuyerLayout>
                <div className="buyer-savedItem">
                {
                    Items?.length > 0
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
            </BuyerLayout>
        </>
     );
}


 
export default SavedItem;