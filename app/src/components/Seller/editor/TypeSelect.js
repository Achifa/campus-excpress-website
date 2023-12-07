import { useState } from "react";

const TypeSelect = ({edit,productType,typeList}) => {
    return ( 
        <>

            <div className="input-cnt">
                <label htmlFor="">Type</label>
                <select onInput={e => productType(e.target.value)} name="type" id="">
                    <option value={''}>Select Product Type</option>

                    {
                        typeList.map((item, index) => 
                            item === edit.type
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