import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Link, useNavigate } from "react-router-dom";
import "./Items.css";
import SideBar from "../SideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../redux/slice/authSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from 'react-toastify';
export default function Items() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const item2 = {
    hidden: { opacity: 0, rotate: -10, y: 20},
    show: { opacity: 1, rotate: 0, y: 0 },

  };
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [render, setrender] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true)
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("image");
    localStorage.removeItem("name");
    navigate("/");
  };

  const items = useSelector((state :any ) => state.auth.items);
  useEffect(() => {
    setrender(!render);
  }, [render]);
  useEffect(() => {
    
    axios
      .get("https://dashboard-task-8-backend.onrender.com/items", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        dispatch(setItems(res.data.data.items));
        setFilteredItems(res.data.data.items);
      })
      .catch((err) => {console.error(err)
        toast.error(err.response.data.message);
      }).finally(() => setloading(false));
  }, [render,dispatch]);
  const handleDeleteModalOpen = (id :any) => {
    setSelectedItemId(id);
    setShowModal(true);
  };

  const show = (id: any) => {
    navigate(`/item/${id}`);
  };

  const update = (id: any ) => {
    navigate(`/item/update/${id}`);
  };

  const deleteItem = () => {
    axios
      .delete(`https://dashboard-task-8-backend.onrender.com/items/${selectedItemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setrender(!render);
        setShowModal(false);
        setSelectedItemId(null);
        toast.success("item deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.warning(err.response.data.message);

      });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const newFilteredItems = items?.filter((item : any) =>
      item.name.toLowerCase().includes(term)
    );

    setFilteredItems(newFilteredItems);

    setCurrentPage(1); // Reset to the first page on search
  };
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems: any[] = filteredItems?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page : number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);


    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const buttonStyle = (isActive : boolean) => ({
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
        <img src="/images/Vector2.png" alt="Previous" />
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
        <button
          key="ellipsis"
          disabled
          style={buttonStyle(false)}
          className="threepoints pagination"
        >
          ...
        </button>
      );
    } else if (currentPage > 3 && currentPage < totalPages - 2) {
      buttons.push(
        <button
          className="pagination"
          onClick={() => handlePageChange(currentPage - 1)}
          style={buttonStyle(false)}
        >
          {currentPage - 1}
        </button>
      );
      buttons.push(
        <button
          className="pagination"
          onClick={() => handlePageChange(currentPage)}
          style={buttonStyle(true)}
        >
          {currentPage}
        </button>
      );
      buttons.push(
        <button
          className="pagination"
          onClick={() => handlePageChange(currentPage + 1)}
          style={buttonStyle(false)}
        >
          {currentPage + 1}
        </button>
      );
      buttons.push(
        <button
          key="ellipsis"
          disabled
          style={buttonStyle(false)}
          className="threepoints pagination"
        >
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
        <button
          className="pagination"
          key="last"
          onClick={() => handlePageChange(totalPages)}
          style={buttonStyle(false)}
        >
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
        <img src="/images/Vector.png" alt="Next" />
      </button>
    );

    return buttons;
  };

  return (
    <div className="items">
      <SideBar />
      <ToastContainer/>

        {loading? (
          <ClipLoader  color="#36d7b7" className="loader" size={200} />
) : (      <div className="products">
              <img src="/images/Vector(3).png" alt="icon" className="logoutIcon" onClick={logout}/>

    <div className="searchField" style={{ position: "relative" }}>
      <input
        className="search"
        type="text"
        placeholder="Search product by name "
        value={searchTerm}
        onChange={handleSearch}
      />
      <img
        className="searchIcon"
        src="/images/Vector(4).png"
        alt="Search icon"
      />
    </div>

    <Link className="addLink" to="/add">
     
      <button className="add">ADD NEW PRODUCT</button>
    </Link>

    <motion.div className="products1"  variants={container}
      initial="hidden"
      animate="show">
      {currentItems?.map((item, index) => (
        <motion.div key={index} className="images" variants={item2}>
          <div className="name3" key={index} onClick={() => show(item._id)}>
            <span>{item?.name}</span>
            <div className="btns3">
              <button
                className="edit"
                onClick={(e) => {
                  e.stopPropagation();
                  update(item._id);
                }}
              >
                Edit
              </button>
              <button
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteModalOpen(item._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
          <img
            src={item?.image_url || "/images/image2(2).png"}
            alt="item"
            className="image"
          />
        </motion.div>
      ))}
    </motion.div>

    <div
      style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {renderPaginationButtons()}
    </div>
  </div>
)}
      {showModal && (
        <div className="modal">
          <div className="popup">
            <p>ARE YOU SURE YOU WANT TO DELETE THE PRODUCT?</p>
            <div className="buttons">
              <button className="delete" onClick={deleteItem}>
                Yes
              </button>
              <button className="cancel" onClick={() => setShowModal(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
