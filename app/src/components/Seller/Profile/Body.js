import React, { 
  useEffect, 
  useRef, 
  useState 
} from 'react'
import items from '../../../items.json'
import '../../../styles/Seller/editOverlay.css'
import Reviews from './Reviews'
import { 
  GetItems,
  GetReviews, 
  GetSeller, 
  GetShop, 
  GetSoldItems 
} from '../../../api/seller/get'
import { 
  UpdateInventory, 
  UpdateShop, 
  UpdateShopDesc, 
  UpdateShopTitle
} from '../../../api/seller/update'
import { 
  useNavigate 
} from 'react-router-dom'
import { 
  SendEmail, 
  SendSMS 
} from '../../../api/seller/post'
import Flw from '../../Payments/Flw'
import { useFlutterwave } from 'flutterwave-react-v3'
import Inventory from './Inventory'
import ItemsSold from './ItemsSold'
import Summary from './Summary'
import CoinComp from './Coin'
import University from './University'
import ShopRent from './ShopRent'
import Verification from './Verification'
import ShopDesc from './ShopDesc'
import AdsComp from './AdsComp'
// import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Editor } from '@tinymce/tinymce-react';
import ShopTitle from './ShopTitle'

function TitleEdit({shop_title}) {
  let title = useRef(shop_title)
  
  return(
    <div className="descripion-edit" style={{overflow: 'auto'}}>
    <h3>Shop Title</h3>
      <div className="input-cnt">
        <input 
          defaultValue={shop_title} 
          onInput={e => title.current=(e.target.value)} 
          placeholder='Enter Shop Title' 
          type="text" 

        />
        
      </div>
 
      <div className="btn-cnt">
        <button onClick={async(e) => {
          let overlay = document.querySelector('.overlay');
          overlay.setAttribute('id', 'overlay');
          let response = await UpdateShopTitle(title.current,window.localStorage.getItem('CE_seller_id'));
          
          if(response){
            window.location.reload()
            overlay.removeAttribute('id')
          }
        }}>Update</button>
        <button>Cancel</button>
      </div>
    </div>
  )
}

function DescEdit({shop_description}) {
 
  let desc= useRef(shop_description)
  const [value, setValue] = useState(desc.current);

  useEffect(() => {
    desc.current=value;
  }, [value])
  
  

  return(
    <div className="descripion-edit" style={{overflow: 'auto'}}>

      <h3>Description</h3>
      

      <div className="input-cnt" style={{ border: '1px solid #ccc', padding: '10px', minHeight: '300px' }}>
        {/* <textarea defaultValue={shop_description} onInput={e => desc.current = (e.target.value)} name="" id="" placeholder='Enter Your Description'></textarea> */}
      
        <Editor
          apiKey="o4jga8stx5u5sh6la3gz936w4ydyv78e0k7p6q36mi0ebww1"
          value={value}
          init={{
            minHeight: 300,
            width: '100%',
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help'
          }}
          onEditorChange={(content, editor) => {
            setValue(content)

          }}
        />
      </div>

  
 
      <div className="btn-cnt">
        <button onClick={async(e) => {
          let overlay = document.querySelector('.overlay');
          overlay.setAttribute('id', 'overlay');
          let response = await UpdateShopDesc(desc.current, window.localStorage.getItem('CE_seller_id'));
          
          if(response){
            window.location.reload()
            overlay.removeAttribute('id')
          }
        }}>Update</button>
        <button>Cancel</button>
      </div>
    </div>
  )
}

function InvetoryEdit({list}) {
  let [selectedList, setSelectedList] = useState([]);

  useEffect(() => {
    let data = list !== '' ? setSelectedList(JSON.parse(list)) : []
  },[])

  let [invetoryList, setInventoryList] = useState(
    items.items.category.map(item => Object.keys(item)[0])
  );

    async function UpdateInventoryHandler() {
      let overlay = document.querySelector('.overlay');
      overlay.setAttribute('id', 'overlay');
      let result = await UpdateInventory(selectedList, window.localStorage.getItem("CE_seller_id"))
      
      if(result){
        window.location.reload()
        overlay.removeAttribute('id')
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
    <div className="profile-edit">
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

function Coin({email,phone,seller_id, name}) {

  let [price, setPrice] = useState('')
  useEffect(() => {
    console.log(email,phone)
  },[price])

  const config = {
    public_key: 'FLWPUBK-502f1f73c8abf430f161a528241c198a-X',
    tx_ref: Date.now(),
    amount: parseInt(price) + 45,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
        email: email,
        phone_number: phone,
        name: name,
        ce_id: seller_id
    },
    customizations: {
    title: 'Campus Express',
    description: 'Campus Coin Purchase',
    logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);
  return(<div className="profile-edit" style={{background: '#FF4500'}}>

      <h2 style={{width: '100%', textAlign: 'center', color: '#fff', fontSize: '3.5vh', fontWeight: '500'}}>Campus Coin Exchange</h2>
      <div className="seller-input-cnt">

        <section style={{width: '100%', borderRadius: '5px', padding: '10px', border: '1px solid #FF4500'}}>
          <p style={{color: '#fff', fontWeight: '400', padding: '10px 0 10px 0', borderRadius: '5px', width: '100%'}}>Select The Amount To Buy</p>

          <select onInput={e => setPrice(e.target.value.split(' ')[0].split('').splice(1).join(''))} name="" id="" style={{background: '#efefef'}}>
          <option value="">Select Coin To Buy</option>
            {
              
              [<span>&#8358;500 for 10 Coin</span>, <span>&#8358;1000 for 20 Coin</span>, <span>&#8358;1500 for 30 Coin</span>, <span>&#8358;2000 for 40 Coin</span>, <span>&#8358;2500 for 50 Coin</span>, <span>&#8358;3000 for 60 Coin</span>, <span>&#8358;3500 for 70 Coin</span>, <span>&#8358;4000 for 80 Coin</span>, <span>&#8358;4500 for 90 Coin</span>, <span>&#8358;5000 for 100 Coin</span>, <span>&#8358;5500 for 120 Coin</span>, <span>&#8358;600 for 130 Coin</span>, <span>&#8358;6500 for 140 Coin</span>, ].map(item => 
                <option value={item.innerHTML}>{
                  item
                }</option>
              )
            }
          </select>

          <br />

            <button onClick={e => {
              handleFlutterPayment({
                callback: (response) => {
                  console.log(response);
                  // closePaymentModal() // this will close the modal programmatically
                },
                onClose: () => {}
              });
            }} style={{border: '1px solid #fff'}}>
              Buy Coin Now
            </button>
        </section>
          
      </div>

      <div className="seller-input-cnt">
          <section style={{width: '100%'}}>
            <p style={{color: '#fff', padding: '10px', borderRadius: '5px', width: '100%', border: '1px solid #FF4500', padding: '10px 0 10px 0', fontWeight: '400'}}>Exchange Coin For Cash</p>

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

            <button style={{border: '1px solid #fff'}}>
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
  return(<div className="profile-edit" style={{background: '#FF4500'}}>
      <div className="seller-input-cnt">

        

        <section style={{width: '100%', borderRadius: '5px', padding: '10px', border: '1px solid #FF4500'}}>
          <h2 style={{width: '100%', textAlign: 'center', color: '#fff', fontSize: '3.5vh', fontWeight: '500'}}>Campus Shop Rent </h2>

          <br />
          
          <p style={{color: '#fff', fontWeight: '400', padding: '10px 0 10px 0', borderRadius: '5px', width: '100%'}}>Select Rent Price</p>


          <select name="" id="" style={{background: '#efefef'}}>
            {
              
              [<span>0 Coins For 3 Listing (Free)</span>, <span>10 Coins For 15 Listing</span>, <span>20 Coins For 30 Listing</span>, <span>35 Coins For 60 Listing</span>, <span>40 Coins For 120 Listing</span>, <span>65 Coins For 250 Listing</span>].map(item => 
                <option value="">{
                  item
                }</option>
              )
            }
          </select>

          <br />

            <button style={{border: '1px solid #fff'}}>
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
  return(<div className="profile-edit" style={{background: '#FF4500', padding: '10px', height: '95vh', width: '100vw'}}>

      <div className="seller-input-cnt" style={{width: '100%', height: 'fit-content', display: 'inline-block', overflow: 'auto'}}>
        <h2 style={{color: '#fff'}}><b>Ads Packages</b></h2>
        <br />


        <section style={{width: '100%', background: '#fff', margin: '0 0px 20px 0px', borderRadius: '5px', padding: '10px', border: '1px solid #FF4500'}}>
          <p style={{background: '#FF4500', color: '#fff', padding: '10px', borderRadius: '5px', width: '100%'}}>Elite</p>

          <div style={{padding: '10px'}}>

            <h2><b>Cost: 35 coins per month</b></h2>
            <p>Duration: 30 days</p>
            <div> <b>Features:</b> </div>
            <ul style={{padding: '20px'}}>
              <li style={{listStyleType: 'disc'}}>Top-tier visibility with highest priority in all search results.</li>
              <li style={{listStyleType: 'disc'}}>Exclusive premium highlighting, including custom badges and banners.</li>
              <li style={{listStyleType: 'disc'}}>Guaranteed featured placement on the homepage and other prominent sections of the site.</li>
              <li style={{listStyleType: 'disc'}}>Includes access to advanced analytics to track performance and optimize listings.</li>
              <li style={{listStyleType: 'disc'}}>The best choice for vendors who are serious about dominating the marketplace and driving maximum sales.</li>
            </ul>

          </div>

          <br />

            <button>
              Activate Now
            </button>
        </section>

        <section style={{width: '100%', background: '#fff', margin: '0 0px 20px 0px', borderRadius: '5px', padding: '10px', border: '1px solid #FF4500'}}>
          <p style={{background: '#FF4500', color: '#fff', padding: '10px', borderRadius: '5px', width: '100%'}}>Premium</p>

          <div style={{padding: '10px'}}>
            <h2><b>Cost: 25 coins per month</b></h2>
            <p>Duration: 30 days</p>
            <div><b>Features:</b></div>
            
            <ul style={{padding: '20px'}}>
              <li style={{listStyleType: 'disc'}}>High priority placement in search results, ensuring listings are seen by more users.</li>
              <li style={{listStyleType: 'disc'}}>Premium highlighting, including bold text and additional visual elements to stand out.</li>
              <li style={{listStyleType: 'disc'}}>Featured placement in promotional sections of the website.</li>
              <li style={{listStyleType: 'disc'}}>Perfect for vendors who want to maximize their exposure and attract a larger customer base.</li>
            </ul>
          </div>

          <br />

            <button>
              Activate Now
            </button>
        </section>

        <section style={{width: '100%', background: '#fff', margin: '0 0px 20px 0px', borderRadius: '5px', padding: '10px', border: '1px solid #FF4500'}}>
          <p style={{background: '#FF4500', color: '#fff', padding: '10px', borderRadius: '5px', width: '100%'}}>Standard</p>

          <div style={{padding: '10px'}}>
            <p>Cost: 15 coins per month</p>
            <p>Duration: 30 days</p>
            <div><b>Features:</b></div>
            <ul style={{padding: '20px'}}>
              <li style={{listStyleType: 'disc'}}>Significant boost in visibility on the Campus Express platform.</li>
              <li style={{listStyleType: 'disc'}}>Listings appear higher in search results.</li>
              <li style={{listStyleType: 'disc'}}>Includes eye-catching highlighting and a featured badge.</li>
              <li style={{listStyleType: 'disc'}}>Suitable for vendors aiming for moderate to high engagement with potential customers.</li>
            </ul>
          </div>

          <br />

            <button>
              Activate Now
            </button>
        </section>

        <section style={{width: '100%', background: '#fff', margin: '0 0px 20px 0px', borderRadius: '5px', padding: '10px', border: '1px solid #FF4500'}}>
          <p style={{background: '#FF4500', color: '#fff', padding: '10px', borderRadius: '5px', width: '100%'}}>Basic</p>

          <div style={{padding: '10px'}}>
            <p>Cost: 5 coins per month</p>
            <p>Duration: 30 days</p>
            <div><b>Features:</b></div>
            <ul style={{padding: '20px'}}>
              <li style={{listStyleType: 'disc'}}>Enhanced visibility compared to the Regular package.</li>
              <li style={{listStyleType: 'disc'}}>Listings are slightly prioritized in search results.</li>
              <li style={{listStyleType: 'disc'}}>Includes basic highlighting to attract more attention.</li>
              <li style={{listStyleType: 'disc'}}>Ideal for vendors looking for a small boost in visibility without a significant investment.</li>
            </ul>
          </div>

          <br />

            <button>
              Activate Now
            </button>
        </section>

        <section style={{width: '100%', background: '#fff', margin: '0 0px 20px 0px', borderRadius: '5px', padding: '10px', border: '1px solid #FF4500'}}>
          <p style={{background: '#FF4500', color: '#fff', padding: '10px', borderRadius: '5px', width: '100%'}}>Regular</p>

          <div style={{padding: '10px'}}>
            <p>Cost: 0 coins</p>
            <p>Duration: 30 days</p>
            <div><b>Features:</b></div>
            <ul style={{padding: '20px'}}>
              <li style={{listStyleType: 'disc'}}>Basic visibility on the Campus Express website.</li>
              <li style={{listStyleType: 'disc'}}>Listings appear in standard search results without any special highlighting.</li>
              <li style={{listStyleType: 'disc'}}>Suitable for vendors who are just starting out or have a limited budget.</li>
            </ul>
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
  const [soldItems, setSoldItems] = useState([]);
  let [reviews, setReviews] = useState([])
  let [shop, setShop] = useState('')
  let [TotalSold, setTotalSold] = useState('0')
  let [TotalEarned, setTotalEarned] = useState('0')
  let [activeJsx, setActiveJsx] = useState('')
  let [userData, setUserData] = useState('')


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
    async function getReviews() {
      let reviews = await GetReviews(window.localStorage.getItem("CE_seller_id"))
      setSoldItems(reviews)
    }
    getReviews()
    async function getSellerShop() {
      let shop = await GetItems(window.localStorage.getItem("CE_seller_id"))


      
      if(shop?.length > 0){
        let result = shop.filter(shop.status === 'sold');
        if(result.length > 0){
          result.forEach((number) => {
            setTotalEarned(TotalEarned += number);
          });
        }else{
          setTotalEarned(0)
          setTotalSold(0)
        }
      }else{
        setTotalEarned(0)
        setTotalSold(0)
      }
    }
    getSellerShop()
  }, [shop])


  function updateActiveJsx(data) {
    setActiveJsx(data)
  }


   
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
          
          <Summary TotalEarned={TotalEarned} TotalSold={TotalSold} />
          <br />

          <CoinComp updateActiveJsx={updateActiveJsx} Coin={Coin} userData={userData} shop={shop} />
          <br />

          <ShopRent Rent={Rent} updateActiveJsx={updateActiveJsx} shop={shop} />
          <br />

          <AdsComp shop={shop} Ads={Ads} updateActiveJsx={updateActiveJsx} />
          <br />

          <Verification userData={userData} ContactEdit={ContactEdit} updateActiveJsx={updateActiveJsx} />
          <br />

          <University userData={userData} />

        </div>

        <div className="seller-profile-others">

          <ShopTitle shop={shop} TitleEdit={TitleEdit} updateActiveJsx={updateActiveJsx} />

          <ShopDesc shop={shop} DescEdit={DescEdit} updateActiveJsx={updateActiveJsx} />

          <ItemsSold soldItems={soldItems} />

          <Inventory updateActiveJsx={updateActiveJsx} shop={shop} InvetoryEdit={InvetoryEdit} />


          <Reviews reviews={reviews} />
        </div>

          
      </div>
    </>
  )
} 
