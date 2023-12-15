import { useEffect, useState } from "react";

const EditorPhotoStore = ({edit,deletePhoto,productPhotos,photoList}) => {
    let [screenWidth, setScreenWidth] = useState(0)

    useEffect(() => {
        setScreenWidth(window.innerWidth)
    },[])


    let removeImg = i => {

        let list = photoList.filter((item, index) => index !== i)
        deletePhoto(list)
        
    }   

    let handleImage = () => {

        
        let f = document.querySelector("#files");

        [...f.files].map(item => {
            let reader = new FileReader();

            reader.onload = (result) => {
                let img = reader.result;
                productPhotos(img)
            }
            reader.readAsDataURL(item);
        })

        
    } 
    return ( 
        <>
            <div className="seller-shop-samples shadow-sm">
                            
                <label htmlFor="files" style={{height: '100%', margin: '0 5px 0 5px', background: '#fff',cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center', }}>
                    <small>Click here to Upload photo</small>
                </label>
                <input type="file" name="file" multiple style={{display: 'none'}} id="files" onChange={handleImage} />

                <section className='seller-product-image-cnt'>
                    {
                        photoList.map((item, index) => 
                        
                            <div style={{position: 'relative', padding: '0', height: '100%'}}>
                                <div onClick={e => removeImg(index)} className="delete-sample-img" style={{position: 'absolute', cursor: 'pointer', top: '5px', right: '5px', color: '#fff', background: 'red', zIndex: '1000', width: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2.5px', height: '20px'}}>x</div>
                                <img src={item} key={index} style={{height: '100%', width: screenWidth > 480 ? '200px' : '100px', background: '#fff', margin: '0 5px 0 5px', borderRadius: '5px', position: 'relative', flexShrink: '0'}} alt="" />
                            </div>
                        )
                    }
                </section>
            </div>
        </>
     );
}
 
export default EditorPhotoStore;