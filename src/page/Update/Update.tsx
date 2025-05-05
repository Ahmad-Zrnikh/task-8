import { Link, useNavigate, useParams } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import "./Update.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Update() {
  const Navigate = useNavigate();
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [image, setimage] = useState<File | null>(null);
  
  const [oldImage, setoldImage] = useState<string | null>(null);
  const [imageUpdated, setimageUpdated] = useState(false)
  const params = useParams();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("image");
    localStorage.removeItem("name");
    Navigate("/");
  };
  useEffect(() => {
    axios
      .get(`https://dashboard-task-8-backend.onrender.com/items/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        
        setname(res.data.name);
        setprice(res.data.price);
        setoldImage(res.data.image_url);
      })
      .catch((err) => {console.error(err)
        toast.error(err.response.data.message);
      });
  }, [params.id]);

  const send = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .put(
        `https://dashboard-task-8-backend.onrender.com/items/${params.id}`,
        {
          name,
          price,
          image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        Navigate("/items");
      }).catch((err) => {
        toast.error(err.response.data.message);

      })
      
      ;
  };

  return (
    <div className="add2">
      <SideBar />
      <div className="addPage">
        <ToastContainer />
        <img src="/images/Vector(3).png" alt="icon" className="logoutIcon" onClick={logout}/>
        <Link className="back" to="/items">
          <div>
            <img src="/images/Vector (5).png" alt="icon" />
          </div>
        </Link>
        <p className="titleAdd">EDIT ITEM</p>
        <form onSubmit={send}>
          <div className="inputs1">
            <div className="left">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                onChange={(e) => setname(e.target.value)}
                defaultValue={name}
              />
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                onChange={(e) => setprice(e.target.value)}
                defaultValue={price}
              />
            </div>
            <div className="right">
              <label htmlFor="upload">Image</label>
              <label htmlFor="upload" className="uploadIcon2">
                <img src={imageUpdated ?image?URL.createObjectURL(image):oldImage || "":oldImage || ""} alt="icon" className="imageUpload" />
              </label>
              <input
                type="file"
                id="upload"
                onChange={(e) => {
                  const file: File | null = e.target.files?.[0] ?? null;
                  if (file && file.type.startsWith("image/")) {

                    setimage(file);
                    setimageUpdated(true)
                  }
                }}
              />
            </div>
          </div>
          <input className="btn" type="submit" value="Save" />
        </form>
      </div>
    </div>
  );
}
