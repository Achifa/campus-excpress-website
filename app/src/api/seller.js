import axios from 'axios'

let u1 = `http://localhost:1111`
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