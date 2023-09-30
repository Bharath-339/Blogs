import React, { useState } from "react";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function register(e){
      e.preventDefault();
     
      const response =   await fetch('http://10.5.6.225:4000/register',{
        method  : 'POST',
        body : JSON.stringify({userName , name,password}),
        headers : {'Content-Type' : 'application/json'}
      })

      if(response.status === 200){
          alert('registration successful')
      }else{
          alert("registration failed");
      }
      
  }

  return (
    <div className={styles.main}>
      <div className={styles.innerdiv}>
        <form onSubmit={register}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="name"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="userName">UserName</label>
            <input
              type="text"
              placeholder="userName"
              id="username"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className={styles.buttonDiv}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}































