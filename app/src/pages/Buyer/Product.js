import { useLocation } from "react-router-dom";
import Product from "../../components/Buyer/Product/Product";

const ProductPage = () => {

    let location = useLocation()
    return ( 
        <>
            <Product product_id={[location.pathname.split('/')[2]]} />
        </>
     );
}
 
export default ProductPage;