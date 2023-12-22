import { useEffect, useState } from "react";
import CardCnt from "./CardCnt";
import FilterAside from "./FilterAside";

const Main = () => {
    let [screenWidth, setScreenWidth] = useState(0)
    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])
    return ( 
        <>
            {
                screenWidth >  760
                ?
                <FilterAside />
                : 
                ''
            }
            <CardCnt />
        </>
     );
}
 
export default Main;