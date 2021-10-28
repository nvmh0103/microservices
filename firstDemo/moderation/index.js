const express= require("express");
const cors = require("cors");
const app=express();
const axios = require('axios')
app.use(express.json()); 
app.use(cors());



app.post('/events', async (req, res) => {
    const {type, data} = req.body;
    var status;
    if (type == "CommentCreated"){
        const content = data.content;
        if (content.includes('orange')){
            status = 'rejected';
        } else {
            status = 'approved';
        }

        await axios.post('http://localhost:4005/events',{
            type: "CommentModerated",
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content,
            }
        })
    }
    res.send({});
})



app.listen(4003, () =>{
    console.log("Running on port 4003!");
})