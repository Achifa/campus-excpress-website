import axios from 'axios'

let u1 = `http://localhost:1111`
let u2 = `http://192.168.0.5:1111`
let u3 = `https://ce-server.onrender.com`


export function RegisterBuyer(fname,lname,email,phone,pwd,state,campus) {
    return new Promise((resolve, reject) => {
        axios.post(`${u3}/buyer/registration`, {
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
        axios.post(`${u3}/buyer/login`, {
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

export function GetItems(email,pwd) {
    return new Promise((resolve, reject) => {
        axios.get(`${u1}/`, {})
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
        axios.get(`${u1}/product`, {
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
        axios.get(`${u1}/product/images`, {
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

        axios.get(`${u1}/thumbnail`, {
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