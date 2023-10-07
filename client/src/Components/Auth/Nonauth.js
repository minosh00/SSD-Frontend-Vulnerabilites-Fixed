
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: "2000",
});
function Nonauth() {
  return (
    <div className="">
      <div className="landing row justify-content-center text-center">
        <div
          className="col-md-9 my-auto"
          style={{ borderRight: "8px solid white" }}
        >
          <h2 style={{ color: "white", fontSize: "120px" }} data-aos="zoom-in">
         You don't have access to redirect from this page
          </h2>
    
       
        </div>
      </div>
    </div>
  );
}

export default Nonauth;