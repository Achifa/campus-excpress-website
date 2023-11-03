import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import cartSvg from '../../assets/cart-shopping-fast-svgrepo-com.svg'
import userSvg from '../../assets/user-svgrepo-com (2).svg'
import filterSvg from '../../assets/filter-edit-svgrepo-com.svg'
import { CE_buyer_ID, CE_buyer_INITIAL } from "./Secrets";
import '../../styles/Buyer/overlays.css'
import BuyerAside from "./Aside";
import BuyerMenu from "./Menu";

const BuyerHeader = () => {

  let location = useLocation();
  let [buyerId,setBuyerId] = useState(null)
  let [buyerName,setBuyerName] = useState(null)
  let [activeJsx, setActiveJsx]= useState(null)

  let navigate = useNavigate();
  let [width, setWidth] = useState(0)

  useEffect(() => {

    let id = CE_buyer_ID();
    let initial = CE_buyer_INITIAL();
    setBuyerId(id)
    setBuyerName(initial)

  },[]) 

  useEffect(() => {
    if(location.pathname.split('/').splice(-1)[0] === 'product'){
      setWidth('100%')
    }else{
        setWidth(`calc(100% - 350px)`)
    }
  }, [location])

  function handleOverlay(e) {
    let elem = document.querySelector('.buyer-overlay');
    if(elem.hasAttribute('id')){
      elem.removeAttribute('id')
    }else{
      elem.setAttribute('id', 'buyer-overlay')
    }
  }



  

  return ( 
      <>
          <div className="buyer-overlay" onClick={e => 
            e.target === document.querySelector('.buyer-overlay') ? handleOverlay() : ''
          }>
            {
              activeJsx === 'filter' ? <BuyerAside /> : <BuyerMenu />
            }
          </div>
          <div className="buyer-header ">

          <h2 style={{fontWeight: '800', color: 'orangered'}}>Campus Express</h2>

            <div className="input-cnt">
                <input type="search" name="" placeholder="What Are You Looking For..." id="" />
                <button>Search</button>
            </div>

            <section>
              <ul>
                <li>
                  <span style={{padding: '2.5px', borderRadius: '50%'}}>0</span>
                  <span>
                    <img src={cartSvg} style={{height: '25px', width: '25px', position: 'relative', borderRadius: '2.5px'}} alt="" />
                  </span>
                  &nbsp;
                  <span>Cart</span>
                </li>
                <li data-btn='filter' onClick={e => {
                  setActiveJsx('filter');
                  handleOverlay();

                }}>
                  <span>
                    <img src={filterSvg} style={{height: '25px', width: '25px', position: 'relative', borderRadius: '2.5px'}} alt="" />
                  </span>
                  &nbsp;

                  <span>Filter</span>
                </li>
                <li  onClick={e => {
                    setActiveJsx('menu')
                    buyerId != null ? handleOverlay() : navigate('/buyer/signup')
                  }} style={{height: '100%', width: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%'}}>
                  <span style={{display: buyerId !== null ? 'none' : 'block'}}>
                    <img src={userSvg} style={{height: '25px', width: '25px', position: 'relative', borderRadius: '2.5px'}} alt="" />
                  </span>
                  &nbsp;

                  <span>{buyerId !== null ? buyerName : 'Login'}</span>
                </li>
              </ul>
            </section>

          </div>
      </>
    );
}
 
export default BuyerHeader;