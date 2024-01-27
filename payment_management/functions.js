

async function save_tansaction(buyer_id,payment_src,payment_type,app_fee,amount,date) {
    const { NeonDB } = require("../db")

    return(
      await NeonDB.then((pool) => 
        pool.query(`insert into buyer_transactions(
          id,
          buyer_id,
          payment_src,
          payment_type,
          app_fee,
          amount,
          date
        ) 
        values(
          DEFAULT, 
          '${buyer_id}',
          '${payment_src}',
          '${payment_type}',
          '${app_fee}',
          '${amount}',
          '${date}'
          `)

          .then(result => result.rowCount > 0 ? ({bool: true}) : ({bool: false}))
          .catch(err => console.log(err))
        )
      .catch(err => console.log(err))
    )
}

function retrieve_seller(product_id) {
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT seller_id FROM seller_shop WHERE product_id = '${product_id}'`)
            .then(result => (result.rows[0].seller_id))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
    // return book;
}

function retrieve_room(buyer_id,seller_id) {
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT * FROM room_id`)
            .then(result => {
                let m = result.rows;
                let room = m.filter(item => JSON.parse(item.members_id).buyer_id === buyer_id && JSON.parse(item.members_id).seller_id === seller_id);
                return room.map(item => item.room_id);
                // room.map(item => (item.room_id));
            })
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

function retrieve_mssg_meta_data(buyer_id,room_id) {
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT * FROM message_meta_data WHERE sender_id = '${buyer_id}' AND room_id = '${room_id}'`)
            .then(result => (result.rows))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

function retrieve_mssg_meta_data_via_room(room_id) {
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT * FROM message_meta_data WHERE room_id = '${room_id}'`)
            .then(result => (result.rows))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

function retrive_cart(buyer_id) { 
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT * FROM campus_express_buyer_cart WHERE buyer_id = '${buyer_id}'`)
            .then(result => (result.rows))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

module.exports = {retrive_cart,save_tansaction,retrieve_mssg_meta_data_via_room,retrieve_seller,retrieve_room,retrieve_mssg_meta_data}
