import { useState } from "react";
import "./Add.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import ClipLoader from "react-spinners/ClipLoader";

export default function Add() {
  const Navigate = useNavigate();
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [image, setImage] = useState<File | null>(null);
    const [imageInputed, setimageInputed] = useState(false);
  const [loading, setloading] = useState(false)
  const loadingFun = () => {
    setloading(true);
    setTimeout(() => {setloading(false)},200)
  }
  
  const send = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      name,
      price,
      image,
    };
    axios
      .post("https://dashboard-task-8-backend.onrender.com/items", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        Navigate("/items");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="add2">
      <SideBar />
      <div className="addPage">
        <Link className="back" to="/items">
          <div>
            <img src="/images/Vector(5).png" alt="icon" />
          </div>
        </Link>
        <p className="titleAdd">ADD NEW ITEM</p>
        <form onSubmit={send}>
          <div className="inputs1">
            <div className="left">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                onChange={(e : React.ChangeEvent<HTMLInputElement>) => setname(e.target.value)}
                placeholder="Enter the product name"
              />
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                onChange={(e) => setprice(e.target.value)}
                placeholder="Enter the product name"
              />
            </div>
            <div className="right">
              <label htmlFor="upload">Image</label>
              <label htmlFor="upload" className="uploadIcon2">
                <img
                className="imageUpload"
                  src={
                    
                    imageInputed
                      ? image ? URL.createObjectURL(image) : "/images/Upload icon (1).png"
                      : "/images/Upload icon (1).png"
                  }
                  alt="icon"
                />
              </label>
              <input
                type="file"
                id="upload"
                onChange={(e :React.ChangeEvent<HTMLInputElement>) => {
                  const file: File | null = e.target.files?.[0] ?? null;
                  if (file && file.type.startsWith("image/")) {

                    setImage(file);
                    setimageInputed(true);
                  }

                }}
              />
            </div>
          </div>
          <div className="btn4" onClick={loadingFun}>
            
          <input className="btn" type="submit" value="Save" />
         {loading && <ClipLoader/>}
          </div>
        </form>
      </div>
    </div>
  );
}
