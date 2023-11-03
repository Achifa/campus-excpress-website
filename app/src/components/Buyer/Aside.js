import { useEffect, useState } from "react";
import items from '../../items.json'
import { data, school_choices } from "../../location";

const BuyerAside = () => {
    let [screenWidth, setScreenWidth] = useState(0)
    let [categories, setCategories] = useState('')
    let [type, setType] = useState('')
    let [price, setPrice] = useState('')

    let [state, setState] = useState([])
    let [stateValue, setStateValue] = useState('')
    let [school, setSchool] = useState([])
    let [schoolValue, setSchoolValue] = useState('')

    useEffect(() => {
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])

    useEffect(() => {
        setState(data)
    }, [])

   

    useEffect(() => {
        setSchool([])
        let stateIndex = data.filter(item =>  item.label.toLocaleLowerCase() === stateValue.toLocaleLowerCase())
        let index = data.indexOf(stateIndex[0]);
        let campuses = Object.values(school_choices).reverse();
        index < 0 ? setSchool([]) : setSchool(campuses[index])

    }, [stateValue])

    let [categoriesList, setCategoriesList] = useState([])
    let [typeList, setTypeList] = useState([])

    let plans = [
        {price: 3000, title: 'Premium', description: 'Exclusive Features for you to sell', features: ['Appear on the Search List', 'Appear on Trends', 'Visible to more Buyers']}, 
        {price: 1500, title: 'Standard', description: 'Top Notch Features for you to sell', features: ['Appear on the Search List', 'Appear on Trends', 'Visible to more Buyers']},
        {price: 750, title: 'Basic', description: 'Basic Features for you to sell', features: ['Appear on the Search List', 'Appear on Trends', 'Visible to more Buyers']}, 
        {price: 0, title: 'Free', description: 'Startup Features for you to sell', features: ['Appear on the Search List', 'Appear on Trends', 'Visible to more Buyers']}]


    useEffect(() => {
        setCategoriesList(items.items.category)
    },[])

    useEffect(() => {
       let type = categoriesList.filter(item => Object.keys(item)[0] === categories)[0]
       if(type){
            setTypeList(type[categories])
       }
    },[categories])

    return ( 
        <>
            <div className="buyer-aside">
                <div className="buyer-aside-cnt">
                    <h5>Filter Section </h5>
                    <div className="input-cnt" >
                        <div style={{height: 'fit-content', color: '#fff', width: '100%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                            <input style={{height: '25px', cursor: 'pointer', width: '25px'}} type="checkbox" name="" id="" />
                            &nbsp;
                            &nbsp;
                            <label htmlFor="" style={{color: '#fff', fontSize: 'medium', fontWeight: '500'}}>Category</label>
                        </div>
                        <select name="" onInput={e => setCategories(e.target.value)} id="">
                            <option value={''}>Select A Category</option>

                            {
                                categoriesList.map((item, index) => 
                                    <option key={index} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</option>
                                )
                            }
                        </select>

                        <br />

                        <select name="" id="">
                            <option value={''}>Select Product Type</option>

                            {
                                typeList.map((item, index) => 
                                    <option key={index} value={item}>{item}</option>
                                )
                            }
                        </select>
                    </div>

                    

                    <div className="input-cnt" >
                        <div style={{height: 'fit-content', color: '#fff', width: '100%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                            <input style={{height: '25px', cursor: 'pointer', width: '25px'}} type="checkbox" name="" id="" />
                            &nbsp;
                            &nbsp;
                            <label htmlFor="" style={{color: '#fff', fontSize: 'medium', fontWeight: '500'}}>Condition</label>
                        </div>
                        <select name="" id="">
                            <option value={''}>Select Product Type</option>

                            {
                                ["Brand New", "Fairly Used", "Refurbished","Used"].map((item, index) => 
                                    <option key={index} value={item}>{item}</option>
                                )
                            }
                        </select>
                    </div>

                    <div className="input-cnt" >
                        <div style={{height: 'fit-content', color: '#fff', width: '100%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                            <input style={{height: '25px', cursor: 'pointer', width: '25px'}} type="checkbox" name="" id="" />
                            &nbsp;
                            &nbsp;
                            <label htmlFor="" style={{color: '#fff', fontSize: 'medium', fontWeight: '500'}}>Price Range</label>
                        </div>
                        <div>
                            <input style={{height: '45px', width: '40%', float: 'left'}} placeholder="From..." type="number" name="" id="" />
                            <input style={{height: '45px', width: '40%', float: 'right'}} placeholder="To..." type="number" name="" id="" />
                        </div>
                    </div>

                    <div className="input-cnt" >
                        <div style={{height: 'fit-content', color: '#fff', width: '100%', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'left'}}>
                            <input style={{height: '25px', cursor: 'pointer', width: '25px'}} type="checkbox" name="" id="" />
                            &nbsp;
                            &nbsp;
                            <label htmlFor="" style={{color: '#fff', fontSize: 'medium', fontWeight: '500'}}>Location</label>
                        </div>
                        <select name="" id="" onChange={e => setStateValue(e.target.value)}>
                            <option value={''}>Select State</option>

                            {
                                state.map((item, index) => 
                                    <option key={index} value={item.label}>{item.label}</option>
                                )
                            }
                        </select>
                        <br />

                        <select name="" id="" onChange={e => setSchoolValue(e.target.value)}>
                            <option value={''}>Select Campus</option>

                            {
                                school.map((item, index) => 
                                    <option key={index} value={item.text}>{item.text}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default BuyerAside;