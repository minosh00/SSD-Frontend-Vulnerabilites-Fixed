import axios from 'axios';
import { StartUrl } from "../../configs/Url.json";


let getAllFoodsURL = `${StartUrl}api/foods/`;


export async function getAllFoods() {
  return axios.get(getAllFoodsURL);
}