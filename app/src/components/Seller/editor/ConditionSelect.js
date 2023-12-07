import { useState } from "react";

const ConditionSelect = ({edit,productCategory}) => {

    let [productCondition, setProductCondition] = useState('')
    return ( 
        <>
            <div className="input-cnt">
                <label htmlFor="">Condition</label>
                <select onInput={e => setProductCondition(e.target.value)} name="condition" id="">
                    <option value={''}>Select Product Type</option>

                    {
                        productCategory === "Health/Beauty" ? ["Brand New"].map ((item, index) => 
                            item === edit.condition
                            ?
                            <option selected key={index} value={item}>{item}</option>
                            :
                            <option key={index} value={item}>{item}</option>
                        )
                        
                        : ["Brand New", "Fairly Used", "Refurbished","Used"].map((item, index) => 
                            item === edit.condition
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
 
export default ConditionSelect;