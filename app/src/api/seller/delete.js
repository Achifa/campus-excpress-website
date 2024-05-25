import axios from 'axios'
// import {IP} from '@env'

let uri_1 = 'ce-server.vercel.app'
let uri_2 = 'localhost:2222'
let IP = uri_2

const source = axios.CancelToken.source();

// export function delete(seller_id,chat,type) {
//     let response = delete_request_generators('delete-chat', {seller_id,chat,type})
//     console.log(response)
// }

export async function DeleteItem(seller_id,product_id) {
    let response = await delete_request_generators('product-delete', {seller_id,product_id})
    return (response)?.data;
}


async function delete_request_generators(uri, params) {
    return(
       await axios.delete(`http://${IP}/seller.${uri}/`, {
           params: params,
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
