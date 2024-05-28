// const { retrieve_buyer, retrieve_mssg_meta_data } = require("../../../payment_management/functions");
const { NeonDB } = require("../../db");
const { retrieve_room, retrieve_message_meta_data_with_type, retrieve_message, retrieve_buyer } = require("../../utils");



function retrieve_room_with_room_id(id) {
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT members_id FROM room_id WHERE room_id = '${id}'`)
            .then(result => result.rows[0])
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    )
}

function retrieve_mssg_meta_data(buyer_id,room_id,order_id) {
    // console.log('order_id: ', order_id)
    return(
        NeonDB.then((pool) => 
            pool.query(`SELECT * FROM message_meta_data WHERE sender_id = '${buyer_id}' AND room_id = '${room_id}' AND order_id = '${order_id}'`)
            .then(result => (result.rows))
            .catch(err => console.log(err))
            // .finally(() => pool.end())

        )
        .catch(err => console.log(err))
    )
}


async function get_chat_rooms(req,res){
    let {seller_id} = req.query;
    // let {seller_id} = req.query;
    console.log(seller_id)
    let book = []
 
    let room = await retrieve_room(seller_id);
  
    room.map(async(item) => { 
        let buyer_data = await retrieve_buyer(item.buyer_id);
        let mssg_meta_data = await retrieve_message_meta_data_with_type(item.room_id);
        // console.log( mssg_meta_data.splice(-1)[0]) 

       async function get_text_mssg(meta) {

            if(meta === 'text'){
                return await retrieve_message(mssg_meta_data.splice(-1)[0]?.mssg_id)
            }else{
                return {mssg: ''}
            }
        }

        let mssg = await get_text_mssg(mssg_meta_data.splice(-1)[0]?.mssg_type);

        book.push({buyer_data, mssg: mssg, room: item.room_id})   
        if(book.length === room.length){  
            res.send(book);  
            // console.log(book)
    
        }
    })    

    
    // console.log(book)

     
} 

async function get_shop(id) {
    return (
        await NeonDB.then((pool) => 
            pool.query(`select * from seller_shop where product_id = '${id}'`)
            .then(result => result.rows[0])
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    )
}

async function get_mssg_data(data){
    if(data.mssg_type === 'doc'){
        return (
            await NeonDB.then((pool) => 
                pool.query(`select product_id from campus_express_buyer_orders where buyer_id = '${data.sender_id}' AND order_id = '${data.order_id}'`)
                .then(result => result.rows[0])
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }else{
        return data
    }
}

async function get_mssgs(req,res) {
    let {mssg_id} = req.query;
    // console.log('mssg_id: ', mssg_id)
    NeonDB.then((pool) => 
        pool.query(`SELECT * FROM messages WHERE mssg_id = '${mssg_id}' `)
        .then(async(result) => {
            let response = await get_mssg_data(result.rows[0])
            let data = await get_shop(response?.product_id)
            // console.log('data: ', data)
            res.send({result: data, type: result.rows[0].mssg_type})
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}


async function send_mssgs(req,res) {
    let {mssg_id} = req.body;
    console.log(mssg_id)
    // send_proposal_meta_data(room_id,seller_id)
    // send_proposal_message(mssg_id, mssg)
    
}


module.exports ={
    get_mssgs,
    send_mssgs,
    get_chat_rooms
}