import React, { useContext, useEffect, useState } from "react";
import styles from "./PostPage.module.css";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function PostPage() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false)
  const { createdAt ,author} = post;
  const { id } = useParams();


  const {userInfo} = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    fetch(`http://10.5.6.225:4000/post/${id}`).then((res) => {
      res.json().then((post) => {
        setPost(post);
        setLoading(false);
      });
    });
  }, []);

  if(loading){
    return <div className={styles.loading}>Loding ......</div>
  }



  return (
    <div className={styles.PostPage}>
      <h1 className={styles.heading}> {post.title}</h1>
      <div className={styles.info}>
        <time>{createdAt?.split("T")[0]}</time>

        <p>by @{post.author?.userName}</p>

        {/* { author._id === userInfo.id  ? <Link to={`/edit/${post._id}`} className={styles.editButton}> Edit this post</Link> : "" }  */}
        
      </div>
      <div className={styles.banner}>
        <img src={`http://10.5.6.225:4000/${post.cover}`} alt="postimage" />
      </div>
      <div className={styles.content}>
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </div>
    </div>
  );
}


