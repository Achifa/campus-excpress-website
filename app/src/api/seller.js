import axios from 'axios'

let u1 = `http://localhost:1111`
let u2 = `https://ce-server.onrender.com`

export function uploadItem(productTitle,productDescription,productCategory,productType,productCondition,productPrice,productLocale,productStock,productPackage,productPhotos,seller_id) {
    return new Promise((resolve, reject) => {
        axios.post(`${u1}/seller/product-upload`, {
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


export function RegisterSeller(fname,lname,email,phone,pwd,state,campus) {
    return new Promise((resolve, reject) => {
        axios.post(`${u1}/seller/registration`, {
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
        axios.post(`${u1}/seller/login`, {
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