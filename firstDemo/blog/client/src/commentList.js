import React, {useState,useEffect} from 'react'
import axios from 'axios'

export default ({postId}) => {
    const [comments, setComments] = useState([]);

    const fetchData= async () =>{
        const res = await axios.get(`http://localhost:3001/post/${postId}/comment`);

        setComments(res.data);
    }

    useEffect(() => {
        fetchData();
    },[]);

    const renderedComment = comments.map( comment => {
        return <li key={comment.id}>{comment.content}</li>
    });

    return <ul>
        {renderedComment}
    </ul>
}