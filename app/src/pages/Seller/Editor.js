import { useEffect, useRef, useState } from 'react';
import '../../styles/plan_card.css'
import '../../styles/loader.css'
import '../../styles/notice.css'
import '../../styles/Seller/overlay.css'    
import { useLocation, useNavigate } from 'react-router-dom';
import items from '../../items.json'
import TypeSelect from '../../components/Seller/editor/TypeSelect';
import StockSelect from '../../components/Seller/editor/StockSelect';
import PriceSelect from '../../components/Seller/editor/PriceSelect';
import ConditionSelect from '../../components/Seller/editor/ConditionSelect';
import SizeSelect from '../../components/Seller/editor/SizeSelect';
import GenderSelect from '../../components/Seller/editor/GenderSelect';
import LocationSelect from '../../components/Seller/editor/LocationSelect';
import CategorySelect from '../../components/Seller/editor/CategorySelect';
import EditorTitle from '../../components/Seller/editor/EditorTitle';
import EditorPhotoStore from '../../components/Seller/editor/EditorPhotoStore';
import EditorDescription from '../../components/Seller/editor/EditorDescription';
import SubCategory from '../../components/Seller/editor/ClothingSelect';
import UploadBtn from '../../components/Seller/editor/Button';
// import  uploadForm  from '../../Functions/upload';
// import { uploadForm } from '../Functions/upload';
import { validate_inputs } from '../../Functions/validation';
import { handleFormUpdate, handleFormUpload} from '../../Functions/upload';
import SellerLayout from '../../layout/Seller'
import usePost from '../../hooks/usePost';
import { GetItem, GetItemImages, GetProductThumbnail } from '../../api/buyer/get';
import EditorVideo from '../../components/Seller/editor/EditorVideo';
import EditorVideoStore from '../../components/Seller/editor/EditorVideoStore';
import LodgeAmenities from '../../components/Seller/editor/LodgeAmenities';
import { openNotice } from '../../Functions/notice';

const Editor = () => {

    let location = useLocation();
    let navigate = useNavigate();

    let book = []
    
    let gender = useRef('')

    let [gender_state, set_gender_state] = useState('')
    let [edit,setEdit] = useState('');
    let [screenWidth, setScreenWidth] = useState('')

    let [categoriesList, setCategoriesList] = useState([])
    let [typeList, setTypeList] = useState([]) 
    let [img_list, setimg_list] = useState([])
    let [vid_list, setvid_list] = useState([])
    let [amenities_list, setamenities_list] = useState([])
    
    let [descriptionActive, setDescriptionActive] = useState(true)
    // let [ideoActive, setVideoActive] = useState(true)
    let [update, setUpdate] = useState(false);
    let [videoActive, setVideoActive] = useState(true)
    let [photoActive, setPhotoActive] = useState(true)

    const searchParams = new URLSearchParams(window.location.search);
    function closeOverlay() {let overlay = document.querySelector('.overlay');overlay.onclick = e => {overlay.removeAttribute('id')}}

   

    useEffect(() => {
        if(window.localStorage.getItem('sub-categories') === null || window.localStorage.getItem('sub-categories') === 'null' || window.localStorage.getItem('sub-categories') === '' || window.localStorage.getItem('sub-categories') === undefined){
            window.localStorage.setItem('sub-categories', JSON.stringify(items.items.category))
        }

    },[])

    useEffect(() => {
        
        let product_id = searchParams.get('product_id'); 
        if(product_id === null){
            setUpdate(false)
        }else{
            setUpdate(true)

        }
    }, [])

    useEffect(() => {
        let overlay = document.querySelector('.overlay')
        overlay.setAttribute('id', 'overlay');

        async function getData() {

            let product_id = searchParams.get('product_id'); // price_descending
            
            if(product_id !== null){
                let result = await GetItem([product_id]);

                productCategory(result[0]?.category) 
                productTitle(result[0]?.title)
                // setPhotos(result[0].photos.map(item => item.file))
                productDescription(result[0]?.description)
                productPrice(result[0]?.price)
                // setProduct_id(result[0].meta_data[0].product_id)
                productType(JSON.parse(result[0]?.others)?.cType)
                productCondition(JSON.parse(result[0]?.others)?.condition)    
                // productLocale(result[0]?.others?.locale)
                overlay.removeAttribute('id')
                
            }
            

        }
        getData()

        async function getImages() {
            let product_id = searchParams.get('product_id'); 

            if(product_id !== ''){
                let result = await GetItemImages(product_id); 
                // alert(result.length)
                result?.map(item => productPhotos(item.file))
                   
            }

        }
        getImages()
    }, [])

    function productGender(data) {
        gender.current = (data);
        set_gender_state(data) 
        window.localStorage.setItem('draft_gender', data)
    }

    let size = useRef('')
    let [size_state,set_size_state] = useState('')
    function productSizeSelect(data) {
        size.current = (data); 
        set_size_state(data)
        window.localStorage.setItem('draft_size', data)
    }
    
    let subCategory = useRef('')
    let [subCategory_state,set_subCategory_state] = useState('')
    function productSubCategory(data) {
        subCategory.current = (data); 
        set_subCategory_state(data);
        window.localStorage.setItem('draft_sub_category', data)
        if(data === 'Create Custom Item'){
            let value = prompt('Insert Custom Sub Category')
            if(value !== ''){
                subCategory.current = value;
                set_subCategory_state(value);
                categoriesList.map(item => {
                    if(Object.keys(item)[0] === category_state){
                        cType_state === 'Foot Wear' ? item["FootWear"].push(value) : gender === 'Male' ? item["ClothingMale"].push(value) : item["ClothingFemale"].push(value)
                        window.localStorage.setItem('sub-categories', JSON.stringify(categoriesList))
                        setCategoriesList(categoriesList)
                    }
                })
                window.localStorage.setItem('draft_sub_category', value);
            }else{
                window.localStorage.removeItem('draft_sub_category')
            }
        }
    }

    let locale = useRef('')
    let [locale_state,set_locale_state] = useState('')
    function productLocale(data) {
        locale.current = (data); 
        set_locale_state(data)
        window.localStorage.setItem('draft_locale', data)
    }

    let condition= useRef('')
    let [condition_state,set_condition_state]= useState('')
    function productCondition(data) {
        set_condition_state(data)
        condition.current = (data); 
        window.localStorage.setItem('draft_condition', data)
    }

    let title = useRef('')
    let [title_state,set_title_state] = useState('')
    function productTitle(data) {
        title.current = (data)
        console.log(title.current)
        set_title_state(data)
        window.localStorage.setItem('draft_title', data)
    } 

    let description = useRef('')
    let [description_state,set_description_state] = useState('')
    function productDescription(data) {
        description.current = (data)
        set_description_state(data)
        window.localStorage.setItem('draft_description', data)
    }

    let category = useRef('')
    let [category_state,set_category_state] = useState('')
    function productCategory(data) {
        category.current = (data); 
        set_category_state(data)
        window.localStorage.setItem('draft_category', data)

        
    }
    
    let cType = useRef('')
    let [cType_state,set_cType_state] = useState('')
    function productType(data) {
        cType.current = (data); 
        set_cType_state(data)
        window.localStorage.setItem('draft_c_type', data)

        if(data === 'Create Custom Item'){
            let value = prompt('Insert Custom Sub Category')
            if(value !== ''){
                cType.current = value;
                set_cType_state(value);

                categoriesList.map(item => {
                    if(Object.keys(item)[0] === category_state){
                        item[category_state].push(value)
                        window.localStorage.setItem('sub-categories', JSON.stringify(categoriesList))
                        setCategoriesList(categoriesList)
                    }
                })

                window.localStorage.setItem('draft_c_type', value);

            }else{
                window.localStorage.removeItem('draft_c_type')
            }

        }
    }

    let price = useRef('')
    let [price_state,set_price_state] = useState('')
    function productPrice(data) {
        price.current = (data); 
        set_price_state(data)
        window.localStorage.setItem('draft_price', data)
    }

    // let amenities = useRef('')
    // let [amenities_state,set_amenities_state] = useState('')
    function productAmenities(data) {
        // amenities.current = (data); 
        setamenities_list(item => [...item, data])
        // window.localStorage.setItem('draft_stock', data)
    }

    // let amenities = useRef('')
    // let [amenities_state,set_amenities_state] = useState('')
    function deleteAmenities(data) {
        // amenities.current = (data); 
        let newList = amenities_list.filter(item => item !== data)
        setamenities_list(newList)
        
        // window.localStorage.setItem('draft_stock', data)
    }

    let stock = useRef('')
    let [stock_state,set_stock_state] = useState('')
    function productStock(data) {
        stock.current = (data); 
        set_stock_state(data)
        // window.localStorage.setItem('draft_stock', data)
    }

    let photos = useRef([])
    // let [photos_state,set_photos_state] = useRef([])
    function productPhotos(data) {
        let d = data !== '' ? photos.current.push(data) : ''
        setimg_list(item => [...item, data])
        console.log(photos.current.length)
    }

    function deletePhoto(data) {
        photos.current = data;
        setimg_list(data)
    }

    let videos = useRef([])
    // let [photos_state,set_photos_state] = useRef([])
    function productVideos(data) {
        // alert()
        let d = data !== '' ? videos.current.push(data) : ''
        setvid_list(item => [...item, data])
        console.log(videos.current.length)
    }

    function deleteVideo(data) {
        videos.current = data;
        setimg_list(data)
    }

    function setAllInputsToNull(params) {
        productGender('')
        productType('')
        productSizeSelect('')
        productSubCategory('')
        productLocale('')
        productCondition('')
    }


    useEffect(() => {
        if(window.localStorage.getItem('draft_category') !== null && window.localStorage.getItem('draft_category') !== undefined && window.localStorage.getItem('draft_category') !== ''){ 

            // productPhotos(())
            let img = 
            JSON.parse(window.localStorage.getItem('draft_images')) !== null 
            ? 
            JSON.parse(window.localStorage.getItem('draft_images')).map(item => productPhotos(item)) 
            : ''

            productCategory(window.localStorage.getItem('draft_category')) 
            productTitle(window.localStorage.getItem('draft_title'))
            // setPhotos(result.photos.map(item => item.file))
            productDescription(window.localStorage.getItem('draft_description'))
            productPrice(window.localStorage.getItem('draft_price'))
            // setProduct_id(result.meta_data[0].product_id)
            productStock(window.localStorage.getItem('draft_stock'))
            productType(window.localStorage.getItem('draft_c_type'))
            productCondition(window.localStorage.getItem('draft_condition'))
            productLocale(window.localStorage.getItem('draft_locale'))
        }else{
            // setCategory('')
        }
       
    }, [])
    useEffect(() => {setCategoriesList(JSON.parse(window.localStorage.getItem('sub-categories')))},[])
    // useEffect(() => {setAllInputsToNull('')},[category_state])
    useEffect(() => {setScreenWidth(window.innerWidth)},[])
    useEffect(() => {let type = categoriesList.filter(item => Object.keys(item)[0] === category.current)[0]; if(type){setTypeList(type[category_state])}},[categoriesList,category_state])
 
    let handleForm = () => {
        book = []
        // alert()
        let inputs = [...document.querySelectorAll('input')]
        let textareas = [document.querySelector('.seller-shop-title')]
        let selects = [...document.querySelectorAll('select')]
        // let allFields = [...inputs,...textareas,...selects]

        let result1 = validate_inputs('input', inputs, photos.current)
        let result2 = validate_inputs('textarea', textareas)
        let result3 = validate_inputs('select', selects)

        let response = [...result1, ...result2, ...result3]
        response.map((item) => {
            if(item !== -1){
                item.err !== '' ?  book.push(false) : book.push(true)
                item.err !== '' ? item.element.style.border = '1px solid red' : item.element.style.border = '1px solid green'
                item.err !== '' ? handleErr(item.element, item.err) : handleErr(item.element, item.err)

                function handleErr(element, err) {
                    let pElem = element.parentElement;

                    if(pElem.lastChild.className === 'err-mssg'){
                        pElem.lastChild.remove()

                        let newElem = document.createElement('div')
                        newElem.className = 'err-mssg';
                        newElem.style.width = '100%';
                        newElem.style.textAlign = 'left';
                        newElem.style.justifyContent = 'left';
                        newElem.innerHTML = err;
                        pElem.append(newElem);
                    }else{
                        let newElem = document.createElement('div')
                        newElem.className = 'err-mssg';
                        newElem.style.textAlign = 'left';
                        newElem.style.justifyContent = 'left';
                        newElem.style.width = '100%';
                        newElem.innerHTML = err;
                        pElem.append(newElem);
                    }
                }


            }
        })

        let checkForError = book.filter(item => item === false)

        if(checkForError.length < 1){
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
            let seller_id = window.localStorage.getItem("CE_seller_id")
            //upload for here

            
            if(update){
                fetch('https://ce-server.vercel.app/seller.product-update', {
                    method: 'post',
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify(
                        {
                            constantData: { 
                                title: title.current,
                                description: description.current,
                                category: category.current,
                                price: price.current,
                                photos: photos.current,
                                seller_id : seller_id
                            }, 
                        
                            dynamicData: {
                                cType: cType_state,
                                locale: locale_state,
                                subCategory: window.localStorage.getItem('draft_sub_category'),
                                gender: window.localStorage.getItem('draft_gender'),
                                condition: condition_state,
                                size: window.localStorage.getItem('draft_size')
                            }
                        }
                    )
                })
                .then(async(result) => {
                    let response = await result.json();
                    if(response){
                        window.localStorage.setItem('draft_gender', '')
                        window.localStorage.setItem('draft_size', '')
                        window.localStorage.setItem('draft_sub_category', '')
                        window.localStorage.setItem('draft_locale', '')
                        window.localStorage.setItem('draft_condition', '')
                        window.localStorage.setItem('draft_title', '')
                        window.localStorage.setItem('draft_description', '')
                        window.localStorage.setItem('draft_category', '')
                        window.localStorage.setItem('draft_c_type', '')
                        window.localStorage.setItem('draft_price', '')

                        openNotice('Upload Failed, Please Try Again')

                        setTimeout(() => {
                            window.location.href = '/seller.shop';
                            document.querySelector('.overlay').removeAttribute('id')
                        }, 800);
                    
                        
                    }else{
                        let overlay = document.querySelector('.overlay'); 
                        overlay.removeAttribute('id')
                        openNotice('Upload Failed, Please Try Again')
                    }
                })
                .catch((error) => {
                    console.log('Error:', error.message);
                    let overlay = document.querySelector('.overlay'); 
                    overlay.removeAttribute('id')
                    openNotice('Upload Failed, Please Try Again')
                })  
            }else{

                fetch('https://ce-server.vercel.app/seller.product-upload', {
                    method: 'post',
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify(
                        {
                            constantData: { 
                                title: title.current,
                                description: description.current,
                                category: category.current,
                                price: price.current,
                                photos: photos.current,
                                seller_id : seller_id
                            }, 
                        
                            dynamicData: {
                                cType: cType_state,
                                locale: locale_state,
                                subCategory: window.localStorage.getItem('draft_sub_category'),
                                gender: window.localStorage.getItem('draft_gender'),
                                condition: condition_state,
                                size: window.localStorage.getItem('draft_size')
                            }
                        }
                    )
                })
                .then(async(result) => {
                    let response = await result.json();
                    if(response){
                        window.localStorage.setItem('draft_gender', '')
                        window.localStorage.setItem('draft_size', '')
                        window.localStorage.setItem('draft_sub_category', '')
                        window.localStorage.setItem('draft_locale', '')
                        window.localStorage.setItem('draft_condition', '')
                        window.localStorage.setItem('draft_title', '')
                        window.localStorage.setItem('draft_description', '')
                        window.localStorage.setItem('draft_category', '')
                        window.localStorage.setItem('draft_c_type', '')
                        window.localStorage.setItem('draft_price', '')
                    
                        openNotice('Upload Failed, Please Try Again')

                        setTimeout(() => {
                            window.location.href = '/seller.shop';
                            document.querySelector('.overlay').removeAttribute('id')
                        }, 800);
                    }else{
                        let overlay = document.querySelector('.overlay'); 
                        overlay.removeAttribute('id')
                        openNotice('Upload Failed, Please Try Again')
                    }
                })
                .catch((error) => {
                    console.log('Error:', error.message);
                    let overlay = document.querySelector('.overlay'); 
                    overlay.removeAttribute('id')
                    openNotice('Upload Failed, Please Try Again')
                })  
             
            }

        }

    }
    
    return ( 
        <>
            <div className="overlay" >
                <div className="loader">
                </div>
            </div>

            <div className="notice-cnt" style={{margin: 'auto'}}>
                <span style={{margin: "0 15px 0 .5px"}}>An Error Occured, Please Try Again</span>
                <button className="notice-cnt-btn" style={{width: '40px', height: '30px', background: 'red', borderRadius: '2px', fontWeight: '500', fontSize: 'small'}}>
                    close
                </button>
            </div>

            

            <div className="seller-main">
                <SellerLayout>
                    <div className="seller-shop">

                        <div className='seller-shop-form-body'>
                            <div className="seller-shop-form">
                            
                                <div className='seller-shop-form-cnt'>

                                    <div className="seller-shop-form-group-2" >

                                        <CategorySelect productCategory={productCategory} edit={edit} /> 

                                        <div style={{opacity: category.current !== '' ? '1' : '.4', pointerEvents: category.current !== '' ? 'all' : 'none'}}>
                                        

                                            {
                                                category_state === 'Fashion' 
                                                
                                                ? 
                                                
                                                <GenderSelect edit={edit} productGender={productGender} />

                                                :
                                                ""
                                            }

                                            <TypeSelect typeList={typeList} category={category_state} edit={edit} productType={productType} />

                                            {
                                                category_state === 'Fashion' 
                                                ? 

                                                    cType_state === 'Clothing' || cType_state === 'Foot Wear'

                                                    ?

                                                    <SubCategory subCategory_state={subCategory_state} categoriesList={categoriesList} category={category_state} edit={edit} gender={gender_state} cType={cType_state} productSubCategory={productSubCategory} />

                                                    :

                                                    ""
                                                : 
                                                ""
                                            }
                                            

                                            {
                                                category_state === 'Fashion'
                                                ? 
                                                    cType_state === 'Clothing' ||  cType_state === 'Foot Wear'
                                                    ?
                                                    ""
                                                    :
                                                    ""
                                                : 
                                                ""
                                            }
                                            {/* <SizeSelect edit={edit} productSizeSelect={productSizeSelect} cType={cType_state}  /> */}

                                            

                                            {
                                                category_state === 'Lodge/Apartments' || category_state === 'Pets' || category_state === 'Food'
                                                ? 
                                                ""
                                                : 
                                                <ConditionSelect category={category_state} productCondition={productCondition} edit={edit} subCategory={subCategory_state}  />
                                            }

                                            
                                        </div>
                                        <div style={{opacity: category_state !== '' ? '1' : '.4', pointerEvents: category_state !== '' ? 'all' : 'none'}} className="seller-shop-form-group-1">
                                            
                                            {
                                                category_state === 'Lodge/Apartments' 
                                                ? 
                                                ""
                                                : 
                                                ''
                                                //<StockSelect edit={edit} productStock={productStock} />
                                            }

                                            {/*                                             
                                                <LodgeAmenities deleteAmenities={deleteAmenities} productAmenities={productAmenities} amenities={amenities_list}/> 
                                            */}

                                            <PriceSelect edit={edit} productPrice={productPrice} />

                                            <LocationSelect productLocale={productLocale} />

                                        </div>
                                        
                                    </div>

                                </div>

                                {
                                    screenWidth > 761
                                    ?
                                    <UploadBtn update={update} updateForm={update} handleForm={handleForm} />
                                    :
                                    ''
                                }

                            </div>


                            <div className="seller-shop-description" style={{textAlign: 'left', justifyContent: 'left', height: '100%'}}>
                                
                                <EditorTitle productTitle={productTitle}  edit={edit} />
                                <br />



                                <div className="" style={{display: 'flex', flexDirection: 'column', width: '100%', padding: '10px 0 10px 0'}}>
                                    {/* <section style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                                        <input style={{
                                            height: '20px',
                                            width: '20px'
                                        }} defaultChecked onInput={e => setPhotoActive(!photoActive)} type="checkbox" name="" id="" />
                                        &nbsp;
                                        &nbsp;
                                        <span style={{fontSize: 'small', fontWeight: '500', color: 'orangered'}}>Do you have image samples for this item.</span>

                                    </section> */}
                                    {/* <br /> */}
                                    <section style={{width: '100%', opacity: photoActive ? 1 : .5, pointerEvents: photoActive ? 'all' : 'none'}}>
                                        {
                                            
                                            <EditorPhotoStore category={category_state} edit={edit} productPhotos={productPhotos} photos={img_list} deletePhoto={deletePhoto} />  
                                            
                                        }
                                    </section>
                                </div> 

                                {/* <div className="input-cnt" style={{display: 'flex', flexDirection: 'column', width: '100%', padding: '10px 0 10px 0'}}>
                                    <section style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                                        <input style={{
                                            height: '20px',
                                            width: '20px'
                                        }} defaultChecked onInput={e => setVideoActive(!videoActive)} type="checkbox" name="" id="" />
                                        &nbsp;
                                        &nbsp;
                                        <span style={{fontSize: 'small', fontWeight: '500', color: 'orangered'}}>Do you have video samples for this item.</span>
                                    </section>
                                    <section style={{width: '100%', opacity: videoActive ? 1 : .5, pointerEvents: videoActive ? 'all' : 'none'}}>
                                        {
                                            <EditorVideoStore category={category_state} edit={edit} productVideos={productVideos} videos={vid_list} deleteVideo={deleteVideo} />  
                                        }
                                    </section>
                                </div>  */}
                                
                                <div className="input-cnt" style={{display: 'flex', flexDirection: 'column', width: '100%', padding: '10px 0 10px 0', background: 'transparent'}}>
                                    <section style={{display: 'flex', alignItems: 'center'}}>
                                        {/* <input style={{
                                            height: '20px',
                                            width: '20px'
                                        }} defaultChecked onInput={e => setDescriptionActive(!descriptionActive)} type="checkbox" name="" id="" />
                                        &nbsp;
                                        &nbsp; */}
                                        <span style={{fontSize: 'small', fontWeight: '500', color: 'orangered'}}>Description (Optional)</span>

                                    </section>
                                    {/* <section style={{width: '100%', opacity: descriptionActive ? 1 : .5, pointerEvents: descriptionActive ? 'all' : 'none'}}> */}
                                        
                                        {
                                           
                                            <EditorDescription productDescription={productDescription} edit={edit} descriptionActive={descriptionActive} />   
                                           
                                        }
                                    {/* </section> */}
                                </div> 


                                {/* <div className="input-cnt" style={{display: 'flex', flexDirection: 'column', width: '100%', padding: '10px 0 10px 0'}}>
                                    <section style={{display: 'flex', alignItems: 'center'}}>
                                        <input style={{
                                            height: '20px',
                                            width: '20px'
                                        }} defaultChecked onInput={e => setDescriptionActive(!videoActive)} type="checkbox" name="" id="" />
                                        &nbsp;
                                        &nbsp;
                                        <span style={{fontSize: 'small', fontWeight: '500', color: 'orangered'}}>Do you have a video sample for this item.</span>

                                    </section>
                                    <section style={{width: '100%', opacity: videoActive ? 1 : .5, pointerEvents: videoActive ? 'all' : 'none'}}>
                                        <EditorVideo productDescription={productDescription} edit={edit} videoActive={videoActive} />   
                                    </section>
                                </div>  */}

                            </div>

                            

                        </div>

                        {
                            screenWidth < 761
                            ?
                            <UploadBtn update={update} updateForm={update} handleForm={handleForm} />

                            :
                            '' 
                        }

                        

                    </div>
                </SellerLayout>

            </div>

        </>
     );
}
  
export default Editor;