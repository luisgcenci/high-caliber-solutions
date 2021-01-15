const fs = require('fs');
const path = require('path');
const multer = require('multer');
require('dotenv/config');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
})

const upload = multer({storage:storage});

module.exports = upload;
