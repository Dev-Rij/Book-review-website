const jwt = require("jsonwebtoken")
const secret = "$uperman123"

async function createJWTToken(theUser) {

    const payload = {
        _id: theUser._id,
        name: theUser.name
    }
    

    const token = jwt.sign(payload, secret)
    return token

}

async function crackTheJWTToken(token) {
    const payload = await jwt.verify(token, secret)
    
    return payload
}

module.exports = { crackTheJWTToken, createJWTToken }