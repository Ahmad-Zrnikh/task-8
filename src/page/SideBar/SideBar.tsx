import "./SideBar.css";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();
   const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("image");
    localStorage.removeItem("name");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/images/Logo1.png" alt="" />
      </div>
      <div className="first">
        <img
          className="personalImage"
          src={localStorage.getItem("image") || ""}
          alt="image"
        />
        <p className="name1">{localStorage.getItem("name")}</p>
      </div>
      <div className="second">
        <div className="btns">
          <div className="btn1">
            <img src="/images/Vector(1).png" alt="icon" />
            <p>Products</p>
          </div>
          <div className="btn2">
            <img src="/images/Vector(2).png" alt="icon" />
            <p>Favorites</p>
          </div>
          <div className="btn3">
            <img src="/images/Vector(2).png" alt="icon" />
            <p>order list</p>
          </div>
        </div>
        <button onClick={logout}>
          {" "}
          <div className="logout">
            <p>logout</p>
            <img src="/images/Vector(3).png" alt="icon" />
          </div>
        </button>
      </div>
    </div>
  );
}
