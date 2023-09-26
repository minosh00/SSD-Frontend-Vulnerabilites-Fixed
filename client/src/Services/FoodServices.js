import axios from 'axios';


let getAllFoodsURL = "http://localhost:5000/foods/";


export async function getAllFoods() {
  return axios.get(getAllFoodsURL);
}