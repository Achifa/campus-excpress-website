import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cartSvg from '../../../assets/cart-shopping-fast-svgrepo-com (1).svg'
import menuSvg from '../../../assets/menu-alt-01-svgrepo-com.svg'
import dArrowSvg from '../../../assets/down-arrow-backup-2-svgrepo-com.svg'
import filterSvg from '../../../assets/filter-edit-svgrepo-com.svg'
import { CE_buyer_ID, CE_buyer_INITIAL } from "../dashboard/Secrets";
import '../../../styles/Buyer/overlays.css'
import '../../../styles/search.css'
import BuyerAside from "../Aside";
import img from '../../../images/Campus express (3).png'
import BuyerMenu from "./Menu";
import { useDispatch, useSelector } from "react-redux";
import { setBuyerJsxTo } from "../../../redux/buyer/BuyerOverlayJsx";
import { GetCart, GetSavedItem, GetSearchWord } from "../../../api/buyer";
import { setCartTo } from "../../../redux/buyer/Cart";
import { setSaveTo } from "../../../redux/buyer/Save";
import SearchResult from "./SearchResult";
import FloatingMenu from "./FloatingMenu";
import Aside from "./Aside";
import SearchBar from "./SeachBar";

const BuyerHeader = () => {

  let {buyerJsx} = useSelector(s => s.buyerJsx)
  let {Cart} = useSelector(s => s.Cart)
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let location = useLocation()

  let [buyerId,setBuyerId] = useState(null)
  let [buyerName,setBuyerName] = useState(null)
  //let [activeJsx, setActiveJsx]= useState(null)
  let [cartList,setCartList] = useState(0)
  let [searchChar, setSearchChar] = useState('')
  let [screenWidth, setScreenWidth] = useState(0)
  let [searchRes, setSearchRes] = useState([])
  
  let [searchResultElem, setSearchResultElem] = useState(
    <SearchResult list={[searchRes]} />
  )
  let [list, setList] = useState([])
  let [right, setright] = useState(0)
  let [visible, setvisible] = useState('none')
  let [task, settask] = useState('none')
  let [top, settop] = useState(0)

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
  
  function handleOverlay(e) {
    let elem = document.querySelector('.buyer-overlay');
    if(elem.hasAttribute('id')){
      elem.removeAttribute('id')
    }else{
      elem.setAttribute('id', 'buyer-overlay')
    }
  }

  function openFloatingMenu(e,task) {
    settask(task)

    if(task === 'help'){
      if(visible === 'none')
      {
        let list = ['Help Center', 'Refund & Return', 'Cancel An Order', 'Track An Order', 'Payment Option', 'Contact Us']
        setList(list)
        setvisible('flex')
        let rect = e.target.getBoundingClientRect();
        let t = rect.top;

        let r = rect.right;
        setright(r)
        settop(t)

        setTimeout(() => {
          setvisible('none')
        }, 8000);
      }
      else{
        setvisible('none')

      }



    }else{
      if(visible === 'none')
      {
        let list = ['My Account', 'Order', 'Inbox', 'Saved Item', 'Voucher', 'Logout']
        setList(list)
        setvisible('flex')
        let rect = e.target.getBoundingClientRect();
        let t = rect.top;

        let r = rect.right;
        setright(r)
        settop(t)


        setTimeout(() => {
          setvisible('none')
        }, 8000);

      }else{
        setvisible('none')

      }



    }
  }
  
  function openAside(params) {
    document.querySelector('.aside-overlay').setAttribute('id', 'aside-overlay')
  }

  function openSearchResult(e) {
    let position = e.target.getBoundingClientRect();
    let top = position.top
    let left = position.left
    document.querySelector('.buyer-search-overlay').setAttribute('id', 'buyer-search-overlay')

    setSearchResultElem(<SearchResult  searchLeft={left} searchTop={top} list={[searchRes]} />)
  }

  useEffect(() => {
    
    GetSearchWord(searchChar)
    .then((result) => { 
        setSearchRes(result)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [searchChar])


  return ( 
    <>
      {
        <FloatingMenu list={list} top={top} visible={visible} right={right} />
      }

      {
        <Aside />
      }

      

      
      <div className="buyer-overlay" onClick={e =>e.target === document.querySelector('.buyer-overlay') ? handleOverlay() : ''}>
        {
          buyerJsx === 'filter' ? <BuyerAside /> : <BuyerMenu />
        }

      </div>
      <div className="buyer-header">


        <img src={img} style={{height: '70px', width: '70px'}}  alt="" />
        {
          screenWidth > 479
          ?
          <div className="input-cnt">
            <input onBlur={e => {

            }} onFocus={e =>openSearchResult(e)} onInput={e => {setSearchChar(e.target.value);}} type="search" name="" placeholder="What Are You Looking For..." id="" />
            <button>Search</button>
          </div> 
          : 
          ''
        }

        <ul>
          <li onClick={e => navigate('/cart')}>
            <span>
              <img src={cartSvg} style={{height: '25px', width: '25px'}} alt="" />
            </span>
            <span>Cart</span>

          </li>
          {
            screenWidth > 760

            ?

            <>

              <li onClick={e => openFloatingMenu(e,'user')}>
              <span>Hi Akpulu</span>
              <span>
                <img src={dArrowSvg} style={{height: '22px', width: '12px', marginTop: '5px', marginLeft: '5px', rotate: visible === 'flex' && task === 'user' ? '0deg' : '180deg'}} alt="" />
              </span>
              </li>

              <li onClick={e => openFloatingMenu(e,'help')}> 
                <span>Help</span>
                <span>
                  <img src={dArrowSvg} style={{height: '22px', width: '12px', marginTop: '5px', marginLeft: '5px', rotate: visible === 'flex' && task === 'help' ? '0deg' : '180deg'}} alt="" />
                </span>
              </li>

            </>

            : 
            
            <li onClick={e => openAside(e)}>
              {/* <span>Menu</span> */}
              <span>
                <img src={menuSvg} style={{height: '30px', width: '30px', rotate: visible === 'flex' && task === 'help' ? '0deg' : '180deg'}} alt="" />
              </span>
            </li>
          }
        </ul>

        
        

      </div>


      {
          screenWidth > 479
          ?
          ''
          :
          <SearchBar />
      }
        
      {
        searchResultElem
      }
    </>
  );
}
  
export default BuyerHeader;