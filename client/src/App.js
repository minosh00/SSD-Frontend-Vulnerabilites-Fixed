/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landingscreen from "./Components/Landingscreen";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Profile from "./Components/Auth/Profile";
import NavBar from "./Components/Layouts/NavBar";
import Footer from "./Components/Layouts/Footer";
import AllMenus from "./Components/Restaurants/AllMenus";
import Home from "./Components/Layouts/Main";
import EditMenu from "./Components/Restaurants/EditMenu";
import AddMenu from "./Components/Restaurants/AddMenu";
import Test from "./Components/Test";
import AllOrders from "./Components/Restaurants/AllOrders";
import AllEmployee from "./Components/Employee/AllEmployee";
import AddEmployee from "./Components/Employee/AddEmployee";
import UpdateEmployee from "./Components/Employee/UpdateEmployee";
import AllSuppliers from "./Components/Supplier/AllSuppliers";
import AddSupplier from "./Components/Supplier/AddSupplier";
import UpdateSupplyer from "./Components/Supplier/UpdateSupplyer";
import AddRoom from "./Components/Room/Admin/AddRoom";
import UpdateRooms from "./Components/Room/Admin/UpdateRooms";
import DisplayOneRoom from "./Components/Room/Admin/DisplayOneRoom";
import AllRooms from "./Components/Room/Admin/AllRooms";
import MainRoom from "./Components/Room/Admin/MainRoom";
import CusRoom from "./Components/Room/Customer/CusRoom";
import Booking from "./Components/Room/Customer/Booking";
import { StartUrl } from "./configs/Url.json";
import CommentsSection from "./Components/Comments/CommentsSection";
import AddComment from "./Components/Comments/AddComment";
import EditComment from "./Components/Comments/EditComment";
import Room_Payment from "./Components/Room/Customer/Room_Payment";
import AllBookings from "./Components/Room/Admin/AllBookings";
import CancelBooking from "./Components/Room/Customer/CancelBooking";
import AllUsers from "./Components/Auth/AllUsers";

import "antd/dist/antd.css";
import "./App.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
function App() {
  const [, setUser] = useState("");
  const [, setPosts] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get(`${StartUrl}api/rooms/`)
      .then((res) => setPosts(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserRole = localStorage.getItem("userRole");

    if (token) {
      setAuthenticated(true);
      setUserRole(storedUserRole);
    } else {
      setAuthenticated(false);
      setUserRole("");
    }
  }, []);

  const ProtectedRoute = ({ element, adminRequired }) => {
    if (!authenticated) {
      return <Navigate to="/login" />;
    }

    if (adminRequired && userRole !== "admin") {
      return <Navigate to="/unauthorized" />;
    }

    return element;
  };

  return (
    <Router>
    <NavBar />
    <Routes>
      <Route exact path="/" element={<Landingscreen />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/Profile" element={<Profile />} />
      <Route exact path="/dashboard" element={<Home />} />
      <Route path="/AllEmployee" element={<ProtectedRoute adminRequired element={<AllEmployee />} />} />
      <Route path="/addemployee" element={<ProtectedRoute adminRequired element={<AddEmployee />} />} />
      <Route path="/updateEmployeeByID/:id" element={<ProtectedRoute adminRequired element={<UpdateEmployee />} />} />
      <Route path="/AllSuppliers" element={<ProtectedRoute adminRequired element={<AllSuppliers />} />} />
      <Route path="/addsupplier" element={<ProtectedRoute adminRequired element={<AddSupplier />} />} />
      <Route path="/updateSupplierByID/:id" element={<ProtectedRoute adminRequired element={<UpdateSupplyer />} />} />
      <Route path="/AllMenus" element={<ProtectedRoute adminRequired={false} element={<AllMenus />} />} />
      <Route path="/updateMenuByID/:id" element={<ProtectedRoute adminRequired={false} element={<EditMenu />} />} />
      <Route path="/addMenu" element={<ProtectedRoute adminRequired={false} element={<AddMenu />} />} />
      <Route path="/AllOrders" element={<ProtectedRoute adminRequired={false} element={<AllOrders />} />} />
      <Route path="/AddRoom" element={<ProtectedRoute adminRequired={false} element={<AddRoom />} />} />
      <Route path="/mainroom" element={<ProtectedRoute adminRequired={false} element={<MainRoom />} />} />
      <Route path="/allroom" element={<ProtectedRoute adminRequired={false} element={<AllRooms />} />} />
      <Route path="/updateRoomsByID/:id" element={<ProtectedRoute adminRequired={false} element={<UpdateRooms />} />} />
      <Route path="/updateRoomsByID1/:id/:fromdate/:todate" element={<ProtectedRoute adminRequired={false} element={<DisplayOneRoom />} />} />
      <Route path="/payroom" element={<ProtectedRoute adminRequired={false} element={<Room_Payment />} />} />
      <Route path="/allbookingsroom" element={<ProtectedRoute adminRequired={false} element={<AllBookings />} />} />
      <Route path="/cancelbook/:id" element={<ProtectedRoute adminRequired={false} element={<CancelBooking />} />} />
      <Route path="/updateRoomsByIDcus/:id/:fromdate/:todate" element={<ProtectedRoute adminRequired={false} element={<Booking />} />} />
      <Route path="/comments-section" element={<ProtectedRoute adminRequired={false} element={<CommentsSection />} />} />
      <Route path="//comments-section/create/:roomID" element={<ProtectedRoute adminRequired={false} element={<AddComment />} />} />
      <Route path="/comments-section/edit/:roomID/:id" element={<ProtectedRoute adminRequired={false} element={<EditComment />} />} />
      <Route path="/allusers" element={<ProtectedRoute adminRequired={false} element={<AllUsers />} />} />
      <Route path="/cusroom" element={<CusRoom />} />
      <Route path="/Displaymenus" element={<Test />} />
      <Route path="/AllMenus" element={<AllMenus />} />
      <Route path="/payroom" element={<Room_Payment />} />
      <Route path="/allbookingsroom" element={<AllBookings />} />
      <Route path="/cancelbook/:id" element={<CancelBooking />} />
      <Route path="/updateRoomsByIDcus/:id/:fromdate/:todate" element={<Booking />} />




      </Routes>
      <br />
      <Footer />
    </Router>
  );
}

export default App;