import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from "mdb-react-ui-kit";
import MenuReport from "./MenuReport";
import { Button } from "react-bootstrap";
import { StartUrl } from "../../configs/Url.json";

const AllMenus = () => {
  const [searchItem, setSearchItem] = useState("");
  const [menus, setMenus] = useState([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(`${StartUrl}api/foods`);
        setMenus(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  const removeFood = (id) => {
    axios.delete(`${StartUrl}api/foods/${id}`).then((res) => {
      Swal.fire("Congrats", "Remove Successfully ", "success");
    });

    setMenus(menus.filter((elem) => elem._id !== id));
  };

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <div class="input-group">
        <div className="col-md-6 mx-auto">
          <input
            type="search"
            class="form-control"
            placeholder="Search by Food Name"
            aria-label="Search"
            onChange={(event) => {
              setSearchItem(event.target.value);
            }}
            aria-describedby="search-addon"
          />
        </div>
      </div>
      <br />
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <Link to="/addMenu">
          <MDBBtn color="primary" type="submit">
            Add New Menu
          </MDBBtn>
        </Link>
        <Link to="/AllOrders">
          <MDBBtn color="primary" type="submit">
            All Orders
          </MDBBtn>
        </Link>
        <Button
          className="btn btn-danger search-btn"
          onClick={() => MenuReport(menus)}
        >
          Generate Pdf
        </Button>{" "}
        &nbsp; <br />
      </div>
      <br />
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">
              <b>Food Name</b>
            </th>
            <th scope="col">
              <b>Food Description</b>
            </th>
            <th scope="col">
              <b>Food Price</b>
            </th>
            <th scope="col">
              <b>Actions</b>
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody id="cusdet">
          {menus
            .filter((menu) =>
              menu.name.toLowerCase().includes(searchItem.toLowerCase())
            )
            .map((menu) => (
              <tr key={menu._id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={menu.images}
                      alt=""
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{menu.name}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1"> {menu.description}</p>
                </td>
                <td> LKR {menu.price}.00 /=</td>
                <td>
                  <h5>
                    <Link to={{ pathname: `/updateMenuByID/${menu._id}` }}>
                      <span
                        type="submit"
                        class="badge rounded-pill badge-warning"
                      >
                        Update
                      </span>
                    </Link>
                  </h5>
                  <h5>
                    <span
                      onClick={() => removeFood(menu._id)}
                      type="submit"
                      class="badge rounded-pill badge-danger"
                    >
                      Delete
                    </span>
                  </h5>
                </td>
              </tr>
            ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default AllMenus;
