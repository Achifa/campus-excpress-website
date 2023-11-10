import { useEffect, useState } from "react";
import { GetItemImages } from "../../api/buyer";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setItemImagesTo } from "../../redux/buyer/ItemImages";

const ItemImages = () => {
    let location = useLocation()
    let dispatch = useDispatch()

    let {ItemImages} = useSelector(s => s.itemImages)
    let [imageList, setImageList] = useState([])


    useEffect(() => {
        GetItemImages(location.pathname.split('/')[2])
        .then((result) => {
            dispatch(setItemImagesTo(result));
            setImageList(ItemImages)
            console.log(imageList)
        })
        .catch(err => console.log(err))
    }, [])

    return ( 
        <>
            <div className="img-list-cnt">
                {
                    imageList.map((item, index) => {
                        return(
                            <div key={index}>
                                <img src={item.file} style={{height: '100%', width: '100%', borderRadius: '5px'}} alt="" />
                            </div>
                        )
                    })
                }
                
            </div>
        </>
     );
}
 
export default ItemImages;