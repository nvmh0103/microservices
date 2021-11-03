const express= require("express");
const cors = require("cors");
const app=express();
const axios = require("axios");
app.use(express.json()); 
app.use(cors());

var posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
})

const handleEvent= (type,data) => {
    if (type == "PostCreated"){
        const {id,title} = data;
        posts[id] = {id, title, comment:[]};
    }

    if (type == "CommentCreated"){
        const {id,postId, content, status} = data;
        const post = posts[postId];
        const newComment = {id,content, status};
        post.comment.push(newComment);
    }

    if (type == "CommentUpdated"){
        const {id, postId, content, status} =data;
        const post = posts[postId];
        const comments = post.comment.find(item => {
            return item.id == id;
        });
        comments.status = status;
        comments.content = content;
    }
}

app.post('/events', (req,res) => {
    const {type, data } = req.body;
    handleEvent(type,data);

    res.send({});
})

app.listen(3002, async () =>{
    console.log("Running on port 3002!");

    const res = await axios.get('http://event-bus-srv:4005/events');
    for (let event of res.data){
        console.log("Processing event:", event.type);
        handleEvent(event.type, event.data);
    }
})