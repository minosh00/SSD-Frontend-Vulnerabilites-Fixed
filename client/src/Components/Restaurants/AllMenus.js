import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import MenuReport from "./MenuReport";
import { Button } from 'react-bootstrap'


const AllMenus = () => {
  const [serachItem, setserachItem] = useState([]);
  const [users, setusers] = useState();
  const [loading, setloading] = useState(true);

  useEffect(async () => {
    try {
      const data = await (
        await axios.get("http://localhost:5000/menu/getAllMenu/")
      ).data;
      setusers(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }, []);


  const removefood = id => {
    axios.delete(`http://localhost:5000/menu/RemoveFood/${id}`)
      .then(res => {
        Swal.fire('Congrats', ' remove successfully ', 'success')
      })
    setusers(users.filter(elem => elem._id !== id))
  }

  return (
    <div className="container"><br /><br /><br />
      <div class="input-group">
        <div className="col-md-6 mx-auto">
          <input type="search" class="form-control" placeholder="Search by Room Name" aria-label="Search" onChange={event => { setserachItem(event.target.value) }}
            aria-describedby="search-addon" />
        </div>
      </div>
      <br></br>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <Link to="/addMenu"><MDBBtn color="primary" type="submit">Add New Menu</MDBBtn></Link>
        <Button className='btn btn-danger search-btn' onClick={() => MenuReport(users)}>Generate Pdf</Button> &nbsp; <br />
      </div> <br/>

      <MDBTable align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col'>Food Name </th>
            <th scope='col'>Food Description</th>
            <th scope='col'>Food Price </th>
            <th scope='col'>Actions</th>
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
                    <td> LKR {user.price}/=</td>
                    <td>
                      <h5><Link to={{ pathname: `/updateMenuByID/${user?._id}` }}><span type="submit" class="badge rounded-pill badge-warning">Update</span></Link></h5>
                      <h5><span onClick={() => removefood(user?._id)} type="submit" class="badge rounded-pill badge-danger">Delete</span></h5>
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