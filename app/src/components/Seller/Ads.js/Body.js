import { useEffect, useState } from "react";
import Card from "./Card";

const Body = ({cards}) => {
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

