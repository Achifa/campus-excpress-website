const Summary = ({Total,totalItem}) => {
    return ( 
        <>
            <div className="buyer-checkout-order-summary">
            &nbsp;<p style={{fontWeight: 'bold'}}>Order Summary</p>
                <br />
                {/* <hr /> */}
                <div className="input-cnt">
                    <span style={{color: '#000', fontSize: 'medium', fontWeight: '400'}} >Item Total ({totalItem})</span>
                    <span style={{color: '#000', fontSize: 'medium', fontWeight: '400'}} >&#8358; {new Intl.NumberFormat('en-us').format(Total)}</span>
                </div>

                <div className="input-cnt">
                    <span style={{color: '#000', fontSize: 'medium', fontWeight: '400'}} >Charges</span> 
                    <span style={{color: '#000', fontSize: 'medium', fontWeight: '400'}} >&#8358; {new Intl.NumberFormat('en-us').format(0)}</span>
                </div>

                <div className="input-cnt">  
                    <span style={{color: '#000', fontSize: 'medium', fontWeight: '400'}} >Total </span>
                    <span style={{color: '#000', fontSize: 'medium', fontWeight: '400'}} >&#8358; {new Intl.NumberFormat('en-us').format(Total)}</span>
                </div>
            </div>
        </>
     );
}
 
export default Summary;