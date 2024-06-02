const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    searchHistory:[{
            title : String,
            
        }
    ]
})

userSchema.pre("save", async function (next) {
    const user = this

    if (!user.isModified("password")) {
        return next()
    }
    try {
        user.password = await bcrypt.hash(user.password, 10)
        next()
    } catch (error) {
        return next(error)
    }
})

module.exports = mongoose.model('User', userSchema)