import { useNavigate } from "react-router-dom";
import { updateItem, uploadItem } from "../../api/seller"

export function uploadForm(dynamicInput,title,description,category,price,photos,videos) {
    if(category === 'Lodge/Apartments'){
        uploadItem(title,description,category,price,photos,videos,window.localStorage.getItem("CE_seller_id"),dynamicInput)
        .then((result) => {
            if(result)(document.querySelector('.overlay').removeAttribute('id'))
            else{
            alert('Error Uploading Data...')}
            
        })
        .catch((err) => console.log(err))
    }else{
        uploadItem(title,description,category,price,photos,videos,window.localStorage.getItem("CE_seller_id"),dynamicInput)
        .then((result) => {
            if(result)(document.querySelector('.overlay').removeAttribute('id'))
            else{
            alert('Error Uploading Data...')}
        })
        .catch((err) => console.log(err))
    }
}

export function updateForm(dynamicInput,title,description,category,price,photos,videos,cType,locale) {
    if(category === 'Lodge/Apartments'){
        updateItem(title,description,category,price,photos,videos,window.localStorage.getItem("CE_seller_id"),dynamicInput)
        .then((result) => {
            result
            ?
            window.location.href='/seller/shop'
            :
            alert('Error Uploading Data...')
            
        })
        .catch((err) => console.log(err))
    }else{
        updateItem(title,description,category,price,photos,videos,window.localStorage.getItem("CE_seller_id"),dynamicInput)
        .then((result) => {
            result
            ?
            window.location.href='/seller/shop'
            :
            alert('Error Uploading Data...')
            
        })
        .catch((err) => console.log(err))
    }
}