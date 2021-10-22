const express= require("express");
const {randomBytes} = require("crypto");
const cors= require("cors")

const app=express();
app.use(express.json()); 
app.use(cors());


const commentsByPostId={}

app.get("/post/:id/comment",(req,res) => {
    res.send(commentsByPostId[req.params.id] || []);
})

app.post("/post/:id/comment",(req,res) => {
    const id = randomBytes(4).toString('hex');
    const content = req.body.content;

    const comments=commentsByPostId[req.params.id];
    if (comments){
        comments.push({id,content});
    } else {
        commentsByPostId[req.params.id]=[{id,content}];
    }
    res.status(201).send(commentsByPostId[req.params.id]);
})

app.listen(3001, () => {
    console.log("Running at port 3001!");
})