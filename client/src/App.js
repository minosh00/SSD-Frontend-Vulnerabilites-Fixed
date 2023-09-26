import 'antd/dist/antd.css';
import "./App.css";

import '../node_modules/font-awesome/css/font-awesome.min.css';

import React, { Profiler, useState, useEffect } from "react";
import axios from "axios";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landingscreen from './components/Landingscreen';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Auth/Profile";
import NavBar from "./components/Layouts/NavBar";
import Footer from "./components/Layouts/Footer";

import AllMenus from "./components/Restaurants/AllMenus";
import Home from "./components/Layouts/Main";
import EditMenu from "./components/Restaurants/EditMenu";
import AddMenu from "./components/Restaurants/AddMenu"
import Test from "./components/Test"


//sadumini
import AllEmployee from "./components/Employee/AllEmployee";
import AddEmployee from "./components/Employee/AddEmployee";
import UpdateEmployee from './components/Employee/UpdateEmployee';
import AllSuppliers from "./components/Supplier/AllSuppliers";
import AddSupplier from "./components/Supplier/AddSupplier";
import UpdateSupplyer from "./components/Supplier/UpdateSupplyer";

//cheee
import AddRoom from './components/Room/Admin/AddRoom';
import UpdateRooms from './components/Room/Admin/UpdateRooms';
import DisplayOneRoom from './components/Room/Admin/DisplayOneRoom';
import AllRooms from './components/Room/Admin/AllRooms'
import MainRoom from './components/Room/Admin/MainRoom';
import CusRoom from './components/Room/Customer/CusRoom';
import Booking from './components/Room/Customer/Booking';

import CommentsSection from './components/Comments/CommentsSection';
import AddComment from './components/Comments/AddComment';
import EditComment from './components/Comments/EditComment';
import Room_Payment from './components/Room/Customer/Room_Payment';
import AllBookings from './components/Room/Admin/AllBookings';
import CancelBooking from './components/Room/Customer/CancelBooking';
import AllUsers from './components/Auth/AllUsers';


let isauth = localStorage.getItem('user');

function App() {

  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/rooms/")
      .then((res) => setPosts(res.data))
      .catch((error) => console.log(error));
  });


  useEffect(() => {
    setUser(localStorage.getItem("userRole"));
  }, []);


  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Landingscreen />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/Profile" element={<Profile />} />


        <Route path="/AllEmployee" element={<AllEmployee />} />
        <Route path="/addemployee" element={<AddEmployee />} />
        <Route path="/updateEmployeeByID/:id" element={<UpdateEmployee />} />
        <Route path="/AllSuppliers" element={<AllSuppliers />} />
        <Route path="/addsupplier" element={<AddSupplier />} />
        <Route path="/updateSupplierByID/:id" element={<UpdateSupplyer />} />

        <Route exact path="/dashboard" element={<Home />} />
        <Route path="/AllMenus" element={<AllMenus />} />
        <Route path="/updateMenuByID/:id" element={<EditMenu />} />
        <Route path="/addMenu" element={<AddMenu />} />

        <Route path="/Displaymenus" element={<Test />} />


        <Route path="/AddRoom" element={<AddRoom />} />
        <Route path="/mainroom" element={<MainRoom />} />
        <Route path="/allroom" element={<AllRooms />} />
        <Route path="/updateRoomsByID/:id" element={<UpdateRooms />} />
        <Route path="/updateRoomsByID1/:id/:fromdate/:todate" element={<DisplayOneRoom />} />
        <Route path="/cusroom" element={<CusRoom />} />
        <Route path="/payroom" element={<Room_Payment />} />
        <Route path="/allbookingsroom" element={<AllBookings />} />
        <Route path="/cancelbook/:id" element={<CancelBooking />} />
        <Route path="/updateRoomsByIDcus/:id/:fromdate/:todate" element={<Booking />} />
        <Route path="/comments-section" element={<CommentsSection />} />
        <Route path="/comments-section/create/:roomID" element={<AddComment />} />
        <Route path="/comments-section/edit/:id" element={<EditComment />} />
        <Route path="/allusers" element={<AllUsers />} />
      </Routes>
      <br></br>
      <Footer />
    </Router>

  );
}

export default App;