import { useEffect, useState } from "react";

const TypeSelect = ({edit,category,productType,typeList}) => {
    useEffect(() => {
        document.querySelector('.type').firstChild.selected = true
    }, [category])
    return ( 
        <>

            <div className="input-cnt">
                <label htmlFor="">Type</label>
                <select className="type" defaultValue={''} onInput={e => productType(e.target.value)} name="type" id="">
                    <option value={''}>Select Product Type</option>

                    {
                        typeList.map((item, index) => 
                            item === edit.others?.split(',')[0]
                            ? 
                            <option selected key={index} value={item}>{item}</option>
                            :
                            <option key={index} value={item}>{item}</option>
                        )
                    }
                </select>
            </div>    
        </>
     );
}
 
export default TypeSelect;