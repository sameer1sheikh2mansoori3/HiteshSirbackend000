const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/userMode");
const z = require("zod");
const   ApiResponse  = require("../utils/apiResponse")
const ApiError = require("../utils/customError");
const uploadOnCloudinary = require("../utils/cloudinary")
const cookieParser = require("cookie-parser")
const userSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot be longer than 20 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email format" }),
  // Consider backend validation for uniqueness
  fullName: z
    .string({ required_error: "Full name is required" })
    .trim()
    .min(1, "fullname must be at least 3 characters long"),
  // avatar: z.string({ required_error: 'Avatar URL is required' }), // URL validation
  // coverImage: z.string().optional(), // Allow optional cover image
  // watchHistory: z.array(z.string()), // Assume string IDs from Video collection
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long"),
  // refreshToken: z.string().optional(), // Allow optional refresh token
});

const generateToken = async(userId)=>{
    
    const userData = await User.findById(userId);
    
  const accessToken = await userData.generateAccessToken();
  const refreshToken = await userData.generateRefreshToken();
 

  userData.accessToken = accessToken;
  userData.refreshToken = refreshToken;
  userData.save();
  return {accessToken , refreshToken};

}
const register = asyncHandler(async (req, res) => {
    const {fullName, email, username, password } = req.body
    console.log("email: ", email);

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    //console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
   

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )


})

const  logIn = asyncHandler(async(req , res)=>{
    const {username , email , password} = req.body;

  const userExisted = await User.findOne({
    $or: [
      { username: username },
      { email: email }
    ]
  })

  console.log(userExisted)
  const {accessToken , refreshToken} =  await generateToken(userExisted._id);
// user.accessToken = accessToken


//   const response =   userExisted.isPasswordCorrect(password);
const loggedInUser = await User.findById(userExisted._id).select("-password -refreshToken")
const options = {
    httpOnly: true,
    secure: true
}
 res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json(
    new ApiResponse(
        200, 
        {
            user: loggedInUser, accessToken, refreshToken
        },
        "User logged In Successfully"
    )
)
    

})

const logOut = async(req , res)=>{
  const user = req.user;
  const userExisted = await User.findByIdAndUpdate( req.user._id,
    {
        $unset: {
            refreshToken: 1 // this removes the field from document
        }
    },
    {
        new: true
    });


    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
    

}
module.exports ={register,logIn,logOut };
