const book = require("../models/book")
const category = require('../models/category')

async function searchBooks(req,res){
    let reqUser;
    if (req.user) {
        reqUser = req.user
    }
    try {
        const query = req.query.q; 

        const regex = new RegExp(query, 'i'); 
        const qBooks = await book.find({ name: { $regex: regex } }); 
        
        const uniqueCategories = [...new Set(qBooks.map(book => book.category))];
         
        const categories = await category.find({ name: { $in: uniqueCategories } });
   
        const qBooksCategory = categories.map(cat => ({
            name: cat.name,
            coverPhoto: cat.photo
        }));

       res.render("categoriesAndBooks",{books: qBooks,categories, user: reqUser})
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}


module.exports = {searchBooks}
