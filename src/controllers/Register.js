const asyncHandler = require("../utils/asyncHandler");
const User = require('../models/userMode')
const register = asyncHandler(async(req,res)=>{
        const data =  await User.create(req.body);
          res.status(200).json({
            "data":data,
            "message":"we have created user"
          })
})

module.exports = register;