const jwt = require('jsonwebtoken')

exports.createJWT = (payload, secretKey, expiresIn) =>{
    if(typeof payload !== "object" || !payload){
        throw new Error("Payload must be a non empty object")
    }
    if(typeof secretKey !== "string" || !secretKey){
        throw new Error("Secret Key must be non empty")
    }
    try {
        const token = jwt.sign(payload, secretKey, {expiresIn});
        return token;
    } catch (error) {
        console.log("failed to generate JWT", error);
        throw error
    }
}