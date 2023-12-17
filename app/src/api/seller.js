import axios from 'axios'

let u1 = `http://localhost:1111`
let u4 = `http://192.168.75.146:1111`
let u2 = `https://ce-server.onrender.com`
let plug = u2;
 
export function uploadItem(productTitle,productDescription,productCategory,productType,productCondition,productPrice,productLocale,productStock,productPackage,productPhotos,seller_id) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/product-upload`, {
            productTitle,productDescription,productCategory,productType,productCondition,productPrice,productLocale,productStock,productPackage,productPhotos,seller_id
        })
        .then((result) => {
            resolve(result)
        })
        .catch((err) => {
            reject(err) 
        })
    })
}

export function updateItem(productTitle,productDescription,productCategory,productType,productCondition,productPrice,productLocale,productStock,productPackage,productPhotos,seller_id,product_id) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/product-update`, {
            productTitle,productDescription,productCategory,productType,productCondition,productPrice,productLocale,productStock,productPackage,productPhotos,seller_id,product_id
        })
        .then((result) => { 
            resolve(result)
        })
        .catch((err) => {
            reject(err) 
        })
    })
}

export function DeleteItem(seller_id,product_id) {
    return new Promise((resolve, reject) => {
        axios.delete(`${plug}/seller/product-delete`, {
            params: {seller_id,product_id}
        })
        .then((result) => {
            resolve(result)
        })
        .catch((err) => {
            reject(err) 
        })
    })
} 

export function updateSellerProfile(fname,lname,state,campus,seller_id) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/profile-update`, {
            fname,lname,state,campus,seller_id
        })
        .then((result) => {
            resolve(result)
        })
        .catch((err) => {
            reject(err) 
        })
    })
}

export function RegisterSeller(fname,lname,email,phone,pwd,state,campus) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/registration`, {
            fname,lname,email,phone,pwd,state,campus
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function LogSellerIn(email,pwd) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/login`, {
            email,pwd
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function GetSeller(seller_id) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller`, {
            seller_id
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function OVERVIEW(id) {
    return new Promise((resolve, reject) => 
        axios.post(`${plug}/seller/overview`, {id})
        .then((result) => resolve(result.data))
        .catch(err => reject(err))
    )
}

export function SHOP(id) {
    return new Promise((resolve, reject) => 
        axios.post(`${plug}/seller/shop`, {id})
        .then((result) => resolve(result.data))
        .catch(err => reject(err))
    )
}

export function AuthorizeWalletAccess(pin) {
    return new Promise((resolve, reject) => 
        axios.post(`${plug}/seller/wallet-access`, {pin})
        .then((result) => resolve(result.data))
        .catch(err => reject(err))
    )
}

export function WalletData(seller_id) {
    return new Promise((resolve, reject) => 
        axios.post(`${plug}/seller/wallet-data`, {seller_id})
        .then((result) => resolve(result.data))
        .catch(err => reject(err))
    )
}

export function createBill(seller_id) {
    return new Promise((resolve, reject) => 
        axios.post(`${plug}/seller/wallet-bill`, {seller_id})
        .then((result) => resolve(result.data))
        .catch(err => reject(err))
    )
}

export function GET_PRODUCT_THUMBNAIL(product_id) {
    
    return new Promise((resolve, reject) => {

        axios.get(`${plug}/thumbnail`, {
            params: {
                product_id
            } 
        })
        .then((result) => {
            resolve(result.data);
        })
        .catch((err) => {
            reject(err);
        })

    })
}

export function GetEditedItem(product_id) {
    
    return new Promise((resolve, reject) => {

        axios.get(`${plug}/seller-edited-item`, {
            params: {
                product_id
            } 
        })
        .then((result) => {
            resolve(result.data);
        })
        .catch((err) => {
            reject(err);
        })

    })
}

export function SendToken(email,phn) {
    
    return new Promise((resolve, reject) => {

        axios.post(`${plug}/seller/verification`, {email,phn})
        .then((result) => {
            resolve(result.data);
        })
        .catch((err) => {
            reject(err);
        })

    })
}

export function AuthenticateSeller(seller_id) {
    
    return new Promise((resolve, reject) => {

        axios.post(`${plug}/seller/authentication`, {seller_id})
        .then((result) => {
            resolve(result.data);
        })
        .catch((err) => {
            reject(err);
        })

    })
}

export function ResetPwd(email,seller_id) {
    
    return new Promise((resolve, reject) => {

        axios.post(`${plug}/seller/password-reset`, {email,seller_id})
        .then((result) => {
            resolve(result.data);
        })
        .catch((err) => {
            reject(err);
        })

    })
}

export function updatePwd(seller_id, pwd) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/password-update`, {seller_id, pwd})
        .then((result) => {
            resolve(result)
        })
        .catch((err) => {
            reject(err) 
        })
    })
}

export function CheckPwdResetToken(seller_id,token) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/password-token-check`, {seller_id, token})
        .then((result) => {
            resolve(result)
        })
        .catch((err) => {
            reject(err) 
        })
    })
}

export function GetSellerInbox(seller_id) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/inbox`, {seller_id})
        .then((result) => {
            resolve(result)
        })
        .catch((err) => {
            reject(err) 
        })
    })
}

export function GetSellerOrder(seller_id) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/orders`, {seller_id})
        .then((result) => {
            resolve(result)
        })
        .catch((err) => {
            reject(err) 
        })
    })
}

export function ValidateEmail(token) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/email-validation`, {token})
        .then((result) => {
            resolve(result)
        })
        .catch((err) => {
            reject(err) 
        })
    })
}

export function SendEmail(email,seller_id) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/seller/send-email`, {email,seller_id})
        .then((result) => {
            resolve(result)
        })
        .catch((err) => {
            reject(err) 
        })
    })
}