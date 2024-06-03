import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import CardCnt from "./CardCnt"

const SimilarItems = ({category,product_id}) => {

    let [role, setRole] = useState(0)
    let location = useLocation()

    useEffect(() => {
        if(location.search !== ''){
            setRole(1)
        }else{
            setRole(0)
        }
    }, [location])

    return ( 
        <>
            {
                <div className="buyer-product-related-items">
                    <h6 style={{padding:'10px'}}>Similar Items You May Like</h6>

                    <CardCnt category={category} product_id={product_id} />   
                
                </div>
            }
        </>
     );
}
 
export default SimilarItems;