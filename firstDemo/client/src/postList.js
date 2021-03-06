import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CommentCreate from './commentCreate';
import CommentList from './commentList';


export default () => {
    const [posts, setPosts] = useState({});

    const fetchPosts= async () => {
        const res= await axios.get('http://34.124.220.225/posts');
        setPosts(res.data);
    }

    useEffect(() => {
        fetchPosts();
    },[]);

    const renderPosts= Object.values(posts).map((post) => {
        return <div className="card" style={{width: '30%', marginBottom: '20px'}} key={post.id}>
            <div className="card-body">
                <h3>{post.title}</h3>
                <CommentList comments= {post.comment}/>
                <CommentCreate postId={post.id}/>
            </div>
        </div>
    })
    return <div className="d-flex flex-row flex-wap justify-content-between">
        {renderPosts}
    </div>   
}