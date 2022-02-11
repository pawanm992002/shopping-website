const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/customer")
.then(()=>{
    console.log(`database connected successfull`)
}).catch(()=>{
    console.log(`database not connected`)
})