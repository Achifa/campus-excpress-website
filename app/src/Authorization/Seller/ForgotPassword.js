import { useRef, useState } from 'react';
import { ResetPwd } from '../../api/seller';
import '../../styles/settings.css';
import Countdown from 'react-countdown';
const ForgotPwd = () => {

    let [email, setemail] = useState('');
    let [time, settime] = useState(60)
    let timer = useRef(60)
    let [text, settext] = useState('A password recovery email have been sent to the email');
    let book = useRef({email: false})

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

    function Validate(item){

    
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let empty = item.value !== '' ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please field cannot be empty.'}
        let validEmail = emailRegex.test(item.value) ? {bool: true, mssg: ''} : {bool: false, mssg: 'Please enter a valid email address.'}
        // let emailDuplicate =  emailvailidity ? {bool: true, mssg: ''} : {bool: false, mssg: 'Email already exist, please try something else'} 
        let errs = [empty,validEmail];
        addErrMssg(errs.filter(item => item.mssg !== ''),item.parentElement)
        let list = errs.filter(item => item.mssg !== '')
        let response = list.length > 0 ? false : true;
        return response;

    }

    function countDown() {
        let timeout = 60;
        let timeFunc = setInterval(() => {
            let newTime = timeout - 1;
            settime(newTime);
            timeout=newTime;
            if(timeout === 0){
                clearInterval(timeFunc)
            }
            
        }, 1000);
    }

    function sendPasswordResetToken(e) {

        let response = Validate(document.querySelector('.email'))
        if(response){
            countDown()
            e.target.disabled = true;
            ResetPwd(email,window.localStorage.getItem('CE_seller_id'))
            .then((result) => {
                

            })
            .catch((err) => {
                console.log(err)
                e.target.disabled = false;

            })
        }else{
            e.target.disabled = false;

        }
        
    }


    return ( 
        <>

            <div className="password-reset shadow-sm" style={{height: '100vh', margin: '0', padding: '0', width: '100%', background: '#fff'}}>
                <form className='shadow-sm' action="" style={{width: '350px'}}>
                    <h6 style={{color: 'orangered'}}>Password Reset</h6>

                    <br />
                    <div className="input-cnt">
                        <label htmlFor="">Enter registered email</label>
                        <input onInput={e => setemail(e.target.value)} type="text" className='email' placeholder="Enter Registered Email Here..."/>
                    </div>

                    <button onClick={e =>{e.preventDefault(); sendPasswordResetToken(e);}}>Submit Email</button>
                    <br />
                    <br />
                    <small style={{color: 'orange', fontWeight: '800', fontSize: 'x-small'}}>{text}</small>
                    <br />
                    <small style={{color: 'orange', fontWeight: '800', fontSize: 'x-small'}}>Resend Email In {time}s </small> 

                </form>
                
            </div>
        </>
     );
}
 
export default ForgotPwd;