import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import "./Show.css"
import SideBar from "../SideBar/SideBar";
export default function Show() {
const [item, setitem] = useState()
const params = useParams();
useEffect(() => {
axios.get(`https://test1.focal-x.com/api/items/${params.id}` , {
    headers : {
        Authorization : `Bearer ${localStorage.getItem("token")}`
    }}
).then(res => setitem(res.data))
.catch(err => console.error(err))

}, []);


  return (
    <div className="showPage">
        <SideBar/>
        <div className="productShow">
       <Link className="back" to="/items">
       <div>
        <img src="/images/Vector (5).png" alt="icon" />
        </div>
        </Link>

        <p className="nameOfProduct">{item?.name}</p>
        <div className="productImage"><img src={item?.image_url || "/images/image 2 (2).png"} alt="image" 
        /></div>
     <div className="price">
        <div>price: <span>{item?.price}</span></div>
        <div>created_at: <span>{item?.created_at.split("T")[0].split("-")[2]}/
            {item?.created_at.split("T")[0].split("-")[1]}/
            {item?.created_at.split("T")[0].split("-")[0]}
            </span></div>
       </div>
       {/* {item?.created_at} */}
        <p>updated_at: <span>{item?.updated_at.split("T")[0].split("-")[2]}/
            {item?.updated_at.split("T")[0].split("-")[1]}/
            {item?.updated_at.split("T")[0].split("-")[0]}
            </span></p>
        {/* {item?.updated_at} */}
        </div>
    </div>
  )
}
