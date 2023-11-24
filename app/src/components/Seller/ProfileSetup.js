import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { data, school_choices } from '../../location';
import { GetSeller } from "../../api/seller";

const ProfileSetup = () => {
    let [userData, setUserData] = useState('')

    useEffect(() => {
        GetSeller(window.localStorage.getItem('CE_seller_id'))
        .then((result) => {
            setUserData(result)
        })
        .catch((err) => console.log(err))
    }, [])

    let navigate = useNavigate();

    let [fname, setFname] = useState('')
    let [lname, setLname] = useState('')
    let [email, setEmail] = useState('')
    let [phone, setPhone] = useState('')
    let [pwd, setPwd] = useState('')
    let [cPwd, setCPwd] = useState('')

    let [state, setState] = useState('')
    let [campus, setCampus] = useState('')

    const [value, setValue] = useState('Select State');
    const [campusLocale, setCampusLocale] = useState('Select Campus');
    const [campusLocaleList, setCampusLocaleList] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [CampusisFocus, setCampusIsFocus] = useState(false);

    // let Registration = () => {
    //     RegisterSeller(fname,lname,email,phone,pwd,state,campus)
    //     .then((result) => result ? navigate('/seller/login') : '')
    //     .catch((err) => console.log(err))
    // }

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

            <div className="seller-profile-setup">
                <form action="">
                    <div className="seller-input-cnt">
                        <section>
                            <label htmlFor="">FirstName</label>
                            <input defaultValue={userData ? userData.fname : ''} onInput={e => setFname(e.target.value)} placeholder='FirstName...' type="text" />
                        </section>
                        <section>
                            <label htmlFor="">LastName</label>
                            <input defaultValue={userData ? userData.fname : ''} onInput={e => setLname(e.target.value)}  placeholder='LastName' type="text" />
                        </section>
                    </div>


                    <div className="seller-input-cnt">
                        <section style={{width: '70%'}}>
                            <label htmlFor="">Email</label>
                            <input defaultValue={userData ? userData.email : ''} onInput={e => setEmail(e.target.value)}  placeholder='Email...' type="text" />
                        </section>
                        <section style={{width: '30%'}}>
                            <button>Verify</button>
                        </section>
                    </div>

                    <div className="seller-input-cnt">
                        <section style={{width: '70%', float: 'left'}}>
                            <label htmlFor="">Phone</label>
                            <input defaultValue={userData ? userData.phone : ''} onInput={e => setPhone(e.target.value)}  placeholder='Phone Number...' type="number" />
                        </section>
                        <section style={{width: '30%'}}>
                            <button>Verify</button>
                        </section>
                    </div>

                    
                  

                    <div className="seller-input-cnt">
                        <section style={{width: '100%'}}>
                            <label htmlFor="">State <small>(Optional)</small></label>
                            <select value="Anambra" onInput={e => setState(e.target.value)}  name="" id="">
                                <option value="">Select State</option>
                                {
                                    data.map((item,index) => {
                                        return(
                                            <option value={item.label}>{item.label}</option>
                                        )
                                    })
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

                                        item.text === userData.text 
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
                        
                        <button onClick={e => {e.preventDefault(); }}>Update</button>
                        
                    </div>

                        
                        
                    </form>
            </div>
        </>
     );
}
 
export default ProfileSetup;