const { NeonDB } = require("../../db");

async function upload_product(req,res) {

    let {constantData, dynamicData}= req.body;

    Object.keys(dynamicData).forEach(key => {
        if (dynamicData[key] === '') {
          delete dynamicData[key];
        }
    });

    let date = new Date();
    let productId = shortId.generate()
    let imageId = shortId.generate();
    let book = []

    let replacedDescription = constantData.description.replace(/'/g, '"');
    let replacedTitle = constantData.title.replace(/'/g, '"');

    let meta_data_respons = await upload_meta_data(replacedTitle,replacedDescription,constantData.category,constantData.price,constantData.seller_id,productId,dynamicData)
    
    if(meta_data_respons){
        let photoresponse = upload_photos(productId, constantData.seller_id, constantData.photos, imageId)
        
        if(photoresponse){
            res.send(true)
        }
    }

    
    // console.log(data)
    
}

module.exports={
    upload_product
}