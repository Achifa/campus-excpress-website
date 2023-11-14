import { useEffect, useState } from "react";
import { GetItemImages } from "../../api/buyer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setItemImagesTo } from "../../redux/buyer/ItemImages";
import imgSvg from '../../assets/image-svgrepo-com (4).svg'; 
import { setActiveImgTo } from "../../redux/buyer/ActiveImg";

const ItemImgs = () => {
    let location = useLocation()
    let dispatch = useDispatch()
    let [img, set_img] = useState(imgSvg);

    let {ItemImages} = useSelector(s => s.itemImages)
    let [imageList, setImageList] = useState([])
    let {ActiveImg} = useSelector(s => s.ActiveImg)


    useEffect(() => {
        GetItemImages(location.pathname.split('/')[2])
        .then((result) => {
            dispatch(setItemImagesTo(result));
            setImageList(result)
        })
        .catch(err => console.log(err))
    }, [])

    let handleActiveImg = i => {
        dispatch(setActiveImgTo(i))
    }

    return ( 
        <>
            <div className="img-list-cnt">
                {
                    imageList.map((item, index) => {
                        return(
                            <div key={index} style={{border: ActiveImg === index ? '2px solid orangered': 'none'}} onClick={e => handleActiveImg(index)}>
                                <img src={item.file} style={{height: '100%', width: '100%', borderRadius: '5px'}} alt="" />
                            </div>
                        )
                    })
                }
                
            </div>
        </>
     );
}
 
export default ItemImgs;