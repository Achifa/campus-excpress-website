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
import js_ago from 'js-ago'

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

function ShopRent() {

  let list = [

    
      {tier: 'Basic', offers: ['Free', 'Up to 7 listings', '30 Days']},
      {tier: 'Standard', offers: ['150', 'Up to 18 listings', '30 Days']},
      {tier: 'Premium', offers: ['500', 'Up to 36 listings', '30 Days']},
      {tier: 'Elite', offers: ['1200', 'Unlimited listings', '30 Days']},
    
   
  ]
  return(
    <>
      <div className="university-edit" style={{width: '95%'}}>
        <div className="seller-input-cnt">
          <h4><u>Shop Rent on Campus Express</u></h4>

          <section style={{width: '100%', height: 'fit-content'}}>

            <br />

            
            {
              list.map(item => 
              
                <div style={{
                  height: 'auto',
                  width: '300px',
                  background: '#FF4500',
                  borderRadius: '5px',
                  padding: '10px',
                  color: '#fff'
                  }}>
                  <h1><b>{item.tier}</b></h1>

                  <br />

                  <ol>
                    <li><p>Price: {item.offers[0]}</p></li>

                    <li><p>Listing Restriction: {item.offers[1]}</p></li>

                    <li><p>Duration: {item.offers[2]}</p></li>
                  </ol>

                  <button>
                    Activate
                  </button>
                </div>
              )
            }

            {/* <h6>Campus Express offers a Shop Rent feature designed to help campus vendors establish a virtual presence on our website. This feature provides vendors with their own online shop space, enhancing their ability to showcase and sell products. The Shop Rent feature is available in three packages:</h6>

            <ol>
              <li>
                **Basic Package (Free)**
                - **Price:** Free
                - **Listing Restriction:** Up to 7 listings
                - **Duration:** 30 days
              </li>

              <li>
                **Standard Package (150 Naira Monthly)**
                  - **Price:** 150 Naira
                  - **Listing Restriction:** Up to 15 listings
                  - **Duration:** 30 days
              </li>

              <li>
                **Pro Package (500 Naira Monthly)**
                  - **Price:** 500 Naira
                  - **Listing Restriction:** Unlimited listings
                  - **Duration:** 30 days
              </li>
            </ol>

            

            <small>
              Each package is designed to accommodate different needs and budgets, providing vendors with the flexibility to choose the option that best supports their business goals. The Shop Rent feature ensures that vendors can maintain a consistent online presence, attract more customers, and manage their product listings efficiently.
            </small> */}
          </section>
        </div>

        <div className="seller-input-cnt">
          <section style={{width: '100%'}}>
              
              
          </section>
            
        </div>
        {/* <div className="btn-cnt">
          <button>Cancel</button>
        </div> */}
      </div>
    </>
  )
}

function AdsPromotion() {
  
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

                <div>&#8358;100</div>
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

                <div>0</div>
                <div>Refunds/Return</div>

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
                setActiveJsx(<ShopRent email={userData.email} phone={userData.phone} name={`${userData.fname} ${userData.lname}`} seller_id={userData.seller_id} />)
                
              }} />
                <div><b>Shop Rent</b></div>

                <div>
                  {/* <div>ID: Verified</div> */}
                  <div style={{textTransform: 'capitalize'}}>Tier: 
                  
                  &nbsp;
                   {
                     shop.rent?JSON.parse(shop.rent).tier: ''
                  }
                  
                  &nbsp;{shop.rent
                    ?
                      JSON.parse(shop.rent).tier === 'basic'
                      ? ('(Free)') 
                      : 
                      (JSON.parse(shop.rent).price) 
                    : 
                    ''

                  }
                  </div>
                  {/* <div>Student: False</div> */}
                </div>

                <div>
                  {/* <div>ID: Verified</div> */}
                  <div>Expires In: {
                    shop.rent
                    ?
                      30 - parseInt(js_ago(new Date(JSON.parse(shop.rent).date)).split(' ')[0]) 
                    :
                    ''

                  }&nbsp;Days</div>
                  {/* <div>Student: False</div> */}
                </div>
            </div>

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
                <div><b>Ads Promotion</b></div>

                <div>
                  {/* <div>ID: Verified</div> */}
                  <div style={{textTransform: 'capitalize'}}>Package: {
                    shop.subscription?JSON.parse(shop.subscription).package: ''
                  }

                  &nbsp;{shop.subscription
                    ?
                      JSON.parse(shop.subscription).package === 'basic'
                      ? ('(Free)') 
                      : 
                      (JSON.parse(shop.subscription).price) 
                    : 
                    ''

                  }</div>
                  {/* <div>ID: Verified</div> */}
                  <div>Expires In: {
                    shop.subscription
                    ?
                      30 - parseInt(js_ago(new Date(JSON.parse(shop.subscription).date)).split(' ')[0]) 
                    :
                    ''

                  }&nbsp;Days</div>
                  
                  {/* <div>Student: False</div> */}
                  
                  {/* <div>Student: False</div> */}
                </div>

                
            </div>
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
              <div><b>University</b></div>
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
