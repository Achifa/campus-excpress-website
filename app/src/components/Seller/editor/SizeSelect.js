const SizeSelect = ({edit,productSizeSelect}) => {

    return ( 
        <>
            <div className="input-cnt">
                <label htmlFor="">Size</label>
                <select onInput={e => productSizeSelect(e.target.value)} name="condition" id="">
                    <option value={''}>Select Gender</option>
                    {
                        ["XX-Large", "X-Large", "Large", "Medium", "Small", "X-Small", "XX-Small"].map ((item, index) => 
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
 
export default SizeSelect;