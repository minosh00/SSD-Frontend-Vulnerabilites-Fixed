import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import SupplyPdfReport from "./SupplyPdfReport";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { StartUrl } from "../../configs/Url.json";

const AllSuppliers = () => {
  const [serachItem, setserachItem] = useState("");
  const [Supplier, setSupplier] = useState([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`${StartUrl}api/suppliers/`);
        setSupplier(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const removeSupplier = (id) => {
    axios.delete(`${StartUrl}api/suppliers/${id}`).then((res) => {
      Swal.fire("Congrats", "Remove Supplier successfully", "success");
    });
    setSupplier(Supplier.filter((elem) => elem._id !== id));
  };

  return (
    <div className="container">
      <br></br>
      <br></br>
      <h3 className="fw-bolder mb-4">
        <center>Suppliers</center>
      </h3>
      <br></br>
      <div class="input-group">
        <div className="col-md-9">
          <input
            type="search"
            class="form-control"
            style={{}}
            placeholder="Search by Supplier Name"
            aria-label="Search"
            onChange={(event) => {
              setserachItem(event.target.value);
            }}
            aria-describedby="search-addon"
          />
        </div>
      </div>
      <br></br>
      <br></br>
      <h3>
        <Link to="/addsupplier">
          <span type="submit" class="badge rounded-pill badge-info">
            Add New Supplier
          </span>
        </Link>
      </h3>
      <br></br>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Supplier name</th>
            <th scope="col">Supplier Company</th>
            <th scope="col">Supplies Items</th>
            <th scope="col">Supplies Amount</th>
            <th scope="col">Supply Date</th>
            <th scope="col">Total Price</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody Id="FundsTrans">
          {Supplier &&
            Supplier.filter((users) =>
              serachItem
                ? users.suppliername
                    .toLowerCase()
                    .includes(serachItem.toLowerCase())
                : true
            ).map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{user.suppliername}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1">{user.supplierCompanyName}</p>
                </td>
                <td>
                  <p className="fw-normal mb-1">{user.SupplyItemsname}</p>
                </td>
                <td>
                  <p className="fw-normal mb-1">{user.SupplyAmount}</p>
                </td>
                <td>
                  <p className="fw-normal mb-1">{user.SupplyDate}</p>
                </td>
                <td>
                  <p className="fw-normal mb-1">{user.totalPrice}</p>
                </td>
                <td>
                  <Link to={`/updateSupplierByID/${user._id}`}>
                    <h5>
                      <span
                        type="submit"
                        className="badge rounded-pill badge-success"
                      >
                        Update
                      </span>
                    </h5>
                  </Link>
                  <h5>
                    <span
                      onClick={() => removeSupplier(user._id)}
                      type="submit"
                      className="badge rounded-pill badge-danger"
                    >
                      Remove
                    </span>
                  </h5>
                </td>
              </tr>
            ))}
        </MDBTableBody>
      </MDBTable>
      <Button
        className="btn btn-danger search-btn"
        onClick={() => SupplyPdfReport(Supplier)}
      >
        Generate Pdf
      </Button>{" "}
      &nbsp;
      <br /> <br />
    </div>
  );
};

export default AllSuppliers;
