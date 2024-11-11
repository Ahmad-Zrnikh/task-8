import { useState } from "react";
import "./Add.css"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../SideBar/SideBar";

export default function Add() {
    const Navigate = useNavigate();
    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [image, setImage] = useState(null);
    const send = (event) => {
        event.preventDefault();
        const data = {
            name ,
            price ,
            image
        };
    
        axios.post("https://test1.focal-x.com/api/items", data, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization : `Bearer ${localStorage.getItem("token")}`
            },
          })
          .then((res) => {
            Navigate("/items");
          })
          .catch((err) => console.log(err));
      };

  return (
    <div className="add2">
        <SideBar/>
    <div className="addPage">
    <Link className="back" to="/items"><div><img src="/images/Vector (5).png" alt="icon" /></div></Link>
<p className="titleAdd">ADD NEW ITEM</p>
    <form onSubmit={send}>
        <div className="inputs1">
<div className="left">
<label htmlFor="name">Name</label>
        <input type="text" id="name" onChange={(e) => setname(e.target.value)} placeholder="Enter the product name" />
        <label htmlFor="price">Price</label>
        <input type="text" id="price" onChange={(e) => setprice(e.target.value)} placeholder="Enter the product name" />
        </div>
        <div className="right">
        <label htmlFor="upload">Image</label>
        <label htmlFor="upload" className="uploadIcon2">
          <img src="/images/Upload icon (1).png" alt="icon" />
        </label>
        <input type="file" id="upload" onChange={(e) => setImage(e.target.files[0])} />
        </div></div>
        <input className="btn" type="submit" value="Save" />

</form>
    </div></div>
  )
}
