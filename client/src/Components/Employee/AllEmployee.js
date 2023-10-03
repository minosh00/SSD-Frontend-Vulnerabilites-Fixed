import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { BASE_URL } from "../../configs/Url.json";

const AllEmployee = () => {
  const [searchItem, setSearchItem] = useState("");
  const [employees, setEmployees] = useState([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/employees/`);
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const removeEmployee = (id) => {
    axios
      .delete(`${BASE_URL}/api/employees/${id}`)
      .then(() => {
        Swal.fire("Congrats", "Remove Employee successfully", "success");
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee._id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
        Swal.fire(
          "Error",
          "An error occurred while removing the employee",
          "error"
        );
      });
  };

  return (
    <div className="container">
      <br />
      <br />
      <h3 className="fw-bolder mb-4">
        <center>Employees</center>
      </h3>
      <br />
      <div className="input-group">
        <div className="col-md-4">
          <input
            type="search"
            className="form-control"
            placeholder="Search by Employee Name"
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
        <Link to="/addemployee">
          <span
            type="submit"
            className="badge rounded-pill badge-info"
            style={{ marginRight: "10px" }}
          >
            Add New Employee
          </span>
        </Link>
        <Link to="/AllSuppliers">
          <span type="submit" className="badge rounded-pill badge-info">
            Suppliers
          </span>
        </Link>
      </h3>
      <br />
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Employee First Name</th>
            <th scope="col">Employee Last Name</th>
            <th scope="col">Employee Job Position</th>
            <th scope="col">Employee Gender</th>
            <th scope="col">Employee Home Address</th>
            <th scope="col">Employee Email</th>
            <th scope="col">Employee Phone Number</th>
            <th scope="col">Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {employees
            .filter((employee) => {
              if (!searchItem) {
                return true;
              }
              return employee.fname
                .toLowerCase()
                .includes(searchItem.toLowerCase());
            })
            .map((employee) => (
              <tr key={employee._id}>
                <td>{employee.fname}</td>
                <td>{employee.lname}</td>
                <td>{employee.JobPosition}</td>
                <td>
                  <MDBBadge color="success" pill>
                    {employee.gender}
                  </MDBBadge>
                </td>
                <td>{employee.HomeAddress}</td>
                <td>{employee.email}</td>
                <td>{employee.Pnumber}</td>
                <td>
                  <Link to={`/updateEmployeeByID/${employee._id}`}>
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
                      onClick={() => removeEmployee(employee._id)}
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
    </div>
  );
};

export default AllEmployee;
