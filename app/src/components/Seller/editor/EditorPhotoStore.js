import { useEffect, useRef, useState } from "react";
// import { getImage } from "../../../Functions/imageToSvg";
import { openNotice } from "../../../Functions/notice";
import xSvg from '../../../assets/cancel-svgrepo-com.svg'
const EditorPhotoStore = ({edit,deletePhoto,productPhotos,photos,category}) => {

    let [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        setScreenWidth(window.innerWidth);

    },[])

    let handleImage = () => {
        let f = document.querySelector("#imgfile");

        [...f.files].map(item => {
            let typeCheck = item.type.split('/')[0];
            let type = typeCheck === 'image' ? 'img' : typeCheck === 'video' ? 'mp4' : ''
            
            if(type === 'mp4') {
                openNotice("Only Photo Can Be Uploaded Here")
                
            }else{
                let reader = new FileReader({type: 'image/*'});

                reader.onload = (result) => {
                    let img = reader.result;
                    productPhotos(img);

                }   
                reader.readAsDataURL(item);
            }

            
        })
         
        // getImage([[...f.files][0],[...f.files][0].type,[...f.files][0].size,[...f.files][0].name])
    } 

    return ( 
        <>
            {/* <div className="notice-cnt">
                <span style={{margin: "0 15px 0 .5px"}}>Only images can be uploaded</span>
                <button className="notice-cnt-btn" style={{width: '40px', height: '30px', background: 'red', borderRadius: '2px', fontWeight: '500', fontSize: 'small'}}>
                    close
                </button>
            </div> */}

            <div style={{width: '100%', marginBottom: '0px'}}>
                
                <input type="file" name="imgfile"  multiple style={{display: 'none'}} id="imgfile" onChange={handleImage} />

                <div className="seller-shop-samples shadow-sm" style={{width: '100%'}}>
                                
                    <label htmlFor="imgfile" style={{height: '100%', margin: '0 5px 0 5px', background: '#fff',cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center'}}>
                        <small>Click here to Upload photo</small>
                    </label>
                    

                    <section className='seller-product-image-cnt' style={{flexShrink: '0', height: '100%'}}>
                    
                        {
                            photos.length > 0 ? photos.map((item, index) => 
                            
                                <div key={index} style={{position: 'relative', padding: '0', height: '100%',  display: 'inline-block', flexShrink: '0', margin: '0 5px 0 5px'}}>
                                    <div onClick={e => { 
                                        let list = photos.filter((item, i) => i !== index);
                                        deletePhoto(list);

                                    }} className="delete-sample-img" style={{position: 'absolute', cursor: 'pointer', top: '5px', right: '5px', color: '#fff', background: 'red', zIndex: '1000', width: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2.5px', height: '20px'}}>x</div>
                                    
                                    {
                                        <img src={item} key={index} style={{height: '100%', width: screenWidth > 480 ? '200px' : '100px', background: '#fff', margin: '0 5px 0 5px', flexShrink: '0', borderRadius: '5px', position: 'relative'}} alt="" />
                                    }

                                </div>   
                            )
                            : 
                            ''
                        }


                        
                    </section>
                </div>
            </div>
        </>
     );
}
 
export default EditorPhotoStore;