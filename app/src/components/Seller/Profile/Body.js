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

function Coin() {
  return(<div className="university-edit" style={{width: '300px'}}>
      <div className="seller-input-cnt">

        <section style={{width: '100%', borderRadius: '5px', padding: '10px', border: '1px solid #FF4500'}}>
          <p style={{background: '#FF4500', color: '#fff', padding: '10px', borderRadius: '5px', width: '100%'}}>Select The Amount To Buy</p>

          <select name="" id="" style={{background: '#efefef'}}>
            {
              
              [<span>&#8358;500 for 10 Coin</span>, <span>&#8358;1000 for 20 Coin</span>, <span>&#8358;1500 for 30 Coin</span>, <span>&#8358;2000 for 40 Coin</span>, <span>&#8358;2500 for 50 Coin</span>, <span>&#8358;3000 for 60 Coin</span>, <span>&#8358;3500 for 70 Coin</span>, <span>&#8358;4000 for 80 Coin</span>, <span>&#8358;4500 for 90 Coin</span>, <span>&#8358;5000 for 100 Coin</span>, <span>&#8358;5500 for 120 Coin</span>, <span>&#8358;600 for 130 Coin</span>, <span>&#8358;6500 for 140 Coin</span>, ].map(item => 
                <option value="">{
                  item
                }</option>
              )
            }
          </select>

          <br />

            <button>
              Buy Coin Now
            </button>
        </section>
          
      </div>

      <div className="seller-input-cnt">
          <section style={{width: '100%'}}>
            <p style={{background: '#FF4500', color: '#fff', padding: '10px', borderRadius: '5px', width: '100%', border: '1px solid #FF4500'}}>Exchange Coin For Cash</p>

            <select name="" id="" style={{background: '#efefef'}}>
              {
                
                [<span>&#8358;100 for 10 Coin</span>, <span>&#8358;900 for 20 Coin</span>, <span>&#8358;1400 for 30 Coin</span>, <span>&#8358;1900 for 40 Coin</span>, <span>&#8358;2400 for 50 Coin</span>, <span>&#8358;2900 for 60 Coin</span>, <span>&#8358;3400 for 70 Coin</span>, <span>&#8358;3900 for 80 Coin</span>, <span>&#8358;4400 for 90 Coin</span>, <span>&#8358;4900 for 100 Coin</span>, <span>&#8358;5400 for 120 Coin</span>, <span>&#8358;5900 for 130 Coin</span>, <span>&#8358;6400 for 140 Coin</span>, ].map(item => 
                  <option value="">{
                    item
                  }</option>
                )
              }
            </select>

            <br />

            <button>
              Exchange Coin Now
            </button>
          </section>
          
      </div>

      {/* <div className="btn-cnt">
        <button>Cancel</button>
      </div> */}

    </div>)
}

function Rent() {
  return(<div className="university-edit" style={{width: '300px'}}>
      <div className="seller-input-cnt">

        <section style={{width: '100%', borderRadius: '5px', padding: '10px', border: '1px solid #FF4500'}}>
          <p style={{background: '#FF4500', color: '#fff', padding: '10px', borderRadius: '5px', width: '100%'}}>Select Shop Rent</p>

          <select name="" id="" style={{background: '#efefef'}}>
            {
              
              [<span>0 Coins For 5 Listing (Free)</span>, <span>10 Coins For 15 Listing</span>, <span>20 Coins For 30 Listing</span>, <span>35 Coins For 60 Listing</span>, <span>40 Coins For 120 Listing</span>, <span>65 Coins For 250 Listing</span>].map(item => 
                <option value="">{
                  item
                }</option>
              )
            }
          </select>

          <br />

            <button>
              Pay Rent Now
            </button>
        </section>
          
      </div>

    

      {/* <div className="btn-cnt">
        <button>Cancel</button>
      </div> */}

    </div>)
}

function Ads() {
  return(<div className="university-edit" style={{width: '70%'}}>
      <div className="seller-input-cnt" style={{overflowX: 'hidden', height: '400px', display: 'inline-block'}}>

        <section style={{width: '100%', margin: '0 10px 20px 10px', borderRadius: '5px', padding: '10px', border: '1px solid #FF4500'}}>
          <p style={{background: '#FF4500', color: '#fff', padding: '10px', borderRadius: '5px', width: '100%'}}>Elite</p>

          <div style={{padding: '10px'}}>

            <p>Cost: 35 coins per month</p>
            <p>Duration: 30 days</p>
            <div>Features:</div>
            <p>Top-tier visibility with highest priority in all search results.</p>
            <p>Exclusive premium highlighting, including custom badges and banners.</p>
            <p>Guaranteed featured placement on the homepage and other prominent sections of the site.</p>
            <p>Includes access to advanced analytics to track performance and optimize listings.</p>
            <p>The best choice for vendors who are serious about dominating the marketplace and driving maximum sales.</p>

          </div>

          <br />

            <button>
              Activate Now
            </button>
        </section>

        <section style={{width: '100%', margin: '0 10px 20px 10px', borderRadius: '5px', padding: '10px', border: '1px solid #FF4500'}}>
          <p style={{background: '#FF4500', color: '#fff', padding: '10px', borderRadius: '5px', width: '100%'}}>Premium</p>

          <div style={{padding: '10px'}}>
            <p>Cost: 25 coins per month</p>
            <p>Duration: 30 days</p>
            <div>Features:</div>
            <p>High priority placement in search results, ensuring listings are seen by more users.</p>
            <p>Premium highlighting, including bold text and additional visual elements to stand out.</p>
            <p>Featured placement in promotional sections of the website.</p>
            <p>Perfect for vendors who want to maximize their exposure and attract a larger customer base.</p>
          </div>

          <br />

            <button>
              Activate Now
            </button>
        </section>

        <section style={{width: '100%', margin: '0 10px 20px 10px', borderRadius: '5px', padding: '10px', border: '1px solid #FF4500'}}>
          <p style={{background: '#FF4500', color: '#fff', padding: '10px', borderRadius: '5px', width: '100%'}}>Standard</p>

          <div style={{padding: '10px'}}>
            <p>Cost: 15 coins per month</p>
            <p>Duration: 30 days</p>
            <div>Features:</div>
            <p>Significant boost in visibility on the Campus Express platform.</p>
            <p>Listings appear higher in search results.</p>
            <p>Includes eye-catching highlighting and a featured badge.</p>
            <p>Suitable for vendors aiming for moderate to high engagement with potential customers.</p>
          </div>

          <br />

            <button>
              Activate Now
            </button>
        </section>

        <section style={{width: '100%', margin: '0 10px 20px 10px', borderRadius: '5px', padding: '10px', border: '1px solid #FF4500'}}>
          <p style={{background: '#FF4500', color: '#fff', padding: '10px', borderRadius: '5px', width: '100%'}}>Basic</p>

          <div style={{padding: '10px'}}>
            <p>Cost: 5 coins per month</p>
            <p>Duration: 30 days</p>
            <div>Features:</div>
            <p>Enhanced visibility compared to the Regular package.</p>
            <p>Listings are slightly prioritized in search results.</p>
            <p>Includes basic highlighting to attract more attention.</p>
            <p>Ideal for vendors looking for a small boost in visibility without a significant investment.</p>
          </div>

          <br />

            <button>
              Activate Now
            </button>
        </section>

        <section style={{width: '100%', margin: '0 10px 20px 10px', borderRadius: '5px', padding: '10px', border: '1px solid #FF4500'}}>
          <p style={{background: '#FF4500', color: '#fff', padding: '10px', borderRadius: '5px', width: '100%'}}>Regular</p>

          <div style={{padding: '10px'}}>
            <p>Cost: 0 coins</p>
            <p>Duration: 30 days</p>
            <div>Features:</div>
            <p>Basic visibility on the Campus Express website.</p>
            <p>Listings appear in standard search results without any special highlighting.</p>
            <p>Suitable for vendors who are just starting out or have a limited budget.</p>
          </div>

          <br />

            <button>
              Activate Now
            </button>
        </section>
          
      </div>

    

      {/* <div className="btn-cnt">
        <button>Cancel</button>
      </div> */}

    </div>)
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

                <div>30</div>
                <div>Days Left</div>

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
                setActiveJsx(<Coin />)
                
              }} />
                <div><b>Campus Coin</b></div>

                <div>
                  {/* <div>ID: Verified</div> */}
                  <div>Available Coin: {
                     160
                  }</div>
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
                setActiveJsx(<Rent />)
                
              }} />
                <div><b>Shop Rent</b></div>

                <div>
                  {/* <div>ID: Verified</div> */}
                  <div>Unlimited Listing: {
                     50 
                  } coin</div>
                  {/* <div>Student: False</div> */}
                </div>

                <div>
                  {/* <div>ID: Verified</div> */}
                  <div>Time Duration: {
                     '30 Days Left'
                  }</div>
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
                setActiveJsx(<Ads />)
                
              }} />
                <div><b>Ads Promotion</b></div>

                <div>
                  {/* <div>ID: Verified</div> */}
                  <div>Basic: {
                    'Active'
                  }</div>
                  
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
