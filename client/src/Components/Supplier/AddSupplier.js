import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

import { Link, useNavigate, useParams } from "react-router-dom";
import "../Employee/Employee.css";
import logo from "../../images/menuss.png";
import { ValidateAddNewMenu } from "./Validation";

const AddSupplier = () => {
  const [suppliername, setfname] = useState("");
  const [supplierCompanyName, setCompany] = useState("");
  const [SupplyItemsname, setSupplies] = useState("");
  const [SupplyAmount, setSupplyAmount] = useState("");
  const [SupplyDate, setSupplyDate] = useState("");
  const [totalPrice, settotPrice] = useState("");
  const navigate = useNavigate();


  const changeOnClick = (f) => {
    const Supplier = {
      suppliername,
      supplierCompanyName,
      SupplyItemsname,
      SupplyAmount,
      SupplyDate,
      totalPrice,
    };
    let validate = ValidateAddNewMenu(Supplier);
    let msg = validate?.message;

    if(validate.status == false)
    {
        window.alert(`${msg}`);
     
    } else {
       

    axios.post("http://localhost:5000/supplier/createSupplier", Supplier);

    Swal.fire("Congrats", " New Supplier Added  successfully", "success");

    navigate("/AllSuppliers");
  };
}

  return (
    <div>
      <div>
        <div className="container shadow my-5 mx-auto w-50">
          <div className="col p-3">
            <h3 className=" fw-bolder mb-4"><center>Add New Supplier</center></h3>
            <form onSubmit={changeOnClick} encType="">
              <div className='row py-3'>
                  <div class="col-md-6">
                      <label for="" class="form-label">{" "}Supplier Name{" "}</label>
                      <input type="text"
                        class="form-control"
                        id="floatingInput"
                        onChange={(f) => setfname(f.target.value)}
                        required
                        placeholder=" Supplier Name" 
                      />
                  </div>
                  <div class="col-md-6">
                      <label for="" class="form-label">{" "}Supplier Company{" "}</label>
                      <input type="text"
                        class="form-control"
                        id="floatingPassword"
                        onChange={(f) => setCompany(f.target.value)}
                        required
                        placeholder=" Supplier Company" 
                      />
                  </div>
              </div>
              <div className='row py-3'>
                <div class="col-md-6">
                  <label for="" class="form-label">{" "}Supplies Items{" "}</label>
                    <input type="text"
                      class="form-control"
                      id="exampleFormControlTextarea3"
                      onChange={(f) => setSupplies(f.target.value)}
                      required
                      placeholder=" Supplies Items " 
                    />
                </div>
                <div class="col-md-6">
                  <label for="" class="form-label">{" "}Supplies Amount{" "}</label>
                    <input type="text"
                      class="form-control"
                      id="exampleFormControlTextarea3"
                      onChange={(f) => setSupplyAmount(f.target.value)}
                      required
                      placeholder=" Supplies Amount" 
                    />
                </div>
              </div>
              <div className='row py-3'>
                  <div class="col-md-6">
                      <label for="" class="form-label">{" "}Supply Date{" "}</label>
                      <input type="date"
                        class="form-control"
                        id="exampleFormControlTextarea3"
                        onChange={(f) => setSupplyDate(f.target.value)}
                        max={new Date().toISOString().split("T")[0]}
                        required
                        placeholder=" Supply Date" 
                      />
                  </div>
                  <div class="col-md-6">
                      <label for="" class="form-label">{" "}Total Price{" "}</label>
                      <input type="text"
                        class="form-control"
                        id="exampleFormControlTextarea3"
                        onChange={(f) => settotPrice(f.target.value)}
                        required
                        placeholder=" Total Price" 
                      />
                  </div>
              </div>
              <div className="row mb-5 px-2">
                <a>
                  <button
                    type="submit"
                    style={{ fontSize: "15px" }}
                    className="btn btn-danger"
                  >
                    Add Supplier{" "}
                  </button>
                </a>
                <br></br>
                <br></br>
                <a>
                  <Link to="/AllSuppliers">
                    <button
                      type="submit"
                      style={{ fontSize: "10px" }}
                      className="btn btn-success"
                    >
                      Back to Home{" "}
                    </button>
                  </Link>
                </a>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSupplier;
