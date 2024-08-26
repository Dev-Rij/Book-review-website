const {Schema, model} = require("mongoose")

const reviewSchema = new Schema({
    content: {
        type : String,
        required: true
    },
    commenter: {
        type: String,
        required : true
    }
})

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    coverPhoto: {
        type: String,
        rquired: true
    },
    reviews: [reviewSchema],
    category: {
        type: String,
        required: false
    }
},{timestamps: true})


const book = model('book',bookSchema)

module.exports = book