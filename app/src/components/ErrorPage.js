// import errorSvg from '../assets/not-found-error-alert-svgrepo-com.svg'
const ErrorPage = () => {
    return ( 
        <>

            <section style={{display: 'flex', flexDirection: 'column', position: 'fixed', top: '0', zIndex: '1000', width: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center', color: '#fff', background: 'orangered'}}>

                
                <h1>Campus Express</h1>

                <br />
                <br />
                <br />
                
                <h2>Page Not Found</h2>

            </section>
        </>
     );
}
 
export default ErrorPage;