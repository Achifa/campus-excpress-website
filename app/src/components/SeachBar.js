import '../styles/Buyer/small-screen.css'
import filterSvg from '../assets/filter-edit-svgrepo-com.svg'
import { useState } from 'react';
import { setBuyerJsxTo } from '../redux/buyer/BuyerOverlayJsx';
import { useDispatch } from 'react-redux';

const SearchBar = () => {
    let [activeJsx, setActiveJsx]= useState(null)
    function handleOverlay(e) {
        let elem = document.querySelector('.buyer-overlay');
        if(elem.hasAttribute('id')){
          elem.removeAttribute('id')
        }else{
          elem.setAttribute('id', 'buyer-overlay')
        }
      }

    let BtnStyles = {
        height: '50px',
        width: '20%',
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px',
        outline: 'none',
        border: 'none',
        float: 'left',
        color: '#fff',
        fontSize: 'small',
        fontWeight: '500',
        backgroundColor: 'orangered',
        margin: '0'
    }
  let dispatch = useDispatch()

    return ( 
        <>
            <div className="input-cnt" style={{height: '70px', width: '80%', padding: '5px', display: 'inline-block', background: '#fff', margin: '0', float: 'left'}}>
                <input style={{width: '80%', float: 'left',margin: '0',borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px'}} type="search" name="" placeholder="What Are You Looking For..." id="" />
                <button style={BtnStyles}>Search</button>
            </div>

            <div onClick={e => {
                    dispatch(setBuyerJsxTo('filter'));
                    handleOverlay();}} data-btn='filter' style={{height: '70px', width: '20%', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: '#fff', fontSize: 'small', margin: '0', float: 'right'}}>
                <div>
                    <img src={filterSvg} style={{height: '25px', width: '25px', position: 'relative', borderRadius: '2.5px'}} alt="" />
                </div>

                <div>Filter</div>
            </div>
        </>
     ); 
}
 
export default SearchBar;