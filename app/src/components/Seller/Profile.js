import img from '../../assets/download (3).jpeg'

const Profile = () => {
    return ( 
        <>
            <div className="seller-profile-cnt">
                <div className="seller-profile-left">
                    <div className="seller-profile-top">
                        <img src={img} style={{height: '100px', marginTop: '20px', width: '100px', border: '3px solid orangered', borderRadius: '50%'}} alt="" />
                        
                        <ul>
                            <li>
                                <span></span>
                                <span>Akpulu Fabian Chinedu</span>
                            </li>
                            

                            <li>
                                <span></span>
                                <span>08032639894</span>
                            </li>

                            <li>
                                <span></span>
                                <span>akpulufabian@gmail.com</span>
                            </li>

                            <li>
                                <span></span>
                                <span>Awka, Unizik</span>
                            </li>

                            <li>
                                <span></span>
                                <span>August 30, 2003</span>
                            </li>

                            <li>
                                <span></span>
                                <span>Member since july 20, 2022</span>
                            </li>
                           
                        </ul>
                        <hr />
                    </div>

                    <div className="seller-profile-body">
                        <h5>Statistics</h5>
                        <ul>
                            <li>30 Items for sale</li>
                            <li>10 Sold item</li>
                            <li>20 Unsold Items</li>
                            <li>0 Reported Items</li>
                        </ul>
                        <hr />
                    </div>

                    <div className="seller-profile-footer">
                        <h5>Earnings</h5>
                        <ul>
                            <li>30 Items for sale</li>
                            <li>10 Sold item</li>
                            <li>20 Unsold Items</li>
                            <li>0 Reported Items</li>
                        </ul>
                        
                    </div>
                </div>
                <div className="seller-profile-right">


                    <div className="seller-profile-description">
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
                    </div>
                    

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