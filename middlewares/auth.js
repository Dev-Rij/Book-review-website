const { crackTheJWTToken } = require("../services/auth")

function checkForAuthentication(cookieName){
    return async (req,res,next)=>{      
        const cookieValue = req.cookies[cookieName]
     
        if(!cookieValue){
           return next()
        }

        try {
            const userPayLoad = await crackTheJWTToken(cookieValue)
            req.user = userPayLoad
            next()
        } catch (error) {
            return next()
        }
    }
}

module.exports = checkForAuthentication