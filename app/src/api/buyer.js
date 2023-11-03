import axios from 'axios'

let u1 = `http://localhost:1111`

export function RegisterBuyer(fname,lname,email,phone,pwd,state,campus) {
    return new Promise((resolve, reject) => {
        axios.post(`${u1}/buyer/registration`, {
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
        axios.post(`${u1}/buyer/login`, {
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