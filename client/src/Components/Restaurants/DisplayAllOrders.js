import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { StartUrl } from "../../configs/Url.json";

const AllMenus = () => {
  const [searchItem, setSearchItem] = useState("");
  const [users, setUsers] = useState([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${StartUrl}api/orders/allorder`);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <div className="input-group">
        <div className="col-md-9">
          <input
            type="search"
            className="form-control"
            style={{}}
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
      <br />
      <h3>
        <Link to="/addMenu">
          <span className="badge rounded-pill badge-info">Add New Menu</span>
        </Link>
      </h3>
      <br />
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">User Name</th>
            <th scope="col">User Street</th>
            <th scope="col">User City</th>
            <th scope="col">User Postal Code</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody id="cusdet">
          {users &&
            users
              .filter((user) => {
                if (searchItem === "") {
                  return true;
                } else {
                  return user.name
                    .toLowerCase()
                    .includes(searchItem.toLowerCase());
                }
              })
              .map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={user.images}
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{user.name}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1"> {user.description}</p>
                  </td>
                  <td> Rs: {user.price}</td>
                  <td></td>
                </tr>
              ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default AllMenus;
