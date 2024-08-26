const category = require("../models/category")
const book = require("../models/book")

async function renderCategories(req,res){

    let reqUser;
    if (req.user) {
        reqUser = req.user
    }

    if (req.query.explore) {
        const category = req.query.explore
        const books = await book.find({category: category})
        return res.render("books",{books})
    }

    const categories = await category.find()
    return res.render('categories',{categories , user: reqUser})
    }


module.exports = {renderCategories}
