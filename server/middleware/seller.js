const jwt = require('jsonwebtoken');
const {connectToDatabase, NeonDB} = require('../db');
const {Pool, Client} = require("pg");


const seller_authentication = (req, res, next) => {
    const {seller_id} = req.body; 
    NeonDB.then((pool) => 
        pool.query(`SELECt * FROM campus_sellers WHERE seller_id = '${seller_id}'`)
        .then(result => {
            console.log(result)
            if(result.rows.length < 1){

                res.status(200).send(false)
            }else{
                res.status(200).send(true)
            }
        })

        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
    
}

const check_seller = (req, res, next) => {
    const {seller_id} = req.body; 

    NeonDB.then((pool) => 
        pool.query(`SELECt * FROM campus_sellers WHERE seller_id = '${seller_id}'`)
        .then(result => {
            if(result.rows.length < 1){
                res.status(200).send({bool: false, data: ''})
            }else{
                res.status(200).send({bool: true, data:result.rows[0]})
            }
        })

        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}


function CheckPwdResetToken(req, res, next){
    const {seller_id,token} = req.body; 
    NeonDB.then((pool) => 
        pool.query(`SELECt * FROM token WHERE seller_id = '${seller_id}' AND token = '${token}`)
        .then(result => {
            console.log(result)
            if(result.rows.length < 1){

                res.status(200).send(false)
            }else{
                res.status(200).send(true)
            }
        })

        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}


module.exports = { seller_authentication, check_seller, CheckPwdResetToken };
