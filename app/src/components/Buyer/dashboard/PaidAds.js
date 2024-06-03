import React from 'react'
import ads from '../../../images/Slider.png'
import { 
  useDispatch, 
  useSelector 
} from 'react-redux'
import img from '../../../assets/seen-svgrepo-com (1).svg'
import locationSvg from '../../../assets/location-svgrepo-com-1.svg'
import { 
  useEffect,
  useState
} from 'react'
import Thumbnail from '../Thumbnail'
import conditionSvg from '../../../assets/condition-point-svgrepo-com.svg'
import { 
  useNavigate 
} from 'react-router-dom'
import { 
  setSaveTo 
} from '../../../redux/buyer_store/Save'
import timsSvg from '../../../assets/date-2-svgrepo-com.svg'
import { 
  isBuyerLoggedIn 
} from '../LoggedIn'
import { UnSaveItem } from '../../../api/buyer/delete'
import { SaveItem } from '../../../api/buyer/post'
import SaveButton from './SaveButton'
import js_ago from 'js-ago'
import { GetItems } from '../../../api/buyer/get'
export default function PaidAds() {
  let [screenWidth, setScreenWidth] = useState(0)
  let [items, setItems] = useState([])
  useEffect(() => {
    // let overlay = document.querySelector('.overlay');
    //overlay.setAttribute('id', 'overlay');

    try {
       async function getData() {
        let result = await GetItems('trends')
        console.log(result)
        

        setItems(result)
        // overlay.removeAttribute('id');
       }
       getData()
    } catch (error) {
        console.log(error)
    }

}, []) 
    let navigate = useNavigate()
    

  
  return (
    <div className="buyer-ads-cnt" style={{marginTop: '60px', height: 'auto', marginBottom: '-40px', position: 'relative'}}>

      {
        !items?.length > 0
        ?
        ''
        :
        items.map((item, index) => 
        
        <div className="cols" id={item.product_id} >
          <div className="card shadow" key={index} style={{height: '200px', marginBottom: '10px', borderRadius: '10px'}}>
              
              
              
            <Thumbnail product_id={item.product_id} />

            <div className="card-body" style={{position: 'relative'}}>
                
                {
                    screenWidth > 479
                    ?
                    <small style={{
                      fontSize: 'x-small',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      maxHeight: '36px',
                      lineHeight: '18px',
                      color: '#000',
                      display: 'webkitBox',
                      
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: '2',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                  }} onClick={e => navigate(`/product?product_id=${item.product_id}`)} >{item.title}</small>
                    : 
                    <small style={{
                      fontSize: 'small',
                      fontWeight: '500',
                      fontFamily: 'Times New Roman',
                      maxHeight: '36px',
                      lineHeight: '18px',
                      color: '#000',

                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: '2',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                  }} onClick={e => navigate(`/product?product_id=${item.product_id}`)} >{item.title}</small>
                }

                {/* <br /> */}

                {/* <hr  /> */}
                
                {
                  screenWidth > 479
                  ?
                  <h6 onClick={e => navigate(`/product?product_id=${item.product_id}`)} style={{marginBottom: '10px', marginTop: '10px', fontWeight: '400', fontSize: 'small', color: '#000', fontFamily: 'Times New Roman'}}>&#8358;{
                      new Intl.NumberFormat('en-us').format(item.price)
                  }</h6>
                  : 
                  <h6 onClick={e => navigate(`/product?product_id=${item.product_id}`)} style={{marginBottom: '10px', fontWeight: '700', color: '#000'}}>&#8358;{new Intl.NumberFormat('en-us').format(item.price)}</h6>
                }

                <div onClick={e => navigate(`/product?product_id=${item.product_id}`)} style={{display: 'flex',background: '#fff', color: 'orangered',  alignItems: 'center', justifyContent: 'left', padding: '0'}}>
                  <span  style={{background: '#fff', color: '#000', borderRadius: '5px', top: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', left: '20px', padding: '5px 0 5px 0'}}>
                    <span  style={{background: '#fff',color: 'orangered', padding: '0'}}>

                      <img src={conditionSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />

                    </span>
                    &nbsp;

                    <span  style={{background: '#fff',color: 'rgb(98, 98, 98)', padding: '0',  fontSize: 'x-small', fontWeight: '500'}}> 
                        {JSON.parse(item.others)?.condition}
                    </span>
                  </span>
                </div>


                

            </div>

            
            {/*<br />*/} 

              

            

          </div>
        </div> 
        )

      }
        
    </div> 
  )
}
