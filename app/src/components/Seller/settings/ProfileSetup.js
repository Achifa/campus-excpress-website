import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { data, school_choices } from '../../../location';
import { GetSeller, updateSellerProfile } from "../../../api/seller";
import '../../../styles/Seller/overlay.css' 
import '../../../styles/settings.css';

const ProfileSetup = () => {

    let navigate = useNavigate();

    let [fname, setFname] = useState('')
    let [lname, setLname] = useState('')
    let [state, setState] = useState('')
    let [campus, setCampus] = useState('')
    let [userData, setUserData] = useState('')

    useEffect(() => {
        let overlay = document.querySelector('.overlay')
        //overlay.setAttribute('id', 'overlay');
        GetSeller(window.localStorage.getItem('CE_seller_id'))
        .then((result) => {
            setUserData(result)
            setFname(result.fname)
            setLname(result.lname)
            setCampus(result.campus)
            setState(result.state)
            overlay.removeAttribute('id')

        })
        .catch((err) => console.log(err))
    }, [])
   
    const [value, setValue] = useState('Select State');
    const [campusLocale, setCampusLocale] = useState('Select Campus');
    const [campusLocaleList, setCampusLocaleList] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [CampusisFocus, setCampusIsFocus] = useState(false);

    let UpdateProfile = () => {
        let overlay = document.querySelector('.overlay')
        //overlay.setAttribute('id', 'overlay');
        updateSellerProfile(fname,lname,state,campus,window.localStorage.getItem('CE_seller_id'))
        .then((result) => result ? overlay.removeAttribute('id') : '')
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        setCampusLocaleList([])
        let stateIndex = data.filter(item =>  item.label.toLocaleLowerCase() === state.toLocaleLowerCase())
        let index = data.indexOf(stateIndex[0]); 
        let campuses = Object.values(school_choices).reverse();
        console.log(campuses[index])
        index < 0 ? setCampusLocaleList([]) : setCampusLocaleList(campuses[index])

    }, [state])

    return ( 
        <>
            <div className="overlay">
                <div className="loader">
                </div>
            </div>
            <div className="seller-profile-setup">
                <form action="">
                    <div className="seller-input-cnt">
                        <section>
                            <label htmlFor="">FirstName</label>
                            <input defaultValue={userData ? userData.fname : ''} onInput={e => setFname(e.target.value)} placeholder='FirstName...' type="text" />
                        </section>
                        <section>
                            <label htmlFor="">LastName</label>
                            <input defaultValue={userData ? userData.lname : ''} onInput={e => setLname(e.target.value)}  placeholder='LastName...' type="text" />
                        </section>
                    </div>


                    <div className="seller-input-cnt">
                        <section style={{width: '70%'}}>
                            <label htmlFor="">Email</label>
                            <input value={userData ? userData.email : ''} placeholder='Email...' type="text" />
                        </section>
                        {/* <section style={{width: '30%'}}>
                            <button style={{fontSize: 'small', background: '#5b42f3'}}>Change</button>
                        </section> */}
                    </div>

                    <div className="seller-input-cnt">
                        <section style={{width: '70%', float: 'left'}}>
                            <label htmlFor="">Phone</label>
                            <input value={userData ? userData.phone : ''}  placeholder='Phone Number...' type="number" />
                        </section>
                        {/* <section style={{width: '30%'}}>
                            <button style={{fontSize: 'small', background: '#5b42f3'}}>Change</button>
                        </section> */}
                    </div>

                    
                  

                    <div className="seller-input-cnt">
                        <section style={{width: '100%'}}>
                            <label htmlFor="">State <small>(Optional)</small></label>
                            <select  onInput={e => setState(e.target.value)}  name="" id="">
                                <option value="">Select State</option>
                                {
                                    data.map((item,index) =>  
                                        item.label === userData.state
                                        ?
                                            <option selected value={item.label}>{item.label}</option>
                                        :
                                            <option value={item.label}>{item.label}</option>
                                    )
                                }
                            </select>
                        </section>
                        
                    </div>

                    <div className="seller-input-cnt">
                        <section style={{width: '100%'}}>
                            <label htmlFor="">Campus <small>(Optional)</small></label>
                            <select onInput={e => setCampus(e.target.value)}  name="" id="">
                                <option value="">Select Campus</option>
                                {
                                    campusLocaleList.map((item,index) => 

                                        item.text === userData.campus 
                                        ?
                                            <option selected value={item.text}>{item.text}</option>
                                        : 
                                            <option value={item.text}>{item.text}</option>
                                    )
                                }
                            </select>
                        </section>
                        
                    </div>


                
                    <div className="seller-input-cnt">
                        
                        <button style={{background: '#5b42f3'}} onClick={e => {e.preventDefault(); UpdateProfile();}}>Update</button>
                        
                    </div>

                        
                        
                    </form>
            </div>
        </>
     );
}
 
export default ProfileSetup;