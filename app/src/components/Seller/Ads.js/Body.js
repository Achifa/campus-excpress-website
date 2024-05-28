import { useEffect, useState } from "react";
import Card from "./Card";
import { GetItems, GetShop } from "../../../api/seller/get";

const Body = () => {
    let [cards, set_cards] = useState([])
   
    useEffect(() => {

        let overlay = document.querySelector('.overlay')
        overlay.setAttribute('id', 'overlay');
        
        async function getData() {
            let response = await GetItems(window.localStorage.getItem("CE_seller_id"))

            set_cards(response)
            overlay.removeAttribute('id') 
           
        }

        getData()
    }, [])


    return ( 
        <>
            {
                cards !== undefined
                ?
                cards.map((item, index) => 
                
                <Card item={item} index={index} />)
                :
                ''
            
            } 
        </>
     );
}
 
export default Body;

