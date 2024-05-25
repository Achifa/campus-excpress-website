import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cartSvg from '../../../assets/cart-shopping-fast-svgrepo-com (1).svg'
import searchSvg from '../../../assets/search-svgrepo-com.svg'
import sellSvg from '../../../assets/sell-svgrepo-com.svg'
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
import Filter from "./Filter";
import Search from "./SearchOutput";
import SearchBar from "./SearchBar";
import { setSearchListTo } from "../../../redux/buyer_store/SearchList";

const Header = ({
  
}) => {

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

  function openAside() {
    document.querySelector('.aside-overlay').setAttribute('id', 'aside-overlay')
  }

  function openFilter() {
    document.querySelector('.filter-overlay').setAttribute('id', 'filter-overlay')
  }

  function openSearchResult(e) {
   

    let position = e.target.getBoundingClientRect();
    let top = position.top
    let left = position.left
    document.querySelector('.buyer-search-overlay').setAttribute('id', 'buyer-search-overlay')

    let searchWidth = document.querySelector('.search-cnt')?.getBoundingClientRect().width
    setSearchResultElem(<SearchResult  searchLeft={left} searchTop={top} searchWidth={searchWidth}  />)
  }

  useEffect(() => {
    async function getData() {
      if(searchChar !== '' && searchChar !== ' '){ 
        try {
           let result = await GetSearchWord(searchChar)
           dispatch(setSearchListTo(result))
           console.log('result: ', result)
           
        } catch (error) {
           console.log(error)
        }
   
       }
    }
    getData()
  }, [searchChar])



  useEffect(() => {
    
    async function fetchData() {
      // if(window.localStorage.getItem('buyerData') !== null){
      //   let data = JSON?.parse(window.localStorage.getItem('buyerData'))
      //   if(data === 'undefined' || data === null || data === ''){

      //     let result = await GetBuyer(window.localStorage.getItem('CE_buyer_id'))
      //     window.localStorage.setItem('buyerData', JSON.stringify(result))
      //     // alert('data'.JSON.stringify(result)) 
  
      //   }
      // }
      

      
    }
    fetchData()
  },[])


  
  


  return ( 
    <>
     
      {
        <Aside />
      }

        {
          searchResultElem
        }

      <div className="buyer-header" style={{position: 'sticky', top: '0', zIndex: '10000'}}>


        <img src={img} style={{height: screenWidth > 760 ? '80px' : '50px', width: screenWidth > 760 ? '80px' : '50px'}}  alt="" />
        {
          screenWidth > 479 && location.pathname.split('/').splice(-1)[0] === ''
          ?
          <div className="input-cnt search-cnt">
            <input onFocus={e => openSearchResult(e)} onInput={e => {
              async function getData() {
                if(e.target.value !== '' && e.target.value !== ' '){ 
                  try {
                    let result = await GetSearchWord(e.target.value)
                    dispatch(setSearchListTo(result))
                  } catch (error) {
                    console.log(error)
                  }
            
                }
              }
              getData()
            }} type="search" name="" placeholder="What Are You Looking For..." id="" />
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
            {/* <li onClick={e => navigate('/buyer.message')}>  
              <span style={{height: 'fit-content', marginTop: '-19px', borderRadius: '50%', width: '20px', fontSize: 'small', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'orangered', color: '#fff'}}>
                { 
                  cartList
                }
              </span>
              <span>
                <img src={mssg} style={{height: '25px', width: '25px'}} alt="" />
              </span>
              <span>Messages</span> 

            </li> */}
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
                  screenWidth > 479
                  ?
                  <li style={{padding: '5px'}} onClick={e => openFilter(e)}>
                    <span>
                      <img src={filterSvg} style={{height: '25px', width: '25px', rotate: visible === 'flex' && task === 'help' ? '0deg' : '180deg'}} alt="" />
                    </span>
                  </li>
                  :
                  ''
                }

                &nbsp;
                

                {/* <li style={{padding: '5px'}} onClick={e => openAside(e)}>
                  <span>
                    <img src={menuSvg} style={{height: '30px', width: '30px', rotate: visible === 'flex' && task === 'help' ? '0deg' : '180deg'}} alt="" />
                  </span>
                </li> */}

                <li style={{padding: '5px 10px 5px 10px', background: '#FF4500', color: '#fff', fontSize: 'large'}} onClick={e => openAside(e)}>
                  <span>Sell</span>
                  &nbsp;
                  <span>
                    <img src={sellSvg} style={{height: '25px', width: '25px'}} alt="" />
                  </span>
                </li>
              </>
            {/* } */}
          </ul>
          :
          ''
        }
        
        

      </div>

      

      {
        screenWidth < 479 && location.pathname.split('/')[1]==='search'
        ? 
        <SearchBar />
        :
        screenWidth < 479 && location.pathname.split('/')[1]===''
        ?
        <SearchBar />
        :
        ''
      }
      {/* <Filter /> */}


    
    </>
  );
}
  
export default Header; 