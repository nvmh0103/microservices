const mongoose = require("mongoose");
mongoose.connect('mongodb://10.44.0.2:27017/posts',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(message =>{
    console.log("connect successfully")
}).catch(e => {
    console.log(e);
})
