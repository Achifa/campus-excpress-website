import axios from 'axios'

let u1 = `http://localhost:1111`

export function uploadItem(productTitle,productDescription,productCategory,productType,productCondition,productPrice,productLocale,productStock,productPackage,productPhotos) {
    return new Promise((resolve, reject) => {
        axios.post(`${u1}/seller/product-upload`, {
            productTitle,productDescription,productCategory,productType,productCondition,productPrice,productLocale,productStock,productPackage,productPhotos
        })
        .then((result) => {
            resolve(result)
        })
        .catch((err) => {
            reject(err)
        })
    })
}