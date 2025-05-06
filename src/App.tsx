import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./page/login/Login";
import SignUp from "./page/signUp/SignUp";
import Items from "./page/Items/Items";
import Show from "./page/Show/Show";
import Add from "./page/Add/Add";
import Update from "./page/Update/Update";
import { AnimatePresence } from 'framer-motion';
import 'aos/dist/aos.css'; // AOS Styles
function App() {
  return (
    <>
     <AnimatePresence mode="wait">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<SignUp />}></Route>
        <Route path="/items" element={<Items />}></Route>
        <Route path="/item/:id" element={<Show />}></Route>
        <Route path="/add" element={<Add />}></Route>
        <Route path="item/update/:id" element={<Update />}></Route>
      </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
