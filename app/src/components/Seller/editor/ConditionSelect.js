import { useState } from "react";

const ConditionSelect = ({edit,productCategory,category,clothingCategory}) => {


    // let [productCondition, setProductCondition] = useState('')
    return ( 
        <>
            <div className="input-cnt">
                <label htmlFor="">Condition</label>
                <select  name="condition" id="">
                    <option value={''}>Select Product Condition</option>

                    {
                        category === "Health/Beauty" ? ["Brand New"].map ((item, index) => 
                            item === edit.condition
                            ?
                            <option selected key={index} value={item}>{item}</option>
                            :
                            <option key={index} value={item}>{item}</option>
                        )

                        :
 
                        clothingCategory === "Underwear" ? ["Brand New"].map ((item, index) => 
                            item === edit.condition
                            ?
                            <option selected key={index} value={item}>{item}</option>
                            :
                            <option key={index} value={item}>{item}</option>
                        )
                        
                        : 
                        
                        ["Brand New", "Fairly Used", "Refurbished","Used"].map((item, index) => 
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