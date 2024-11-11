import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slice/authSlice";
import "./SignUp.css";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Access the Redux dispatch function

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [image, setImage] = useState(null);

  const send = (event) => {
    event.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      user_name: `${firstName} ${lastName}`,
      email,
      password,
      password_confirmation: confirmation,
      profile_image: image,
    };

    axios.post("https://test1.focal-x.com/api/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const userData = res.data.data; 
        localStorage.setItem("token", userData.token);
        localStorage.setItem("image", userData.user.profile_image_url);
        localStorage.setItem("name", userData.user.user_name);
        dispatch(setUser(userData));
        navigate("/items");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signUp">
      <form onSubmit={send}>
        <div className="title">
          <div>
            <img src="images/Logo.png" alt="Logo" />
          </div>
          <p className="title1">SIGN UP</p>
          <p className="text">Fill in the following fields to create an account.</p>
        </div>
        <label htmlFor="name">Name</label>
        <div className="fullName">
          <input type="text" id="name" onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
          <input type="text" onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
        </div>
        <label htmlFor="email2">Email</label>
        <input type="email" id="email2" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
        <label htmlFor="password2">Password</label>
        <div className="passwordInputs">
          <input type="password" id="password2" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
          <input type="password" onChange={(e) => setConfirmation(e.target.value)} placeholder="Re-enter your password" />
        </div>
        <label htmlFor="upload">Profile Image</label>
        <label htmlFor="upload" className="uploadIcon">
          <img src="images/Upload icon.png" alt="icon" />
        </label>
        <input type="file" id="upload" onChange={(e) => setImage(e.target.files[0])} />
        <input className="btn" type="submit" value="SIGN UP" />
        <div className="text2">
          Do you have an account? <Link className="link" to="/login">Sign in</Link>
        </div>
      </form>
    </div>
  );
}