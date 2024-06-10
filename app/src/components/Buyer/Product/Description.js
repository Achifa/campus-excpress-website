const Description = ({item}) => {
    return ( 
        <>
            <div className="buyer-product-description shadow-sm" style={{background: '#fff', borderRadius: '5px'}}>
                <h6 className="shadow-sm" style={{padding:'10px', margin: '0', height: '50px', width: '100%', background: '#fff'}}>Description</h6>
                <section style={{padding: '10px', fontSize: 'small', fontWeight: '400', background: '#fff'}}>
                    {item?.description}
                </section>
            </div>
        </>
     );
}
 
export default Description;