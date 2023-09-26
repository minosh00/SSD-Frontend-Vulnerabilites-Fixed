import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../Restaurants/Loader";
import { Link } from "react-router-dom";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

const  AllEmployee = ()=> {
 const [serachItem,setserachItem] =useState([]);
 const [Employee, setusers] = useState();
 const [loading, setloading] = useState(true);

 useEffect(async () => {
   try {
     const data = await (
       await axios.get("http://localhost:5000/employee/getAllEmployee")
     ).data;
     setusers(data);
     setloading(false);
   } catch (error) {
     console.log(error);
     setloading(false);
   }
 }, []);


 const removeEmployee = id =>{
   axios.delete(`http://localhost:5000/employee/RemoveEmployee/${id}`)
   .then(res => 
     
     {Swal.fire('Congrats' , ' remove  Employee successfully ' , 'success')
 
 }    )
 setusers(Employee.filter(elem=>elem._id !== id))
 }

 return (
    <div className="container">
      <br></br>   
      <br></br> 
      <h3 className=" fw-bolder mb-4"><center>Employees</center></h3>  
      <br></br>
      <div class="input-group">
      <div className="col-md-4">
        <input type="search" class="form-control" placeholder="Search by Employee Name  " aria-label="Search"  onChange={event=>{setserachItem(event.target.value)}} 
   aria-describedby="search-addon" />
        </div>
    </div>
    <br></br><br></br>
    <h3> 
      <Link to="/addemployee"><span type="submit" class="badge rounded-pill badge-info" style={{ marginRight: "10px"}}>Add New Employee</span></Link>
      <Link to="/AllSuppliers"><span type="submit" class="badge rounded-pill badge-info">Suppliers</span></Link>
    </h3>
    <br></br>
    <MDBTable align='middle'>
      <MDBTableHead>
       <tr>
         <th scope='col'>Employee First name   </th>
         <th scope='col'>Employee last name </th>
         <th scope='col'>Employee Job Position   </th>
         <th scope='col'>Employee gender   </th>
         <th scope='col'>Employee Home Address   </th>
         <th scope='col'>Employee email  </th>
         <th scope='col'>Employee Phone Number  </th>
         <th scope='col'>Actions</th>
       </tr>
      </MDBTableHead>
    <MDBTableBody>
    {Employee &&
             Employee.filter((users)=>{
               if(serachItem ==""){
                     return users
               }else if(users.fname.toLowerCase().includes(serachItem.toLowerCase())){
            
                 return users
    }   }).map((user) => {
    return (
      <tr>
        <td>
          <div className='d-flex align-items-center'>
            <div className='ms-3'>
              <p className='fw-bold mb-1'>{user.fname}</p>
            </div>
          </div>
        </td>
        <td>
          <p className='fw-normal mb-1'>  {user.lname}</p>
        </td>
        <td>
          <p className='fw-normal mb-1'>  {user.JobPosition}</p>
        </td>
        <td>
          <MDBBadge color='success' pill>
            <p className='fw-normal mb-1'>  {user.gender}</p>
          </MDBBadge>
        </td>
        <td>
          <p className='fw-normal mb-1'>  {user.HomeAddress}</p>
        </td>
        <td>
          <p className='fw-normal mb-1'>  {user.email}</p>
        </td>
        <td> {user.Pnumber}</td>
        <td>
          <Link to={`/updateEmployeeByID/${user?._id}`}>
            <h5><span  type="submit" class="badge rounded-pill badge-success">Update</span></h5>       
          </Link> 
          <h5><span  onClick={()=>removeEmployee(user._id)}  type="submit" class="badge rounded-pill badge-danger">Remove</span></h5> 
        </td>
      </tr>
    );
  })}
  </MDBTableBody>
  </MDBTable>
  </div>
   
 );
}
export default AllEmployee ;

