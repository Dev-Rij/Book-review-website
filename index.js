require('dotenv').config();

//modules from node
const express = require("express")
const path = require("path")
const app = express()
const cookieParser = require("cookie-parser")

//my custom functions
const connectMongoDb = require("./connection")
const checkForAuthentication = require("./middlewares/auth")


//Routers
const categoriesRouter = require("./routes/categories")
const booksRouter = require('./routes/books')
const searchRouter = require('./routes/search')
const userRouter = require("./routes/user")

//models
const category = require("./models/category")



connectMongoDb(process.env.MONGODB_URI)

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"public")))
app.use(checkForAuthentication("token"))


app.get("/",async (req,res)=>{
   let reqUser = req.user 
   const categories = await category.find() 
   return res.render("home",{categories , user:reqUser})
})

app.use("/user",userRouter)
app.use('/categories',categoriesRouter)
app.use('/books',booksRouter)
app.use('/search',searchRouter)




app.listen(process.env.PORT,()=>{
    console.log("running on port ",process.env.PORT);
    
})