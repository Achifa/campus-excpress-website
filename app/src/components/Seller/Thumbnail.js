import { useEffect, useState } from 'react';
import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 
import { useNavigate } from 'react-router-dom';
import { GetProductThumbnail } from '../../api/seller/get';
 

const Thumbnail = ({product_id,seller_id}) => {
    let [img, set_img] = useState(imgSvg);
    let navigate = useNavigate()

    let [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    }, [])
  
    useEffect(() => {
        try {
            async function getData() {
                let result = await GetProductThumbnail(product_id)
                result?.file
                ?
                set_img(result?.file)
                :
                set_img(imgSvg)
            }

            getData()
        } catch (error) {
            console.log(error)
        }
    })

    // onClick={e => navigate(`/product/${product_id}?seller_id=${seller_id}`)}

    return ( 
        <>
            <img style={{height: '100%', width: '100%', borderRadius: '10px'}} src={img}  alt="" />
        </>
     );
}
 
export default Thumbnail;