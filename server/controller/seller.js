const { NeonDB } = require("../db");
const { shortId, bcrypt, jwt } = require("../modules");
const maxAge = 90 * 24 * 60 * 60; 
const createToken = (id) => {
    return jwt.sign({ id }, 'seller_secret', {
        expiresIn: maxAge
    });
};

function uploadProduct(req,res) {

    let {
        productTitle,productDescription,productCategory,productType,productCondition,productPrice,productLocale,productStock,productPackage,productPhotos,seller_id
    } = req.body;

    let date = new Date();
    let productId = shortId.generate()
    let description = productDescription.replace(/'/g, '"');;
    let title = productTitle.replace(/'/g, '"');;
    let imageId = shortId.generate();
    let book = []

    new Promise((resolve, reject) => {
        let uploadData = NeonDB.then((pool) => 
            pool.query(`insert into seller_shop (id,product_id,date,seller_id,title,category,type,condition,stock,locale,price,description,package) values(DEFAULT, '${productId}', '${date}', '${seller_id}', '${title}', '${productCategory}', '${productType}', '${productCondition}', '${productStock}', '${productLocale}', '${productPrice}', '${description}', '${productPackage}' )`)
            .then(result => result.rowCount > 0 ? resolve(true) : reject(false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))

    })
    .then((response) => 

        productPhotos.map(item => 
            NeonDB.then((pool) => 
                pool.query(`insert into product_photo(id,product_id,seller_id,file,image_id) values(DEFAULT, '${productId}', '${seller_id}', '${item}', '${imageId}')`)
                .then(result => result.rowCount > 0 ? book.push(true) : book.push(false))
                .catch(err => console.log(err))
            )    
        )

    )
    .then(async(response) => {
        let bool = book.filter(item => item !== true)


        if(bool.length < 1){
            console.log('overview number', response)
            NeonDB.then((pool) => 
                pool.query(`UPDATE seller_overview set total_sale = total_sale + 1 WHERE seller_id = '${seller_id}'`)
                .then(result => result.rowCount > 0 ? res.send(true) : res.send(false))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        }else{
            res.send(false)
        }

    })
    .catch(err => console.log(err))


}

async function RegisterSeller(req,res) {

    let {fname,lname,email,phone,pwd,state,campus} = req.body;
    console.log(fname,lname,email,phone,pwd,state,campus)
    let date = new Date().toLocaleString();
    let isActive,isVerified,isEmailVerified,isPhoneVerified = false;
    let hPwd = await bcrypt.hash(pwd, 10)
    let seller_id = `CE-${shortId.generate()}`
    let wallet_id = `CEW-${seller_id}`

    new Promise((resolve, reject) => {
        NeonDB.then((pool) => 
            pool.query(`insert into campus_sellers(id,fname, lname,seller_id,email,phone,password,state,campus,isActive,isVerified,isEmailVerified,isPhoneVerified,date ) values(DEFAULT, '${fname}', '${lname}', '${seller_id}', '${email}', '${phone}', '${hPwd}', '${state}', '${campus}', '${false}','${false}','${false}','${false}', '${date}')`)
            .then(result => result.rowCount > 0 ? resolve(true) : reject(false))
            .catch(err => console.log(err))
        )
        .catch(err => console.log(err))
    })
    .then((response) => 
        response
        ?
            NeonDB.then((pool) => 
                pool.query(`insert into seller_overview(id,seller_id,total_reported,total_sale,total_sold,total_unsold) values(DEFAULT,'${seller_id}',${0},${0},${0},${0})`)
                .then(result => result.rowCount > 0 ? true : false)
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        :
            res.send(false)
    )
    .then((response) => {
        if(response){
            NeonDB.then((pool) => 
                pool.query(`insert into campus_seller_wallets(id,wallet_id,seller_id,wallet_balance,wallet_pin,wallet_number,date) values(DEFAULT,'${wallet_id}','${seller_id}','${0.00}','${pwd}','${phone}','${date}'`)
                .then(result => result.rowCount > 0 ? res.send(true) : res.send(false))
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        }else{
            res.send(false)
        }
    })
    .catch(err =>  {console.log(err), res.send(false)})
    

}

async function LogSellerIn(req, res) {

    
    let {email,pwd} = req.body;
 
    new Promise((resolve, reject) => {
        NeonDB
        .then(async(pool) => {
                
            pool.query(`select "id" from "campus_sellers" where "email" = '${email}'`, (err, result) => {
                
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
                    `select "seller_id","email","password","fname","lname" from  "campus_sellers" where "id" = '${id}'`
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
                res.status(200).send({bool: true, id: user.seller_id, name: `${user.fname[0]}.${user.lname[0]}`});
    
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

async function Overview(req,res)  {
    let {id} = req.body;
    NeonDB.then((pool) => 
        pool.query(`select * from seller_overview where seller_id = '${id.trim()}'`)
        .then(result => res.send(result.rows[0]))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}

async function Shop(req,res)  {
    let {id} = req.body;
    NeonDB.then((pool) => 
        pool.query(`select * from seller_shop where seller_id = '${id}'`)
        .then(result => res.send(result.rows))
        .catch(err => console.log(err))
    )
    .catch(err => console.log(err))
}

module.exports = {uploadProduct,Shop,RegisterSeller,LogSellerIn,Overview}
