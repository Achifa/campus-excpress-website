const Description = ({item}) => {
    return ( 
        <>
            <div className="buyer-product-description">
                <h6 style={{padding:'10px', margin: '0', height: '50px'}}>Description</h6>
                <section style={{padding: '10px', fontSize: 'small', fontWeight: '400'}}>
                    {item.description}
                </section>
            </div>
        </>
     );
}
 
export default Description;