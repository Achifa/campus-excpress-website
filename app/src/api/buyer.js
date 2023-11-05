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