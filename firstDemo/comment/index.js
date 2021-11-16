const express= require("express");
const {randomBytes} = require("crypto");
const cors= require("cors");
const axios = require("axios");
require('./db')
const comment = require("./comment");

const app=express();
app.use(express.json()); 
app.use(cors());


const commentsByPostId={}

app.get("/post/:id/comment",async (req,res) => {
    const postId = req.params.id;
    const comments = await comment.find({postId});
    return res.send(comments);
})

app.post("/post/:id/comment", async (req,res) => {
    const commentsData={
        content: req.body.content,
        postId: req.params.id,
        status: "pending",
    }
    const Comment = new comment(commentsData);
    await Comment.save();
    await axios.post("http://event-bus-srv:4005/events",{
        type:"CommentCreated",
        data: Comment
    })
    res.status(201).send(commentsData);
})

app.post('/events', async (req, res) => {
    const {type, data} = req.body;
    if (type == "CommentModerated"){
        const Comment = await comment.findById(data._id);
        Comment.status = data.status;
        await Comment.save();
        await axios.post('http://event-bus-srv:4005/events', {
            type: "CommentUpdated",
            data: Comment,
        })
    }
    res.send({});
})

app.listen(3001, () => {
    console.log("Running at port 3001!");
})