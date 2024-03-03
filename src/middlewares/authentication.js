const jwt = require("jsonwebtoken");
const User = require("../models/userMode");
const ApiError = require("../utils/customError");
const authentication = async(req,_,next)=>{
    try {
        const accessToken = req.cookies?.accessToken ;
       const data =  jwt.verify(accessToken , process.env.ACCESS_TOKEN_SECRET)
    //    console.log(data);

       const userExisted = await User.findById(
            data._id
       )
       if(! userExisted ){
        throw new ApiError(500 , "user is not loggedIn");
       }
       req.user= userExisted;
       next();
       
    } catch (error) {
        console.log(error)
    }
  

}

module.exports = authentication;