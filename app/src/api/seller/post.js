import axios from 'axios'
// import {IP} from '@env'


let uri_1 = 'ce-server.vercel.app'
let uri_2 = 'localhost:2222'
let IP = uri_1
 

const source = axios.CancelToken.source();

export async function RegisterSeller(fname,lname,email,phone,pwd,state,campus) {
    let response = await post_request_generators('registration', {fname,lname,email,phone,pwd,state,campus})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function LogSellerIn(email,pwd) {
    let response = await post_request_generators('login', {email,pwd})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function ValidateEmail(token) {
    let response = await post_request_generators('email-validation', {token})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function SendEmail(email,seller_id, name) {
    let response = await post_request_generators('send-email', {email,seller_id, name})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}
export async function SendSMS(phone,seller_id, name) {
    let response = await post_request_generators('send-phone', {phone,seller_id, name})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function UploadChat(buyer_id,seller_id) {
    let response = await post_request_generators('new-chat', {seller_id,seller_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function UploadItem(constantData, dynamicData) {
    let response = await post_request_generators('product-upload', {constantData, dynamicData})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function UpdateItem(constantData, dynamicData) {
    let response = await post_request_generators('product-update', {constantData, dynamicData})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}






async function post_request_generators(uri, body) {
    return(
        await axios.post(`https://${IP}/seller.${uri}`, body, {
            cancelToken: source.token
        })
        .then((result) => result)
        .catch((error) => {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }  else {
                console.log('Error:', error.message);
            }    
            
        })     
        
    )
}





