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

    let [list, setList] = useState([]) 
    let [right, setright] = useState(0)
    let [top, settop] = useState(0)
    let [visible, setvisible] = useState('none')
    let [selectedOption, setSelectedOption] = useState('')


    let [screenWidth, setScreenWidth] = useState(0)
    let [items, setItems] = useState([])
    let navigate = useNavigate()
    let [cards, setCards] = useState([])

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
            setCards(
                result.map((item, index) => 
                    <Card index={index} item={item} />
                )
            )
            overlay.removeAttribute('id');
        })
        .catch(err => console.log(err))

    }, [category])
    function getSelectedOption(data) {setSelectedOption(data)}

    useEffect(() => {
        let list = [ {text: 'Price: Low to High', type: 'priceL'}, {text: 'Price: High to Low', type: 'priceH'}]

        let overlay = document.querySelector('.overlay');
        overlay.setAttribute('id', 'overlay');

        function sort(type) {
            const compareItems = (a, b) => {
                if(type === 'priceL'){
                    return a.price - b.price
                }else{ 
                    return b.price - a.price
                }
            }
                // Sorting the array by date (oldest to newest)
            const sortedArray = items.sort(compareItems);
            console.log(sortedArray)
            // Logging the sorted array
            setCards(
                sortedArray.map((item, index) => 
                    <Card index={index} item={item} />    
                )
            );
            overlay.removeAttribute('id')
        }
        let type = list.filter(item => item.text.toLowerCase() === selectedOption)[0]?.type
        sort(type) 

    }, [selectedOption])
   
    function openFloatingMenu(e) {
        if(visible === 'none')
            {
            let list = [{text: 'Price: Low to High', type: 'priceL'}, {text: 'Price: High to Low', price: 'priceH'}]

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
        }else{
        setvisible('none')

        }
    }

    function setDisplay(data) {setvisible(data)}


    return ( 
        <>
            <div className="overlay" >
                <div className="loader">
                </div>
            </div>
            <div className="buyer-card-cnt shadow-sm" style={{
                borderRadius: '1.5px',
                height: '100%'

            }}>
                <div className="buyer-sort shadow-sm" style={{marginTop: '0px',borderRadius: '1.5px', zIndex: '1000'}}>
                    <div className="left">
                        Latest Items For Sale
                    </div>
                    <div onClick={openFloatingMenu} className="right">
                        Filter {selectedOption}
                    </div>
                </div>

                {
                    <FloatingMenu getSelectedOption={getSelectedOption} setDisplay={setDisplay} list={list} visible={visible} top={top} right={right} />
                }

                { 
                    items.length > 0
                    ?
                    cards
                    :
                    ''
                }
                
            </div>

            

        </>
     );
}
 
export default CardCnt;