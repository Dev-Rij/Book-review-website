const mongoose = require("mongoose")

async function connectMongoDb(uri){
    await mongoose.connect(uri).then(()=>{
        console.log("MongoDB connected succesfully!");
    })
}


module.exports = connectMongoDb