import { useEffect, useState } from "react";
import Card from "./Card";
import { SHOP } from "../../../api/admin";

const Body = () => {
    let [cards, set_cards] = useState([])
    useEffect(() => {
        SHOP()
        .then((result) => {
            set_cards(result)
        })
        .catch((err) => {
            console.log(err)
        })
    })

    return ( 
        <>
            <div className='admin-main'>
                {
                    cards.map((item, index) => 
                    
                        <Card item={item} index={index} />
                    )
                }
            </div>
        </>
     );
}
 
export default Body;