import { useState } from "react";
import "./Add.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import loading from "../../../public/Animation - 1746521884017.json";
import Lottie from "lottie-react";

export default function Add() {
  const handleClick = () => {
    setclicked(true);
    setTimeout(() => {
      setclicked(false);
    }, 1000);
  };

  const Navigate = useNavigate();
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageInputed, setimageInputed] = useState(false);
  const [clicked, setclicked] = useState<boolean>(false);

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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setname(e.target.value)
                }
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
                      ? image
                        ? URL.createObjectURL(image)
                        : "/images/Upload icon (1).png"
                      : "/images/Upload icon (1).png"
                  }
                  alt="icon"
                />
              </label>
              <input
                type="file"
                id="upload"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file: File | null = e.target.files?.[0] ?? null;
                  if (file && file.type.startsWith("image/")) {
                    setImage(file);
                    setimageInputed(true);
                  }
                }}
              />
            </div>
          </div>
          <div className="btn4" >
            <button className="btn" type="submit" onClick={handleClick}>
              {" "}
              {clicked ? (
                <Lottie animationData={loading} className="lottie"></Lottie>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
