import { 
    useEffect, 
    useRef, 
    useState 
} from "react";
import '../../../styles/loader.css'
import '../../../styles/Seller/overlay.css' 

import { 
    useNavigate 
} from "react-router-dom";
import { Filter_Cards } from "../../../api/buyer/get";
import Filter from "../Header/Filter"; 
import Card from "./Card";
import Skeleton from "react-loading-skeleton";

const CardCnt = ({cards}) => {
    let [category, setcategory] = useState('')
    let [subCategory, setsubCategory] = useState('')
    let navigate = useNavigate()
    let [screenWidth, setScreenWidth] = useState(0)

    let [condition, setcondition] = useState('')

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])


    let [state, setstate] = useState('')
    let [campus, setcampus] = useState('')

    
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
        navigate(`/?category=${data.toLowerCase()}`)
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
                    cards?.length > 0
                    ?
                    cards
                    :
                    [1,2,3,4,5,6,7,8,9,0].map(item => 
                    <>
                        <Skeleton height={50}baseColor="#fff4e0" highlightColor="#FF4500" count={1} />
                        <Skeleton height={10}baseColor="#fff4e0" highlightColor="#FF4500" count={3} />

                    </>
                    )
                }
                
            </div>

            

        </>
     );
}
 
export default CardCnt;