const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/comments',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(message =>{
    console.log("connect successfully")
}).catch(e => {
    console.log(e);
})
