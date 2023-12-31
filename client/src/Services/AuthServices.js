import axios from "axios";
import { StartUrl } from "../configs/Url.json";

let RegisterURL = StartUrl + "api/signup";
let LoginURL = StartUrl + "api/signin";
let AuthURL = StartUrl + "api/auth";
let getAllUsers = StartUrl + "api/users";
let CreateUser = StartUrl + "api/users";
let UpdateUser = StartUrl + "api/users/";
let DeleteUser = StartUrl + "api/users/";
let GetUserByIDUrl = StartUrl + "api/users/";

export async function RegisterStudent(data) {
  const alldata = {
    Fullname: data.Fullname,
    pNumber: data.pNumber,
    email: data.email,
    password: data.password,
    userRole: "customer",
  };

  return await axios.post(RegisterURL, alldata);
}

export async function LoginCustomer(data) {
  const alldata = {
    email: data.email,
    password: data.password,
  };

  let result;
  await axios
    .post(LoginURL, alldata)
    .then(function (data) {
      //console.log("success data",data)
      result = data;
    })
    .catch(function (error) {
      if (error.response) {
        //console.log(error.response.data);

        result = error.response;
      } else if (error.request) {
        //console.log(error.request);

        result = error.request;
      }
    });
  return result;
}

export async function AuthCustomer(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.get(AuthURL, config);
}

export async function GetallUsers() {
  return axios.get(getAllUsers);
}

export async function CreateAdmin(data) {
  const alldata = {
    Fullname: data.Fullname,
    email: data.email,
    pNumber: data.pNumber,
    password: data.password,
    userRole: data.userRole,
  };

  return await axios.post(CreateUser, alldata);
}

export async function UpdateAdmin(id, data) {
  const alldata = {
    Fullname: data.Fullname,
    pNumber: data.pNumber,
    email: data.email,
    password: data.password,
    userRole: data.userRole,
  };

  return await axios.patch(UpdateUser + id, alldata);
}

export async function DeleteAdmin(id) {
  return await axios.delete(DeleteUser + id);
}

export async function GetUserByID(id) {
  return await axios.get(GetUserByIDUrl + id);
}
