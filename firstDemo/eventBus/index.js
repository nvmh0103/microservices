const express= require("express");
const {randomBytes} = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app=express();
app.use(express.json()); 
app.use(cors());

const events = [];

app.post('/events', async (req,res) => {
    const event = req.body;
    events.push(event);
    await axios.post("http://posts-clusterip-srv:8000/events",event); // post
    await axios.post("http://comments-srv:3001/events",event); // comment
    await axios.post("http://query-srv:3002/events",event); // query
    await axios.post("http://moderation-srv:4003/events",event); // moderation


    res.send({
        status: "OK",
    });
});

app.get('/events', (req, res)=>{
    try{
        return res.send(events);
    } catch (e){
        return res.status(400).send(e);
    }
})


app.listen(4005, () => {
    console.log("Listening on 4005!");
})