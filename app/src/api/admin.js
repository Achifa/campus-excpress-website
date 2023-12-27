import axios from 'axios'

let u1 = `http://localhost:1111`
let u4 = `http://192.168.75.146:1111`
let u2 = `https://ce-server.onrender.com`
let plug = u1; 

 
export function uploadItem(title,description,category,price,photos,seller_id,others) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/admin/product-upload`, {
            title,description,category,price,photos,seller_id,others
        })
        .then((result) => {
            resolve(result)
        }) 
        .catch((err) => {
            reject(err) 
        })
    })
}

export function updateItem(title,description,category,price,photos,seller_id,product_id,others) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/admin/product-update`, {
            title,description,category,price,photos,seller_id,product_id,others

        })
        .then((result) => { 
            resolve(result)
        })
        .catch((err) => {
            reject(err) 
        })
    })
}

export function DeleteItem(seller_id,product_id) {
    return new Promise((resolve, reject) => {
        axios.delete(`${plug}/admin/product-delete`, {
            params: {seller_id,product_id}
        })
        .then((result) => {
            resolve(result)
        })
        .catch((err) => {
            reject(err) 
        })
    })
} 

export function updateSellerProfile(fname,lname,state,campus,seller_id) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/admin/profile-update`, {
            fname,lname,state,campus,seller_id
        })
        .then((result) => {
            resolve(result)
        })
        .catch((err) => {
            reject(err) 
        })
    })
}

export function RegisterAdmin(fname,lname,email,phone,pwd) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/admin/registration`, {
            fname,lname,email,phone,pwd
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function LogAdminIn(email,pwd) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/admin/login`, {
            email,pwd
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function GetAdmin(admin_id) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/admin`, {
            admin_id
        })
        .then((result) => {
            resolve(result.data)
        })
        .catch((err) => {
            reject(err)
        })
    })
}

export function OVERVIEW(id) {
    return new Promise((resolve, reject) => 
        axios.post(`${plug}/admin/overview`, {})
        .then((result) => resolve(result.data))
        .catch(err => reject(err))
    )
}

export function SHOP(id) {
    return new Promise((resolve, reject) => 
        axios.post(`${plug}/admin/shop`, {id})
        .then((result) => resolve(result.data))
        .catch(err => reject(err))
    )
}

export function GetUsers(id) {
    return new Promise((resolve, reject) => 
        axios.post(`${plug}/admin/users`, {id})
        .then((result) => resolve(result.data))
        .catch(err => reject(err))
    )
}

export function AuthorizeWalletAccess(pin) {
    return new Promise((resolve, reject) => 
        axios.post(`${plug}/admin/wallet-access`, {pin})
        .then((result) => resolve(result.data))
        .catch(err => reject(err))
    )
}

export function WalletData(seller_id) {
    return new Promise((resolve, reject) => 
        axios.post(`${plug}/admin/wallet-data`, {seller_id})
        .then((result) => resolve(result.data))
        .catch(err => reject(err))
    )
}

export function createBill(seller_id) {
    return new Promise((resolve, reject) => 
        axios.post(`${plug}/admin/wallet-bill`, {seller_id})
        .then((result) => resolve(result.data))
        .catch(err => reject(err))
    )
}

export function GET_PRODUCT_THUMBNAIL(product_id) {
    
    return new Promise((resolve, reject) => {

        axios.get(`${plug}/thumbnail`, {
            params: {
                product_id
            } 
        })
        .then((result) => {
            resolve(result.data);
        })
        .catch((err) => {
            reject(err);
        })

    })
}

export function GetEditedItem(product_id) {
    
    return new Promise((resolve, reject) => {

        axios.get(`${plug}/admin-edited-item`, {
            params: {
                product_id
            } 
        })
        .then((result) => {
            resolve(result.data);
        })
        .catch((err) => {
            reject(err);
        })

    })
}

export function SendToken(email,phn) {
    
    return new Promise((resolve, reject) => {

        axios.post(`${plug}/admin/verification`, {email,phn})
        .then((result) => {
            resolve(result.data);
        })
        .catch((err) => {
            reject(err);
        })

    })
}

export function AuthenticateAdmin(admin_id) {
    
    return new Promise((resolve, reject) => {

        axios.post(`${plug}/admin/authentication`, {admin_id})
        .then((result) => {
            resolve(result.data);
        })
        .catch((err) => {
            reject(err);
        })

    })
}

export function ResetPwd(email,seller_id) {
    
    return new Promise((resolve, reject) => {

        axios.post(`${plug}/admin/password-reset`, {email,seller_id})
        .then((result) => {
            resolve(result.data);
        })
        .catch((err) => {
            reject(err);
        })

    })
}

export function updatePwd(seller_id, pwd) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/admin/password-update`, {seller_id, pwd})
        .then((result) => {
            resolve(result)
        })
        .catch((err) => {
            reject(err) 
        })
    })
}

export function CheckPwdResetToken(seller_id,token) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/admin/password-token-check`, {seller_id, token})
        .then((result) => {
            resolve(result)
        })
        .catch((err) => {
            reject(err) 
        })
    })
}

export function GetSellerInbox(seller_id) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/admin/inbox`, {seller_id})
        .then((result) => {
            resolve(result)
        })
        .catch((err) => {
            reject(err) 
        })
    })
}

export function GetSellerOrder(seller_id) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/admin/orders`, {seller_id})
        .then((result) => {
            resolve(result)
        })
        .catch((err) => {
            reject(err) 
        })
    })
}

export function ValidateEmail(token) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/admin/email-validation`, {token})
        .then((result) => {
            resolve(result)
        })
        .catch((err) => {
            reject(err) 
        })
    })
}

export function SendEmail(email,seller_id) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/admin/send-email`, {email,seller_id})
        .then((result) => {
            resolve(result)
        })
        .catch((err) => {
            reject(err) 
        })
    })
}

export function bankVerification(acctNum,bank) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/bank-verification`, {acctNum,bank})
        .then((result) => {
            resolve(result)
        })
        .catch((err) => {
            reject(err) 
        })
    })
}

export function Transfer(withdrwawalAmount,acctNum,bank,acctName) {
    return new Promise((resolve, reject) => {
        axios.post(`${plug}/transfer`, {withdrwawalAmount,acctNum,bank,acctName})
        .then((result) => {
            resolve(result)
        })
        .catch((err) => {
            reject(err) 
        })
    })
}