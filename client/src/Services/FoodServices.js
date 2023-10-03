import axios from "axios";
import { BASE_URL } from "../../configs/Url.json";

let getAllFoodsURL = `${BASE_URL}/api/foods/`;

export async function getAllFoods() {
  return axios.get(getAllFoodsURL);
}
