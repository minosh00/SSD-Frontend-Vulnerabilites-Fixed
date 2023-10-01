import axios from "axios";
import { StartUrl } from "../../../configs/Url.json";
let getGroupURL = `${StartUrl}api/foods/`;
let getGroupByIdURL = `${StartUrl}api/foods/`;
let updateGroupByIdURL = `${StartUrl}api/foods/`;

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
