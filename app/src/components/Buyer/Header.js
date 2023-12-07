import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cartSvg from '../../assets/cart-shopping-fast-svgrepo-com (1).svg'
import userSvg from '../../assets/user-svgrepo-com (2).svg'
import filterSvg from '../../assets/filter-edit-svgrepo-com.svg'
import { CE_buyer_ID, CE_buyer_INITIAL } from "./Secrets";
import '../../styles/Buyer/overlays.css'
import '../../styles/search.css'
import BuyerAside from "./Aside";
import BuyerMenu from "./Menu";
import { useDispatch, useSelector } from "react-redux";
import { setBuyerJsxTo } from "../../redux/buyer/BuyerOverlayJsx";
import { GetCart, GetSavedItem, GetSearchWord } from "../../api/buyer";
import { setCartTo } from "../../redux/buyer/Cart";
import { setSaveTo } from "../../redux/buyer/Save";
import SearchResult from "./SearchResult";

const BuyerHeader = () => {

  let {buyerJsx} = useSelector(s => s.buyerJsx)
  let {Cart} = useSelector(s => s.Cart)

  let location = useLocation();
  let [buyerId,setBuyerId] = useState(null)
  let [buyerName,setBuyerName] = useState(null)
  //let [activeJsx, setActiveJsx]= useState(null)
  let [cartList,setCartList] = useState(0)
  let [searchChar, setSearchChar] = useState('')

  let [screenWidth, setScreenWidth] = useState(0)

  let navigate = useNavigate()
  let dispatch = useDispatch()
  let [searchResultElem, setSearchResultElem] = useState('')

  useEffect(() => {
      let width = window.innerWidth;
      setScreenWidth(width)
  }, [])

  useEffect(() => {
    GetCart(window.localStorage.getItem('CE_buyer_id'))
    .then((result) => {
        dispatch(setCartTo(result))
    })
    .catch((err) => {
        console.log(err)
    })

    GetSavedItem(window.localStorage.getItem('CE_buyer_id'))
    .then((result) => {
        dispatch(setSaveTo(result))
    })
    .catch((err) => {
        console.log(err)
    })
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

  useEffect(() => {
    GetSearchWord(searchChar)
    .then((result) => { 
      console.log(result)
      setSearchResultElem(<SearchResult list={result} />)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [searchChar])

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
          <h2 style={{fontWeight: '800', color: 'orangered', fontFamily: "'Times New Roman', Times, serif"}}>Campus Express</h2>
          :
          <h5 style={{fontWeight: '1000', color: 'orangered',fontFamily: "'Times New Roman', Times, serif"}}>Campus Express</h5>
        }

          {
            screenWidth > 479
            ?
            <div className="input-cnt">
              <input onInput={e => setSearchChar(e.target.value)} type="search" name="" placeholder="What Are You Looking For..." id="" />
              <button>Search</button>
            </div>
            : 
            ''
          }

          <section >
            <ul style={{display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-between', listStyleType: 'none', padding: '0', margin: '0'}} className="buyer-header-list-cnt">
              <li style={{borderRadius: '50%', fontSize: 'small', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} className="buyer-header-list" onClick={e => navigate('/cart')}>
                <span style={{borderRadius: '50%', fontSize: 'small', position: 'absolute', top: '-4px', left: '-4px', background: 'orangered', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',padding: '0', height: '15px', width: '15px'}}>{cartList}</span>
                <span>
                  <img src={cartSvg} style={{height: '25px', width: '25px', position: 'relative', borderRadius: '5px',marginRight: '5px'}} alt="" />
                </span>

                &nbsp;
                {
                  screenWidth <= 479
                  ?
                  ''
                  : 
                  ''
                  
                }
              </li>
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              <li className="buyer-header-list">
                <div className="dropdown">
                  <button style={{outline: 'none', border: 'none'}} className="btn btn-light btn-sm dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                    Help
                  </button>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" href="#">Help center</Link></li>
                    <li><Link className="dropdown-item" href="#">Place an order</Link></li>
                    <li><Link className="dropdown-item" href="#">Payment option</Link></li>
                    <li><Link className="dropdown-item" href="#">Track order</Link></li>
                    <li><Link className="dropdown-item" href="#">Cancel order</Link></li>
                    <li><Link className="dropdown-item" href="#">Returns & Refunds</Link></li>

                    <hr />

                    <li><Link className="dropdown-item" href="#">Live Chat</Link></li>

                  </ul>
                </div>
              </li>
              &nbsp;
              &nbsp;
              <li className="buyer-header-list" >
                 

                  <div className="dropdown">
                    <button style={{outline: 'none', border: 'none'}} className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                      Hi  &nbsp;{buyerId !== null ? buyerName : 'Login'}
                    </button>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" href="#">My account</Link></li>
                      <li><Link className="dropdown-item" href="#">Orders action</Link></li>
                      <li><Link className="dropdown-item" href="#">Inbox</Link></li>
                      <li><Link className="dropdown-item" href="#">Saved Items</Link></li>

                      <hr />
                      <li><Link className="dropdown-item" href="#">Logout</Link></li>

                    </ul>
                  </div>
              </li>
            </ul>
          </section>
          

        </div>
        {
          searchResultElem
        }
    </>
  );
}
 
export default BuyerHeader;