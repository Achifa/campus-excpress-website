import { useNavigate } from "react-router-dom";
import { updateItem, uploadItem } from "../api/seller"
import { openNotice } from "./notice";
import usePost from "../hooks/usePost";

export function uploadForm(constantData, dynamicData) {
    // console.log(constantData, dynamicData)
    uploadItem(constantData, dynamicData)
    .then(({data}) => {
        if(data){
            window.localStorage.setItem('draft_gender', '')
            window.localStorage.setItem('draft_size', '')
            window.localStorage.setItem('draft_sub_category', '')
            window.localStorage.setItem('draft_locale', '')
            window.localStorage.setItem('draft_condition', '')
            window.localStorage.setItem('draft_title', '')
            window.localStorage.setItem('draft_description', '')
            window.localStorage.setItem('draft_category', '')
            window.localStorage.setItem('draft_c_type', '')
            window.localStorage.setItem('draft_price', '')
        
            window.location.href = '/seller.shop';
            document.querySelector('.overlay').removeAttribute('id')
            // openNotice()
        }else{ 
            // alert('Error Uploading Data...'); 
            let overlay = document.querySelector('.overlay'); 
            overlay.removeAttribute('id')
            openNotice()

            // navigate('/seller/shop')
        }
    })
    .catch((err) => {
        let overlay = document.querySelector('.overlay'); 
        overlay.removeAttribute('id')
        openNotice()
    })
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