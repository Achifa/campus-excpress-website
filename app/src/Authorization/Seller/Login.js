import { useState } from "react"
import { useNavigate } from "react-router-dom";
import '../../styles/Buyer/login.css'
import { LogSellerIn } from "../../api/seller";
const SellerLogin = () => {
    let navigate = useNavigate();

    let [email, setEmail] = useState('')
    let [pwd, setPwd] = useState('')
    const [validation, setvalidation] = useState(false);

    let Login = (e) => {
        let check = document.querySelector('form').querySelector('.err-mssg');

        if(check){
            document.querySelector('form').querySelector('.err-mssg').remove()
        }

        Validation();
        if(validation){
            e.target.disabled = true;

            LogSellerIn(email,pwd)
            .then((result) => {
                window.localStorage.setItem("CE_seller_id", result.id)
                window.localStorage.setItem("CE_seller_name_initial", result.name)
                navigate('/seller')
            })
            .catch((err) => {
                console.log(err)
                

                let check = document.querySelector('form').querySelector('.err-mssg');
                if(check){
                    document.querySelector('form').querySelector('.err-mssg').remove()
                    let div = document.createElement('div');
                    div.className = 'err-mssg';
                    div.style.display = 'table'
                    div.style.margin = '0 auto'
                    div.innerHTML = 'Invalid Credentials'
                    document.querySelector('form').append(div)
                    
                }else{
                    let div = document.createElement('div');
                    div.className = 'err-mssg';
                    div.style.display = 'table'
                    div.style.margin = '0 auto'
                    div.innerHTML = 'Invalid Credentials'
                    document.querySelector('form').append(div)
                }
                e.target.disabled = false;
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
    return ( 
        <>
            <div className="seller-login-cnt">

                <section className="shadow-sm">
                    <h5 style={{color: 'orangered'}}>Login Here</h5>
                    <form action="">
                    


                     

                        <div style={{flexDirection: 'column', alignItems: 'flex-start'}} className="seller-input-cnt">
                            <label htmlFor="">Email</label>
                            <input name="email" onInput={e => setEmail(e.target.value)}  placeholder='Email...' type="text" />
                            
                        </div>

                        <div style={{flexDirection: 'column', alignItems: 'flex-start'}} className="seller-input-cnt">
                            <label htmlFor="">Password</label>
                            <input onInput={e => setPwd(e.target.value)}  placeholder='Password...' type="password" />
                            
                        </div>

                        

                        
                      
                        <div className="seller-input-cnt">
                            
                           <button onClick={e => {e.preventDefault(); Login(e)}}>Login</button>
                            
                        </div>
                    </form>

                    <div onClick={e => navigate('/seller/reset-password')}>
                        <small>Forgot Password? Recover Password Here</small>
                    </div>
                    <div onClick={e => navigate('/seller/signup')}>
                        <small>Don't Have An Account, Signup Here</small>
                    </div>
                </section>
            </div>
        </>
     );
}
 
export default SellerLogin;