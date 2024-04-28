import { useEffect, useRef, useState } from 'react';
import { ResetPwd } from '../api/seller';
import '../styles/settings.css';
import Countdown from 'react-countdown';
import SellerLayout from '../layout/Seller';
import emailTemplates from '../emailTemplates';
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

    useEffect(() => {

       
    
        var formdata = new FormData();
        formdata.append("token", "rXdAgTsFBOS8ECK7MZk1i6WojUmqy9unDv34cQablpz0JLHhIV5NfPG2teYwxR");
        formdata.append("senderEmail", "campus-express@campusexpressng.com");
        formdata.append("senderName", "Campus Express Nigeria");
        formdata.append("senderFrom", "campus-express@campusexpressng.com");
        formdata.append("campaignName", "Password Recovery");
        formdata.append("recipient", "akpulufabian@gmail.com");
        formdata.append("subject", "Password Recovery");
        formdata.append("templateCode", 
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Template</title>
                <style>
                    /* Inline CSS for styling */
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #ffffff;
                    }
                    h1 {
                        color: #333333;
                    }
                    p {
                        color: #666666;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Welcome to Our Newsletter!</h1>
                    <p>Dear Subscriber,</p>
                    <p>Thank you for subscribing to our newsletter. We're excited to keep you updated on the latest news and offers.</p>
                    <p>Best regards,<br> The Newsletter Team</p>
                </div>
            </body>
            </html>`

        );

        var requestOptions = {
        method: 'POST', 
        body: formdata,
        redirect: 'follow'
        };

        fetch("https://my.kudisms.net/api/campaign", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    },[])


    return ( 
        <>
            {/* <SellerLayout> */}
                <div className="password-reset shadow-sm" style={{background: 'orangered', bottom: '0', position: 'absolute', height: 'calc(100vh - 60px)', width: '100%'}}>
                    
                    
                    <form className='shadow-sm' action="" style={{width: '350px', padding: '20px'}}>
                        <br />
                        <h6><b style={{background: 'orangered', color: '#fff', padding: '10px', borderRadius: '5px', marginBottom: '20px', height: '150px'}}>Password Recovery Form For Sellers</b></h6>
                    
                        <br />

                        <div style={{padding: '10px'}}>
                            <br />
                            <div className="input-cnt">
                                <label htmlFor="" style={{fontWeight: '400', color: '#000', fontSize: 'medium'}}>Enter registered email</label>
                                <input onInput={e => setemail(e.target.value)} type="text" className='email' style={{background: '#efefef'}} placeholder="Enter Registered Email Here..."/>
                            </div>
 
                            <button style={{marginBottom: '10px'}} onClick={e =>{e.preventDefault(); sendPasswordResetToken(e);}}>Submit Email</button>
                            <br />
                            <small style={{color: 'orange', fontWeight: '800', display: 'block', fontSize: 'x-small', textAlign: 'center', width: '100%'}}>{text}</small>
                            <small style={{color: 'orange', display: 'block', fontWeight: '800', textAlign: 'center', width: '100%', fontSize: 'x-small'}}>Resend Email In {time}s </small> 

                        </div>
 
                    </form>
                    
                </div>
            {/* </SellerLayout> */}
        </>
     );
}
 
export default ForgotPwd;