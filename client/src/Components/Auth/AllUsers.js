import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Button } from "react-bootstrap";
import UsersReport from "./UsersReport";
import { StartUrl } from "../../configs/Url.json";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${StartUrl}api/users`);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const deleteUsers = async (id) => {
    try {
      await axios.delete(`${StartUrl}api/users/${id}`);
      const newUsers = users.filter((user) => user._id !== id);
      setUsers(newUsers);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="container shadow my-5">
        <br />
        <h3 className="fw-bolder mb-4">
          <center>All Users</center>
        </h3>
        <hr />
        <table className="table" id="FundsTrans">
          <thead className="table-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Full Name</th>
              <th scope="col">Phone Number</th>
              <th scope="col">E-mail Address</th>
              <th scope="col">User Role</th>
              <th scope="col">Delete User</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {users &&
              users.map((user, id) => (
                <tr key={user._id}>
                  <td>{id + 1}</td>
                  <td>{user.Fullname}</td>
                  <td>{user.pNumber}</td>
                  <td>{user.email}</td>
                  <td>{user.userRole}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteUsers(user._id)}
                    >
                      Delete User
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Button
          className="btn btn-primary search-btn"
          onClick={() => UsersReport(users)}
        >
          Generate Pdf
        </Button>{" "}
        &nbsp;
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="btn btn-primary"
          table="FundsTrans"
          filename="AllUsers"
          sheet="tablexls"
          buttonText="Export As Excel"
        />{" "}
        <br /> <br />
      </div>
    </div>
  );
};

export default AllUsers;
