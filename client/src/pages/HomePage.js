import React, { useEffect, useState } from 'react'
import Post from '../components/Post'

export default function HomePage() {
    const [posts , setPosts] = useState([]);

    useEffect(()=>{
      fetch('http://10.5.6.225:4000/all/posts').then((res)=>{
        res.json().then(posts =>{
          setPosts(posts);
        })
      })

    },[])

  return (
    <div>
      {posts.length > 0  && posts.map((post) => (
        <Post {...post}  key = {post._id}/>
      ))}
    

  </div>
  )
}
