
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap'


const AllOrders = () => {
  const [serachItem, setserachItem] = useState([]);
  const [users, setusers] = useState();
  const [loading, setloading] = useState(true);

  useEffect(async () => {
    try {
      const data = await (
        await axios.get("http://localhost:5000/orders/allorder/")
      ).data;
      setusers(data);
      console.log(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }, []);

  return (
    <div className="container shadow my-5 mx-auto"><br /><br /><br />
      <h3 className=" fw-bolder mb-4">
        <center>All Orders</center>
        <hr />
      </h3><br />

      <table class="table table-bordered">
        <thead className='table-dark'>
          <tr>
            <th scope='col'>Customer Name </th>
            <th scope='col'>Street</th>
            <th scope='col'>City</th>
            <th scope='col'>Order Details</th>

          </tr>
        </thead>
        <tbody className="table-group-divider">
          {users &&
            users.filter((users) => {
              if (serachItem == "") {
                return users
              } else if (users._id.toLowerCase().includes(serachItem.toLowerCase())) {

                return users
              }
            })
              .map((item) => {
                return (
                  <tr>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className='ms-3'>
                          <p className='fw-bold mb-1'>{item?.user?.name}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className='fw-normal mb-1'>{item?.user?.street}</p>
                    </td>
                    <td>
                      <p className='fw-normal mb-1'>{item?.user?.city}</p>
                    </td>
                    <td>
                      <table class="table">
                        <thead className='table-primary'>
                          <tr>
                            <th scope='col'>Name </th>
                            <th scope='col'>Amount</th>
                            <th scope='col'>Price</th>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider">
                          {item?.orderedItems.map((order) => (
                            <tr>
                              <td>{order?.name}</td>
                              <td>{order?.amount}</td>
                              <td>LKR: {order?.price} /=</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>

  );
}
export default AllOrders;