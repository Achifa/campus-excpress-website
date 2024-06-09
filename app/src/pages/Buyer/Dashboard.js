import CardCnt from "../../components/Buyer/dashboard/CardCnt";
import '../../styles/Buyer/xx-large-screen.css'
import '../../styles/Buyer/x-large-screen.css'
import '../../styles/Buyer/medium-screen.css'
import '../../styles/Buyer/small-screen.css'
import '../../styles/Buyer/large-screen.css'
import '../../styles/Buyer/buy_now.css'
import '../../styles/filter.css'
import '../../styles/Buyer/semi-medium-screen.css'
import { useEffect, useId, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import BuyerLayout from '../../layout/Buyer'
import { 
    useLocation, 
    useNavigate 
} from "react-router-dom";
import SearchOutput from "../../components/Buyer/Header/SearchOutput";
import { 
    Helmet 
} from "react-helmet-async";
import Ads from "../../components/Buyer/dashboard/Ads";
import mssg from '../../assets/messages-1-svgrepo-com (1).svg'
import { 
    NewVisitor 
} from "../../api/buyer/post";
import Card from "../../components/Buyer/dashboard/Card";
import { GetItems, GetSavedItem } from "../../api/buyer/get";
import Filterfilter from "../../components/Buyer/dashboard/FilterAside";
import { setSaveTo } from "../../redux/buyer_store/Save";
 
const Dashboard = () => {

    let location = useLocation()
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let [cards, setCards] = useState([]);
    let {storedCategory} = useSelector(s => s.storedCategory)
    let [activeJSX, setActiveJSX] = useState(<CardCnt cards={cards} />)
    let [screenWidth, setScreenWidth] = useState(0)
    let reactId = useId();

    let {Buyer} = useSelector(s=>s.Buyer)

    async function fetchData(overlay,category) {
        let result = await GetItems(category);
        setCards(
            result?.map((item, index) => 
                <Card index={index} item={item} />
            )
        )
        overlay.removeAttribute('id');
    }

    async function fetchSavedData(buyer_id) {
        let result = await GetSavedItem(buyer_id);
        console.log(result)
        dispatch(setSaveTo(result))
        // overlay.removeAttribute('id');
    }

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

    useEffect(() => {
        // let overlay = document.querySelector('.overlay');
        // overlay.setAttribute('id', 'overlay');
        try {
            fetchSavedData(window.localStorage.getItem('CE_buyer_id'))
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        let overlay = document.querySelector('.overlay');
        overlay.setAttribute('id', 'overlay');
        try {
            fetchData(overlay, 'trends')
        } catch (error) {
            console.log(error)
        }
    }, [location]) 

    useEffect(() => {

        async function uploadNewRef() {
            let response = await NewVisitor(src)
            console.log(response)
        }
        let src = location.search ?location.search.split('=')[1] : ''

        if(localStorage.getItem('new-visitor')){

            let user = JSON.parse(localStorage.getItem('new-visitor'))
            let id = window.localStorage.getItem('CE_buyer_id')

            let userId = user.id;
            let visit = user.visit;
            let dates = user.date;

            let newVisit = visit + 1;
            let newDate = [...dates, new Date()];
    
            // let str = {id: userId, date: newDate, visit: newVisit, isRegistered: id !== null ? true : false, buyer_id: id !== '' ? id : ''}

            let str = {id: userId, date: newDate, visit: newVisit, src: src}
            localStorage.setItem('new-visitor', JSON.stringify(str))
            uploadNewRef()
            

        }else{
            let newVisitorID = reactId;
            let date = new Date();
            let visit = 1
    
            let str = {id: newVisitorID, date: [date], visit: visit, src: src}
    
            localStorage.setItem('new-visitor', JSON.stringify(str))
            
            uploadNewRef()
        }

        
    }, [cards]);

    useEffect(() => {
        if(location.pathname.split('/')[1] === 'search'){
            setActiveJSX(<SearchOutput />)
        }else{
            setActiveJSX(<CardCnt cards={cards} />)
        }

    }, [location,cards])

    useEffect(() => {
        if(location.search.split('=').length > 1){
            let overlay = document.querySelector('.overlay');
            overlay.setAttribute('id', 'overlay');
            try {
                fetchData(overlay,location.search.split('=')[1])
            } catch (error) {
                console.log(error)
            }
        }
    }, [location])


    return ( 
        <>

            <BuyerLayout>

                <Helmet>
                    <meta name="title" content={`Campus Express (Connecting Campus Express)`} />
                    <meta name="description" content={`Shop category is ${storedCategory}`} />
                    {/* <meta name="google-site-verification" content="+nxGUDJ4QpAZ5l9Bsjdi102tLVC21AIh5d1Nl23908vVuFHs34=" /> */}
                    <meta name="robots" content="index,follow" />
                    <meta name="googlebot" content="index,follow" />
                    <meta name="google" content="sitelinkssearchbox" />

                    {/* FaceBook Tags */}
                    <meta property="og:site_name" content="Campus Express (Connecting Campus Express)" />
                    <meta property="og:title" content="Campus Express (Connecting Campus Express)" />
                    <meta property="og:description" content={`Shopping in ${storedCategory} category`} />
                    {/* <meta property="og:image" itemprop="image" content="http://pollosweb.wesped.es/programa_pollos/play.png" /> */}
                    <meta property="og:type" content="website" />
                    <meta property="og:url"  content="https://www.campusexpressng.com" />
                    {/* <meta property="og:updated_time" content="1440432930" /> */}

                    {/* Twitter */}
                    <meta name="twitter:title" content="Campus Express (Connecting Campus Express)" />
                    <meta name="twitter:description" content={`Shop category is ${storedCategory}`} />
                    <meta name="twitter:card" content="summary_large_image" />
                </Helmet>

                <div className="buyer-main-cnt" style={{
                    height: 'fit-content',
                    background: '#fff',
                }}>  
                

                    {
                        <>
                            {
                                screenWidth < 479 && location.pathname.split('/')[1]==='search'
                                ?

                                ''
                                :
                                <Ads />

                            }
                          
                        </>
                    }

                    <br />
                    <br />
                   
                    
                </div>

                <div className="buyer-main-content buyer-main-cnt" style={{
                    // padding: '10px 80px 10px 80px',
                    background: '#fff',
                    height: 'fit-content',
                }}>

                    {
                        screenWidth > 760
                        ?
                            <>
                                <Filterfilter />
                            </>
                        :
                        ''
                    }
                    
                  {
                    activeJSX
                  }
                </div>

                <button className="shadow" style={{position: 'fixed', bottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', right: '20px', width: '60px', height: '60px', background: '#fff', borderRadius: '50%'}} onClick={e => navigate('/buyer.message')}>  
                  
                    <img src={mssg} style={{height: '25px', width: '25px'}} alt="" />

                </button>
            </BuyerLayout>

        </> 
     );
} 
 
export default Dashboard;
