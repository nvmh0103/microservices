const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
   title:{
       type: String,
   },
   id:{
       type: String
   }
},{
    timestamps:true,
})



const post= mongoose.model('Post',postSchema);
module.exports = post;