import axios from 'axios'
// import {IP} from '@env'

let IP = process.env.IP

const source = axios.CancelToken.source();


export async function UpdateCartUnit(type,buyer_id,product_id) {
    let response = await update_request_generators('update-cart-unit', {type,buyer_id,product_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return(response)
}

export async function UpdatePwd(buyer_id, pwd) {
    let response = await update_request_generators('password-update', {buyer_id, pwd})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return(response)
}



async function update_request_generators(uri, body) {
    return(
        await axios.update(`http://${IP}:1010/${uri}`, body, {
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
