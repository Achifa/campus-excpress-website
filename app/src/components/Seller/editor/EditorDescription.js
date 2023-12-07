import { useEffect, useState } from "react";

const EditorDescription = ({edit}) => {
    let [descriptionCount, setDescriptionCount] = useState(0)
    let [productDescription,setProductDescription] = useState('')

    useEffect(() => {
        setDescriptionCount(productDescription.length)
    }, [productDescription])
    
    return ( 
        <>
            <div className="input-cnt" style={{width: '100%', position: 'relative', padding: '0'}}>
                {/*<label htmlFor="">Description</label>*/}
                <textarea defaultValue={edit.description} maxLength={650} name='description' onInput={e => setProductDescription(e.target.value)} placeholder="Description" className="seller-shop-desc shadow-sm"></textarea>
                <div style={{height: 'fit-content', position: 'absolute', right: '10px', fontSize: 'small', bottom: '5px'}}>{descriptionCount}/650</div>
            </div>
        </>
     );
}
 
export default EditorDescription;