import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cartSvg from '../../../assets/cart-shopping-fast-svgrepo-com (1).svg'
import searchSvg from '../../../assets/search-svgrepo-com.svg'
import mssg from '../../../assets/messages-1-svgrepo-com (1).svg'

import menuSvg from '../../../assets/menu-alt-01-svgrepo-com.svg'
import dArrowSvg from '../../../assets/down-arrow-backup-2-svgrepo-com.svg'
import filterSvg from '../../../assets/filter-edit-svgrepo-com.svg'
import { CE_buyer_ID, CE_buyer_INITIAL } from "../Secrets";
import '../../../styles/Buyer/overlays.css'
import '../../../styles/search.css'
import BuyerAside from "../Aside";
import login from '../../../assets/login.svg'

import img from '../../../logo/[Original size] Untitled (1).png'
import BuyerMenu from "./Menu";
import { useDispatch, useSelector } from "react-redux";
import { setBuyerJsxTo } from "../../../redux/buyer_store/BuyerOverlayJsx";
import { setCartTo } from "../../../redux/buyer_store/Cart";
import { setSaveTo } from "../../../redux/buyer_store/Save"; 
import SearchResult from "./SearchResult";
import FloatingMenu from "./FloatingMenu";
import Aside from "./Aside";
import {
  GetBuyer, 
  GetSavedItem,
  GetSearchWord 
} from "../../../api/buyer/get";

const Header = () => {

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
  let [buyer, set_buyer] = useState('')

  useEffect(() => {
      let width = window.innerWidth;
      setScreenWidth(width)
  }, [])

  

  // useEffect(() => {
  //   setCartList([...Cart].length)
  //   console.log([...Cart]) 
  // }, [Cart])
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
    if(searchChar !== '' && searchChar !== ' '){ 
      try {
        let result = GetSearchWord(searchChar === '' || searchChar === ' ' ? '' : searchChar)
        setSearchRes(result)
      } catch (error) {
        console.log(error)
      }

    }
  }, [searchChar])



  useEffect(() => {
    
    async function fetchData() {
      let data = window.localStorage.getItem('buyerData')
      console.log(data)

      if(data === 'undefined' || data === null){
        let result = await GetBuyer(window.localStorage.getItem('CE_buyer_id'))
        console.log(data)
        window.localStorage.setItem('buyerData', JSON.stringify(result))
      }
    }
    fetchData()
  },[])


  return ( 
    <>
      {
        <FloatingMenu buyer={buyer} list={list} top={top} visible={visible} right={right} />
      }

      {
        <Aside />
      }

      

      
      <div className="buyer-overlay" onClick={e =>e.target === document.querySelector('.buyer-overlay') ? handleOverlay() : ''}>
        {
          buyerJsx === 'filter' ? <BuyerAside /> : <BuyerMenu />
        }

      </div>
      <div className="buyer-header shadow-sm" style={{position: 'sticky', top: '0', zIndex: '1000'}}>


        <img src={img} style={{height: screenWidth > 760 ? '80px' : '50px', width: screenWidth > 760 ? '80px' : '50px'}}  alt="" />
        {
          screenWidth > 479 && location.pathname.split('/').splice(-1)[0] === ''
          ?
          <div className="input-cnt">
            <input onFocus={e =>openSearchResult(e)} onInput={e => {setSearchChar(e.target.value);}} type="search" name="" placeholder="What Are You Looking For..." id="" />
            <button>Search</button>
          </div> 
          : 
          ''
        }

        {
          location.pathname.split('/').splice(-1)[0] === ''
          ?
          <ul style={{
            width: 'fit-content',
          }}>
            <li onClick={e => navigate('/buyer.message')}>
              <span style={{height: 'fit-content', marginTop: '-19px', borderRadius: '50%', width: '20px', fontSize: 'small', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'orangered', color: '#fff'}}>
                { 
                  cartList
                }
              </span>
              {/* <span> */}
                <img src={mssg} style={{height: '25px', width: '25px'}} alt="" />
              {/* </span> */}
              {/* <span>Messages</span>  */}

            </li>
            {/* { */}
              {/* screenWidth > 760 */}

              {/* ? */}

              {/* <>

                <li onClick={e => buyer.fname? openFloatingMenu(e,'user') : navigate('/login')}>
                <span>
                
                  {
                    buyer.fname
                    ?
                    buyer.fname
                    :
                    'Login'
                  }
                </span>

                <span> 
                  <img src={buyer.fname ? dArrowSvg : login} style={{height: buyer.fname ? '22px' : '16px', width: buyer.fname ? '12px' : '30px', marginTop: buyer.fname ? '5px' : '0px', marginLeft: buyer.fname ? '5px' : '-3px', rotate: visible === 'flex' && task === 'user' ? '0deg' : '180deg'}} alt="" />
                </span>
                </li>

                <li onClick={e => openFloatingMenu(e,'help')}> 
                  <span>Help</span>
                  <span>
                    <img src={dArrowSvg} style={{height: '22px', width: '12px', marginTop: '5px', marginLeft: '5px', rotate: visible === 'flex' && task === 'help' ? '0deg' : '180deg'}} alt="" />
                  </span>
                </li>

              </> */}

              {/* :  */}

              <>
              
                {
                  screenWidth < 760
                  ?
                  <li style={{padding: '5px'}} onClick={e => navigate('/search')}>
                    {/* <span>Menu</span> */}
                    <span>
                      <img src={searchSvg} style={{height: '25px', width: '25px', position: 'relative', borderRadius: '2.5px'}} alt="" />
                    </span>
                  </li>
                  :
                  ''
                }

                <li style={{padding: '5px'}} onClick={e => openAside(e)}>
                  {/* <span>Menu</span> */}
                  <span>
                    <img src={menuSvg} style={{height: '30px', width: '30px', rotate: visible === 'flex' && task === 'help' ? '0deg' : '180deg'}} alt="" />
                  </span>
                </li>

              </>
            {/* } */}
          </ul>
          :
          ''
        }
        
        

      </div>


    
    </>
  );
}
  
export default Header; 