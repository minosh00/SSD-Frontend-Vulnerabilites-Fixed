DisplayAllOrders

import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import autoTable from 'jspdf-autotable'
import { jsPDF } from "jspdf";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';



const AllMenus = () => {



  const [serachItem, setserachItem] = useState([]);
  const [users, setusers] = useState();
  const [loading, setloading] = useState(true);



  useEffect(async () => {
    try {
      const data = await (
        await axios.get("http://localhost:5000/orders/allorder")
      ).data;
      setusers(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }, []);











  return (
    <div className="container">
      <br></br>   <br></br>   <br></br>
      <div class="input-group">
        <div className="col-md-9">

          <input type="search" class="form-control" style={{}} placeholder="Search by Food Name  " aria-label="Search" onChange={event => { setserachItem(event.target.value) }}
            aria-describedby="search-addon" />
        </div>
      </div>
      <br></br><br></br>
      <h3> <Link to="/addMenu"><span type="submit" class="badge rounded-pill badge-info">Add New Menu</span></Link></h3>
      <br></br>
      <MDBTable align='middle'>

        <MDBTableHead>
          <tr>
            <th scope='col'>user Name </th>
            <th scope='col'>user street </th>
            <th scope='col'>user city  </th>
            <th scope='col'>user postalCode</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody id="cusdet">
          {users &&
            users.filter((users) => {
              if (serachItem == "") {
                return users
              } else if (users.name.toLowerCase().includes(serachItem.toLowerCase())) {

                return users
              }
            })
              .map((user) => {
                return (
                  <tr>
                    <td>
                      <div className='d-flex align-items-center'>
                        <img
                          src={user.images}
                          alt=''
                          style={{ width: '45px', height: '45px' }}
                          className='rounded-circle'
                        />
                        <div className='ms-3'>
                          <p className='fw-bold mb-1'>{user.name}</p>

                        </div>
                      </div>
                    </td>
                    <td>
                      <p className='fw-normal mb-1'>   {user.description}</p>

                    </td>

                    <td> Rs: {user.price}</td>
                    <td>

                    </td>
                  </tr>
                );
              })}
        </MDBTableBody>
      </MDBTable>
    </div>

  );
}
export default AllMenus;

