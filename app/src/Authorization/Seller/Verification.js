import vSvg from '../../assets/verification-svgrepo-com.svg'


const Verification = () => {
    return ( 
        <>

            <div style={{
                height: '100vh',
                width: '100vw',
                background: '#f9f9f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                color: 'orangered'
            }}>

                <div style={{
                    width: '100%',
                    background: '#f9f9f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'orangered'
                }}>
                    <img src={vSvg} style={{height: '120px', width: '120px', marginBottom: '5px'}} alt="" />
                </div>

                <br />
                <h3>Your Email Have Been Verified!</h3>

            </div>
        </>
     );
}
 
export default Verification;