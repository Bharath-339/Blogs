import React from "react";
import { Link } from "react-router-dom";

export default function Post({ title, summary, cover, createdAt, author, _id }) {
  return (
    <Link to={`/post/${_id}`}>
      <div className="post">
        <div className="image">
          <img src={`http://10.5.6.225:4000/${cover}`} alt="sample" />
        </div>

        <div className="content">
          <h2>{title}</h2>

          <p className="info">
            <a className="author" href="/">
              {author?.userName}
            </a>
            <time>{createdAt.split("T")[0]}</time>
          </p>

          <p className="summary">{summary}</p>
        </div>
      </div>
    </Link>
  );
}
