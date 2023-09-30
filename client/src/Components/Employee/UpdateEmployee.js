import Swal from "sweetalert2";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateEmployeeByID, getEmployeeById } from "./services/Employee";
import { MDBBtn } from 'mdb-react-ui-kit'
import { ValidateAddNewMenu } from "./Validation";


const UpdateEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [fname, setfname] = useState("");
  const [lname, setlname] = useState();
  const [JobPosition, setJobPosition] = useState("");
  const [gender, setgender] = useState("");
  const [HomeAddress, setHomeAddress] = useState("");
  const [email, setemail] = useState("");
  const [Pnumber, setPnumber] = useState("");

  const handleFirstname = (e) => {
    setfname(e.target.value);
  };

  const handleLastname = (e) => {
    setlname(e.target.value);
  };

  const handleJobPosition = (e) => {
    setJobPosition(e.target.value);
  };

  const handleGender = (e) => {
    setgender(e.target.value);
  };

  const handleHomeAddress = (e) => {
    setHomeAddress(e.target.value);
  };

  const handleEmail = (e) => {
    setemail(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    setPnumber(e.target.value);
  };

  const GetData = async () => {

    let data = await getEmployeeById(id);
    console.log("Update Employee", data);

    setfname(data?.data?.fname);
    setlname(data?.data?.lname);
    setJobPosition(data?.data?.JobPosition);
    setgender(data?.data?.gender);
    setHomeAddress(data?.data?.HomeAddress);
    setemail(data?.data?.email);
    setPnumber(data?.data?.Pnumber);

  };

  useEffect(() => {
    GetData();
  }, []);


  const UpdateData = async (e) => {
    e.preventDefault();
    let newdata = {
        fname:fname,
        lname:lname,
        JobPosition:JobPosition,
        gender:gender,
        HomeAddress:HomeAddress,
        email:email,
        Pnumber:Pnumber,
    };


    let validate = ValidateAddNewMenu(newdata);
    let msg = validate?.message;
    console.log(msg);

    if(validate.status == false)
    {
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
    }

    
    else{

      let data = await updateEmployeeByID(id, newdata);
      console.log("Update success ", data);
      if (!data?.data?.suppliername) {
        {
          Swal.fire('Congrats', 'Update employee  Successfully', 'success')
          navigate("/AllEmployee");
        }
  
      } else {
        {
          Swal.fire('Congrats', 'Update employee Successfully ', 'success')
          navigate("/AllEmployee");
        }
      }
}
    }

  return (
    <div>
    <div className="container shadow border border-5 my-5 mx-auto w-50">
      <div className="col p-3">
        <h3 className=" fw-bolder mb-4"><center>Update Employee Details</center></h3>
        <form>
            <div className='row py-3'>
                <div class="col-md-6">
                    <label for="" class="form-label">{" "}Employee First Name{" "}</label>
                    <input type="text"
                    class="form-control"
                    id="floatingInput"
                    value={fname}
                    onChange={handleFirstname}
                    required
                    />
                </div>
                <div class="col-md-6">
                    <label for="" class="form-label">{" "}Employee Last  Name{" "}</label>
                    <input type="text"
                    class="form-control"
                    id="floatingPassword"
                    value={lname}
                    onChange={handleLastname}
                    required
                    />
                </div>
            </div>
            <div className='row py-3'>
                <div class="col-md-6">
                    <label for="" class="form-label">{" "}Job Position{" "}</label>
                    <input type="text"
                        class="form-control"
                        id="exampleFormControlTextarea3"
                        value={JobPosition}
                        onChange={handleJobPosition}
                        required
                        placeholder=" Job Position " 
                    />
                </div>
                <div class="col-md-6">
                    <label for="" class="form-label">{" "}Gender{" "}</label>
                    <select class="form-select form-select-sm py-1" value={gender} onChange={handleGender}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    </select>
                </div>
            </div>
            <div className='row py-3'>
                <div class="col-md-10">
                    <label for="" class="form-label">{" "}Home Address{" "}</label>
                    <input type="text"
                    class="form-control"
                    id="exampleFormControlTextarea3"
                    value={HomeAddress}
                    onChange={handleHomeAddress}
                    required
                    />
                </div>
            </div>
            <div className='row py-3'>
                <div class="col-md-6">
                    <label for="" class="form-label">{" "}Email{" "}</label>
                    <input type="email"
                    class="form-control"
                    id="exampleFormControlTextarea3"
                    value={email}
                    onChange={handleEmail}
                    required
                    />
                </div>
                <div class="col-md-6">
                    <label for="" class="form-label">{" "}Phone Number{" "}</label>
                    <input type="text"
                    class="form-control"
                    id="exampleFormControlTextarea3"
                    value={Pnumber}
                    onChange={handlePhoneNumber}
                    required 
                    />
                </div>
            </div>

            <br />
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <MDBBtn rounded color="danger" type="submit" onClick={(e) => UpdateData(e)} className="btn btn-warning"> Update Employee </MDBBtn>
                <a><Link to="/AllEmployee"><MDBBtn rounded color="warning" type="submit" className="btn btn-success">Back to Home  </MDBBtn></Link></a>
            </div>
        </form>
      </div>
    </div>
  </div>  )
}

export default UpdateEmployee;