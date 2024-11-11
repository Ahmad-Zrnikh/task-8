import { useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import "./Login.css"
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slice/authSlice";
import axios from "axios";
export default function Login() {
    const navigate = useNavigate();

    const dispatch = useDispatch(); // Access the Redux dispatch function

const [email, setemail] = useState("");
const [password, setpassword] = useState("");
const send = (event) => {
    event.preventDefault();
    // fetch("https://test1.focal-x.com/api/login" ,{ 
    //     method : "POST",
    //     headers : { 'Content-Type': 'application/json' },
    //     body : JSON.stringify({email,password})
    // } 
    
    // ).then(res => res.json())
    // .then(res =>{localStorage.setItem("token" , res.token)
    //     console.log(res.user)
    //      dispatch(setUser(res.user))
    // navigate("/")})
    // .catch(err => console.log(err))

axios.post("https://test1.focal-x.com/api/login" ,{
    email,
    password
} , {
    headers : {
        "Content-Type" : "application/json"
    }
} ).then(res =>{
    const user = res.data;
    localStorage.setItem("token" , user.token);
    localStorage.setItem("image" , user?.user.profile_image_url)
    localStorage.setItem("name" , user?.user.user_name )
      dispatch(setUser(user))
navigate("/items")})
.catch(err => console.log(err))
}
  return (
    
    <div className="login">
        <form onSubmit={(event) => send(event)}>
            <div className="title">
               <div><img src="images/Logo.png"  /></div>
               <p className="title1">SIGN IN</p>
               <p className="text">Enter your credentials to access your account</p>  
            </div>
          
        <label htmlFor="email">email</label>
        <input type="email" id="email" onChange={(event)=>{setemail(event.target.value)}} placeholder="Enter your email"/>
        <label htmlFor="password">password</label>
        <input type="password" id="password" onChange={(event)=>{setpassword(event.target.value)}} placeholder="Enter your password" />
        <input className="btn" type="submit" value="SIGN IN" />
        <div className="text2">Don’t have an account? <Link className="link" to="/">Create one</Link></div>
        </form>
        </div>
  )
}
