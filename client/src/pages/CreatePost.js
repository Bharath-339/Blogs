import { useState } from "react";
import styles from "./CreatePost.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files , setFiles] = useState('');
  const navigate = useNavigate();

  async function createNewPost(e){
    e.preventDefault();
    const data = new FormData();
    data.set('title' , title);
    data.set('summary' , summary)
    data.set('content' , content)
    data.set('file' , files[0])

    const response = await fetch('http://10.5.6.225:4000/post/create',{
      method : 'POST',
      body : data,
      credentials : "include"
    })

    if(response.ok){
        navigate("/",{replace : true});
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={createNewPost}>
        <input
          type="title"
          placeholder="Title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Summary"
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}  required
        />

        <input
          type="file"
          placeholder="select a file"
          id="img"  required
          onChange={e => setFiles(e.target.files)}
        />

        <ReactQuill
          theme="snow"
          value={content}
          modules={modules}
          formats={formats}
          onChange={newvalue => setContent(newvalue) }  required
        />
        <button className={styles.button}>Create Post</button>
      </form>
    </div>
  );
}
