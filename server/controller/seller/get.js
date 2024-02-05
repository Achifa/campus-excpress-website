const { NeonDB } = require("../../db");

async function overview(req,res)  {
    let {id} = req.body;
    

    async function get_total_sale(params) {
        return (
            await NeonDB.then((pool) => 
                pool.query(`select * from seller_shop where seller_id = '${id.trim()}'`)
                .then(result => result.rows.length)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    async function get_sold(params) {
        return (
            await NeonDB.then((pool) => 
                pool.query(`select * from seller_shop where seller_id = '${id.trim()}' AND status = 'sold'`)
                .then(result => result.rows.length)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    async function get_unsold(params) {
        return (
            await NeonDB.then((pool) => 
                pool.query(`select * from seller_shop where seller_id = '${id.trim()}' AND status = 'unsold'`)
                .then(result => result.rows.length)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    async function get_report(params) {
        return (
            await NeonDB.then((pool) => 
                pool.query(`select * from product_report where seller_id = '${id.trim()}'`)
                .then(result => result.rows.length)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    res.send({total_sale: await get_total_sale(), total_sold: await get_sold(),total_unsold: await get_unsold(), total_reported: await get_report()})
}


async function shop(req,res)  {
    let {id} = req.query;

    NeonDB.then((pool) => 
        pool.query(`select * from seller_shop where seller_id = '${id}'`)
        .then(result => res.send(result.rows))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}

async function get_edited_item(req,res)  {
    let {product_id} = req.query;
    function getMetadata(params) {
        return(
            NeonDB.then((pool) => 
                pool.query(`select * from seller_shop where product_id = '${product_id}'`)
                .then(result => (result.rows))
                .catch(err => {
                    console.log(err)
                })
            )
            .catch(err => {
                console.log(err)
            })
        )
    }

    function getThumnails(params) {
        return(
            NeonDB.then((pool) => 
                pool.query(`select file from product_photo where product_id = '${product_id}'`)
                .then(result => (result.rows))
                .catch(err => {
                    console.log(err)
                })
            )
            .catch(err => {
                console.log(err)
            })
        )
    }

    let meta_data = await getMetadata()
    let photos = await getThumnails()

    res.status(200).send({meta_data, photos})
}

async function wallet_data(req,res)  {
    let {seller_id} = req.body;

    function walletBalance() {
        return(
            NeonDB.then((pool) => 
                pool.query(`select * from campus_express_seller_wallet where seller_id = '${seller_id}'`)
                .then(result => result.rows)
                .catch(err => console.log(err))
                )
            .catch(err => console.log(err))
        )
    }

    function Transactions() {
        return(
            NeonDB.then((pool) => 
                pool.query(`select * from campus_express_seller_transactions where seller_id = '${seller_id}'`)
                .then(result => result.rows)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    let wallet = await walletBalance()
    let documents = await Transactions()


    res.send({walletBalance: wallet, TransactionHistory: documents})

}


async function get_seller_order(req,res) {
    let {seller_id} = req.body;

    let ids = await NeonDB.then((pool) => 
        pool.query(`select * from seller_shop where seller_id = '${seller_id}'`)
        .then(result => (result.rows))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
    
    let data = ids.map(async(item) => 
        await NeonDB.then((pool) => 
            pool.query(`SELECT * FROM campus_express_buyer_orders  WHERE product_id = '${item.product_id}'`)
            .then(result => (result.rows))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )

    let response = await Promise.all(data).then(result => result)
    console.log(response)
    res.send(response)
    
}


async function get_seller_inbox(req,res) {
    let {seller_id} = req.body;
    
    
    NeonDB.then((pool) => 
        pool.query(`SELECT * FROM seller_inbox  WHERE seller_id = '${seller_id}'`)
        .then(result => {
            res.send(result.rows)
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}

module.exports={
    shop,
    overview,
    get_edited_item,
    wallet_data,
    get_seller_order,
    get_seller_inbox
}