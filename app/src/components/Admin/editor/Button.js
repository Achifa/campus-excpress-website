const UploadBtn = ({update,updateForm,handleForm}) => {

    
    return ( 
        <>
            <div className="seller-upload-btn " style={{width: '100%', padding: '10px', marginTop: '0px', height: '80px', position: 'relative'}}>
                    {/* <div className="seller-item-preview-cnt">

                    </div> */}
                <button onClick={e => update ? updateForm(e) : handleForm(e)} style={{width: '100%', height: '55px', marginTop: '10px', borderRadius: '8px', padding: '0', background: '#5b42f3', outline: 'none', border: 'none', color: '#fff'}}>
                    <div>{update ? 'Update' : 'Upload'}</div>
                </button>

            </div>
        </>
     );
}
 
export default UploadBtn;