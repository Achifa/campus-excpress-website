import { 
    useEffect, 
    useState 
} from "react";
import img from '../../../assets/download (3).jpeg'
import locationSvg from '../../../assets/location-svgrepo-com-1.svg'
import '../../../styles/loader.css'
import '../../../styles/Seller/overlay.css' 


import { 
    useNavigate 
} from "react-router-dom";
import filterSvg from '../../../assets/filter-edit-svgrepo-com.svg'
import Thumbnail from "../Thumbnail";
import { 
    useDispatch, 
    useSelector 
} from "react-redux";
import { 
    setCartTo 
} from "../../../redux/buyer_store/Cart";
import { 
    setSaveTo 
} from "../../../redux/buyer_store/Save"; 

import FloatingMenu from "../Header/FloatingMenu";
import Card from "./Card";
import { GetItems } from "../../../api/buyer/get";
import Filter from "../Header/Filter";

const CardCnt = () => {
    let {Cart} = useSelector(s => s.Cart)
    let {Save} = useSelector(s => s.Save)

    let [category, setcategory] = useState('')
    let [subCategory, setsubCategory] = useState('')
    let [condition, setcondition] = useState('')
    let [state, setstate] = useState('')
    let [campus, setcampus] = useState('')

    let [selectedOption, setSelectedOption] = useState('')
    let [screenWidth, setScreenWidth] = useState(0)

    let [items, setItems] = useState([]);
    let [cards, setCards] = useState([]);
    let [price, setprice] = useState([])

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

    // function sort(type) {
    //     const compareItems = (a, b) => {
    //         if(type === 'priceL'){
    //             return a.price - b.price
    //         }else{ 
    //             return b.price - a.price
    //         }
    //     }
    //         // Sorting the array by date (oldest to newest)
    //     const sortedArray = items.sort(compareItems);
    //     console.log(sortedArray)
    //     // Logging the sorted array
    //     setCards(
    //         sortedArray.map((item, index) => 
    //             <Card index={index} item={item} />    
    //         )
    //     );
    // }

    useEffect(() => {
        let overlay = document.querySelector('.overlay');
        overlay.setAttribute('id', 'overlay');
        try {
            async function fetchData() {
                let result = await GetItems('trends');
                setItems(result)
                setCards(
                    result?.map((item, index) => 
                        <Card index={index} item={item} />
                    )
                )
                overlay.removeAttribute('id');
            }
            fetchData()
        } catch (error) {
            console.log(error)
        }

    }, [])
    

    function applyFilter() {
        let overlay = document.querySelector('.overlay');
        overlay.setAttribute('id', 'overlay');
        try {
            new Promise((resolve, reject) => {
                if(category !== ''){
                    let response = items.filter(item => {
                        return(
                            item.category === category
                        )
                    })
                    resolve(response)
                }else{
                    resolve(items)
                }
            })
            .then((result) => {
                if(condition !==''){
                    let response = result.filter(item => {
                        return(
                            JSON.parse(item.others)?.condition === condition
                        )
                    })
                    return(response)
                }else{
                    return(result)
                }
            })
            .then((result) => {
                if(price.length !== 0){
                    let response = result.filter(item => {
                        return(
                            item.price > price[0] && item.price < price[1] 
                        )
                    })
                    return(response)
                }else{
                    return(result)
                }
            })
            .then((result) => {
                if(state !== ''){
                    let response = result.filter(item => {
                        return(
                            JSON.parse(item.others)?.locale.split(',')[0] === state
                        )
                    })
                    return(response)
                }else{
                    return(result)
                }
            }).then((result) => {
                if(campus !== ''){
                    let response = result.filter(item => {
                        return(
                            JSON.parse(item.others)?.locale.split(',').splice(1,2).join(',') === campus
                        )
                    })
                    return(response)
                }else{
                    return(result)
                }
            })
            .then((result) => {
                setCards(
                    result?.map((item, index) => 
                        <Card index={index} item={item} />
                    )
                )
                document.querySelector('.filter-apply-btn').addEventListener('click', applyFilter()) 
            })
            overlay.removeAttribute('id');
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        document.querySelector('.filter-apply-btn').addEventListener('click', applyFilter())
    }, [])
    

    function updateCategory(data) {
        setcategory(data)
    }

    function updateSubCategory(data) {
        setsubCategory(data)
    }

    function updateCondition(data) {
        setcondition(data)
    }

    function updateState(data) {
        setstate(data)
    }

    function updateCampus(data) {
        setcampus(data)
    }

    function updatePrice(data) {
        setprice(data)
    }


    return ( 
        <>
            <div className="overlay" >
                <div className="loader">
                </div>
            </div>

            <div className="filter-overlay">
                <Filter 
                    updateCampus={updateCampus} 
                    updateCondition={updateCondition} 
                    updatePrice={updatePrice} 
                    updateCategory={updateCategory} 
                    updateState={updateState}
                    updateSubCategory={updateSubCategory} 
                    category={category}
                    state={state} 
                />

            </div>
          
            <div className="buyer-card-cnt" style={{
                borderRadius: '1.5px',
                height: 'fit-content', 
                padding: '0',
                background: '#fff'

            }}>
                {/* <div className="buyer-sort shadow-sm" style={{marginTop: '0px',borderRadius: '1.5px', zIndex: '1000'}}>
                    <div className="left">
                        Latest Items For Sale
                    </div> 
                    <div onClick={openFloatingMenu} className="right">
                        Filter {selectedOption}
                    </div>
                </div> */}

                
                { 
                    items?.length > 0
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