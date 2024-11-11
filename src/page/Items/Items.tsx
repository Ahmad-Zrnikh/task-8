import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Items.css";
import SideBar from "../SideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../redux/slice/authSlice";

export default function Items() {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [render, setrender] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

 const items = useSelector((state) => state.auth.items);
useEffect(() => {
  setrender(!render);
},[])
  useEffect(() => {
    axios.get("https://test1.focal-x.com/api/items", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch(setItems(res.data));
        setFilteredItems(res.data);
      })
      .catch((err) => console.error(err));
  }, [render]);
  const handleDeleteModalOpen = (id) => {
    setSelectedItemId(id);
    setShowModal(true);
  };

  const show = (id) => {
    navigate(`/item/${id}`);
        }


  const update = (id) => {
          navigate(`/item/update/${id}`);
              }


  const deleteItem =  () => {
                axios.delete(`https://test1.focal-x.com/api/items/${selectedItemId}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                } ).then(res => {
                    setrender(!render);
                    setShowModal(false);
                    setSelectedItemId(null); 
                    })
                .catch((err) => {console.log(err)})
            }
                   

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const newFilteredItems = items?.filter((item) => 
      item.name.toLowerCase().includes(term)
    );

    setFilteredItems(newFilteredItems);
    setCurrentPage(1); // Reset to the first page on search
  };
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const buttonStyle = (isActive) => ({
      backgroundColor: isActive ? "#FEAF00" : "white",
      color: isActive ? "white" : "black",
      width: "60px",
      height: "60px",
      fontWeight: "600",
      fontSize: "13px",
      borderRadius: "50%",
      padding: "10px 15px",
      margin: "0 5px",
      cursor: "pointer",
      border: "1px solid #F1F1F1",
    });

    buttons.push(
      <button
      className="pagination"
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={buttonStyle(false)}
      >
        <img src="images/Vector2.png" alt="Previous" />
      </button>
    );

    if (currentPage <= 3) {
      for (let i = 1; i <= 3; i++) {
        buttons.push(
          <button
          className="pagination"
            key={i}
            onClick={() => handlePageChange(i)}
            style={buttonStyle(currentPage === i)}
          >
            {i}
          </button>
        );
      }
      buttons.push(
        <button  key="ellipsis" disabled style={buttonStyle(false)} className="threepoints pagination">
          ...
        </button>
      );
    } else if (currentPage > 3 && currentPage < totalPages - 2) {
      buttons.push(
        <button className="pagination"
        onClick={() => handlePageChange(currentPage - 1)} style={buttonStyle(false)}>
          {currentPage - 1}
        </button>
      );
      buttons.push(
        <button className="pagination"
 onClick={() => handlePageChange(currentPage)} style={buttonStyle(true)}>
          {currentPage}
        </button>
      );
      buttons.push(
        <button className="pagination" onClick={() => handlePageChange(currentPage + 1)} style={buttonStyle(false)}>
          {currentPage + 1}
        </button>
      );
      buttons.push(
        <button key="ellipsis" disabled style={buttonStyle(false)} className="threepoints pagination">
          ...
        </button>
      );
    } else {
      for (let i = totalPages - 2; i <= totalPages; i++) {
        buttons.push(
          <button
          className="pagination"
            key={i}
            onClick={() => handlePageChange(i)}
            style={buttonStyle(currentPage === i)}
          >
            {i}
          </button>
        );
      }
    }

    if (currentPage < totalPages - 2) {
      buttons.push(
        <button className="pagination" key="last" onClick={() => handlePageChange(totalPages)} style={buttonStyle(false)}>
          {totalPages}
        </button>
      );
    }

    buttons.push(
      <button
      className="pagination"
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={buttonStyle(false)}
      >
        <img src="images/Vector.png" alt="Next" />
      </button>
    );

    return buttons;
  };

  return (
    <div className="items">
      <SideBar/>
      <div className="products">
      <div className="searchField" style={{ position: "relative" }}>
    <input className="search"
      type="text"
      placeholder="Search product by name "
      value={searchTerm}
      onChange={handleSearch}
    />
    <img className="searchIcon"
      src="images/Vector (4).png"
      alt="Search icon"
    />
  </div>


   <Link className="addLink" to="/add">   <button className="add">
      ADD NEW PRODUCT
      </button></Link>


      <div className="products1" >
        {currentItems?.map((item, index) => (
          <div key={index} className="images" >
            <div className="name3" key={index} onClick={()=>show(item.id)}>
            <span>{item?.name}</span>
            <div className="btns3"  >
              <button className="edit" onClick={(e) => { e.stopPropagation(); update(item.id);}}>Edit</button>
              <button className="delete" onClick={(e) => { e.stopPropagation();handleDeleteModalOpen(item.id)}}>Delete</button>
            </div>
            </div>
            <img src={item?.image_url || "/images/image 2 (2).png"} alt="item" className="image" />
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {renderPaginationButtons()}
      </div></div>
      {showModal && (
        <div className="modal">
          <div className="popup">
          <p>ARE YOU SURE YOU WANT TO DELETE THE PRODUCT?</p>
          <div className="buttons">
            <button className="delete"  onClick={deleteItem}>
             Yes
            </button>
            <button className="cancel" onClick={() => setShowModal(false)}>
              No
            </button>

          </div>
        </div></div>
      )}
    </div>
  );
}
