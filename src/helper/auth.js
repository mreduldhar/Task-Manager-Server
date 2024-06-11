const bcrypt = require('bcrypt');

// Function to hash a password
exports.hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        // Generate a salt with 10 rounds
        bcrypt.genSalt(10, (err, salt) =>{
            if(err){
                reject(err)
            }
            // Hash the password with the generated salt
            bcrypt.hash(password, salt, (err, hash)=>{
                if(err){
                    reject(err)
                }
                resolve(hash)
            })
        })
    })  
}

// Function to compare a plain password with a hashed password
exports.comparePassword = (password, hashedPass) => {
    return bcrypt.compare(password, hashedPass)
}

