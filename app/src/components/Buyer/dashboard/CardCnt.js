import { useEffect, useState } from "react";
import img from '../../../assets/download (3).jpeg'
import locationSvg from '../../../assets/location-svgrepo-com-1.svg'
import '../../../styles/loader.css'
import '../../../styles/Seller/overlay.css' 


import { useNavigate } from "react-router-dom";
import filterSvg from '../../../assets/filter-edit-svgrepo-com.svg'
import { AddItemToCart, DeleteItemFromCart, GetItems, SaveItem, UnSaveItem } from "../../../api/buyer";
import Thumbnail from "../Thumbnail";
import { useDispatch, useSelector } from "react-redux";
import { setCartTo } from "../../../redux/buyer/Cart";
import { setSaveTo } from "../../../redux/buyer/Save"; 
import FloatingMenu from "../Header/FloatingMenu";
import Card from "./Card";

const CardCnt = () => {
    let {Cart} = useSelector(s => s.Cart)
    let {Save} = useSelector(s => s.Save)
    let {category} = useSelector(s => s.Category)

    let [screenWidth, setScreenWidth] = useState(0)
    let [items, setItems] = useState([])

    let navigate = useNavigate()

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

    useEffect(() => {
        let overlay = document.querySelector('.overlay');
        overlay.setAttribute('id', 'overlay');

        GetItems(category)
        .then((result) => {
            setItems(result)
            overlay.removeAttribute('id');
        })
        .catch(err => console.log(err))

    }, [category])
    
    
    let dispatch = useDispatch()

    
    
    let [list, setList] = useState([]) 
    let [right, setright] = useState(0)
    let [top, settop] = useState(0)
    let [visible, setvisible] = useState('none')
    let [selectedOption, setSelectedOption] = useState('Popularity')



    function openFloatingMenu(e) {
        if(visible === 'none')
          {
            let list = ['Popularity', 'Newest Arrivals', 'Price: Low to High', 'Price: High to Low', 'Product Rating']

            setList(list)
            setvisible('flex')
            let rect = e.target.getBoundingClientRect();
    
            let r = rect.right;
            let t = rect.top;
            setright(r)
            settop(t)
            setTimeout(() => {
              setvisible('none')
            }, 8000);
          }
          else{
            setvisible('none')
    
          }
      }

    function getSelectedOption(data) {setSelectedOption(data)}

    return ( 
        <>
            <div className="overlay" >
                <div className="loader">
                </div>
            </div>
            <div className="buyer-card-cnt shadow-sm" >
                <div className="buyer-sort shadow-sm">
                    <div className="left">
                        Latest Items For Sale
                    </div>
                    <div onClick={openFloatingMenu} className="right">
                        Sort by: {selectedOption}
                    </div>
                </div>

                {
                    <FloatingMenu getSelectedOption={getSelectedOption} list={list} visible={visible} top={top} right={right} />
                }

                { 
                    items.length > 0
                    ?
                    items.map((item) => 
                        <Card item={item} />
                    )
                    :
                    ''
                }
                
            </div>

            

        </>
     );
}
 
export default CardCnt;