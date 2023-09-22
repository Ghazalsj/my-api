import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [post1, setPost1] = useState([]);
  const [post1Comments, setPost1Comments] = useState([]);
  
  const [commentsByPostId, setCommentsByPostId] = useState([]);
  const [newPostResponse, setNewPostResponse] = useState(null);
  const [putResponse, setPutResponse] = useState(null);
  const [patchResponse, setPatchResponse] = useState(null);
  const [deleteResponse, setDeleteResponse] = useState(null);





  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);



  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        setPost1(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1/comments')
      .then(response => {
        setPost1Comments(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/comments?postId=1')
      .then(response => {
        setCommentsByPostId(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  useEffect(() => {
    const newPostData = {
      title: 'New Post',
      body: 'This is a new post.',
      userId: 1, 
    };
    axios.post('https://jsonplaceholder.typicode.com/posts', newPostData)
      .then(response => {
        setNewPostResponse(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const updatedPostData = {
      title: 'Updated Post',
      body: 'This post has been updated.',
    };

    axios.put('https://jsonplaceholder.typicode.com/posts/1', updatedPostData)
      .then(response => {
        setPutResponse(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

 
  useEffect(() => {
    const patchedPostData = {
      body: 'This post has been partially updated.',
    };

    axios.patch('https://jsonplaceholder.typicode.com/posts/1', patchedPostData)
      .then(response => {
        setPatchResponse(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios.delete('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        setDeleteResponse(response.status === 200 ? 'Post deleted successfully' : 'Deletion failed');
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <section>
        <h2>GET /posts</h2>
        <ul>
          {posts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>GET /posts/1</h2>
        {post1 && (
          <div>
            <h3>Title: {post1.title}</h3>
            <p>Body: {post1.body}</p>
          </div>
        )}
      </section>

      <section>
        <h2>GET /posts/1/comments</h2>
        <ul>
          {post1Comments.map(comment => (
            <li key={comment.id}>{comment.body}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>GET /comments?postId=1</h2>
        <ul>
          {commentsByPostId.map(comment => (
            <li key={comment.id}>{comment.body}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>POST /posts</h2>
        {newPostResponse && (
          <div>
            <h3>New Post ID: {newPostResponse.id}</h3>
            <p>Title: {newPostResponse.title}</p>
            <p>Body: {newPostResponse.body}</p>
          </div>
        )}
      </section>
      <section>
        <h2>PUT /posts/1</h2>
        {putResponse && (
          <div>
            <p>Updated Post:</p>
            <p>Title: {putResponse.title}</p>
            <p>Body: {putResponse.body}</p>
          </div>
        )}
      </section>
      <section>
        <h2>PATCH /posts/1</h2>
        {patchResponse && (
          <div>
            <p>Updated Post (Partial):</p>
            <p>Body: {patchResponse.body}</p>
          </div>
        )}
      </section>

      <section>
        <h2>DELETE /posts/1</h2>
        <p>{deleteResponse}</p>
      </section>
    </div>
  );
}
export default App;

