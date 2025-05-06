import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slice/authSlice";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Lottie from "lottie-react";
import loading from "../../../public/Animation - 1746521884017.json";

export default function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch(); // Access the Redux dispatch function

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [clicked, setclicked] = useState<boolean>(false)
  const handleClick =() =>{
    setclicked(true)
    setTimeout(() => {setclicked(false)},1000)
  }
  const send = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post(
        "https://dashboard-task-8-backend.onrender.com/users/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const user = res.data;
        localStorage.setItem("token", user.token);
        localStorage.setItem("image", user?.user.profile_image);
        localStorage.setItem("name", user?.user.user_name);
        dispatch(setUser(user));
        navigate("/items");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="login">
      <ToastContainer position="top-center" />
      <form onSubmit={(event) => send(event)}>
        <div className="title">
          <div>
            <img src="images/Logo.png" />
          </div>
          <p className="title1">SIGN IN</p>
          <p className="text">Enter your credentials to access your account</p>
        </div>

        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          onChange={(event) => {
            setemail(event.target.value);
          }}
          placeholder="Enter your email"
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          onChange={(event) => {
            setpassword(event.target.value);
          }}
          placeholder="Enter your password"
        />
        
        <button className="btn" type="submit" value="" onClick={handleClick} >
          {clicked ? <Lottie animationData={loading} className="lottie" ></Lottie> : "SIGN IN"}
          
        </button>
        <div className="text2">
          Don’t have an account?
          <Link className="link" to="/">
            Create one
          </Link>
        </div>
      </form>
    </div>
  );
}
