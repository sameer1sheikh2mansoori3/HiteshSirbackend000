const multer = require('multer');

// Configure storage for uploaded files (adjust as needed)
const storage = multer.diskStorage({
  destination: './public/.temp',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage });

module.exports = upload;
