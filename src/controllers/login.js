const User = require("../models/userMode")
const asyncHandler = require("../utils/asyncHandler")
const  logIn = async(req , res)=>{

  try {

    console.log("herer")
    const {username , email , password} = req.body;

  const userExisted = await User.find({
    $or: [
      { username: username },
      { email: email }
    ]
  }).select("-password")
  console.log(userExisted)

//   const response =   userExisted.isPasswordCorrect(password);
  
    
    
  } catch (error) {
    console.log(error.message)
  }

}

