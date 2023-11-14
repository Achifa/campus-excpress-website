import { useEffect, useState } from 'react';
import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 
import { GET_PRODUCT_THUMBNAIL } from '../../api/buyer';
 

const Thumbnail = ({product_id}) => {
    let [img, set_img] = useState(imgSvg);
    let [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    }, [])
  
    useEffect(() => {
        GET_PRODUCT_THUMBNAIL(product_id)
        .then((result) => {
            set_img(result.file)
        })
        .catch((err) => {
            console.log(err);
        })
    })

    return ( 
        <>
            <img src={img} style={{height: screenWidth > 480 ? '250px' : '160px', width: '100%', borderRadius: '5px'}} alt="" />
        </>
     );
}
 
export default Thumbnail;