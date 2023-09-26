import axios from 'axios';

let getGroupURL = "http://localhost:5000/menu/getAllMenu/"; 
let getGroupByIdURL = "http://localhost:5000/menu/getMenuById/";
let updateGroupByIdURL = "http://localhost:5000/menu/updateMenuByID/";

export async function updateMenuByID(id,data) {
    const alldata = {
        name:data.name,
        price:data.price,
        description:data.description,
        images:data.images,
    };
    return await axios.patch(updateGroupByIdURL + id,alldata);
}

export async function getAllMenu() { 
    return await axios.get(getGroupURL);
}

export async function getMenuById(id) { 
    return await axios.get(getGroupByIdURL + id);
}