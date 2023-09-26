import axios from 'axios';
let getAllEmployeeURL = "http://localhost:5000/employee/getAllEmployee"; 
let getEmployeeByIdURL = "http://localhost:5000/employee/getEmployeeById/";
let updateEmployeeByIDURL = "http://localhost:5000/employee/updateEmployeeByID/";

export async function updateEmployeeByID(id,data) {
    const alldata = {
        fname:data.fname,
        lname:data.lname,
        JobPosition:data.JobPosition,
        gender:data.gender,
        HomeAddress:data.HomeAddress,
        email:data.email,
        Pnumber:data.Pnumber,
    };

    return await axios.patch(updateEmployeeByIDURL + id,alldata);
}

export async function getAllEmployee() { 
    return await axios.get(getAllEmployeeURL);
}

export async function getEmployeeById(id) { 
    return await axios.get(getEmployeeByIdURL + id);
}





