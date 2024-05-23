import { useNavigate } from "react-router-dom";
import { openNotice } from "./notice";
import usePost from "../hooks/usePost";
import { UpdateItem, UploadItem } from "../api/seller/post";

export function handleFormUpload(constantData, dynamicData) {
    // console.log(constantData, dynamicData)
    UploadItem(constantData, dynamicData)
    .then((data) => {
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
            // openNotice(data)
            // navigate('/seller/shop')
        }
    })
    .catch((err) => {
        let overlay = document.querySelector('.overlay'); 
        overlay.removeAttribute('id')
        openNotice(err)
    })
}

export function handleFormUpdate(constantData, dynamicData) {
    UpdateItem(constantData, dynamicData)
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