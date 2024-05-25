import { 
    useEffect, 
    useRef, 
    useState 
} from "react";
import img from '../../../assets/download (3).jpeg'
import locationSvg from '../../../assets/location-svgrepo-com-1.svg'
import '../../../styles/loader.css'
import '../../../styles/Seller/overlay.css' 

import { 
    data, 
    school_choices 
} from "../../../location";

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
import { Filter_Cards, GetItems } from "../../../api/buyer/get";
import Filter from "../Header/Filter"; 
import Card from "./Card";

const CardCnt = () => {
    let {Cart} = useSelector(s => s.Cart)
    let {Save} = useSelector(s => s.Save)
    let {storedCategory} = useSelector(s => s.storedCategory)

    let [category, setcategory] = useState('')

    let [subCategory, setsubCategory] = useState('')
    // let [subCategory, setsubCategory] = useState('')
    let [condition, setcondition] = useState('')


    let [state, setstate] = useState('')
    let [campus, setcampus] = useState('')

    let [items, setItems] = useState([]);
    let [cards, setCards] = useState([]);
    
    let [price, setprice] = useState([])

    let categoryRef = useRef('')
    let conditionRef = useRef('')
    let stateRef = useRef('')
    let campusRef = useRef('')
    let priceRef = useRef([])


    

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

    
    async function applyFilter() {
        let overlay = document.querySelector('.overlay');
        overlay.setAttribute('id', 'overlay');

        try {
            console.log(categoryRef)
            let response = await Filter_Cards(categoryRef.current,conditionRef.current,priceRef.current,stateRef.current,campusRef.current)

            console.log(response)

            function setCards(cb) {
                setCards(
                    response?.map((item, index) => 
                        <Card index={index} item={item} />
                    )
                )

                cb()
            }
            
            setCards(() => {
                document.querySelector('.filter-overlay').removeAttribute('id')
                overlay.removeAttribute('id');
            })

            
        } catch (error) {
            console.log(error)
        }
    }

    function ChangeCategory(data) {
        setcategory(data)
        categoryRef.current = data
    }

    function ChangeSubCategory(data) {
        // campusRef.current = data
        setsubCategory(data)
    }

    function ChangeCondition(data) {
        conditionRef.current = data
        setcondition(data)
    }

    function ChangeState(data) {
        stateRef.current = data
        setstate(data)
    }

    function ChangeCampus(data) {
        campusRef.current = data
        setcampus(data)

    }

    function ChangePrice(data) {
        priceRef.current = data
        setprice(data)
    }


    // useEffect(() => {
        
    //     let overlay = document.querySelector('.overlay');
    //     overlay.setAttribute('id', 'overlay');

    //     if(storedCategory !== ''){

    //         async function getData() {
    //             let response = await Filter_Cards(storedCategory,condition,price,state,campus)

    //             console.log(response)

    //             setCards(
    //                 response?.map((item, index) => 
    //                     <Card index={index} item={item} />
    //                 )
    //             )
    //             document.querySelector('.filter-overlay').removeAttribute('id')
    //             overlay.removeAttribute('id');
    //         }

    //         getData()

    //     }

    // },[])
    
    return ( 
        <>
            <div className="overlay" >
                <div className="loader">
                </div>
            </div>

            <div className="filter-overlay">
                <Filter 
                    ChangeCampus={ChangeCampus} 
                    ChangeCondition={ChangeCondition} 
                    ChangePrice={ChangePrice} 
                    ChangeCategory={ChangeCategory} 
                    ChangeState={ChangeState}
                    ChangeSubCategory={ChangeSubCategory} 

                    category={category}
                    state={state} 

                    applyFilter={applyFilter}

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