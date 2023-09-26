import axios from 'axios';
import {StartUrl} from "../configs/Url.json";


let RegisterURL = StartUrl + "user/signup";
let LoginURL = StartUrl + "user/signin";
let AuthURL = StartUrl + "user/auth";
let getAllUsers = StartUrl + "user/getAllUsers";
let CreateUser = StartUrl + "user/createUser";
let UpdateUser = StartUrl + "user/updateUserById/";
let DeleteUser = StartUrl + "user/deleteUser/";
let GetUserByIDUrl = StartUrl + "user/getUserById/";



export async function RegisterStudent(data) {
    const alldata = {
        Fullname:data.Fullname,
        pNumber:data.pNumber,
        email:data.email,
        password:data.password,
        userRole:"customer"
    };

    return await axios.post(RegisterURL,alldata);
}


export async function LoginCustomer(data) {
    const alldata = {
        email:data.email,
        password:data.password,
    };
    
    return await axios.post(LoginURL,alldata);
}

export async function AuthCustomer(token) { 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    return await axios.get(AuthURL,config);
}

export async function GetallUsers(){
  return axios.get(getAllUsers);
}

export async function CreateAdmin(data) {
  const alldata = {
    Fullname:data.Fullname,
      email:data.email,
      pNumber:data.pNumber,
      password:data.password,
      userRole:data.userRole
  };

  return await axios.post(CreateUser,alldata);
}


export async function UpdateAdmin(id,data) {
  const alldata = {
    Fullname:data.Fullname,
    pNumber:data.pNumber,
      email:data.email,
      password:data.password,
      userRole:data.userRole
  };

  return await axios.patch(UpdateUser + id,alldata);
}

export async function DeleteAdmin(id) {
  return await axios.delete(DeleteUser + id);
}

export async function GetUserByID(id) {
  return await axios.get(GetUserByIDUrl + id);
}


