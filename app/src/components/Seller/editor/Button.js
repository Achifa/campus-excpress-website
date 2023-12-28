const UploadBtn = ({update,updateForm,handleForm}) => {

    
    return ( 
        <>
            <div className="seller-upload-btn " style={{width: '100%', padding: '0', marginTop: '5px', height: '60px', position: 'relative'}}>
                    {/* <div className="seller-item-preview-cnt">

                    </div> */}
                <button onClick={e => update ? updateForm(e) : handleForm(e)} style={{width: '100%', height: '55px', marginTop: '5px', borderRadius: '4px', padding: '0', background: 'orangered', outline: 'none', border: 'none', color: '#fff'}}>
                    <div>{update ? 'Update' : 'Upload'}</div>
                </button>

            </div>
        </>
     );
}
 
export default UploadBtn;