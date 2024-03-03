const express = require("express");
const app = express();

const connectDatabase = require('./db.js')
const router = require('./routes/Router.js')
const cookieParser = require("cookie-parser")
const upload = require('./middlewares/multer.js')

// adding some multer issues


// // //  ending some multer issues
// connectDatabase();
//we are adding middlewares
app.use(express.json());

// app.use("/api/v1", router)
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
// app.use(upload.fields([ {
//     name: "avatar",
//     maxCount: 1
// }, 
// {
//     name: "coverImage",
//     maxCount: 1
// }])); 
app.use("/api/v1",router)
// // // app.post("/api/v1/register",async(req,res)=>{
// // //     console.log(req.body)

// // // })

module.exports = app;
// const express = require('express');
// const multer = require('multer');

// const app = express();

// // Configure storage for uploaded files (modify as needed)
// const storage = multer.diskStorage({
//   destination: './public/temp',
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
//   }
// });
// const upload = multer({ storage });

// // Ensure correct middleware placement
// app.use(upload.fields([{
//     name:"avatar",
//     maxCount:1
// },{
//     name:"imageUrl",
//     maxCount:1
// }])); // Replace 'myFile' with your actual field name

// app.post('/api/v1/users/register', (req, res) => {
//   console.log(req.body); // Log the entire body object
//   console.log('File:', req.file); // Log the uploaded file object (if applicable)

//   if (req.body.name) { // Check if the 'name' field exists
//     console.log('Name:', req.body.name); // Access the value of the 'name' field
//   }

//   // Process data and send response
//   res.json({ message: 'Data received!' });
// });

// app.listen(3000, () => console.log('Server listening on port 3000'));
