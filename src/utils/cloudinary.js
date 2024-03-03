const cloudinary = require('cloudinary');
const fs = require("fs");    
cloudinary.config({ 
  cloud_name: 'dj0hx0vtm', 
  api_key: '812662848193686', 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async(localPath)=>{

    try {

        if( !localPath )return null;
        const response = await cloudinary.uploader.upload(localPath,{
            resource_type:"auto"
        });
        console.log(`we have uploaded ${response.url}`)
        
    } catch (error) {
        
    }


}