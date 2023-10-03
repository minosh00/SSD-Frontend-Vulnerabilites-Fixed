import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landingscreen from "./Components/Landingscreen";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Profile from "./Components/Auth/Profile";
import NavBar from "./Components/Layouts/NavBar";
import Footer from "./Components/Layouts/Footer";
import Home from "./Components/Layouts/Main";
import Test from "./Components/Test";
import AllOrders from "./Components/Restaurants/AllOrders";
import AllEmployee from "./Components/Employee/AllEmployee";
import AddEmployee from "./Components/Employee/AddEmployee";
import UpdateEmployee from "./Components/Employee/UpdateEmployee";
import UpdateRooms from "./Components/Room/Admin/UpdateRooms";
import DisplayOneRoom from "./Components/Room/Admin/DisplayOneRoom";
import CusRoom from "./Components/Room/Customer/CusRoom";
import Booking from "./Components/Room/Customer/Booking";
import { BASE_URL } from "./configs/Url.json";
import CommentsSection from "./Components/Comments/CommentsSection";
import AddComment from "./Components/Comments/AddComment";
import EditComment from "./Components/Comments/EditComment";
import Room_Payment from "./Components/Room/Customer/Room_Payment";
import AllBookings from "./Components/Room/Admin/AllBookings";
import NonAuth from "./Components/Auth/Nonauth";
import CancelBooking from "./Components/Room/Customer/CancelBooking";
import AllUsers from "./Components/Auth/AllUsers";

import "antd/dist/antd.css";
import "./App.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";

function App() {
  // const [, setUser] = useState("");
  const [, setPosts] = useState([]);
  const [userRole, setUserRole] = useState(""); // State to store user role

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/rooms/`)
      .then((res) => setPosts(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // Retrieve user role from your authentication system (e.g., after login)
    const storedUserRole = localStorage.getItem("userRole");
    setUserRole(storedUserRole);
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Landingscreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/UnAuthorized" element={<NonAuth />} />

        {userRole === "admin" ? (
          <>
            <Route path="/AllEmployee" element={<AllEmployee />} />
            <Route path="/addemployee" element={<AddEmployee />} />
            <Route path="/updateEmployeeByID/:id" element={<UpdateEmployee />} />
            {/* Other admin routes */}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/UnAuthorized" />} />
        )}

        {/* Common routes accessible to all users */}
        <Route path="/AllBookings" element={<AllBookings />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/cusroom" element={<CusRoom />} />
        <Route path="/AllOrders" element={<AllOrders />} />
        <Route path="/Displaymenus" element={<Test />} />
        <Route path="/payroom" element={<Room_Payment />} />
        <Route path="/cancelbook/:id" element={<CancelBooking />} />
        <Route path="/updateRoomsByIDcus/:id/:fromdate/:todate" element={<Booking />} />
        <Route path="/cusroom" element={<CusRoom />} />
        <Route path="/payroom" element={<Room_Payment />} />
        <Route path="/allbookingsroom" element={<AllBookings />} />
        <Route path="/cancelbook/:id" element={<CancelBooking />} />
        <Route path="/updateRoomsByID/:id" element={<UpdateRooms />} />
        <Route path="/updateRoomsByID1/:id/:fromdate/:todate" element={<DisplayOneRoom />} />
        <Route path="/comments-section" element={<CommentsSection />} />
        <Route path="/comments-section/create/:roomID" element={<AddComment />} />
        <Route path="/comments-section/edit/:roomID/:id" element={<EditComment />} />
        <Route path="/allusers" element={<AllUsers />} />
      </Routes>
      <br />
      <Footer />
    </Router>
  );
}

export default App;
