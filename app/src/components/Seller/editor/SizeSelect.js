const SizeSelect = ({edit,productSizeSelect,cType}) => {

    return ( 
        <>
            <div className="input-cnt">
                <label htmlFor="">Size</label>
                {
                    cType === 'Shoe'
                    ?
                    <input type="number" placeholder="Input shoe size. e.g: 30, 32" />

                    :

                    <select onInput={e => productSizeSelect(e.target.value)} name="condition" id="">
                        <option value={''}>Select Size</option>
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
                }
            </div>
        </>
     );
}
 
export default SizeSelect;