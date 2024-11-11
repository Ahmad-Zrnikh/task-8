import { Link, useNavigate, useParams } from "react-router-dom"
import SideBar from "../SideBar/SideBar"
import "./Update.css"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Update() {
    const Navigate = useNavigate()
    const [name, setname] = useState("");
    const [price, setprice] = useState("");
    const [image, setimage] = useState(null);
    const [item, setitem] = useState();
const params = useParams();

    useEffect(() => {
        axios.get(`https://test1.focal-x.com/api/items/${params.id}` , {
            headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }}
        ).then(res => {setitem(res.data)
setname(res.data.name);
setprice(res.data.price);
        })
        .catch(err => console.error(err))
        }, []);
        
        const send = (event) => {
            event.preventDefault();
            axios.post(`https://test1.focal-x.com/api/items/${params.id}` ,{
                name,
                price,
                image,
                _method : "PUT"
            } ,{
                headers : {
                    "Content-Type": "multipart/form-data",
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }} ).then(res => {console.log(res)
            Navigate("/items");}
            )
            }
            



  return (
    <div className="add2">
        <SideBar/>
    <div className="addPage">
    <Link className="back" to="/items"><div><img src="/images/Vector (5).png" alt="icon" /></div></Link>
<p className="titleAdd">EDIT ITEM</p>
    <form onSubmit={send}>
        <div className="inputs1">
<div className="left">
<label htmlFor="name">Name</label>
        <input type="text" id="name" onChange={(e) => setname(e.target.value)} defaultValue={name} />
        <label htmlFor="price">Price</label>
        <input type="text" id="price" onChange={(e) => setprice(e.target.value)} defaultValue={price} />
        </div>
        <div className="right">
        <label htmlFor="upload">Image</label>
        <label htmlFor="upload" className="uploadIcon2">
          <img src="/images/Upload icon (1).png" alt="icon" />
        </label>
        <input type="file" id="upload" onChange={(e) => setimage(e.target.files[0])} />
        </div></div>
        <input className="btn" type="submit" value="Save" />

</form>
    </div></div>
  )
}
