import React, { useContext, useState } from "react";
import {Navigate} from "react-router-dom"
import styles from "./LoginPage.module.css";
import { UserContext } from "../contexts/UserContext";

export default function LoginPage() {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [redirect , setRedirect] = useState(false);

  const {setUserInfo} = useContext(UserContext)

  async function login(e){
    e.preventDefault();
   
    const response =   await fetch('http://10.5.6.225:4000/login',{
      method  : 'POST',
      body : JSON.stringify({userName ,password}),
      headers : {'Content-Type' : 'application/json'},
      credentials : 'include'
    })

    if(response.ok){
      response.json().then((userInfo) =>{
        setUserInfo(userInfo)
        setRedirect(true);
      })
    }else{
      alert("wrong credentials")
    }
}

  if(redirect){
    return <Navigate to={'/'}/>
  }
  return (
    <div className={styles.main}>
      <div className={styles.innerdiv}>
        <form onSubmit={login}>
          <div>
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              placeholder="userName"
              id="userName"
              value={userName}
              onChange={(e) => {
                setuserName(e.target.value);
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
                setpassword(e.target.value);
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
