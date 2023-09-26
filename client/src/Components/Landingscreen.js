import React from "react";
import moment from "moment"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";
AOS.init({
    duration:'2000'
});
function Landingscreen() {
  return (
    <div className="">
      <div className="landing row justify-content-center text-center">
        <div className="col-md-9 my-auto" style={{borderRight:'8px solid white'}}>
          <h2 style={{ color: "white", fontSize: "120px" }} data-aos='zoom-in'>Welcome to Wijaya Beach Hotel</h2>
          <h1 style={{ color: "white"}} data-aos='zoom-out' >“There is only one biggest Hotel in Galle“</h1>
          <Link to="/login">
             <button className="btn btn-primary">Get Started</button>
          </Link>
          <br></br>
          <Link to="/register">
             <button className="btn btn-primary">Register </button>
          </Link>
        </div>

        
        
      </div>
     
    </div>
  );
}

export default Landingscreen;
