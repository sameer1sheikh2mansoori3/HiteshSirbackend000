const express = require('express');
const router = express.Router();
const {register,logIn,logOut} = require("../controllers/Register")

const upload = require('../middlewares/multer');
const authentication = require('../middlewares/authentication');
router.post("/register",register);
router.post("/logIn", upload.fields([{
    name:"Avatar",
    maxCount:1
},
{
    name:"coverImage",
    maxCount:1
}]),logIn);
router.post("/logOut", authentication , logOut);
module.exports = router;