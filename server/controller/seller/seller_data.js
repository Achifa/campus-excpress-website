const { NeonDB } = require("../../db");

async function get_seller_data(req,res) {
    let {seller_id} = req.body;
    NeonDB.then((pool) => 
        pool.query(`SELECT * FROM campus_sellers WHERE seller_id = '${seller_id}'`)
        .then(result => res.send(result.rows[0]))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}

module.exports = {
    get_seller_data
}