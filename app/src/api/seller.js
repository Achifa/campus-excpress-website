import axios from 'axios';


let u1 = `http://localhost:2222`;
let u4 = `http://192.168.86.146:2222`;
let u2 = `https://ce-server.vercel.app`;

let plug = u2; 

const source = axios.CancelToken.source();



export function GetItem(id) {
    source.cancel('new request')
    return new Promise((resolve, reject) => {
        axios.get(`${plug}/product`, {
            params: {id}
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    })
}

export function GetItemImages(id) {
    source.cancel('new request')
    return new Promise((resolve, reject) => {
        axios.get(`${plug}/product/images`, {
            params: {id}
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    })
}

export function get_buyer_that_ordered_item(product_id) {
    source.cancel('new request')
    return new Promise((resolve, reject) => {
        axios.get(`${plug}/seller/order-buyers-info`, {
            params: {product_id}
        })
        .then((result) => {
            resolve(result)
        }) 
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    })
}

export function get_chat(seller_id) {
    source.cancel('new request')
    return new Promise((resolve, reject) => {
        axios.get(`${plug}/seller/chats`, {
            params:{seller_id}
        })
        .then((result) => {
            resolve(result)
        }) 
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    })
}

export function get_mssg(mssg_id) {
    source.cancel('new request')
    return new Promise((resolve, reject) => {
        axios.get(`${plug}/seller/mssg`, {
            params: {mssg_id}
        })
        .then((result) => {
            resolve(result)
        }) 
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        })  
    })
}

export function send_mssg(mssg, seller_id) {
    source.cancel('new request')
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/send-mssg`, {
            mssg, seller_id
        })
        .then((result) => {
            resolve(result)
        }) 
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        })  
    })
}
 

export function uploadItem(constantData, dynamicData) {
    
    source.cancel('new request')
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/product-upload`, {
            constantData, dynamicData
        })
        .then((result) => {
            resolve(result)
        })  
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        })  
    })
}

export function updateItem(title,description,category,price,photos,seller_id,product_id,others) {
    source.cancel('new request')
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/product-update`, {
            title,description,category,price,photos,seller_id,product_id,others

        })
        .then((result) => { 
            resolve(result)
        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    })
}

export function DeleteItem(seller_id,product_id) {
    source.cancel('new request')
    return new Promise((resolve, reject) => {
        axios.delete(`${plug}/seller/product-delete`, {
            params: {seller_id,product_id}
        })
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    })
} 

export function updateSellerProfile(fname,lname,state,campus,seller_id) {
    source.cancel('new request')
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/profile-update`, {
            fname,lname,state,campus,seller_id
        })
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    })
}

export function RegisterSeller(fname,lname,email,phone,pwd,state,campus) {
    source.cancel('new request')
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/registration`, {
            fname,lname,email,phone,pwd,state,campus
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    })
}

export function LogSellerIn(email,pwd) {
    source.cancel('new request')
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/login`, {
            email,pwd
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    })
}

export function GetSeller(seller_id) {
    source.cancel('new request')
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller`, {
            seller_id
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    })
}

export function OVERVIEW(id) {
    source.cancel('new request')
    return new Promise((resolve, reject) => 
        axios.post(`${plug}/seller/overview`, {id})
        .then((result) => resolve(result.data))
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    )
}

export function SHOP(id) {
    source.cancel('new request')
    return new Promise((resolve, reject) => 
        axios.get(`${plug}/seller/shop`, {
            params: {
                id
            }
        })
        .then((result) => resolve(result.data))
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    )
}

export function AuthorizeWalletAccess(pin) {
    source.cancel('new request')
    return new Promise((resolve, reject) => 
        axios.post(`${plug}/seller/wallet-access`, {pin})
        .then((result) => resolve(result.data))
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    )
}

export function WalletData(seller_id) {
    source.cancel('new request')
    return new Promise((resolve, reject) => 
        axios.get(`${plug}/seller/wallet-data`, {params: {seller_id}})
        .then((result) => resolve(result.data))
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    )
}

export function createBill(seller_id) {
    source.cancel('new request')
    return new Promise((resolve, reject) => 
        axios.post(`${plug}/seller/wallet-bill`, {seller_id})
        .then((result) => resolve(result.data))
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    )
}

export function GET_PRODUCT_THUMBNAIL(product_id) {
    
    source.cancel('new request')
    return new Promise((resolve, reject) => {

        axios.get(`${plug}/thumbnail`, {
            params: {
                product_id
            } 
        })
        .then((result) => {
            resolve(result.data);
        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 

    })
}

export function GetEditedItem(product_id) {
    
    source.cancel('new request')
    return new Promise((resolve, reject) => {

        axios.get(`${plug}/seller-edited-item`, {
            params: {
                product_id
            } 
        })
        .then((result) => {
            resolve(result.data);
        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 

    })
}

export function SendToken(email,phn) {
    
    source.cancel('new request')
    return new Promise((resolve, reject) => {

        axios.post(`${plug}/seller/verification`, {email,phn})
        .then((result) => {
            resolve(result.data);
        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 

    })
}



export function AuthenticateSeller(seller_id) {
    
    source.cancel('new request')
    return new Promise((resolve, reject) => {

        axios.post(`${plug}/seller/authentication`, {seller_id})
        .then((result) => {
            resolve(result.data);
        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 

    })
}

export function ResetPwd(email,seller_id) {
    
    source.cancel('new request')
    return new Promise((resolve, reject) => {

        axios.post(`${plug}/seller/password-reset`, {email,seller_id})
        .then((result) => {
            resolve(result.data);
        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 

    })
}

export function updatePwd(seller_id, pwd) {
    source.cancel('new request')
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/password-update`, {seller_id, pwd})
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    })
}

export function CheckPwdResetToken(seller_id,token) {
    source.cancel('new request')
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/password-token-check`, {seller_id, token})
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    })
}

export function GetSellerInbox(seller_id) {
    source.cancel('new request')
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/inbox`, {seller_id})
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    })
}

export function GetSellerOrder(seller_id) {
    source.cancel('new request')
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/orders`, {seller_id})
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    })
}

export function ValidateEmail(token) {
    source.cancel('new request')
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/email-validation`, {token})
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    })
}

export function SendEmail(email,seller_id) {
    source.cancel('new request')
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/send-email`, {email,seller_id})
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    })
}

export function bankVerification(acctNum,bank) {
    source.cancel('new request')
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/bank-verification`, {acctNum,bank})
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    })
}

export function Transfer(withdrwawalAmount,acctNum,bank,acctName) {
    source.cancel('new request')
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/transfer`, {withdrwawalAmount,acctNum,bank,acctName})
        .then((result) => {
            resolve(result)
        })
        .catch((error) => {
            if(axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            }else{
                console.log('Error:', error.message); 
            }   
        }) 
    })
}