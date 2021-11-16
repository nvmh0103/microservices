const express= require("express");
const {randomBytes} = require("crypto");
const cors = require("cors");
const axios = require("axios");
require('./db');
const post = require("./post");




const app=express();
app.use(express.json()); 
app.use(cors());


app.get("/post", async (req,res) => {
    const posts = await post.find();
    return res.send(posts);
})

app.post("/post/create", async (req,res) => {

    const Post = new post(req.body);
    await Post.save();
    const request=await axios.post("http://event-bus-srv:4005/events",{
        type: "PostCreated",
        data: Post,
    });
    res.status(201).send(Post);
})

app.post('/events', (req,res) => {
    res.send({message: "Success"});
})

app.listen(8000, () => {
    console.log("Running at port 8000!");
})