const Inbox = () => {
    return ( 
        <>
            <div className="seller-inbox-cnt">
                <ul>
                    {
                        [1,2,3,4,5,6,7].map((iem,index) => {
                            return(
                                <li className="seller-inbox-card shadow-sm">

                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
     );
}
 
export default Inbox;