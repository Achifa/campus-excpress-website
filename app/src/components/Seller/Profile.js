import userSvg from '../../assets/user-id-svgrepo-com.svg'
import phoneSvg from '../../assets/phone-rounded-svgrepo-com.svg'
import emailSvg from '../../assets/email-svgrepo-com.svg'
import locationSvg from '../../assets/location-pin-svgrepo-com (2).svg'
import timerSvg from '../../assets/timer-svgrepo-com.svg'
import dateSvg from '../../assets/date-2-svgrepo-com.svg'
import { useEffect, useState } from "react";
import totalSvg from '../../assets/money-total-line-svgrepo-com.svg'
import soldSvg from '../../assets/sold-svgrepo-com.svg'
import unsoldSvg from '../../assets/for-sale-post-svgrepo-com.svg'
import reportedSvg from '../../assets/report-flag-1419-svgrepo-com.svg'
import returnedSvg from '../../assets/return-svgrepo-com.svg'
import { GetSeller } from '../../api/seller'
const Profile = () => {

    let [userData, setUserData] = useState('')

    useEffect(() => {
        GetSeller(window.localStorage.getItem('CE_seller_id'))
        .then((result) => {
            setUserData(result)
        })
        .catch((err) => console.log(err))
    }, [])
    
    return ( 
        <>
            <div className="seller-profile-cnt">
                <div className="seller-profile-left">
                    <div className="seller-profile-top">
                        <img src={''} style={{height: '100px', marginTop: '20px', width: '100px', border: '3px solid orangered', borderRadius: '50%'}} alt="" />
                        
                        <ul>
                            <li>
                                <span>
                                    <img src={userSvg} style={{height: '25px', width: '25px', marginBottom: '5px'}} alt="" />

                                </span>
                                &nbsp;
                                &nbsp;
                                <span>{userData.fname ? userData.fname : 'Loading...'} {userData.lname ? userData.lname : 'Loading...'}</span>
                            </li>
                            

                            <li>
                                <span>
                                    <img src={phoneSvg} style={{height: '25px', width: '25px', marginBottom: '5px'}} alt="" />

                                </span>
                                &nbsp;
                                &nbsp;
                                <span>{userData.phone ? userData.phone : 'Loading...'} </span>
                            </li>

                            <li>
                                <span>
                                    <img src={emailSvg} style={{height: '25px', width: '25px', marginBottom: '5px'}} alt="" />

                                </span>
                                &nbsp;
                                &nbsp;
                                <span>{userData.email ? userData.email : 'Loading...'} </span>
                            </li>

                            <li>
                                <span>
                                    <img src={locationSvg} style={{height: '25px', width: '25px', marginBottom: '5px'}} alt="" />
                                </span>

                                &nbsp;
                                &nbsp;
                                <span>{userData.state ? userData.state : 'Loading...'}, {userData.campus ? userData.campus : 'Loading...'} </span>
                            </li>

                            <li>
                                <span>
                                    <img src={timerSvg} style={{height: '25px', width: '25px', marginBottom: '5px'}} alt="" />

                                </span>
                                &nbsp;
                                &nbsp;
                                <span>Member Since {userData.date ? userData.date: 'Loading...'}</span>
                            </li>
                           
                        </ul>
                        <hr />
                    </div>

                    {/* <div className="seller-profile-body">
                        <h5>Statistics</h5>
                        
                        <hr />
                    </div> */}

                    <div className="seller-profile-footer">
                        <h5>Earnings</h5>
                        <ul>
                            <li>
                                <div>&#8358;4500000</div>
                                <div>Earnings</div>
                            </li>

                            <li>
                                <div>40</div>
                                <div>Orders</div>
                            </li>

                            <li>
                                <div>10</div>
                                <div>Refunds</div>
                            </li>
                            
                        </ul>
                        
                    </div>
                </div>
                <div className="seller-profile-right"> 


                    {/*<div className="seller-profile-description">
                        <section>
                            <h3>Description</h3>
                        </section>
                        <section>
                        My name is Fabian and I am a Fullstack Developer at Upwork with 4+
                        years of experience. I have outstanding knowledge in web technologies
                        (html, css, javascript, bootsrap, react, node, postgresql, mongodb)
                        which I use to create, design, integrate and deploy well performing web
                        applications. I have worked on di erent projects which includes:
                        React
                        integration with web3 (Metamask, Solana/Phantom).
                        Creating
                        responsive web pages with html, css, bootsrap and javascript.
                                                Manipulating arrays and objects with javascript.
                        RESTful API
                        integration.
                        Writing algorithms with javascript using the rules of space
                        and time complexity.
                        Authentication with node "JSON Web Token"
                        (JWT).
                        Manipulating mongodb with node.js to create collections, insert
                        data in documents, update data in documents, delete data in
                        documents, join collections and also aggregate data to give a speci c
                        output. I work consistently and closely with my clients to get their
                        projects perfectly done and deliver it on time. I have received good
                        reviews about my jobs from my clients.
                        </section>
    </div>*/}
                    

                    <div className="seller-profile-reviews">
                        <section>
                            <h3>Reviews</h3>
                        </section>
                        <section className='seller-review-box'>
                            {
                                [1,2,3,4,5,6,7,8].map((item,index) => 
                                
                                    <div className="seller-review-cnt">
                                    
                                    </div>
                                )

                            }
                        </section>
                    </div>
                    
                    <div className="seller-profile-history">
                        <section>
                            <h3>History</h3>
                        </section>
                        
                    </div>
                   
                </div>
            </div>
        </>
     );
}
 
export default Profile;