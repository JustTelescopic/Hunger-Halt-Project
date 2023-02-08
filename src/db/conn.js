const mongoose = require("mongoose")
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://0.0.0.0:27017/hungerhalt" , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,

}).then(() =>{
    console.log(`connection successful`)
}).catch((e) => {
    console.log(e)
})