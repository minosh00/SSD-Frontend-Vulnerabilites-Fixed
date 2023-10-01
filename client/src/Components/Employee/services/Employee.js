import axios from "axios";
import { StartUrl } from "../../../configs/Url.json";
let getAllEmployeeURL = `${StartUrl}api/employees/`;
let getEmployeeByIdURL = `${StartUrl}api/employees/`;
let updateEmployeeByIDURL = `${StartUrl}api/employees/`;

export async function updateEmployeeByID(id, data) {
  const alldata = {
    fname: data.fname,
    lname: data.lname,
    JobPosition: data.JobPosition,
    gender: data.gender,
    HomeAddress: data.HomeAddress,
    email: data.email,
    Pnumber: data.Pnumber,
  };

  return await axios.patch(updateEmployeeByIDURL + id, alldata);
}

export async function getAllEmployee() {
  return await axios.get(getAllEmployeeURL);
}

export async function getEmployeeById(id) {
  return await axios.get(getEmployeeByIdURL + id);
}
