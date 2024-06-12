import { useLocation, useNavigate } from "react-router-dom";
import Product from "../../components/Buyer/Product/Product";
import BuyerLayout from "../../layout/Buyer";
import { useEffect, useState } from "react";
import SimilarItems from "../../components/Buyer/Product/SimilarItems";
import Description from "../../components/Buyer/Product/Description";
import { GetItem } from "../../api/buyer/get";
import { GetSeller } from "../../api/seller/get";
import { AddView, UploadChat } from "../../api/buyer/post";
import { v4 as uuid } from "uuid";
import Contact from "../../components/Buyer/Product/Contact";
// import Share from "../../components/Buyer/Product/Share";
import { useSelector } from "react-redux";
import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 
import { openNotice } from "../../Functions/notice";

const ProductPage = () => {

    let location = useLocation()
    let [item, setItem] = useState()
    let [phone, set_phone] = useState(1)
    let navigate = useNavigate();

    let {ItemImages} = useSelector(s => s.itemImages)
    let {ActiveImg} = useSelector(s => s.ActiveImg)

    let [role, setRole] = useState(0)
    let [screenWidth, setScreenWidth] = useState(0)

    let [activeImg, setActiveImg] = useState(imgSvg)
    const searchParams = new URLSearchParams(window.location.search);

    useEffect(() => { 
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

    useEffect(() => {
        setActiveImg(ItemImages?.length > 0 ? ItemImages[ActiveImg].file : imgSvg)
    }, [ItemImages])

    useEffect(() => {
        setActiveImg(ItemImages?.length > 0 ? ItemImages[ActiveImg].file : imgSvg)
    }, [ActiveImg])

    useEffect(() => {
        setActiveImg('')
    }, [searchParams.get('product_id')])


    function fetchData(overlay) {
        GetItem([location.search.split('=').splice(-1)[0]])
        .then((result) => {
            setItem(result[0])
            overlay.removeAttribute('id')
        })
        .catch(error=>{
            console.log(error)
            openNotice('Error Occured Please Wait While We Reload...')
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        })
    }

    useEffect(() => {
        try {
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
            fetchData(overlay)
        } catch (error) {
            console.log(error)
            
        }

    }, [])

    useEffect(() => {
        try {
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
            fetchData(overlay)
        } catch (error) {
            console.log(error)
            
        }

    }, [location])

    useEffect(() => {
        try {
            async function getData() {
                let result = await GetSeller(item?.seller_id)
                set_phone(result?.phone)
            }
            getData()
        } catch (error) {
            console.log(error)
        }

    },[item])

    async function AddNewViewer(product_id,buyer_id) {
        let result = await AddView(product_id, buyer_id)
        if(result?.length > 0){
            setItem(result[0])
           .removeAttribute('id');

        }
    }

    window.onload= (()=> {
        let buyer_id = window.localStorage.getItem("CE_buyer_id")
        if(buyer_id !== '' && buyer_id !== undefined && buyer_id !== null && buyer_id !== 'null'){
            try {
                setTimeout(() => {
                    AddNewViewer(item?.product_id,buyer_id)
                }, 5000); 
            } catch (error) {
                console.log(error)
            }
        }else{
            let buyer_id = window.localStorage.getItem("unknownBuyer")
            try {
                setTimeout(() => { 
                    AddNewViewer(item?.product_id,buyer_id)
                }, 5000);
            } catch (error) {
                console.log(error)
            }
        }
        
    })

    function SendMssg() {
        let overlay = document.querySelector('.overlay')
        overlay.setAttribute('id', 'overlay');
        if(screenWidth > 760){
            try {
                let result = UploadChat(window.localStorage.getItem('CE_buyer_id'), item.seller_id)
                overlay.removeAttribute('id')
                navigate(`/buyer.message/${item.seller_id}`, {seller_id: item.seller_id})
    
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                let result = UploadChat(window.localStorage.getItem('CE_buyer_id'), item.seller_id)
                overlay.removeAttribute('id')
                navigate(`/buyer.room/${item.seller_id}?room=''`, {seller_id: item.seller_id})
    
            } catch (error) {
                console.log(error)
            }
        }
      
    }
    
    return ( 
        <>
            <div className="notice-cnt" style={{margin: 'auto'}}>
                <span style={{margin: "0 15px 0 .5px"}}></span>
                <button className="notice-cnt-btn" style={{width: '40px', height: '30px', background: 'red', borderRadius: '2px', fontWeight: '500', fontSize: 'small'}}>
                    close
                </button>
            </div>
            <BuyerLayout>
                <div className="buyer-product shadow-sm" style={{background: '#fff'}}>
                    <div className="buyer-product-cnt" style={{display: 'flex', flexDirection: 'column'}}>

                        
                        <Product item={item} phone={phone} />
                        {
                            item?.description?.length > 0 
                            ?
                            <Description item={item} />
                            :
                            ''
                        }

                        <Contact phone={phone} role={role} SendMssg={SendMssg}  />
                        <br />

                        <section style={{fontWeight: '400', padding: '15px', background: '#fff4e0', }}>
                            
                            <small style={{fontSize: 'small', color: '#FF4500', lineHeight: '12px', borderRadius: '6px'}}>Payment Must Be Made Via Campus Express Platform To Avoid Fraud Else You Can <b>Trade With The Seller Outside The Platform At Your Own Risk.</b></small>
                        </section>

                        <br />

                        
                        <SimilarItems category={item?.category} product_id={item?.product_id} />


                        

                    </div>
                </div>
            </BuyerLayout>
        </>
     );
}
 
export default ProductPage;
