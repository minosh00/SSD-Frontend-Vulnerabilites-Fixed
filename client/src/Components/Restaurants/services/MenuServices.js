import axios from "axios";
import { BASE_URL } from "../../../configs/Url.json";
let getGroupURL = `${BASE_URL}/api/foods/`;
let getGroupByIdURL = `${BASE_URL}/api/foods/`;
let updateGroupByIdURL = `${BASE_URL}/api/foods/`;

export async function updateMenuByID(id, data) {
  const alldata = {
    name: data.name,
    price: data.price,
    description: data.description,
    images: data.images,
  };
  return await axios.patch(updateGroupByIdURL + id, alldata);
}

export async function getAllMenu() {
  return await axios.get(getGroupURL);
}

export async function getMenuById(id) {
  return await axios.get(getGroupByIdURL + id);
}
