import { useEffect, useState } from 'react';
import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 
import { useNavigate } from 'react-router-dom';
import { GetProductThumbnail } from '../../api/buyer/get';
 

const Thumbnail = ({product_id,seller_id}) => {
    let [img, set_img] = useState(imgSvg);
    let navigate = useNavigate()

    let [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    }, [])
  
    useEffect(() => {
        try {
            let result = GetProductThumbnail(product_id)
            set_img(result.file)
        } catch (error) {
            console.log(error)
        }
    })

    // onClick={e => navigate(`/product/${product_id}?seller_id=${seller_id}`)}

    return ( 
        <>
            <img  src={img}  alt="" />
        </>
     );
}
 
export default Thumbnail;