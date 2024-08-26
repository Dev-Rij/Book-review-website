const {Schema, model} = require("mongoose")

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    coverPhoto: {
        type: String,
        required: true
    }
},{timestamps:true})


const category = model('category',categorySchema)

module.exports = category