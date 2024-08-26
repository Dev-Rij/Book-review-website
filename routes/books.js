const {Router} = require('express')

const router = Router()
const multer = require('multer');
const path = require('path');

// Set up disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads'); // Directory to save files temporarily
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Filename with timestamp
    }
});

const upload = multer({ storage });

const {handleBookUpload , renderAbook , renderBooks , submitReview ,} = require("../controllers/book")

const checkForAuthentication = require('../middlewares/auth')

router.get('/',renderBooks)

router.get('/card',renderAbook)

router.post('/submit-review',checkForAuthentication("token"),submitReview)

router.post('/upload-book',checkForAuthentication("token"),
    (req,res,next)=>{
        if(!req.user){
           return res.render("loginForm",{error: "please login to upload book"})
        }
        next() 
    },upload.single('coverPhoto'),handleBookUpload)

module.exports = router


