import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import '../../styles/Buyer/login.css'
import { LogSellerIn } from "../../api/seller";
import SellerLayout from "../../layout/Seller";
const SellerLogin = () => {
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

            LogSellerIn(email,pwd)
            .then((result) => {
                window.localStorage.setItem("CE_seller_id", result.id)
                window.localStorage.setItem("CE_seller_name_initial", result.name)
                navigate('/seller')
            })
            .catch((err) => {
                console.log(err)
                

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

    return ( 
        <>

            {/* <SellerLayout> */}
            <div className="seller-login-cnt" style={{background: 'orangered', bottom: '0', position: 'absolute', height: 'calc(100vh - 60px)'}}>

                <section className="shadow-sm" style={{background: '#fff'}}>
                    <h5 style={{color: 'orangered'}}>Login Here</h5>
                    <div className="err-cnt">

                    </div>
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
                            
                        <button onClick={e => {e.preventDefault(); Login(e)}}>
                            {
                                btn
                            }
                        </button>
                            
                        </div>
                    </form>

                    <div style={{textAlign: 'center'}} onClick={e => navigate('/seller.reset-recovery')}>
                        <small style={{cursor: 'pointer', color: 'orangered', fontWeight: '500'}}>Recover Forgotten Password Here</small>
                    </div>
                    <div style={{textAlign: 'center'}} onClick={e => navigate('/seller.signup')}>
                        <small style={{cursor: 'pointer', color: 'orangered', fontWeight: '500'}}>Don't Have An Account, Signup Here</small>
                    </div>
                </section>
            </div>
            {/* </SellerLayout> */}
        </>
     );
}
 
export default SellerLogin;