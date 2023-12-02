import { useEffect, useState } from 'react';
import '../../styles/Seller/signup.css'
import { useNavigate } from 'react-router-dom';
import { RegisterSeller, SendEmailToken, SendToken } from '../../api/seller';
import { data, school_choices } from '../../location';

const Signup = () => {

    let navigate = useNavigate();

    let [fname, setFname] = useState('')
    let [lname, setLname] = useState('')
    let [email, setEmail] = useState('')
    let [phone, setPhone] = useState('')
    let [pwd, setPwd] = useState('')
    let [cPwd, setCPwd] = useState('')

    let [state, setState] = useState('')
    let [campus, setCampus] = useState('')

    const [value, setValue] = useState('Select State');
    const [validation, setvalidation] = useState(false);
    const [campusLocale, setCampusLocale] = useState('Select Campus');
    const [campusLocaleList, setCampusLocaleList] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [CampusisFocus, setCampusIsFocus] = useState(false);

    let Registration = (e) => {
        // e.target.disabled = true;
        Validation();
        if(validation){
            e.target.disabled = true;

            RegisterSeller(fname,lname,email,phone,pwd,state,campus)
            .then((result) => result ? navigate('/seller/login') : '')
            .catch((err) => {
                console.log(err)
                e.target.disabled = false;

            })
        }
        
    }

    function Validation() {

        let inputs = [...document.querySelectorAll('input')]
        let select = [...document.querySelectorAll('select')]

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
                        setvalidation(false)

                    }else{
                        setvalidation(true)
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
                        setvalidation(false)

                    }else{
                        setvalidation(true)
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

                if(item.name === 'fname'){

                    let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty'}
                    let length = item.value.length > 3 ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please name must be at least 3 characters.'}
                    let specialCharFree = /^[a-zA-Z]+$/.test(item.value) ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please enter only alphabets.'}
                    let errs = [empty,length,specialCharFree];
                    
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)


                    
                }else if(item.name === 'lname'){

                    let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty'}
                    let length = item.value.length > 3 ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please name must be at least 3 characters.'}
                    let specialCharFree = /^[a-zA-Z]+$/.test(item.value) ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please enter only alphabets.'}
                    let errs = [empty,length,specialCharFree];
                    
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)

                }else if(item.name === 'email'){

                    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty.'}
                    let validEmail = emailRegex.test(item.value) ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please enter a valid email address.'}
                    let errs = [empty,validEmail];
                    console.log('empty',errs)
                    
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)

                }
                
            }else if(item.type === 'password'){
                if(item.name === 'password'){
                    let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty.'}
                    let length = item.value.length >= 8 ? {bool: true, mssg: ''} :  {bool: false, mssg: 'Password must contain at least 8 characters.'}
                    let errs = [empty,length];
                    
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)
                }else if(item.name === 'confirm-password'){
                    let validity = item.value !== pwd ? {bool: false, mssg: 'Password does not match'} :  {bool: true, mssg: ''} 
                    let errs = [validity];
                    
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)
                }

            }
        })

        select.map(item => {
            if(item.name === 'state'){
                let empty = state !== '' ?  {bool: true, mssg: ''} :  {bool: false, mssg: 'Please select a state'}
                let errs = [empty];
                    
                    addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)
            }else if(item.name === 'campus'){
                let empty = campus !== '' ?  {bool: true, mssg: ''} :  {bool: false, mssg: 'Please select a campus'}
                let errs = [empty];
                    
                addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)
            }
        })


       // console.log(book)
       // book.map(item => console.log(Object.values(item)[0]))

        

    }

    function handleVerification(email,seller_id){
        SendToken(email,seller_id)
        .then((result) => {
            navigate('/seller/login')
        })
        .catch((err) => console.log(err))
        
    }

    useEffect(() => {
        setCampusLocaleList([])
        let stateIndex = data.filter(item =>  item.label.toLocaleLowerCase() === state.toLocaleLowerCase())
        let index = data.indexOf(stateIndex[0]); 
        let campuses = Object.values(school_choices).reverse();
        console.log(campuses[index])
        index < 0 ? setCampusLocaleList([]) : setCampusLocaleList(campuses[index])

    }, [state])


    return ( 
        <>
            <div className="seller-signup">
                
                <div id="left">

                </div>
                <div id="right">
                    <h6><b style={{color: 'orangered'}}><u>Signup Form For Sellers</u></b></h6>
                
                    <form action="">
                        <div className="seller-input-cnt">
                            <section>
                                <label htmlFor="">FirstName</label>
                                <input name='fname' onInput={e => setFname(e.target.value)} placeholder='FirstName...' type="text" />
                            </section>
                            <section>
                                <label htmlFor="">LastName</label>
                                <input name='lname' onInput={e => setLname(e.target.value)}  placeholder='LastName' type="text" />
                            </section>
                        </div>


                        <div className="seller-input-cnt">
                            <section style={{width: '100%'}}>
                                <label htmlFor="">Email</label>
                                <input name='email' onInput={e => setEmail(e.target.value)}  placeholder='Email...' type="text" />
                            </section>
                        </div>

                        <div className="seller-input-cnt">
                            <section style={{width: '100%', float: 'left'}}>
                                <label htmlFor="">Phone (Optional)</label>
                                <input name='phone' onInput={e => setPhone(e.target.value)}  placeholder='Phone Number...' type="number" />
                            </section>
                            
                        </div>

                        <div className="seller-input-cnt">
                            <section style={{width: '100%'}}>
                                <label htmlFor="">Password</label>
                                <input name='password' onInput={e => setPwd(e.target.value)}  placeholder='Password...' type="password" />
                            </section>
                            
                        </div>

                        <div className="seller-input-cnt">
                            <section style={{width: '100%'}}>
                                <label htmlFor="">Confirm Password</label>
                                <input name='confirm-password' onInput={e => setCPwd(e.target.value)}  placeholder='Confirm Password...' type="password" />
                            </section>
                            
                        </div>

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
                            
                            <button onClick={e => {e.preventDefault(); Registration(e)}}>Register</button>
                            
                        </div>

                        
                        
                    </form>

                    {/* <div>
                        <small style={{color: 'orangered'}}>Forgot Password? Recover Password Here</small>
                    </div> */}
                    <div onClick={e => navigate('/seller/login')}>
                        <small>Already Have An Account, Signin Here</small>
                    </div>

                    <br />
                </div>

            </div>
        
        </>
     );
}
 
export default Signup;