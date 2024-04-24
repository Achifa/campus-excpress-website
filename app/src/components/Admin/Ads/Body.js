import { useEffect, useState } from "react";
import Card from "./Card";
import { 
    GetItems 
} from "../../../api/admin/get";

const Body = () => {
    let [cards, set_cards] = useState([])

    useEffect(() => {
        async function getData() {
            let result = await GetItems()
            set_cards(result)
          }
          getData() 
    },[])

    return ( 
        <>
            <div className='admin-main'>
                {
                    cards
                    ?
                    cards.map((item, index) => 
                    
                        <Card item={item} index={index} />
                    )
                    :
                    ''
                }
            </div>
        </>
     );
}
 
export default Body;