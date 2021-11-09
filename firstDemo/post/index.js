const express= require("express");
const {randomBytes} = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app=express();
app.use(express.json()); 
app.use(cors());

const post={};
app.get("/post",(req,res) => {
    res.send(post);
})

app.post("/post/create", async (req,res) => {
    const id = randomBytes(4).toString('hex');

    const title = req.body.title;
    post[id]={
        id,title
    };

    const request=await axios.post("http://event-bus-srv:4005/events",{
        type: "PostCreated",
        data: {
            id,
            title,
        }
    });
    res.status(201).send(post[id]);
})

app.post('/events', (req,res) => {
    console.log("Received event:" , req.body);
    res.send({message: "Success"});
})

app.listen(8000, () => {
    console.log("Running at port 8000!");
})