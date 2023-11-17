import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import cartSvg from '../../assets/cart-shopping-fast-svgrepo-com.svg'
import userSvg from '../../assets/user-svgrepo-com (2).svg'
import filterSvg from '../../assets/filter-edit-svgrepo-com.svg'
import { CE_buyer_ID, CE_buyer_INITIAL } from "./Secrets";
import '../../styles/Buyer/overlays.css'
import BuyerAside from "./Aside";
import BuyerMenu from "./Menu";
import { useDispatch, useSelector } from "react-redux";
import { setBuyerJsxTo } from "../../redux/buyer/BuyerOverlayJsx";

const BuyerHeader = () => {

  let {buyerJsx} = useSelector(s => s.buyerJsx)
  let {Cart} = useSelector(s => s.Cart)

  let location = useLocation();
  let [buyerId,setBuyerId] = useState(null)
  let [buyerName,setBuyerName] = useState(null)
  //let [activeJsx, setActiveJsx]= useState(null)
  let [cartList,setCartList] = useState(0)


  let [screenWidth, setScreenWidth] = useState(0)

  let navigate = useNavigate()
  let dispatch = useDispatch()

  useEffect(() => {
      let width = window.innerWidth;
      setScreenWidth(width)
  }, [])

  useEffect(() => {
    setCartList([...Cart].length)
    console.log([...Cart]) 
  }, [Cart])
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
              buyerJsx === 'filter' ? <BuyerAside /> : <BuyerMenu />
            }
          </div>
          <div className="buyer-header ">

          {
            screenWidth > 479
            ?
            <h2 style={{fontWeight: '800', color: 'orangered'}}>Campus Express</h2>
            :
            <h5 style={{fontWeight: '1000', color: 'orangered'}}>Campus Express</h5>
          }

            {
              screenWidth > 479
              ?
              <div className="input-cnt">
                <input type="search" name="" placeholder="What Are You Looking For..." id="" />
                <button>Search</button>
              </div>
              : 
              ''
            }

            <section>
              <ul>
                <li>
                  <span style={{borderRadius: '50%'}}>{cartList}</span>
                  <span>
                    <img src={cartSvg} style={{height: '25px', width: '25px', position: 'relative', borderRadius: '2.5px',marginRight: '5px'}} alt="" />
                  </span>
                  {
                    screenWidth <= 479
                    ?
                    ''
                    : 
                    <>
                      &nbsp;
                      <span>Cart</span>
                    </>
                  }
                </li>
                  {
                    screenWidth <= 479
                    ?
                    ''
                    :
                    <li data-btn='filter' onClick={e => {
                    dispatch(setBuyerJsxTo('filter'));
                    handleOverlay();

                  }}>
                    <span>
                      <img src={filterSvg} style={{height: '25px', width: '25px', position: 'relative', borderRadius: '2.5px'}} alt="" />
                    </span>
                    &nbsp;

                    <span>Filter</span>
                    </li>
                  }
                <li  onClick={e => {
                    dispatch(setBuyerJsxTo('menu'));
                    buyerId != null ? handleOverlay() : navigate('/signup')
                  }} style={{height: '100%', width: 'fit-content', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '5px'}}>
                  <span style={{display: buyerId !== null ? 'none' : 'flex', width: '100%', height: '100%',  justifyContent: 'center', marginRight: '5px'}}>
                    <img src={userSvg} style={{height: screenWidth > 479 ? '25px' : '18px', width: screenWidth > 479 ? '25px' : '18px', position: 'relative', borderRadius: '2.5px'}} alt="" />
                  </span>
                  &nbsp;
                  

                   <span style={{fontSize: 'small'}}>{buyerId !== null ? buyerName : 'Login'}</span>
                </li>
              </ul>
            </section>

          </div>
      </>
    );
}
 
export default BuyerHeader;