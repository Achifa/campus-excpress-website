
const Flutterwave = require('flutterwave-node-v3');
require('dotenv').config();

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);



const fetch_transactions = async () => {

    try {

        let yourDate = new Date()
        yourDate.toISOString().split('T')[0]

        const payload = {
            "from": "2020-01-01",
            "to": "2020-05-05"
        }
        const response = await flw.Transaction.fetch(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}

const AuthorizeWalletAccess = async () => {

    let date = new Date();
    let {wallet_id,seller_id,wallet_balance,wallet_pin,wallet_number} = req.body;

    NeonDB.then((pool) => 
    pool.query(`insert into campus_seller_wallets(id,wallet_id,seller_id,wallet_balance,wallet_pin,wallet_number,date) values(DEFAULT,'${wallet_id}','${seller_id}','${wallet_balance}','${wallet_pin}','${wallet_number}','${date}')`)
        .then(result => result.rowCount > 0 ? resolve(true) : reject(false))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}


const create_bill = async () => {

    const Flutterwave = require('flutterwave-node-v3');

    const createBill = async () => {

        try {
            const payload={
                "country": "NG",
                "customer": "+23490803840303",
                "amount": 100,
                "recurrence": "ONCE",
                "type": "AIRTIME",
                "reference": "930rwrwr0049404444"
            }
            
            const response = await flw.Bills.create_bill(payload)
            console.log(response);
        
        } catch (error) {
            console.log(error)
        }

    }


    createBill();
}


module.exports = {
    AuthorizeWalletAccess,
    create_bill
}