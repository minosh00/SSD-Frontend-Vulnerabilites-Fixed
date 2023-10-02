import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { ValidateAddNewMenu } from "./Validation";
import { StartUrl } from "../../configs/Url.json";

const AddEmployee = () => {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [JobPosition, setJobPosition] = useState("");
  const [gender, setgender] = useState("Male"); // Default gender
  const [HomeAddress, setHomeAddress] = useState("");
  const [email, setemail] = useState("");
  const [Pnumber, setPnumber] = useState("");
  const navigate = useNavigate();

  const changeOnClick = async (e) => {
    e.preventDefault();

    const Employee = {
      fname,
      lname,
      JobPosition,
      gender,
      HomeAddress,
      email,
      Pnumber,
    };

    const validate = ValidateAddNewMenu(Employee);

    if (!validate.status) {
      Swal.fire("Error", validate.message, "error");
    } else {
      try {
        await axios.post(`${StartUrl}api/employees/`, Employee);

        Swal.fire("Congrats", "New Employee Added successfully", "success");

        navigate("/AllEmployee");
      } catch (error) {
        console.error("Error:", error);
        Swal.fire(
          "Error",
          "An error occurred while adding the employee",
          "error"
        );
      }
    }
  };

  return (
    <div>
      <div className="container shadow my-5 mx-auto w-50">
        <div className="col p-3">
          <h3 className="fw-bolder mb-4">
            <center>Add New Employee</center>
          </h3>
          <form onSubmit={changeOnClick} encType="">
            <div className="row py-3">
              <div className="col-md-6">
                <label htmlFor="fname" className="form-label">
                  Employee First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fname"
                  onChange={(e) => setfname(e.target.value)}
                  required
                  placeholder="Employee First Name"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="lname" className="form-label">
                  Employee Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lname"
                  onChange={(e) => setlname(e.target.value)}
                  required
                  placeholder="Employee Last Name"
                />
              </div>
            </div>
            <div className="row py-3">
              <div className="col-md-6">
                <label htmlFor="JobPosition" className="form-label">
                  Job Position
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="JobPosition"
                  onChange={(e) => setJobPosition(e.target.value)}
                  required
                  placeholder="Job Position"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  className="form-select form-select-sm py-1"
                  id="gender"
                  defaultValue="Male"
                  onChange={(e) => setgender(e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className="row py-3">
              <div className="col-md-10">
                <label htmlFor="HomeAddress" className="form-label">
                  Home Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="HomeAddress"
                  onChange={(e) => setHomeAddress(e.target.value)}
                  required
                  placeholder="Home Address"
                />
              </div>
            </div>
            <div className="row py-3">
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={(e) => setemail(e.target.value)}
                  required
                  placeholder="Employee Email"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="Pnumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Pnumber"
                  onChange={(e) => setPnumber(e.target.value)}
                  required
                  placeholder="Employee phone number"
                />
              </div>
            </div>
            <div className="row mb-5 px-2">
              <button
                type="submit"
                style={{ fontSize: "15px" }}
                className="btn btn-danger"
              >
                Add Employee
              </button>
              <br />
              <br />
              <Link to="/AllEmployee">
                <button
                  type="submit"
                  style={{ fontSize: "10px" }}
                  className="btn btn-success"
                >
                  Back to Home
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
