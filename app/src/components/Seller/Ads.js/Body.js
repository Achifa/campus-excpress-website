import { useEffect, useState } from "react";
import Card from "./Card";
import { SHOP } from "../../../api/seller";

const Body = () => {
    let [cards, set_cards] = useState([])
    let [loaderText, setLoaderText] = useState('Loading...')
   
    useEffect(() => {

        let overlay = document.querySelector('.overlay')
        overlay.setAttribute('id', 'overlay');
        
        SHOP(window.localStorage.getItem("CE_seller_id"))
        .then((result) => { 
            set_cards(result)
            overlay.removeAttribute('id')
            result.length < 1 
            ?
            setLoaderText('No item for sale, click here to start selling')
            :
            setLoaderText('')
        })
        .catch((err) => {
            console.log(err)
        })

        
    }, [])


    return ( 
        <>
            {
                cards.map((item, index) => 
                
                    <Card item={item} index={index} />
                )
            }
        </>
     );
}
 
export default Body;