const user = require('../models/user')


async function handleSignup(req,res){
    const body = req.body
    try {
        await user.create({
            name: body.name,
            email: body.email,
            password: body.password
        })
    } catch (error) {
        console.log("Error: ", error);
    }

    return res.redirect("/user/login")
} 


    async function handleLogin(req,res){
        const { email, password } = req.body
    
        try {
            const token = await user.comparePasswordAndReturnToken(email, password)
            if (!token) {
                throw new Error("token is missing")
            }
            return res.cookie("token",token).redirect('/')
        } catch (error) {
            res.render("loginForm",{error: "incorrect email or password"})
        }
    }


    async function handleLogout(req,res){
        return res.clearCookie('token').redirect("/")
    }


    module.exports = {handleSignup , handleLogin , handleLogout}