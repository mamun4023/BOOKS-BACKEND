const mongoose = require('mongoose')


try{
    mongoose.connect(process.env.DB_URL)
    console.log("DB Connected")
}catch(err){
    console.log(err)
}

