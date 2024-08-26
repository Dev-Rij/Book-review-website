const { Router } = require("express")

const router = Router()

const {handleSignup, handleLogin, handleLogout} = require('../controllers/user')

router.get('/signup',(req,res)=>{
    res.render("signupForm")
})

router.get("/login",(req,res)=>{
    res.render('loginForm')
})

router.post("/login",handleLogin)

router.post("/signup",handleSignup)

router.get("/logout",handleLogout)


module.exports = router