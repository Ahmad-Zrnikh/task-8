import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {  motion } from 'framer-motion';
import "./Show.css";
import SideBar from "../SideBar/SideBar";
import EcommerceSpinner from "../Spinner/Spinner";
export default function Show() {
  const [item, setitem] = useState<item>();
  const [loading, setloading] = useState(true)
  const params = useParams();
  const navigate = useNavigate();
  type item = {
    id: number;
    name: string;
    price: number;
    image_url: string;
    created_at: string;
    updated_at: string;
  }
  const pageVariants = {
    initial: { opacity: 0, y: 40,  },


    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },

  };
  
  const pageTransition = {
    duration: 0.7,
    ease: 'easeInOut',
  
  };  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("image");
    localStorage.removeItem("name");
    navigate("/");
  };
  useEffect(() => {
    axios
      .get(`https://dashboard-task-8-backend.onrender.com/items/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setitem(res.data);
        console.log(item);
      })
      .catch((err) => console.error(err)).finally(() => setloading(false));
  }, [ ]);

  return (
    <motion.div className="showPage"  >
      <SideBar />
      {loading ? (
       <EcommerceSpinner/>
      ) :
      (<motion.div className="productShow" variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition} >
                <img src="/images/Vector(3).png" alt="icon" className="logoutIcon" onClick={logout}/>
        <Link className="back"  to="/items">

          <div>
            <img src="/images/Vector(5).png" alt="icon" />
          </div>
        </Link>

        <p className="nameOfProduct">{item?.name}</p>
        <div className="productImage">
          <img src={item?.image_url || "/images/image 2 (2).png"} alt="image" />
        </div>
        <div className="price">
          <div>
            price: <span>{item?.price}</span>
          </div>
          <div>
            created_at:{" "}
            <span>
              {item?.created_at.split("T")[0].split("-")[2]}/
              {item?.created_at.split("T")[0].split("-")[1]}/
              {item?.created_at.split("T")[0].split("-")[0]}
            </span>
          </div>
        </div>
        {/* {item?.created_at} */}
        <p>
          updated_at:{" "}
          <span>
            {item?.updated_at.split("T")[0].split("-")[2]}/
            {item?.updated_at.split("T")[0].split("-")[1]}/
            {item?.updated_at.split("T")[0].split("-")[0]}
          </span>
        </p>
        {/* {item?.updated_at} */}
      </motion.div>)}
    </motion.div>
  );
}
