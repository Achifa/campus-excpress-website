import React, { 
  useEffect, 
  useRef, 
  useState 
} from 'react'
import User from './User'
import Bio from './Bio'
import items from '../../../items.json'
import ellipsisSvg from '../../../assets/filter-edit-svgrepo-com.svg'
import '../../../styles/Seller/editOverlay.css'
import { useSelector } from 'react-redux'
import Settings from './Settings'
import Reviews from './Reviews'
import History from './History'
import Contact from './Contact'
import PasswordReset from './PasswordReset'
import NoticeSetup from './NoticeSetup'
import Payments from './Payments'
import { 
  GetReviews, 
  GetSeller, 
  GetShop, 
  GetSoldItems 
} from '../../../api/seller/get'
import { 
  data, 
  school_choices 
} from '../../../location';
import { 
  UpdateInventory, 
  UpdateShop 
} from '../../../api/seller/update'
import Thumbnail from '../Thumbnail'
import { 
  useNavigate 
} from 'react-router-dom'
import { 
  SendEmail, 
  SendSMS 
} from '../../../api/seller/post'

function DescEdit() {
  let title = useRef('')
  let desc= useRef('')
  return(
    <div className="descripion-edit">
      <div className="input-cnt">
        <input onInput={e => title.current = (e.target.value)} placeholder='Enter Shop Title' type="text" />
      </div>

      <div className="input-cnt">
        <textarea onInput={e => desc.current = (e.target.value)} name="" id="" placeholder='Enter Your Description'></textarea>
      </div>

      <div className="btn-cnt">
        <button onClick={e => {
          UpdateShop(title.current, desc.current, window.localStorage.getItem('CE_seller_id'))
        }}>Update</button>
        <button>Cancel</button>
      </div>
    </div>
  )
}

function InvetoryEdit() {
  let [selectedList, setSelectedList] = useState([]);

  let [invetoryList, setInventoryList] = useState(
    items.items.category.map(item => Object.keys(item)[0])
  );

    async function UpdateInventoryHandler() {
      let result = await UpdateInventory(selectedList, window.localStorage.getItem("CE_seller_id"))
      if(result){

      }
      
    }
  return(
    <div className="inventory-edit">
      &nbsp;<h3>Selected List</h3>
      <br />
      <div className="selected-options">
        {
          selectedList.length > 0 
          ?
          selectedList.map(item => <div>
            <span>{item}</span>
            &nbsp;
            &nbsp;
            <span style={{cursor: 'pointer'}} onClick={e => {
              let result = selectedList.filter(data => data !== item);
              setSelectedList(result);
            }}>-</span>
          </div>)

          :
          <div style={{background: '#FF4500'}}>
            <span style={{color: '#fff'}}>Please select any item you sell</span>
          </div>
        }
      </div>
      <br />

      &nbsp;<h3>Availble Options</h3>
      <br />

      <div className="option-list">

        {
          invetoryList.map(item => <div style={{
            pointerEvents: selectedList.filter(data => data === item).length > 0 ? 'none' : 'all',
            opacity: selectedList.filter(data => data === item).length > 0 ? '.5' : '1'
          }}>
            <span>{item}</span>
            &nbsp;
            &nbsp;
            <span style={{cursor: 'pointer'}} onClick={e => {
              setSelectedList(data => [...data, item])
            }}>+</span>
          </div>)  
        }
      </div>

      <div className="btn-cnt">
        <button onClick={e => UpdateInventoryHandler()}>Update</button>
        <button>Cancel</button>
      </div>
    </div>
  )
}

function ContactEdit({email,phone,seller_id, name}) {
 

  return(
    <div className="university-edit">
      <div className="seller-input-cnt">
          <section style={{width: '100%'}}>
              <label htmlFor="">Verify Email </label>

              <input type="text" value={email} />
              <br />
              <button onClick={e =>  SendEmail(email, seller_id, name)} style={{padding: '5px', height: 'fit-content'}}>Send verification link to this email</button>
              
          </section>
          
      </div>

      <div className="seller-input-cnt">
          <section style={{width: '100%'}}>
              <label htmlFor="">Verify Phone </label>
              <input type="text" value={phone} />
              <br />
              <button onClick={e => SendSMS(phone, seller_id, name)} style={{padding: '5px', height: 'fit-content'}}>Send verification link to this phone</button>

              
          </section>
          
      </div>

      {/* <div className="btn-cnt">
        <button>Cancel</button>
      </div> */}

    </div>
  )
}

export default function Body() {

  
  let navigate = useNavigate()
  const [soldItems, setSoldItems] = useState([]);
  let [reviews, setReviews] = useState([])
  let [shop, setShop] = useState('')

  
  let [screenWidth, setScreenWidth] = useState(0)


  useEffect(() => {
    let overlay = document.querySelector('.overlay')
    overlay.setAttribute('id', 'overlay');
    async function getShop() {
      let shop = await GetShop(window.localStorage.getItem("CE_seller_id"))
      setShop(shop)
      overlay.removeAttribute('id')
    }
    getShop()

    

  }, [])

  useEffect(() => {
    
    async function getSoldItems() {
      let sold_items = await GetSoldItems(shop.shop_id)
      setSoldItems(sold_items)
    }
    getSoldItems()

    

  }, [shop])




  useEffect(() => {
    
    async function getReviews() {
      let reviews = await GetReviews(window.localStorage.getItem("CE_seller_id"))
      setSoldItems(reviews)
    }
    getReviews()

    

  }, [shop])

  let [userData, setUserData] = useState('')


  useEffect(() => {
    async function getData(){
        let result = await GetSeller(window.localStorage.getItem('CE_seller_id'))
        setUserData(result)
    }
    getData()
  }, [])

  let [activeJsx, setActiveJsx] = useState('')

   
  return (
    <>
      <div className="edit-overlay" onClick={e => {
        if(e.target === document.querySelector('.edit-overlay')){
          document.querySelector('.edit-overlay').removeAttribute('id')
        }
      }}>

        {
          activeJsx
        }

      </div>
      <div className="overlay">
        <div className="loader">
        </div>
      </div>
      <div className="seller-profile-right shadow-sm"> 

          <div className="seller-profile-basics">
            {/* <img src={ellipsisSvg} style={{
              height: '20px',
              width: '20px',
              position: 'absolute',
              right: '50px',
              cursor: 'pointer'
            }} alt="" /> */}
            <ul>
             
              <li style={{
                fontWeight: '400'
              }}>

                <div>100</div>
                <div>Total Earned</div>

              </li>

              <li style={{
                fontWeight: '400'
              }}>

                <div>10</div>
                <div>Total Sales</div>

              </li>

              <li style={{
                fontWeight: '400'
              }}>

                <div>100</div>
                <div>Campus Coin</div>

              </li>
              
            </ul>
            <br />

            <div className="seller-profile-verification">
                <img src={ellipsisSvg} style={{
                  height: '20px',
                  width: '20px',
                  position: 'absolute',
                  right: '10px',
                  top: '10px',
                  transform: 'rotate(90deg)',
                  cursor: 'pointer'
                }} alt="" onClick={e => {
                document.querySelector('.edit-overlay').setAttribute('id', 'edit-overlay')
                setActiveJsx(<ContactEdit email={userData.email} phone={userData.phone} name={`${userData.fname} ${userData.lname}`} seller_id={userData.seller_id} />)
                
              }} />
                <div><b>Verification</b></div>

                <div>
                  {/* <div>ID: Verified</div> */}
                  <div>Email: {
                    userData.isemailverified ? 'Verified' : 'Not Verified'
                  }</div>
                  <div>Phone Number: {
                    userData.isphoneverified ? 'Verified' : 'Not Verified'
                  }</div>
                  {/* <div>Student: False</div> */}
                </div>
            </div>
            <br />

            <div className="seller-profile-education">

              {/* <img src={ellipsisSvg} style={{
                height: '20px',
                width: '20px',
                position: 'absolute',
                right: '10px',
                top: '10px',
                transform: 'rotate(90deg)',
                cursor: 'pointer'
              }} alt="" onClick={e => {
                document.querySelector('.edit-overlay').setAttribute('id', 'edit-overlay')
                setActiveJsx(<UniEdit />)
                
              }} /> */}
              <div>University</div>
              <div>{userData.campus},{userData.state}</div>
            </div>
          </div>

          <div className="seller-profile-others">
            
              <div>
                <img src={ellipsisSvg} style={{
                  height: '20px',
                  width: '20px',
                  position: 'absolute',
                  right: '50px',
                  cursor: 'pointer'
                }} alt="" onClick={e => {
                document.querySelector('.edit-overlay').setAttribute('id', 'edit-overlay')
                setActiveJsx(<DescEdit />)
               
              }} />
                <span>{
                  shop?.shop_title === ''
                  ?
                  'Update Your Shop Title'
                  :
                  shop?.shop_title
                }</span>
                
                <div style={{fontSize: 'medium', fontWeight: '400', lineHeight: '23px'}}>
                  {
                    shop?.shop_description === ''
                    ?
                    'Update Your Shop Description...'
                    :
                    shop?.shop_description
                  }
                </div>
              </div>

              <div>
                <span>Items Sold</span>
                
                <div className='seller-profile-items-sold'>
                  <ul>
                    {
                      (typeof soldItems) === 'array' && soldItems.length > 0 ? soldItems.map((item, index) => <li>
                        <li>
                          <div className="cols" >
                            <div className="card" key={index} style={{height: 'fit-content', marginBottom: '10x', flexShrink: '0', width: '200px', borderRadius: '10px'}}>
                                
                              <Thumbnail product_id={item.product_id} />

                              <div className="card-body">
                                  
                                {
                                  screenWidth > 479
                                  ?
                                  <small style={{fontSize: 'small', fontFamily: 'sans-serif', height: '35px', lineHeight: '18px', color: '#000'}} onClick={e => navigate(`/product/${item.product_id}`)} >{item.title}</small>
                                  : 
                                  <small style={{fontSize: 'small', fontFamily: 'sans-serif', height: '35px', lineHeight: '18px', color: '#000'}} onClick={e => navigate(`/product/${item.product_id}`)} >{item.title}</small>
                                }

                                {/* <br /> */}

                                {/* <hr  /> */}
                                
                                {
                                  screenWidth > 479
                                  ?
                                  <h6 onClick={e => navigate(`/product/${item.product_id}`)} style={{marginBottom: '10px', marginTop: '10px', fontWeight: '500', color: '#000'}}>&#8358;{
                                      new Intl.NumberFormat('en-us').format(item.price)
                                  }</h6>
                                  : 
                                  <h6 onClick={e => navigate(`/product/${item.product_id}`)} style={{marginBottom: '10px', fontWeight: '700', color: '#000'}}>&#8358;{new Intl.NumberFormat('en-us').format(item.price)}</h6>
                                }

                                  
                              </div>

                                

                            </div>
                          </div> 
                        </li>
                      </li>)
                      : 
                        <li style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FF4500', color: '#fff'}}>
                          No Sold Items Yet
                        </li>

                    }
                  </ul>
                </div>
              </div>

              <div>
                <img src={ellipsisSvg} style={{
                  height: '20px',
                  width: '20px',
                  position: 'absolute',
                  right: '50px',
                  cursor: 'pointer'
                }} alt="" onClick={e => {
                document.querySelector('.edit-overlay').setAttribute('id', 'edit-overlay')
                setActiveJsx(<InvetoryEdit />)

              }} />
                <span>Inventory</span>
                
                <div className='seller-profile-inventory'>
                  <ul>
                    {
                      shop.inventory 
                      ?  
                      JSON.parse(shop.inventory).length > 0 
                        ? 
                        JSON.parse(shop.inventory).map(item => <li>{item}</li>) 
                        : 
                        <li style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FF4500', color: '#fff'}}>
                          Please Add Items You Sell
                        </li> 
                      : 
                      <li style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FF4500', color: '#fff'}}>
                          Please Add Items You Sell
                        </li>
                        
                    }
                  </ul>
                </div>
              </div>

              <div>
                <span>Customer Reviews</span>
                
                <div className='seller-profile-reviews'>
                  <ul>
                    {
                      reviews.length > 0
                      ?
                      reviews.map((item, index) => {
                        return(
                          ''
                        )
                      })
                      :
                      <li style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FF4500', color: '#fff'}}>
                        No Reviews Yet
                      </li>
                    }
                  </ul>
                </div>
              </div>
          </div>

          
      </div>
    </>
  )
} 
