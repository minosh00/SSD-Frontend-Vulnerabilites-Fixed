import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateSupplierByID, getSupplierById } from "./services/Sup";
import { MDBBtn } from "mdb-react-ui-kit";

const UpdateSupplyer = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [suppliername, setSupplierName] = useState("");
  const [supplierCompanyName, setSupplierCompanyName] = useState("");
  const [SupplyItemsname, setSupplyItemsName] = useState("");
  const [SupplyAmount, setSupplyAmount] = useState("");
  const [SupplyDate, setSupplyDate] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const handleSuppliername = (e) => {
    setSupplierName(e.target.value);
  };

  const handleCompanyname = (e) => {
    setSupplierCompanyName(e.target.value);
  };

  const handleItemname = (e) => {
    setSupplyItemsName(e.target.value);
  };

  const handleAmount = (e) => {
    setSupplyAmount(e.target.value);
  };

  const handleSupplyDate = (e) => {
    setSupplyDate(e.target.value);
  };

  const handletotPrice = (e) => {
    setTotalPrice(e.target.value);
  };

  const GetData = async () => {
    try {
      const data = await getSupplierById(id);
      console.log("Update Supplier", data);

      setSupplierName(data?.data?.suppliername);
      setSupplierCompanyName(data?.data?.supplierCompanyName);
      setSupplyItemsName(data?.data?.SupplyItemsname);
      setSupplyAmount(data?.data?.SupplyAmount);
      setSupplyDate(data?.data?.SupplyDate);
      setTotalPrice(data?.data?.totalPrice);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetData();
  });

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

    try {
      const data = await updateSupplierByID(id, newdata);
      console.log("Update success", data);

      if (!data?.data?.suppliername) {
        Swal.fire("Congrats", "Supplier Updated successfully", "success");
        navigate("/AllSuppliers");
      } else {
        Swal.fire("Congrats", "Update successfully", "success");
        navigate("/AllSuppliers");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container shadow border border-5 my-5 mx-auto w-50">
        <div className="col p-3">
          <h3 className="fw-bolder mb-4">
            <center>Update Supplier Details</center>
          </h3>
          <form>
            <div className="row py-3">
              <div className="col-md-6">
                <label htmlFor="supplierName" className="form-label">
                  Supplier Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="supplierName"
                  value={suppliername}
                  onChange={handleSuppliername}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="companyName" className="form-label">
                  Supplier Company
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="companyName"
                  value={supplierCompanyName}
                  onChange={handleCompanyname}
                  required
                />
              </div>
            </div>
            <div className="row py-3">
              <div className="col-md-6">
                <label htmlFor="items" className="form-label">
                  Supplies Items
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="items"
                  value={SupplyItemsname}
                  onChange={handleItemname}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="amount" className="form-label">
                  Supplies Amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="amount"
                  value={SupplyAmount}
                  onChange={handleAmount}
                  required
                />
              </div>
            </div>
            <div className="row py-3">
              <div className="col-md-6">
                <label htmlFor="supplyDate" className="form-label">
                  Supply Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="supplyDate"
                  value={SupplyDate}
                  onChange={handleSupplyDate}
                  max={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="price" className="form-label">
                  Total Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={totalPrice}
                  onChange={handletotPrice}
                  required
                />
              </div>
            </div>

            <br />
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <MDBBtn
                rounded
                color="danger"
                type="submit"
                onClick={(e) => UpdateData(e)}
                className="btn btn-warning"
              >
                Update Supplier
              </MDBBtn>
              <Link to="/AllSuppliers">
                <MDBBtn
                  rounded
                  color="warning"
                  type="submit"
                  className="btn btn-success"
                >
                  Back to Home
                </MDBBtn>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateSupplyer;
