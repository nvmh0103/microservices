const express= require("express");
const {randomBytes} = require("crypto");
const cors= require("cors");
const axios = require("axios");

const app=express();
app.use(express.json()); 
app.use(cors());


const commentsByPostId={}

app.get("/post/:id/comment",(req,res) => {
    res.send(commentsByPostId[req.params.id] || []);
})

app.post("/post/:id/comment", async (req,res) => {
    const id = randomBytes(4).toString('hex');
    const content = req.body.content;

    const comments=commentsByPostId[req.params.id];
    if (comments){
        comments.push({id,content, status: "pending"});
    } else {
        commentsByPostId[req.params.id]=[{id,content, status: "pending"}];
    }
    await axios.post("http://localhost:4005/events",{
        type:"CommentCreated",
        data:{
            id,
            content,
            postId: req.params.id,
            status: "pending"
        }
    })
    res.status(201).send(commentsByPostId[req.params.id]);
})

app.post('/events', async (req, res) => {
    console.log("Received event: ", req.body);
    const {type, data} = req.body;
    if (type == "CommentModerated"){
        const {postId, id, status, content} = data;
        console.log(postId);
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment =>{
            return comment.id == id;
        });
        comment.status = status;
        await axios.post('http://localhost:4005/events', {
            type: "CommentUpdated",
            data: {
                id,
                postId,
                content,
                status,
            }
        })
    }
    res.send({});
})

app.listen(3001, () => {
    console.log("Running at port 3001!");
})