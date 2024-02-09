//19 request on buyer

const { create_cart, delete_cart, retrive_cart } = require("../Functions/cart");
const { query_tool } = require("../Functions/query");
const { send_email } = require("../Functions/send_mssgs");
const { create_token, create_token_for_pwd } = require("../Functions/token");
const { NeonDB } = require("../db");
const { shortId, bcrypt, jwt } = require("../modules");
const { verification_email, pwd_reset } = require("../templates");
const maxAge = 90 * 24 * 60 * 60; 
const createToken = (id) => {
    return jwt.sign({ id }, 'seller_secret', {
       expiresIn: maxAge
    });
};

async function register_buyer(req,res) {

    let {fname,lname,email,phone,pwd,state,campus} = req.body;
    let date = new Date().toLocaleString();
    let hPwd = await bcrypt.hash(pwd, 10)
    let buyer_id = `CE-${shortId.generate()}`
    let wallet_id = `CEW-${buyer_id}`

    async function create_new_buyer(params) {
       return(
         query_tool(
          'INSERT', 
          '', 
          'campus_buyers', 
          {
    
          },
          [
    
          ],
              
                [
                    'fname','lname','buyer_id','email','phone','password','state','campus','isActive','isVerified','isEmailVerified','isPhoneVerified','date'
                ],
                [
                    `'${fname}'`, `'${lname}'`, `'${buyer_id}'`, `'${email}'`, `'${phone}'`, `'${hPwd}'`, `'${state}'`, `'${campus}'`, `${false}`,`${false}`,`${false}`,`${false}`, `'${date}'`
                ]
    
            ).then(result => (result)).catch(err => err)
        )
    }
    
    async function create_new_buyer_wallet(params) {
        return(
            query_tool(
                'INSERT', 
                '', 
                'campus_express_buyer_wallet', 
                {
    
                },
                [
    
                ],
                [
                    'wallet_id','buyer_id','wallet_balance','wallet_pin','wallet_number','date'
                ],
                [
                    `'${wallet_id}'`,`'${buyer_id}'`,`${0}`,`'${pwd}'`,`'${phone}'`,`'${date}'`
                ]
    
            )
        )
    }
    
    async function send_email_to_buyer(params) {
        let token = shortId.generate()
    
        let get_token = await create_token(email,buyer_id,token,date)
        if(get_token){
            let get_email_mssg = verification_email(token,email,fname + " " + lname)
            let get_email_response = await send_email(email, get_email_mssg, 'Verify Your Email Address')

            return get_email_response
        }
        //remember to delete token after every thing
        //
    
      
    }

    async function check_email(params) {
        return(
            query_tool(
                'SELECT', 
                '*', 
                'campus_buyers', 
                {
                    bool: 1,
                    search_word: ['email'],
                    identifier: [`${email}`],
                },
                [
    
                ],
                [
                   
                ],
                [
                    
                ]
    
            )
        )
        
    }

    async function check_phone(params) {
        return(
            query_tool(
                'SELECT', 
                '*', 
                'campus_buyers', 
                {
                    bool: 1,
                    search_word: ['phone'],
                    identifier: [`${phone}`],
                },
                [
    
                ],
                [
                   
                ],
                [
                    
                ]
    
            )
        )
    }
 
    try{

        let email = await check_email(data => data)
        let phone = await check_phone(data => data)
        let create_buyer_result = await create_new_buyer()
        let create_new_buyer_wallet_result = await create_new_buyer_wallet()
        let send_email_result = await send_email_to_buyer()

        new Promise((resolve, reject) => {if(!email){reject({err: 'duplicate email', bool: false})}else if(!phone){reject({err: 'duplicate phone', bool: false})}else{resolve(true)}
        })
        .then((result) => {return(create_buyer_result ? (true) : (false))})
        .then((result) => {return(create_new_buyer_wallet_result ? (true) : (false))})
        .then((result) => {return send_email_result ? (true) : (false)})
        .catch((err) => {console.log(err); res.status(500).send(err)})
        .finally(() => res.send(true))

    }
    catch(err){console.log(err); res.status(500).send(err)}
}

async function log_buyer_in(req, res) {
    
    let {email,pwd} = req.body;

    async function validate_buyer_with_email() {
        return(
            await query_tool(
                'SELECT',
                'id',
                'campus_buyers',
                {
                    bool: 1,
                    search_word: ['email'],
                    identifier: [email],
                    //for delete and select and update
            
                }, 
                [],
                [],
                []
            )
        )
    }
    async function get_buyer_data_with_id(id) {
        return(
            await query_tool(
                'SELECT',
                '*',
                'campus_buyers',
                {
                    bool: 1,
                    search_word: ['id'],
                    identifier: [id],
                    //for delete and select and update
            
                }, 
                [],
                [],
                []
            )
        )
    }
    async function compare_buyer_password(user) {
        const auth = await bcrypt.compare(pwd, user.password);
        if (auth) {
            const token = createToken(user.buyer_id);
            res.status(200).send({bool: true, id: user.buyer_id, name: `${user.fname[0]}.${user.lname[0]}`});

        }else{
            res.status(400).send({Mssg: "Invalid password"})
        }
    }

    let buyer_validation_response = await validate_buyer_with_email()
    new Promise((resolve, reject) => {
        if(buyer_validation_response.rows.length > 0){
            resolve(buyer_validation_response.rows[0].id)
        }else{
            reject(buyer_validation_response)
        }
    })
    .then(async(id) => {return(await get_buyer_data_with_id(id))})
    .then((user) => {compare_buyer_password(user.rows[0])})
    .catch(err => {console.log('buyer login error mssg: ',err.message); res.status(400).send({err: 'Email is not registered...'})})
    
}

async function get_buyer(req,res) {
    let {buyer_id} = req.body;
    console.log(buyer_id)

    async function query_db() {
     
        return(
            await query_tool(
                'SELECT',
                '*',
                'campus_buyers',
                {
                    bool: 1,
                    search_word: ['buyer_id'],
                    identifier: [buyer_id],
                    //for delete and select and update
            
                }, 
                [],
                [],
                []
            )
        )
           
    }

    let result = await query_db()

    // console.log(result)
    res.send(result.rows[0]);

}

async function get_shop_items(req,res) {

    let {category} = req.query;
    console.log(category)

    if(category === 'trends'){
        NeonDB.then((pool) => 
            pool.query(`select * from seller_shop where state->>'state' = 'publish'`)
            .then(result =>  res.send(result.rows))
            .catch(err => console.log(err))
        )
    }else{
        NeonDB.then((pool) => 
            pool.query(`select * from seller_shop where category = '${category}' AND state->>'state' = 'publish'`)
            .then(result =>  res.send(result.rows))
            .catch(err => console.log(err))
        )
    }

    
    

}

async function get_lodges(req,res) {
    NeonDB.then((pool) => 
        pool.query(`select * from seller_shop WHERE category = 'Lodge/Apartments'`)
        .then(result =>  res.send(result.rows))
        .catch(err => console.log(err))
    )
}

async function get_item(req,res) {

    let {id} = req.query;
    let book = []
    
    id.map(data => {
        NeonDB.then((pool) => 
            pool.query(`select * from seller_shop where product_id = '${data}'`)
            .then(result =>  {
                book.push(result.rows[0])
                if(book.length === id.length){
                    res.send(book)
                }                    
            })
            .catch(err => console.log(err))
        )
    })
    

    // getItems(id)

}

async function get_item_thumbnail(req,res) {

    let {id} = req.query;
    NeonDB.then((pool) => 
        pool.query(`select file from product_photo where product_id = '${id}'`)
        .then(result =>  res.send(result.rows))
        .catch(err => console.log(err))
    )

}

async function get_thumbnail(req,res) {

    let {product_id} = req.query;
    NeonDB.then((pool) => 
        pool.query(`select file from product_photo where product_id = '${product_id}'`)
        .then(result =>  res.send(result.rows[0]))
        .catch(err => console.log(err))
    )

}

async function add_item_to_cart(req,res) {

    let {product_id,buyer_id} = req.body;
    let cart_id = shortId.generate();
    let date = new Date();
    async function create_cart(cart_id, product_id, date, buyer_id) {
        // console.log(cart_id, product_id, date, buyer_id)-
        let handle_cart_insert = await NeonDB.then((pool) => 
            pool.query(`insert into campus_express_buyer_cart(id,cart_id,product_id,date,buyer_id,unit) values(DEFAULT, '${cart_id}', '${product_id}', '${date}', '${buyer_id}', ${1})`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    
        if(handle_cart_insert){
            let response = await retrive_cart(buyer_id)
            return {bool: true, doc: response}
        }else{
            return {bool: false, doc: null}

        }
    }

    let response = await create_cart(cart_id, product_id, date, buyer_id)
    
    // console.log(cart_id, product_id, date, buyer_id)

    if(response.bool){
        res.status(200).send((await response).doc)
    }else{
        console.log(response)
        res.status(501).send((await response).doc)
    }

}

async function delete_item_from_cart(req,res) {
    let {product_id,buyer_id} = req.query;
    
    let response = delete_cart(product_id,buyer_id);
    if(response.bool){
        res.status(200).send((await response).doc)
    }else{
        res.status(501).send((await response).doc)
    }
}

async function get_carts(req,res) {
    let {buyer_id} = req.query;
    let book = []

    function get_items(item) { 
        return(
            NeonDB.then((pool) => 
                pool.query(`SELECt * FROM seller_shop WHERE product_id = '${item.product_id}'`)
                .then(result => book.push({item: result.rows[0], cart:item}))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    async function getCartedItems(cb) {
        let carts = await retrive_cart(buyer_id)
        console.log(carts)
        cb(carts)
    }

    getCartedItems((carts) => {
        carts.map(async(item ) => {
            await get_items(item)
            console.log(book)
            if(book.length === carts.length){
                res.send(book)
            }
        })
    })


}

function update_cart(req,res) {
    let {type,buyer_id,product_id} = req.body;
    function Add() {
        return(
            NeonDB.then((pool) => 
                pool.query(`UPDATE campus_express_buyer_cart set unit = unit + 1 WHERE buyer_id = '${buyer_id}' AND product_id = '${product_id}'`)
                .then(result => result.rowCount)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    function Minus() {
        return(
            NeonDB.then((pool) => 
                pool.query(`UPDATE campus_express_buyer_cart set unit = unit - 1 WHERE buyer_id = '${buyer_id}' AND product_id = '${product_id}'`)
                .then(result => result.rowCount)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    if(type === 'add'){
        let result =  Add()
        res.send(result)
    }else{
        let result = Minus()
        res.send(result)
    }
}

async function save_item(req,res) {

    let {product_id,buyer_id} = req.body;
    let savedItems_id = shortId.generate();
    let date = new Date();

    function insert_() { 
        return(
            NeonDB.then((pool) => 
                pool.query(`insert into campus_express_buyer_saveditems(id,savedItems_id ,product_id ,date ,buyer_id) values(DEFAULT, '${savedItems_id}', '${product_id}', '${date}', '${buyer_id}')`)
                .then(result => result.rowCount > 0 ? (true) : (false))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    function get_saved_items() { 
        return(
            NeonDB.then((pool) => 
                pool.query(`SELECt * FROM campus_express_buyer_saveditems WHERE buyer_id = '${buyer_id}'`)
                .then(result => (result.rows))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    let insert_data = await insert_()

    if(insert_data){
        let get_data = await get_saved_items()
        res.send(get_data)
    }

}

async function unsave_item(req,res) {
    let {product_id,buyer_id} = req.query;
    let delete_ = () => 
        NeonDB.then((pool) => 
            pool.query(`DELETE FROM campus_express_buyer_saveditems WHERE buyer_id = '${buyer_id}' AND product_id = '${product_id}'`)
            .then(result => result.rowCount > 0 ? (true) : (false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))

    let get_items = () => 
        NeonDB.then((pool) => 
            pool.query(`SELECT * FROM campus_express_buyer_saveditems WHERE buyer_id = '${buyer_id}'`)
            .then(result => result.rows)
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))

    let delete_data = await delete_()

    if(delete_data){
        let get_data = await get_items()
        res.send(get_data)
    }
}

async function get_saved_item(req,res) {
    let {buyer_id} = req.query;
    
    function get_saved_item() { 
        return(
            NeonDB.then((pool) => 
                pool.query(`SELECt * FROM campus_express_buyer_saveditems WHERE buyer_id = '${buyer_id}'`)
                .then(result => res.send(result.rows))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    let get_data = await get_carts()
    res.send(get_data)

}

async function get_saved_item_data(req,res) {

    let book = [];
    let {buyer_id} = req.query;

    function get_savedItems() { 
        return(
            NeonDB.then((pool) => 
                pool.query(`SELECt * FROM campus_express_buyer_saveditems WHERE buyer_id = '${buyer_id}'`)
                .then(result => result.rows)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    function get_items(product_id) { 
        return(
            NeonDB.then((pool) => 
                pool.query(`SELECt * FROM seller_shop WHERE product_id = '${product_id}'`)
                .then(result => book.push(result.rows))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        )
    }

    async function getSavedItems(cb) {
        let savedData = await get_savedItems()
        console.log(savedData)

        cb(savedData)
    }

    getSavedItems((savedData) => {
        savedData.length > 0 
        ?
        savedData.map(async(item ) => {
            await get_items(item.product_id)
            if(book.length === savedData.length){
                res.send(book)
                console.log(book)
            }
        })
        :
        res.send([])
    })

}

function get_search_word(req,res) {
    let {word} = req.query;
    NeonDB.then((pool) => 
        pool.query(`select * from "seller_shop"`)
        .then((result) => {
            let list = result.rows;
            console.log(word)
            res.json(list.filter(item => item.title.toLowerCase().indexOf(word.toLowerCase()) > -1))
        })
        .catch((err) => {
            console.log(err)
        })
    )
    .catch(err => console.log(err))
}

async function reset_pwd(req,res){

    let {email,buyer_id} = req.body;
    let date = new Date()

    async function query_db() {
     
        return(
            await query_tool(
                'SELECT',
                '*',
                'campus_buyers',
                {
                    bool: 1,
                    search_word: ['buyer_id'],
                    identifier: [buyer_id],
                    //for delete and select and update
            
                }, 
                [],
                [],
                []
            )
        )
           
    }

    let result = await query_db()

    async function send_email_to_buyer(params) {
        let token = shortId.generate();
    
        let get_token = await create_token_for_pwd(email,buyer_id,token,date)

        if(get_token){
            let get_email_mssg = pwd_reset(token,email,result.rows[0].fname + " " + result.rows[0].lname)
            let get_email_response = await send_email(email, get_email_mssg, 'Password Reset')

            return get_email_response
        }
        //remember to delete token after every thing
        //
    }

    let response1 = await send_email_to_buyer();

    if(response1 > 0){
        res.send(true)
    }

    
}

async function update_pwd(req,res) {
    
    let {buyer_id, pwd} = req.body;
    
    let hPwd = await bcrypt.hash(pwd, 10)

    NeonDB.then((pool) => 
        pool.query(`UPDATE campus_buyers set password='${hPwd}' WHERE buyer_id = '${buyer_id}'`)
        .then(result => {
            result.rowCount > 0 ? res.send(true) : res.send(false)
        })
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))

}

async function get_orders(req,res) {
    let {buyer_id} = req.query;

    let book = []

    function get_order_id(){
        return(NeonDB.then((pool) => 
            pool.query(`select * from "campus_express_buyer_orders" where buyer_id = '${buyer_id}'`)
            .then((result) => {
                return(result.rows)
            })
            .catch((err) => {
                console.log(err)
            })
        )
        .catch(err => console.log(err)))
    }

    let list = await get_order_id();
    // console.log(list)


    function get_item(item) {
        return(
            NeonDB.then((pool) => 
                pool.query(`select * from "seller_shop" where product_id = '${item.product_id}'`)
                .then((result) => {
                    return({order: item, product: result.rows[0]})
                })
                .catch((err) => {
                    console.log(err)
                })
            )
            .catch(err => console.log(err))
        )
    }

    let data = await list.map((item) => get_item(item));

    let response = await Promise.all(data).then(result => result).catch(err => console.log(err))
    res.send(response)



}


module.exports = {

    register_buyer,
    log_buyer_in,
    get_buyer,


    get_lodges,
    get_shop_items,

    get_item,
    get_item_thumbnail,

    get_thumbnail,

    add_item_to_cart,
    delete_item_from_cart,
    update_cart,

    get_carts,

    get_orders,

    save_item,
    get_saved_item,
    unsave_item,
    get_saved_item_data,

    reset_pwd,
    update_pwd,

    get_search_word,

}



