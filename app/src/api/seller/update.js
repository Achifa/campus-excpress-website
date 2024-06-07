import axios from 'axios'
// import {IP} from '@env'


let uri_1 = 'ce-server.vercel.app'
let uri_2 = 'localhost:2222'
let IP = uri_1


const source = axios.CancelToken.source();


export async function UpdateSellerProfile(fname,lname,state,campus,seller_id,photo) {
    let response = await update_request_generators('profile-update', {fname,lname,state,campus,seller_id,photo})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return(response)
}

export async function UpdateShop(title, description, seller_id) {
    let response = await update_request_generators('shop-update', {title, description, seller_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return(response)
}

export async function UpdateInventory(inventory, seller_id) {
    let response = await update_request_generators('inventory-update', {inventory, seller_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return(response)
}

export async function UpdateUniversity(seller_id) {
    let response = await update_request_generators('inventory-update', {seller_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return(response)
}



async function update_request_generators(uri, body) {
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
