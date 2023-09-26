import Swal from "sweetalert2";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateSupplierByID, getSupplierById } from "./services/Sup";
import { MDBBtn } from 'mdb-react-ui-kit'

const UpdateSupplyer = () => {

    
  const navigate = useNavigate();
  const { id } = useParams();

  const [suppliername, SETsuppliername] = useState("");
  const [supplierCompanyName, SETsupplierCompanyName] = useState();
  const [SupplyItemsname, SETSupplyItemsname] = useState("");
  const [SupplyAmount, SETSupplyAmount] = useState("");
  const [SupplyDate, SETSupplyDate] = useState("");
  const [totalPrice, SETtotalPrice] = useState("");

  
  const handleSuppliername = (e) => {
    SETsuppliername(e.target.value);
  };

  const handleCompanyname = (e) => {
    SETsupplierCompanyName(e.target.value);
  };

  const handleItemname = (e) => {
    SETSupplyItemsname(e.target.value);
  };

  const handleAmount = (e) => {
    SETSupplyAmount(e.target.value);
  };

  const handleSupplyDate = (e) => {
    SETSupplyDate(e.target.value);
  };

  const handletotPrice = (e) => {
    SETtotalPrice(e.target.value);
  };

  const GetData = async () => {

    let data = await getSupplierById(id);
    console.log("Update Supplier", data);

    SETsuppliername(data?.data?.suppliername);
    SETsupplierCompanyName(data?.data?.supplierCompanyName);
    SETSupplyItemsname(data?.data?.SupplyItemsname);
    SETSupplyAmount(data?.data?.SupplyAmount);
    SETSupplyDate(data?.data?.SupplyDate);
    SETtotalPrice(data?.data?.totalPrice);


  };

  useEffect(() => {
    GetData();
  }, []);


  const UpdateData = async (e) => {
    e.preventDefault();
    let newdata = {

        suppliername: suppliername,
        supplierCompanyName: supplierCompanyName,
        SupplyItemsname: SupplyItemsname,
        SupplyAmount: SupplyAmount,
        SupplyDate: SupplyDate,
        totalPrice: totalPrice,


    };

    let data = await updateSupplierByID(id, newdata);
    console.log("Update success ", data);
    if (!data?.data?.suppliername) {
      {
        Swal.fire('Congrats', 'Supplier Updated successfully ', 'success')
        navigate("/AllSuppliers");
      }

    } else {
      {
        Swal.fire('Congrats', 'Update  successfully ', 'success')
        navigate("/AllSuppliers");
      }
    }
  };

  return (
    <div>
    <div className="container shadow border border-5 my-5 mx-auto w-50">
      <div className="col p-3">
        <h3 className=" fw-bolder mb-4"><center>Update Supplier Details</center></h3>
        <form>
          <div className='row py-3'>
            <div class="col-md-6">
                <label for="" class="form-label">{" "}Supplier Name{" "}</label>
                <input type="text"
                  class="form-control"
                  id="floatingInput"
                  value={suppliername} 
                  onChange={handleSuppliername}
                  required
                />
            </div>
            <div class="col-md-6">
                <label for="" class="form-label">{" "}Supplier Company{" "}</label>
                <input type="text"
                  class="form-control"
                  id="floatingPassword"
                  value={supplierCompanyName}
                  onChange={handleCompanyname}
                  required
                />
            </div>
          </div>
          <div className='row py-3'>
            <div class="col-md-6">
              <label for="" class="form-label">{" "}Supplies Items{" "}</label>
                <input type="text"
                  class="form-control"
                  id="exampleFormControlTextarea3"
                  value={SupplyItemsname}
                  onChange={handleItemname}
                  required 
                />
            </div>
            <div class="col-md-6">
              <label for="" class="form-label">{" "}Supplies Amount{" "}</label>
                <input type="text"
                  class="form-control"
                  id="exampleFormControlTextarea3"
                  value={SupplyAmount}
                  onChange={handleAmount}
                  required 
                />
            </div>
          </div>
          <div className='row py-3'>
            <div class="col-md-6">
                <label for="" class="form-label">{" "}Supply Date{" "}</label>
                <input type="text"
                  class="form-control"
                  id="exampleFormControlTextarea3"
                  value={SupplyDate}
                  onChange={handleSupplyDate}
                  max={new Date().toISOString().split("T")[0]}
                  required
                />
            </div>
            <div class="col-md-6">
                <label for="" class="form-label">{" "}Total Price{" "}</label>
                <input type="text"
                  class="form-control"
                  id="exampleFormControlTextarea3"
                  value={totalPrice}
                  onChange={handletotPrice}
                  required
                />
            </div>
          </div>

           <br />
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <MDBBtn rounded color="danger" type="submit" onClick={(e) => UpdateData(e)} className="btn btn-warning"> Update Supplier </MDBBtn>
            <a><Link to="/AllSuppliers"><MDBBtn rounded color="warning" type="submit" className="btn btn-success">Back to Home  </MDBBtn></Link></a>
          </div>
        </form>
      </div>
    </div>
  </div>  )
}

export default UpdateSupplyer