import { useLocation } from "react-router-dom";
import Product from "../../components/Buyer/Product/Product";
import BuyerLayout from "../../layout/Buyer";

const ProductPage = () => {

    let location = useLocation()
    return ( 
        <>

            <BuyerLayout>
                <Product product_id={[location.pathname.split('/').splice(-1)[0]]} />
            </BuyerLayout>
        </>
     );
}
 
export default ProductPage;
