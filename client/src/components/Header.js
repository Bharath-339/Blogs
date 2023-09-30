import { NavLink, useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Header() {

  const {setUserInfo , userInfo} = useContext(UserContext);
  const username = userInfo?.userName;

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://10.5.6.225:4000/profile", {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]); 

  async function logout(){
   const res = await fetch("http://10.5.6.225:4000/logout",{
      credentials : "include",
      method : "POST"
    })

    if(res.ok){
      setUserInfo({});
      navigate('/login',{replace : true})
    }
  }

  return (
    <header>
      <NavLink to="/" className="logo">
        MyBlog
      </NavLink>
      <nav>
        {username && (
          <>
            <NavLink to="/create">Create new Post</NavLink>
            <span onClick={logout}>Logout</span>
          </>
        )}

        {!username && (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
