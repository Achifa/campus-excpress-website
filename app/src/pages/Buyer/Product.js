import { useLocation, useNavigate } from "react-router-dom";
import Product from "../../components/Buyer/Product/Product";
import BuyerLayout from "../../layout/Buyer";
import { useEffect, useRef, useState } from "react";
import SimilarItems from "../../components/Buyer/Product/SimilarItems";
import Description from "../../components/Buyer/Product/Description";
import { GetItem } from "../../api/buyer/get";
import { GetSeller } from "../../api/seller/get";
import { AddView, LogBuyerIn, RegisterBuyer, UploadChat } from "../../api/buyer/post";
import { v4 as uuid } from "uuid";
import Contact from "../../components/Buyer/Product/Contact";
// import Share from "../../components/Buyer/Product/Share";
import { useSelector } from "react-redux";
import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 
import { openNotice } from "../../Functions/notice";
import { useFlutterwave } from "flutterwave-react-v3";
// import BuyerLogin from "../../Authorization/Buyer.js/Login";
import { 
    data, 
    school_choices 
} from '../../location';
const ProductPage = () => {

    let location = useLocation()
    let [activeAuth, setActiveAuth] = useState('')
    let [item, setItem] = useState()
    let [phone, set_phone] = useState(1)
    let navigate = useNavigate();

    let {ItemImages} = useSelector(s => s.itemImages)
    let {ActiveImg} = useSelector(s => s.ActiveImg)
    let {buyerData} = useSelector(s => s.buyerData)

    let [role, setRole] = useState(0)
    let [screenWidth, setScreenWidth] = useState(0)

    let [activeImg, setActiveImg] = useState(imgSvg)
    const searchParams = new URLSearchParams(window.location.search);

    useEffect(() => { 
        let width = window.innerWidth;
        setScreenWidth(width)
        
    }, [])

    useEffect(() => {
        setActiveImg(ItemImages?.length > 0 ? ItemImages[ActiveImg].file : imgSvg)
    }, [ItemImages])

    useEffect(() => {
        setActiveImg(ItemImages?.length > 0 ? ItemImages[ActiveImg].file : imgSvg)
    }, [ActiveImg])

    useEffect(() => {
        setActiveImg('')
    }, [searchParams.get('product_id')])


    function fetchData(overlay) {
        GetItem([location.search.split('=').splice(-1)[0]])
        .then((result) => {
            setItem(result[0])
            overlay.removeAttribute('id')
        })
        .catch(error=>{
            console.log(error)
            openNotice('Error Occured Please Wait While We Reload...')
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        })
    }

    function updateActiveAuth(data) {
        setActiveAuth(data)
    }

    useEffect(() => {
        try {
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
            fetchData(overlay)
        } catch (error) {
            console.log(error)
            
        }


    }, [])

    useEffect(() => {
        try {
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
            fetchData(overlay)
        } catch (error) {
            console.log(error)
            
        }

    }, [location])

    useEffect(() => {
        try {
            async function getData() {
                let result = await GetSeller(item?.seller_id)
                set_phone(result?.phone)
            }
            getData()
        } catch (error) {
            console.log(error)
        }
    },[item])

    useEffect(() => {
        setTimeout(() => {
            setActiveAuth(<Login updateActiveAuth={updateActiveAuth} />)
        }, 1000); 
    }, [item])
 
    async function AddNewViewer(product_id,buyer_id) {
        let result = await AddView(product_id, buyer_id)
        if(result?.length > 0){
            setItem(result[0])
        //    .removeAttribute('id');

        }
    }

    window.onload= (()=> {
        let buyer_id = window.localStorage.getItem("CE_buyer_id")
        if(buyer_id !== '' && buyer_id !== undefined && buyer_id !== null && buyer_id !== 'null'){
            try {
                setTimeout(() => {
                    AddNewViewer(item?.product_id,buyer_id)
                }, 5000); 
            } catch (error) {
                console.log(error)
            }
        }else{
            let buyer_id = window.localStorage.getItem("unknownBuyer")
            try {
                setTimeout(() => { 
                    AddNewViewer(item?.product_id,buyer_id)
                }, 5000);
            } catch (error) {
                console.log(error)
            }
        }
        
    })

    function SendMssg() {
        let overlay = document.querySelector('.overlay')
        overlay.setAttribute('id', 'overlay');
        if(screenWidth > 760){
            try {
                let result = UploadChat(window.localStorage.getItem('CE_buyer_id'), item.seller_id)
                overlay.removeAttribute('id')
                navigate(`/buyer.message/${item.seller_id}`, {seller_id: item.seller_id})
    
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                let result = UploadChat(window.localStorage.getItem('CE_buyer_id'), item.seller_id)
                overlay.removeAttribute('id')
                navigate(`/buyer.room/${item.seller_id}?room=''`, {seller_id: item.seller_id})
    
            } catch (error) {
                console.log(error)
            }
        }
      
    }

    const config = {
        public_key: 'FLWPUBK-502f1f73c8abf430f161a528241c198a-X',
        tx_ref: Date.now(),
        amount: parseInt(item?.price) + 45,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: buyerData?.email,
            phone_number: buyerData?.phone,
            name: buyerData?.name,
            ce_id: item?.seller_id
        },
        customizations: {
        title: 'Campus Express',
        description: 'Campus Purchase',
        logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    function handleOrder() {
        let buyer = window.localStorage.getItem('CE_buyer_id');
        if(buyer === null || buyer === '' || buyer === 'null'){
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
        }else{
            handleFlutterPayment({
                callback: (response) => {
                console.log(response);
                // closePaymentModal() // this will close the modal programmatically
                },
                onClose: () => {}
            });
        }
    }
    
    return ( 
        <>
            <div className="overlay" style={{padding: '20px'}} onClick={e => {
                let overlay = document.querySelector('.overlay')

                if(e.target === overlay){
                    overlay.removeAttribute('id');
                }
            }}>
                {
                    activeAuth
                }
            </div>

            <div className="notice-cnt" style={{margin: 'auto'}}>
                <span style={{margin: "0 15px 0 .5px"}}></span>
                <button className="notice-cnt-btn" style={{width: '40px', height: '30px', background: 'red', borderRadius: '2px', fontWeight: '500', fontSize: 'small'}}>
                    close
                </button>
            </div>
            <BuyerLayout>
                <div className="buyer-product shadow-sm" style={{background: '#fff'}}>
                    <div className="buyer-product-cnt" style={{display: 'flex', flexDirection: 'column'}}>

                        
                        <Product item={item} phone={phone} />
                        {
                            item?.description?.length > 0 
                            ?
                            <Description item={item} />
                            :
                            ''
                        }

                        

                        <br />

                        {
                            screenWidth > 481
                            ?
                            ''
                            :
                            <>
                                <Contact phone={phone} role={role} SendMssg={SendMssg}  />
                                <br />
                                <button onClick={handleOrder}>Order Now</button>
                            </>
                        }
                        <br />

                        <section style={{fontWeight: '400', padding: '15px', background: '#fff4e0', }}>
                            
                            <small style={{fontSize: 'small', color: '#FF4500', lineHeight: '12px', borderRadius: '6px'}}>Payment Must Be Made Via Campus Express Platform To Avoid Fraud Else You Can <b>Trade With The Seller Outside The Platform At Your Own Risk.</b></small>
                        </section>

                        <br />

                        
                        <SimilarItems category={item?.category} product_id={item?.product_id} />


                        

                    </div>
                </div>
            </BuyerLayout>
        </>
     );
}
 
export default ProductPage;



function Login({updateActiveAuth}) {

    let navigate = useNavigate();
    let [btn, setBtn] = useState("Login")


    let [email, setEmail] = useState('')
    let [pwd, setPwd] = useState('')
    const validation = useRef(false);


    let Login = (e) => {
        
        let check = document.querySelector('.err-cnt').querySelector('.err-mssg');

        if(check){
            document.querySelector('.err-cnt').querySelector('.err-mssg').remove()
        }

        Validation();
        if(validation.current){
            setBtn(
                <div className="Authloader" style={{background: '#fff'}}></div>
            )
            e.target.disabled = true;

            LogBuyerIn(email,pwd)
            .then((result) => {
                window.localStorage.setItem("CE_buyer_id", result.id)
                window.localStorage.setItem("CE_buyer_name_initial", result.name)
                // updateActiveAuth('')
            })
            .catch((err) => {
                console.log(err)
                alert(JSON.stringify(err))
                

                let check = document.querySelector('.err-cnt').querySelector('.err-mssg');
                if(check){
                    document.querySelector('.err-cnt').querySelector('.err-mssg').remove()
                    let div = document.createElement('div');
                    div.className = 'err-mssg';
                    div.style.display = 'table'
                    div.style.margin = '0 auto'
                    div.innerHTML = 'Invalid Credentials'
                    document.querySelector('.err-cnt').append(div)
                    
                }else{
                    let div = document.createElement('div');
                    div.className = 'err-mssg';
                    div.style.display = 'table'
                    div.style.margin = '0 auto'
                    div.innerHTML = 'Invalid Credentials'
                    document.querySelector('.err-cnt').append(div)
                }
                e.target.disabled = false;
                setBtn("Login")
            })
        }
        

        
    }

    function Validation() {

        let inputs = [...document.querySelectorAll('input')]

        let book = []

        function addErrMssg(err,pElem) {
            // if(!err[0].bool){

                let check = pElem.querySelector('.err-mssg');
                if(check){
                    pElem.querySelector('.err-mssg').remove()
                    let div = document.createElement('div');
                    div.className = 'err-mssg';
                    console.log(err)
                    if(err.length > 0 ){
                        div.innerHTML = err[0].mssg;
                        pElem.append(div)
                        validation.current=(false)

                    }else{
                        validation.current=(true)
                        let check = pElem.querySelector('.err-mssg');

                        if(check){
                            pElem.querySelector('.err-mssg').remove()
                        }
                    }
                   
                    
                }else{

                    let div = document.createElement('div');
                    div.className = 'err-mssg';
                    console.log(err)

                    if(err.length !== 0 ){
                        div.innerHTML = err[0].mssg;
                        pElem.append(div)
                        validation.current=(false)

                    }else{
                        validation.current=(true)
                        let check = pElem.querySelector('.err-mssg');

                        if(check){
                            pElem.querySelector('.err-mssg').remove()
                        }
                    }
                }
                

            // }
            
        }

        inputs.map(item => {
            if(item.type === 'text'){

                if(item.name === 'email'){

                    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty.'}
                    let validEmail = emailRegex.test(item.value) ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please enter a valid email address.'}
                    let errs = [empty,validEmail];
                    console.log('empty',errs)
                    
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)

                }
                
            }else if(item.type === 'password'){
                let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty.'}
                let length = item.value.length >= 8 ? {bool: true, mssg: ''} :  {bool: false, mssg: 'Password must contain at least 8 characters.'}
                let errs = [empty,length];
                
                addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)

            }
        })

      

    }
    return(
        <section className="shadow-sm" style={{background: '#fff', height: 'fit-content', padding: '20px', borderRadius: '10px'}}>
                        
            <div className="err-cnt">

            </div>
            <br />
            <h6><b style={{background: 'orangered', color: '#fff', padding: '10px', borderRadius: '5px', marginBottom: '20px', height: '150px'}}>Login Form For Buyers</b></h6>

            <br />
            <form action="" >
                


            

                <div style={{flexDirection: 'column', alignItems: 'flex-start'}} className="seller-input-cnt">
                    <label htmlFor="">Email</label>
                    <input style={{background: '#efefef'}} name="email" onInput={e => setEmail(e.target.value)}  placeholder='Email...' type="text" />
                    
                </div>

                <div style={{flexDirection: 'column', alignItems: 'flex-start'}} className="seller-input-cnt">
                    <label htmlFor="">Password</label>
                    <input style={{background: '#efefef'}} onInput={e => setPwd(e.target.value)}  placeholder='Password...' type="password" />
                    
                </div>

                

                
            
                <div className="seller-input-cnt">
                    
                    <button style={{background: '#ff4500',color: '#fff'}} onClick={e => {e.preventDefault();Login(e)}}>
                        {
                            btn
                        }
                    </button>
                    
                </div>
            </form>

            <div style={{textAlign: 'center'}} onClick={e => navigate('/password-reset')}>
                <small style={{cursor: 'pointer', color: 'orangered', fontWeight: '500'}}>Recover Forgotten Password Here</small>
            </div>
            <div style={{textAlign: 'center'}} onClick={e => updateActiveAuth(<Signup updateActiveAuth={updateActiveAuth} />)}>
                <small style={{cursor: 'pointer', color: 'orangered', fontWeight: '500'}}>Don't Have An Account, Signup Here</small>
            </div>
        </section>
    )
}

function Signup({updateActiveAuth}) {
    let navigate = useNavigate();
    let location = useLocation()

    let [fname, setFname] = useState('')
    let [lname, setLname] = useState('')
    let [email, setEmail] = useState('')
    let [phone, setPhone] = useState('')
    let [pwd, setPwd] = useState('')
    let [cPwd, setCPwd] = useState('')

    let [state, setState] = useState('')
    let [campus, setCampus] = useState('')

    let [query, setquery] = useState('')
    const validation = useRef(false);

    const [value, setValue] = useState('Select State');
    const [campusLocale, setCampusLocale] = useState('Select Campus');
    const [campusLocaleList, setCampusLocaleList] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [CampusisFocus, setCampusIsFocus] = useState(false);
    let [btn, setBtn] = useState("Signup")

    let book = useRef({
        fname: false,
        lname: false,
        email: false,
        pwd: false,
        phn: false,
        campus: false,
        state: false
    })

    function addErrMssg(err,pElem) {
            
        let check = pElem.querySelector('.err-mssg');
        if(check){
            pElem.querySelector('.err-mssg').remove()
            let div = document.createElement('div');
            div.className = 'err-mssg';
            // console.log(err)
            if(err.length > 0 ){
                div.innerHTML = err[0].mssg;
                pElem.append(div)
                

            }else{
                
                let check = pElem.querySelector('.err-mssg');

                if(check){
                    pElem.querySelector('.err-mssg').remove()
                }
            }
            
            
        }else{

            let div = document.createElement('div');
            div.className = 'err-mssg';
            // console.log(err)

            if(err.length !== 0 ){
                div.innerHTML = err[0].mssg;
                pElem.append(div)
                

            }else{
                
                let check = pElem.querySelector('.err-mssg');

                if(check){
                    pElem.querySelector('.err-mssg').remove()
                }
            }
        }
     
    }

    let Registration = async(e) => {
        
        // e.currentTarget.disabled = true;
        Validation();
        Object.values(book.current).filter(item => item !== true).length > 0 ? validation.current = false : validation.current = true;
        console.log(validation.current)
        if(validation.current){
            setBtn(
                <div className="Authloader" style={{background: '#fff',border: '1px solid orangered'}}></div>
            )
            // e.currentTarget.disabled = true;
            try {
                let result = RegisterBuyer(fname.trim(),lname.trim(),email,phone,pwd,state,campus)

                console.log(result)

                if(result){
                    updateActiveAuth(<Login updateActiveAuth={updateActiveAuth} />)
                }

            } catch (err) {
                
                if(err.response.data === 'duplicate email'){
                    addErrMssg([{mssg:'Email already exist, please try something else'}], document.querySelector('.email').parentElement)
                }else if(err.response.data === 'duplicate phone'){
                    addErrMssg([{mssg:'Phone Number already exist, please try something else'}], document.querySelector('.phone').parentElement)
                }
                setBtn("Signup")
                // console.log(err)
                e.currentTarget.disabled = false;
            }
           
        }else{
            console.log(validation.current)

            setBtn("Signup")
            e.currentTarget.disabled = false;
        }
    }

    function Validation() {
        let inputs = [...document.querySelectorAll('input')]
        let select = [...document.querySelectorAll('select')]
        

        inputs.map(async(item) => {
            if(item.type === 'text'){

                if(item.name === 'fname'){

                    let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty'}
                    let length = item.value.length > 3 ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please name must be at least 3 letters.'}
                    let specialCharFree = /^[a-zA-Z]+$/.test(item.value.trim()) ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please enter only alphabets.'}
                    let errs = [empty,length,specialCharFree];
                    
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement);
                    let list =errs.filter(item => item.mssg !== '')

                    list.length > 0 ? book.current.fname = false : book.current.fname = true
                    
                }else if(item.name === 'lname'){

                    let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty'}
                    let length = item.value.length > 3 ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please name must be at least 3 letters.'}
                    let specialCharFree = /^[a-zA-Z]+$/.test(item.value.trim()) ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please enter only alphabets.'}

                    let errs = [empty,length,specialCharFree];
                    
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)
                    let list =errs.filter(item => item.mssg !== '')

                    list.length > 0 ? book.current.lname = false : book.current.lname = true

                }else if(item.name === 'email'){

                    // let emailvailidity = await checkEmailDuplicate();
                    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty.'}
                    let validEmail = emailRegex.test(item.value) ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please enter a valid email address.'}
                    // let emailDuplicate =  emailvailidity ? {bool: true, mssg: ''} : {bool: false, mssg: 'Email already exist, please try something else'} 
                    let errs = [empty,validEmail];
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)
                    let list = errs.filter(item => item.mssg !== '')
                    list.length > 0 ? book.current.email = false : book.current.email = true

                }
                
            }else if(item.type === 'password'){
                if(item.name === 'password'){
                    let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty.'}
                    let length = item.value.length >= 8 ? {bool: true, mssg: ''} :  {bool: false, mssg: 'Password must contain at least 8 characters.'}
                    let errs = [empty,length];
                    
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)

                    let list =errs.filter(item => item.mssg !== '')

                    list.length > 0 ? book.current.pwd = false : book.current.pwd = true
                }
            }else if(item.type === 'number'){
                if(item.name === 'phone'){
                    let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty.'}
                    let length = item.value.length >= 11 ? {bool: true, mssg: ''} :  {bool: false, mssg: 'Invalid Phone Number'}
                    let errs = [empty,length];
                    
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)

                    let list =errs.filter(item => item.mssg !== '')

                    list.length > 0 ? book.current.phn = false : book.current.phn = true
                }
            }
        })

        select.map(item => {
            if(item.name === 'state'){
                let empty = state !== '' ?  {bool: true, mssg: ''} :  {bool: false, mssg: 'Please select a state'}
                let errs = [empty];
                    
                addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)
                let list =errs.filter(item => item.mssg !== '')

                list.length > 0 ? book.current.state = false : book.current.state = true
            }else if(item.name === 'campus'){
                let empty = campus !== '' ?  {bool: true, mssg: ''} :  {bool: false, mssg: 'Please select a campus'}
                let errs = [empty];
                    
                addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)
                let list =errs.filter(item => item.mssg !== '')

                list.length > 0 ? book.current.campus = false : book.current.campus = true
            }
        })
    }

    useEffect(() => {
        setCampusLocaleList([])
        let stateIndex = data.filter(item =>  item.label.toLocaleLowerCase() === state.toLocaleLowerCase())
        let index = data.indexOf(stateIndex[0]); 
        let campuses = Object.values(school_choices).reverse();
        console.log(campuses[index])
        index < 0 ? setCampusLocaleList([]) : setCampusLocaleList(campuses[index])

    }, [state])

    useEffect(() => {
        if(location.search){
            let query = location.search.split('=')[1];
            setquery(query);
        }


    },[])
    return (  
        <>
            <div className="seller-signup" style={{padding: '0px', background: '#fff', height: '70vh', overflow: 'auto', borderRadius: '10px'}}>
                
                {/* <div onClick={e => updateActiveAuth(<Login updateActiveAuth={updateActiveAuth} />)} style={{width: '100%', textAlign: 'center', color: 'orangered'}}>
                    <small style={{cursor: 'pointer'}}>Already Have An Account, Signin Here</small>
                </div> */}
                <div id="right" style={{height: '100%'}}>
                    <h6><b style={{color: 'orangered'}}><u>Signup Form For Buyer</u></b></h6>
                
                    <form action="">
                        <div className="seller-input-cnt">
                            <section>
                                <label htmlFor="">FirstName</label>
                                <input style={{background: '#efefef'}} name='fname' onInput={e => setFname(e.target.value)} placeholder='FirstName...' type="text" />
                            </section>
                            <section>
                                <label htmlFor="">LastName</label>
                                <input style={{background: '#efefef'}} name='lname' onInput={e => setLname(e.target.value)}  placeholder='LastName' type="text" />
                            </section>
                        </div>


                        <div className="seller-input-cnt">
                            <section style={{width: '100%'}}>
                                <label htmlFor="">Email</label>
                                <input style={{background: '#efefef'}} name='email' onInput={e => {setEmail(e.target.value)}} className='email'  placeholder='Email...' type="text" />
                            </section> 
                        </div>

                        <div className="seller-input-cnt">
                            <section style={{width: '100%', float: 'left'}}>
                                <label htmlFor="">Phone</label>
                                <input style={{background: '#efefef'}} name='phone'
                                className='phone' onInput={e => setPhone(e.target.value)}  placeholder='Phone Number...' type="number" />

                                
                            </section>
                            
                        </div>

                        <div className="seller-input-cnt">
                            <section style={{width: '100%'}}>
                                <label htmlFor="">Password</label>
                                <input style={{background: '#efefef'}} name='password' className='pwd' onInput={e => setPwd(e.target.value)}  placeholder='Password...' type="password" />
                            </section>
                            <section>
                                <button onClick={e => {
                                    e.target.disabled = true
                                    e.preventDefault();
                                    let pwd = document.querySelector('.pwd');
                                    if(pwd.type !== 'text'){
                                        pwd.type = 'text'
                                        setTimeout(( ) => {pwd.type = 'password'; e.target.disabled = false}, 800)
                                    }
                                }}>Show</button>
                            </section>
                            
                        </div>

                        {/* <div className="seller-input-cnt">
                            <section style={{width: '100%'}}>
                                <label htmlFor="">Confirm Password</label>
                                <input name='confirm-password' onInput={e => setCPwd(e.target.value)}  placeholder='Confirm Password...' type="password" />
                            </section>
                            
                        </div> */}

                        <div className="seller-input-cnt">
                            <section style={{width: '100%'}}>
                                <label htmlFor="">State </label>
                                <select onInput={e => setState(e.target.value)}  name="state" id="">
                                    <option value="">Select State</option>
                                    {
                                        data.map((item,index) => {
                                            return(
                                                <option value={item.label}>{item.label}</option>
                                            )
                                        })
                                    }
                                </select>
                            </section>
                            
                        </div>

                        <div className="seller-input-cnt">
                            <section style={{width: '100%'}}>
                                <label htmlFor="">Campus </label>
                                <select onInput={e => setCampus(e.target.value)}  name="campus" id="">
                                    <option value="">Select Campus</option>
                                    {
                                        campusLocaleList.map((item,index) => {
                                            return(
                                                <option value={item.text}>{item.text}</option>
                                            )
                                        })
                                    }
                                </select>
                            </section>
                            
                        </div>


                    
                        <div className="seller-input-cnt">
                            
                            <button  onClick={e => {e.preventDefault(); Registration(e)}}>{btn}</button>
                            
                        </div>

                        
                        
                    </form>

                    {/* <div>
                        <small style={{color: 'orangered'}}>Forgot Password? Recover Password Here</small>
                    </div> */}
                    <div onClick={e => updateActiveAuth(<Login updateActiveAuth={updateActiveAuth} />)} style={{width: '100%', textAlign: 'center', color: 'orangered'}}>
                        <small style={{cursor: 'pointer'}}>Already Have An Account, Signin Here</small>
                    </div>

                    <br />
                </div>

            </div>
        
        </>
     );
}