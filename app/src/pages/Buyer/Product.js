import { useLocation } from "react-router-dom";
import Product from "../../components/Buyer/Product/Product";
import BuyerLayout from "../../layout/Buyer";

const ProductPage = () => {

    let location = useLocation()
    return ( 
        <>

            <BuyerLayout>
                <Product product_id={[location.pathname.split('/')[2]]} />
            </BuyerLayout>
        </>
     );
}
 
export default ProductPage;