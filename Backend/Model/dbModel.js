const mongoose=require('mongoose')

mongoose.set('strictQuery', true);
//Creating database collection
mongoose.connect("mongodb://127.0.0.1:27017/react").then(()=>{

console.log("Database running successfully")
}).catch((err)=>{

    console.log(err)
})
