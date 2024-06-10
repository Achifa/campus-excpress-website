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
                    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map((item,index) => 
                        <div className="cols" key={index} id={item.product_id}>
                            <div className="card shadow" key={index} style={{height: 'auto', marginBottom: '10px', borderRadius: '10px'}}>
                                <div style={{width: '100%'}} role="status" class="max-w-sm p-2 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                                    <div style={{width: '100%'}} class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                        <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                                        </svg>
                                    </div>
                                    <div style={{width: '100%'}} class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                    <div style={{width: '100%'}} class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div style={{width: '100%'}} class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                    <div style={{width: '100%'}} class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                    {/* <div style={{width: '100%'}} class="flex items-center mt-4">
                                        <svg class="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                        </svg>
                                        <div style={{width: '100%'}} >
                                            <div style={{width: '100%'}}  class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                                            <div style={{width: '100%'}}  class="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                        </div>
                                    </div> */}
                                    {/* <span class="sr-only">Loading...</span> */}
                                </div>
                            </div>
                        </div>

                    )
                }
                
            </div>

            

        </>
     );
}
 
export default CardCnt;