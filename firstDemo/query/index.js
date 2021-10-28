const express= require("express");
const cors = require("cors");
const app=express();
app.use(express.json()); 
app.use(cors());

var posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
})

app.post('/events', (req,res) => {
    const {type, data } = req.body;
    if (type == "PostCreated"){
        const {id,title} = data;
        posts[id] = {id, title, comment:[]};
    }

    if (type == "CommentCreated"){
        const {id,postId, content, status} = req.body.data;
        const post = posts[postId];
        const newComment = {id,content, status};
        post.comment.push(newComment);
    }

    if (type == "CommentUpdated"){
        const {id, postId, content, status} = req.body.data;
        const post = posts[postId];
        const comments = post.comment.find(item => {
            return item.id == id;
        });
        comments.status = status;
        comments.content = content;
    }

    res.send({});
})

app.listen(3002, () =>{
    console.log("Running on port 3002!");
})