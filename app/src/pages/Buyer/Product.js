import { useLocation } from "react-router-dom";
import Product from "../../components/Buyer/Product/Product";
import BuyerLayout from "../../layout/Buyer";
import { useEffect, useState } from "react";
import SimilarItems from "../../components/Buyer/Product/SimilarItems";
import Description from "../../components/Buyer/Product/Description";
import { GetItem } from "../../api/buyer/get";
import { GetSeller } from "../../api/seller/get";
import { AddView } from "../../api/buyer/post";
import { v4 as uuid } from "uuid";

const ProductPage = () => {

    let location = useLocation()
    let [item, setItem] = useState()
    let [phone, set_phone] = useState(1)


    useEffect(() => {
        let overlay = document.querySelector('.overlay')
        overlay.setAttribute('id', 'overlay');
        try {
            async function getData() {
                let result = await GetItem([location.search.split('=').splice(-1)[0]])
            // console.log(result)

                if(result?.length > 0){
                    setItem(result[0])
                    overlay.removeAttribute('id')
                }
                
            }
            getData()
        } catch (error) {
            console.log(error)
        }

    }, [])

    useEffect(() => {
        // let overlay = document.querySelector('.overlay')

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

    
    useEffect(() => {
        let buyer_id = window.localStorage.getItem("CE_buyer_id")
        if(buyer_id !== '' && buyer_id !== undefined){
            try {
                async function getData() {
                    let result = await AddView(item?.product_id, buyer_id)
                    if(result?.length > 0){
                        setItem(result[0])
                       .removeAttribute('id');
    
                    }
                }
                setTimeout(() => {
                    getData()
                }, 5000); 
            } catch (error) {
                console.log(error)
            }
        }else{
            window.localStorage.setItem("unknownBuyer", `CE-unknown-buyer-${uuid()}`)
            let buyer_id = window.localStorage.getItem("unknownBuyer")
            try {
                async function getData() {
                    let result = await AddView(item.product_id,buyer_id)
                    if(result?.length > 0){
                        setItem(result[0])
                       
                    }
                }
                setTimeout(() => { 
                    getData()
                }, 5000);
            } catch (error) {
                console.log(error)
            }
        }
        
    }, [item])
    return ( 
        <>

            <BuyerLayout>
                <Product item={item} phone={phone} />
                <SimilarItems category={item?.category} product_id={item?.product_id} />


                {
                    item?.description?.length > 0 
                    ?
                    <Description item={item} />
                    :
                    ''
                }
            </BuyerLayout>
        </>
     );
}
 
export default ProductPage;
