import { useEffect, useState } from "react";

const EditorTitle = ({edit,productTitle}) => {
    let [titleCount, setTitleCount] = useState(0)
    let [Title,setTitle] = useState('')

    useEffect(() => {
        setTitleCount(Title.length)
    }, [Title])

    return ( 
        <>
            <div className="input-cnt" style={{width: '100%', padding: '0', position: 'relative'}}>
                {/*<label htmlFor="">Description</label>*/}
                <textarea defaultValue={edit.title} maxLength={60} placeholder="Title" name='title' className="seller-shop-title shadow-sm" onInput={e => {
                    setTitle(e.target.value)
                    return(productTitle(e.target.value))
                }}>
                    
                </textarea>

                <div style={{height: 'fit-content', position: 'absolute', fontSize: 'small', right: '10px', bottom: '25px'}}>{titleCount}/60</div>
            </div>
            <div style={{textAlign: 'left', width: '100% ', margin: '-6px 0 10px 5px '}} className="err-mssg">Title must contain at least 3 words</div>

        </>
     );
}
 
export default EditorTitle;