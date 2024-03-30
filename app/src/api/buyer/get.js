import axios from 'axios'
// import {IP} from '@env'


let uri_1 = 'ce-server.vercel.app'
let uri_2 = '192.168.86.146'
let IP = uri_1


const source = axios.CancelToken.source();

export async function _(params) {
    let response = await get_request_generators(`route`, {params})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetBuyer(buyer_id) {
    let response = await get_request_generators(`buyer`, {buyer_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetItems(category) {
    let response = await get_request_generators(``, {category})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetLodges() {
    let response = await get_request_generators(`lodges`, {})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetItem(id) {
    let response = await get_request_generators(`product`, {id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetItemImages(id) {
    let response = await get_request_generators(`product.images`, {id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetProductThumbnail(product_id) {
    let response = await get_request_generators(`thumbnail`, {product_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetCart(buyer_id) {
    let response = await get_request_generators(`cart`, {buyer_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetCartItems(buyer_id) {
    let response = await get_request_generators(`cart-items`, {buyer_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetOrders(buyer_id) {
    let response = await get_request_generators(`orders`, {buyer_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetSavedItem(buyer_id) {
    let response = await get_request_generators(`saved-items`, {buyer_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetWallet(id) {
    let response = await get_request_generators(`wallet`, {id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetSearchWord(word) {
    let response = await get_request_generators(`search-word`, {word})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetChatRooms(buyer_id) {
    let response = await get_request_generators(`get-chat-rooms`, {buyer_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}

export async function GetChat(buyer_id) {
    let response = await get_request_generators(`get-chat`, {buyer_id})
    setTimeout(() => source.cancel('timeout'), 10000) 
    return (response)?.data
}




async function get_request_generators(uri, params) {
     return(
        await axios.get(`https://${IP}/${uri}`, {
            params,
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



