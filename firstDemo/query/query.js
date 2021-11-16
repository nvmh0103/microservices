const mongoose=require('mongoose');

const querySchema=new mongoose.Schema({
       id:{
           type: String
       },
       title:{
           type: String
       },
       comment:[{
           content:{
               type: String
           },
           status:{
               type: String
           },
           id:{
               type: String
           }
       }]
},{
    timestamps:true,
})



const query= mongoose.model('Query',querySchema);
module.exports = query;