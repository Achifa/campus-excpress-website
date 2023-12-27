import axios from 'axios'

let u1 = `http://localhost:1111`
let u2 = `http://192.168.94.146:1111`
let u3 = `https://ce-server.onrender.com`

let plug = u3; 


export function RegisterBuyer(fname,lname,email,phone,pwd,state,campus) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/buyer/registration`, {
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


export function LogBuyerIn(email,pwd) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/buyer/login`, {
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

export function GetBuyer(buyer_id) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/buyer`, {
            buyer_id
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function GetItems(category) {
    return new Promise((resolve, reject) => {
        axios.get(`${plug}/`, {
            params: {
                category
            }
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function GetLodges() {
    return new Promise((resolve, reject) => {
        axios.get(`${plug}/lodges`, {
            params: {
                
            }
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function GetItem(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${plug}/product`, {
            params: {id}
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function GetItemImages(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${plug}/product/images`, {
            params: {id}
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
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

export function GetCart(buyer_id) {
    return new Promise((resolve, reject) => {
        axios.get(`${plug}/cart`, {
            params: {buyer_id}
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function GetCartItems(buyer_id) {
    return new Promise((resolve, reject) => {
        axios.get(`${plug}/cart-items`, {
            params: {buyer_id}
        })
        .then((result) => { 
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function AddItemToCart(product_id,buyer_id) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/add-cart`, {product_id,buyer_id})
        .then((result) => {
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function DeleteItemFromCart(product_id,buyer_id) {
    return new Promise((resolve, reject) => {
        axios.delete(`${plug}/delete-cart`, {
            params: {product_id,buyer_id}
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function GetOrders(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${plug}/cart`, {
            params: {id}
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function GetSavedItems(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${plug}/cart`, {
            params: {id}
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function GetWallet(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${plug}/cart`, {
            params: {id}
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function SaveItem(product_id,buyer_id) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/save-item`, {product_id,buyer_id})
        .then((result) => {
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function UnSaveItem(product_id,buyer_id) {
    return new Promise((resolve, reject) => {
        axios.delete(`${plug}/unsave-item`, {
            params: {product_id,buyer_id}
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function GetSavedItem(buyer_id) {
    return new Promise((resolve, reject) => {
        axios.get(`${plug}/saved-items`, {
            params: {buyer_id}
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function GetSavedItemsData(buyer_id) {
    return new Promise((resolve, reject) => {
        axios.get(`${plug}/saved-items-data`, {
            params: {buyer_id}
        })
        .then((result) => { 
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function UpdateCartUnit(type,buyer_id,product_id) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/update-cart-unit`, {type,buyer_id,product_id})
        .then((result) => { 
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function GetSearchWord(word) {
    return new Promise((resolve, reject) => {
        axios.get(`${plug}/search-word`, {
            params: {word}
        })
        .then((result) => { 
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}


