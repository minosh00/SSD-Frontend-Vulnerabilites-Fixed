import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Button } from 'react-bootstrap'
import UsersReport from './UsersReport';

const AllUsers = () => {

    const [users, setUsers] = useState();

    useEffect(async () => {
        try {
            const data = await (
                await axios.get("http://localhost:5000/user/getAllUsers")
            ).data;
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const deleteUsers = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/user/deleteUser/${id}`)
            const newRoom = users.filter(users => users._id !== id);
            setUsers(newRoom);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <div className='container shadow my-5'> <br />
                <h3 className=" fw-bolder mb-4"><center>All Users</center></h3>
                <hr />
                <table class="table" Id="FundsTrans">
                    <thead className='table-dark'>
                        <tr>
                            <th scope='col'>No</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">E-mail Address</th>
                            <th scope='col'>User Role</th>
                            <th scope='col'>Delete User</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        {
                            users && users.map((users, id) => (
                                <tr>
                                    <td>{id + 1}</td>
                                    <td>{users.Fullname}</td>
                                    <td>{users.pNumber}</td>
                                    <td>{users.email}</td>
                                    <td>{users.userRole}</td>
                                    <td><button className='btn btn-danger' onClick={() => deleteUsers(users._id)}>Delete User</button></td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </table>

                <Button className='btn btn-primary search-btn' onClick={() => UsersReport(users)}>Generate Pdf</Button> &nbsp;

                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-primary"
                    table="FundsTrans"
                    filename="AllUsers"
                    sheet="tablexls"
                    buttonText="Export As Excel" /> <br /> <br />

            </div>
        </div>
    )
}

export default AllUsers