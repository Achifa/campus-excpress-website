const { NeonDB } = require("../db");
const { shortId, bcrypt, jwt } = require("../modules");
const maxAge = 90 * 24 * 60 * 60; 
const createToken = (id) => {
    return jwt.sign({ id }, 'seller_secret', {
        expiresIn: maxAge
    });
};

async function RegisterBuyer(req,res) {

    let {fname,lname,email,phone,pwd,state,campus} = req.body;
    console.log(fname,lname,email,phone,pwd,state,campus)
    let date = new Date().toLocaleString();
    let isActive,isVerified,isEmailVerified,isPhoneVerified = false;
    let hPwd = await bcrypt.hash(pwd, 10)
    let seller_id = `CE-${shortId.generate()}`

    new Promise((resolve, reject) => {
        let insertData = NeonDB.then((pool) => 
            pool.query(`insert into campus_buyers(id,fname, lname,buyer_id,email,phone,password,state,campus,isActive,isVerified,isEmailVerified,isPhoneVerified,date ) values(DEFAULT, '${fname}', '${lname}', '${seller_id}', '${email}', '${phone}', '${hPwd}', '${state}', '${campus}', '${false}','${false}','${false}','${false}', '${date}')`)
            .then(result => result.rowCount > 0 ? res.send(true) : res.send(false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    })
    
    .catch(err =>  {console.log(err), res.send(false)})
    

}

async function LogBuyerIn(req, res) {

    
    let {email,pwd} = req.body;
 
    new Promise((resolve, reject) => {
        NeonDB
        .then(async(pool) => {
                
            pool.query(`select "id" from "campus_buyers" where "email" = '${email}'`, (err, result) => {
                
                if(!err){
                    if(result.rows.length > 0){
                        const id = result.rows[0].id;
                        resolve(id)
                    }else{
                        
                        reject({Mssg: "Email is not registered..."});
                    }
                }else{
                    console.log(err)
                }
                
            })
            
        });
    })
    .then(async(id) => {
        return(
            NeonDB
            .then(async(pool) => {
                let database_return_value = await pool.query(
                    `select "buyer_id","email","password","fname","lname" from  "campus_buyers" where "id" = '${id}'`
                )
                .then(result => result.rows[0])
                .catch(err => console.log(err))

                return database_return_value
            })
        )
        
    })
    .then(async(user) => {
        if(user){
            console.log(email,pwd)
            const auth = await bcrypt.compare(pwd, user.password);
            if (auth) {
                const token = createToken(user.seller_id);
                res.status(200).send({bool: true, id: user.buyer_id, name: `${user.fname[0]}.${user.lname[0]}`});
    
            }else{
                res.status(400).send({
                    Mssg: "Invalid password"
                })
            }
        }else{
            res.status(400).send({
                Mssg: "Email is not registered"
            })
        }
    })
    .catch(err => {
        console.log(err)
    })
    
}

async function GetItems(req,res) {

    NeonDB.then((pool) => 
        pool.query(`select * from seller_shop`)
        .then(result =>  res.send(result.rows))
        .catch(err => console.log(err))
    )
    

}

async function GetItem(req,res) {

    let {id} = req.query;

    NeonDB.then((pool) => 
        pool.query(`select * from seller_shop where product_id = '${id}'`)
        .then(result =>  res.send(result.rows[0]))
        .catch(err => console.log(err))
    )
    

}


async function GetItemImages(req,res) {

    let {id} = req.query;

    NeonDB.then((pool) => 
        pool.query(`select file from product_photo where product_id = '${id}'`)
        .then(result =>  res.send(result.rows))
        .catch(err => console.log(err))
    )
    

}

async function GetThumbnail(req,res) {

    let {product_id} = req.query;

    NeonDB.then((pool) => 
        pool.query(`select file from product_photo where product_id = '${product_id}'`)
        .then(result =>  res.send(result.rows[0]))
        .catch(err => console.log(err))
    )
    

}


module.exports = {RegisterBuyer,LogBuyerIn,GetItems, GetItem, GetItemImages, GetThumbnail}