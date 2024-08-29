const book = require("../models/book")
const category = require("../models/category")
const user = require("../models/user")

const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const path = require("path")
//multer

async function renderBooks(req,res){
    let reqUser;
    if (req.user) {
        reqUser = req.user
    }
  
    

    const allBooks = await book.find()
    const categories = await category.find() 
    return res.render("books",{books: allBooks, categories, user: reqUser})
}

async function renderAbook(req,res){

    let reqUser;
    if (req.user) {
        reqUser = req.user
    }

    const bookName = req.query.book
    const categories = await category.find() 
    const Book = await book.findOne({ name: bookName })
    return res.render("aBook",{ Book , categories ,  user: reqUser})
}




async function handleBookUpload(req,res){
    try { 
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const filePath = path.join('public/uploads', req.file.filename);

        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'books',
            resource_type: 'image' // Specify the resource type as 'image'
        });

       
        const newBook = await book.create({
            name: req.body.name,
            author: req.body.author,
            coverPhoto: result.secure_url, 
        });

        await newBook.save();

        fs.unlinkSync(filePath);

        res.redirect('/books');
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).send('Error uploading file.');
    }
}

async function submitReview(req,res){

    if(!req.user){
      return res.render("loginForm",{error : "Please Login to give a review."})
    }

    const name = req.user.name
    
    const {review} = req.body
    const bookName = req.query.book
    
    const bookToSubmitReview = await book.findOne({name : bookName})
    bookToSubmitReview.reviews.push({content : review, commenter: name  /*here will be the users name*/ })

    await bookToSubmitReview.save();

    return res.redirect(req.get('referer'))
}

module.exports = { handleBookUpload , renderBooks , renderAbook , submitReview ,}