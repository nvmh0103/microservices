const mongoose = require("mongoose");
mongoose.connect('mongodb://10.44.3.35:27017/comments',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(message =>{
    console.log("connect successfully")
}).catch(e => {
    console.log(e);
})
