const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema({
   content:{
       type: String,
   },
   postId:{
       type: String,
   },
   status:{
       type: String,
   },
   commentId:{
       type: String,
   }
},{
    timestamps:true,
})



const comment= mongoose.model('Comment',commentSchema);
module.exports = comment;