import { useNavigate } from "react-router-dom";
import { updateItem, uploadItem } from "../../api/seller"

export function uploadForm(constantData, dynamicData) {
    // console.log(constantData, dynamicData)
    uploadItem(constantData, dynamicData)
    .then((result) => {
        if(result){
            document.querySelector('.overlay').removeAttribute('id')
        }else{
            alert('Error Uploading Data...'); 
            let overlay = document.querySelector('.overlay'); 
            overlay.removeAttribute('id')
            // navigate('/seller/shop')
        }
    })
    .catch((err) => console.log(err))
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