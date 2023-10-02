import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateEmployeeByID, getEmployeeById } from "./services/Employee";
import { MDBBtn } from 'mdb-react-ui-kit'
import { ValidateAddNewMenu } from "./Validation";

const UpdateEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [JobPosition, setJobPosition] = useState("");
  const [gender, setGender] = useState("");
  const [HomeAddress, setHomeAddress] = useState("");
  const [email, setEmail] = useState("");
  const [Pnumber, setPnumber] = useState("");

  const handleFirstname = (e) => {
    setFname(e.target.value);
  };

  const handleLastname = (e) => {
    setLname(e.target.value);
  };

  const handleJobPosition = (e) => {
    setJobPosition(e.target.value);
  };

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const handleHomeAddress = (e) => {
    setHomeAddress(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    setPnumber(e.target.value);
  };

  const GetData = async () => {
    try {
      const data = await getEmployeeById(id);
      console.log("Update Employee", data);
      const employeeData = data?.data || {};
      setFname(employeeData.fname);
      setLname(employeeData.lname);
      setJobPosition(employeeData.JobPosition);
      setGender(employeeData.gender);
      setHomeAddress(employeeData.HomeAddress);
      setEmail(employeeData.email);
      setPnumber(employeeData.Pnumber);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetData();
  }, );

  const UpdateData = async (e) => {
    e.preventDefault();
    const newdata = {
      fname,
      lname,
      JobPosition,
      gender,
      HomeAddress,
      email,
      Pnumber,
    };

    const validate = ValidateAddNewMenu(newdata);
    const msg = validate?.message;

    if (validate.status === false) {
      Swal.fire({
        toast: true,
        icon: 'warning',
        html: `<span>${msg}</span>`,
        animation: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
      });
    } else {
      try {
        const data = await updateEmployeeByID(id, newdata);
        console.log("Update success", data);
        if (!data?.data?.suppliername) {
          Swal.fire('Congrats', 'Update employee Successfully', 'success')
          navigate("/AllEmployee");
        } else {
          Swal.fire('Congrats', 'Update employee Successfully', 'success')
          navigate("/AllEmployee");
        }
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'An error occurred while updating the employee', 'error');
      }
    }
  };

  return (
    <div>
      <div className="container shadow border border-5 my-5 mx-auto w-50">
        <div className="col p-3">
          <h3 className="fw-bolder mb-4"><center>Update Employee Details</center></h3>
          <form>
            <div className='row py-3'>
              <div className="col-md-6">
                <label htmlFor="" className="form-label">Employee First Name</label>
                <input type="text"
                  className="form-control"
                  id="floatingInput"
                  value={fname}
                  onChange={handleFirstname}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="" className="form-label">Employee Last Name</label>
                <input type="text"
                  className="form-control"
                  id="floatingPassword"
                  value={lname}
                  onChange={handleLastname}
                  required
                />
              </div>
            </div>
            <div className='row py-3'>
              <div className="col-md-6">
                <label htmlFor="" className="form-label">Job Position</label>
                <input type="text"
                  className="form-control"
                  id="exampleFormControlTextarea3"
                  value={JobPosition}
                  onChange={handleJobPosition}
                  required
                  placeholder="Job Position"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="" className="form-label">Gender</label>
                <select className="form-select form-select-sm py-1" value={gender} onChange={handleGender}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div className='row py-3'>
              <div className="col-md-10">
                <label htmlFor="" className="form-label">Home Address</label>
                <input type="text"
                  className="form-control"
                  id="exampleFormControlTextarea3"
                  value={HomeAddress}
                  onChange={handleHomeAddress}
                  required
                />
              </div>
            </div>
            <div className='row py-3'>
              <div className="col-md-6">
                <label htmlFor="" className="form-label">Email</label>
                <input type="email"
                  className="form-control"
                  id="exampleFormControlTextarea3"
                  value={email}
                  onChange={handleEmail}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="" className="form-label">Phone Number</label>
                <input type="text"
                  className="form-control"
                  id="exampleFormControlTextarea3"
                  value={Pnumber}
                  onChange={handlePhoneNumber}
                  required
                />
              </div>
            </div>
            <br />
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <MDBBtn rounded color="danger" type="submit" onClick={(e) => UpdateData(e)} className="btn btn-warning">Update Employee</MDBBtn>
             <Link to="/AllEmployee"><MDBBtn rounded color="warning" type="submit" className="btn btn-success">Back to Home</MDBBtn></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateEmployee;
