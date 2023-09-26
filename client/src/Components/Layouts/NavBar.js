import React, { Fragment } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BsPersonLinesFill } from "react-icons/bs"
import { BsFillPersonPlusFill } from "react-icons/bs"
import { MdOutlineChecklistRtl } from "react-icons/md"
import { MdPictureAsPdf } from "react-icons/md"
import { FaFileUpload } from "react-icons/fa"
import { FaUser } from 'react-icons/fa'
import { TbLogout } from 'react-icons/tb'

import Login from '../../images/login.png';

const NavBar = () => {

  const navigate = useNavigate();

  let userRole = localStorage.getItem('userRole');

  const handleSubmit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    navigate("/");
  }



  return (
    <div>
      <div>
        <nav class="navbar  navbar-expand-lg">
          <a class="navbar-brand" href="#">
            <img src={Login} alt="" width="70" height="50" />
          </a>
          <a class="navbar-brand" href="/">
            Wijaya Beach Hotel
          </a>

          <div className="container-fluid">

            <>
            </>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">

                <li class="nav-item">
                  <a style={{ display: userRole == "customer" ? "flex" : "none", textDecoration: "none" }} class="nav-link" href="/cusroom" aria-current="page">Booking Room</a>
                </li>
                <li class="nav-item">
                  <a style={{ display: userRole == "customer" ? "flex" : "none", textDecoration: "none" }} class="nav-link" href="/Displaymenus" aria-current="page">Restaurant</a>
                </li>
                <li class="nav-item">
                  <a style={{ display: userRole == "admin" ? "flex" : "none", textDecoration: "none" }} class="nav-link" href="/mainroom" aria-current="page">Edit Room</a>
                </li>
                <li class="nav-item">
                  <a style={{ display: userRole == "admin" ? "flex" : "none", textDecoration: "none" }} class="nav-link" href="/AllMenus" aria-current="page">Edit Restaurants</a>
                </li>
                <li class="nav-item">
                  <a style={{ display: userRole == "admin" ? "flex" : "none", textDecoration: "none" }} class="nav-link" href="/AllEmployee" aria-current="page">Edit Employee</a>
                </li>
                <li class="nav-item">
                  <a style={{ display: userRole == "admin" ? "flex" : "none", textDecoration: "none" }} class="nav-link" href="/AllSuppliers" aria-current="page">Edit Suppliers</a>
                </li>
                <li class="nav-item">
                  <a style={{ display: userRole == "admin" ? "flex" : "none", textDecoration: "none" }} class="nav-link" href="/allusers" aria-current="page">All Users</a>
                </li>
              </div>
            </div>
          </div>


          <a style={{ display: userRole == "customer" ? "flex" : "none", textDecoration: "none", float: "right", marginRight: "10px" }} className="btn btn-secondary toggle" href="/Profile" aria-current="page"><FaUser /> &nbsp;Profile   </a>




          <button onClick={handleSubmit} className="btn btn-secondary toggle" aria-haspopup="true" aria-expanded="false" type="submit" style={{ float: "right", marginRight: "10px", display: userRole ? "flex" : "none" }}>
            {"Logout"}
          </button>

        </nav>
      </div>
    </div>

  );
};



export default NavBar;