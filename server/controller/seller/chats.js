const { NeonDB } = require("../../db");

async function get_chats(req,res) {
    let {seller_id} = req.body;
    
    NeonDB.then((pool) => 
        pool.query(`SELECT * FROM room_id `)
        .then(async(result) => {
            let chat_box = [];

            let seller = result.rows.filter(item => JSON.parse((item).members_id).seller_id === seller_id);

            let extracted_buyer_id = [...new Set(seller.map(item => JSON.parse((item).members_id).buyer_id))];
            let get_buyer_data_via_id = extracted_buyer_id.map( id => retrieve_buyer(id))
            let response = await  Promise.all(get_buyer_data_via_id).then(result => result)

            response.map(item => chat_box.push({buyer_id: item[0].buyer_id, buyer_name: item[0].fname + " " + item[0].lname, mssg: []}))
            let buyer_s_inital = response.map(item => item[0].fname + " " + item[0].lname)



            let room_id = [...new Set(seller.map(item => item.room_id))];
            let mssgs_meta_data = chat_box.map(item => retrieve_mssg_meta_data(item.buyer_id))
            let mssg_res = await  Promise.all(mssgs_meta_data).then(result => result)

            let chat_ids = chat_box.map(item => item.buyer_id)

            

            chat_ids.map((item) => {
                mssg_res[0].map(mssg => {
                    if(mssg.sender_id === item){
                        let i = chat_box.map(data => data.buyer_id).indexOf(item)
                        chat_box[i].mssg.push(mssg)
                    }
                })
            })

            
            res.send({chat_box})


        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}

async function get_mssgs(req,res) {
    let {mssg_id} = req.body;
    console.log(mssg_id)
    NeonDB.then((pool) => 
        pool.query(`SELECT * FROM messages WHERE message_id = '${mssg_id}' `)
        .then((result) => res.send(result.rows[0]))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}


async function send_mssgs(req,res) {
    let {mssg_id} = req.body;
    console.log(mssg_id)
    send_proposal_meta_data(room_id,seller_id)
    send_proposal_message(mssg_id, mssg)
    
}


module.exports ={
    get_chats,
    get_mssgs,
    send_mssgs
}