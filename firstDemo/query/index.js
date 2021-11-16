const express= require("express");
const cors = require("cors");
const app=express();
const axios = require("axios");
require("./db");
const query = require("./query");
app.use(express.json()); 
app.use(cors());


app.get('/posts', async (req, res) => {
    const Query = await query.find();
    res.send(Query);
})

const handleEvent= async (type,data) => {
    if (type == "PostCreated"){
        const {title, _id} = data;
        const newData = {
            title,
            id: _id,
        }
        const Query= new query(newData);
        await Query.save() 
    }

    if (type == "CommentCreated"){
        const {_id,postId, content, status} = data;
        const Query = await query.findOne({id:postId});
        const newComment = {
            content,
            status,
            id:_id,
        }
        if (!Query.comment){
            const newData = [];
            newData.push(newComment);
        } else {
            Query.comment.push(newComment);
        }
         await Query.save();
    }

    if (type == "CommentUpdated"){
        const {_id, postId, content, status} =data;
        const Query = await query.findOne({id:postId});
        const comment = Query.comment.filter(item => {
            return item.id == _id;
        })
        comment[0].status = status;
        comment[0].content = content;
        await Query.save();
    }
}

app.post('/events', (req,res) => {
    const {type, data } = req.body;
    handleEvent(type,data);

    res.send({});
})

app.listen(3002, async () =>{
    console.log("Running on port 3002!");

    // const res = await axios.get('http://localhost:4005/events');
    // for (let event of res.data){
    //     console.log("Processing event:", event.type);
    //     handleEvent(event.type, event.data);
    // }
})