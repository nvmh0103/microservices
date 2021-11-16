const mongoose = require("mongoose");
mongoose.connect('mongodb://10.44.2.3:27017/comments',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(message =>{
    console.log("connect successfully")
}).catch(e => {
    console.log(e);
})
