import { BASE_URL } from "../../../configs/Url.json";

import axios from "axios";
let getAllRoomspURL = `${BASE_URL}/api/rooms/`;
let getRoomsByIdURL = `${BASE_URL}/api/rooms/`;
let updateRoomsByIdURL = `${BASE_URL}/api/rooms/`;
let updateRoomsByIdURL1 = `${BASE_URL}/api/rooms/`;

export async function updateRoomsByID(id, data) {
  const alldata = {
    name: data.name,
    maxcount: data.maxcount,
    adult: data.adult,
    children: data.children,
    bedroom: data.bedroom,
    rentperday: data.rentperday,
    type: data.type,
    imageurls: data.imageurls,
    description: data.description,
    features: data.features,
  };

  return await axios.put(updateRoomsByIdURL + id, alldata);
}

export async function updateRoomsByID1(id, data) {
  const alldata = {
    name: data.name,
    maxcount: data.maxcount,
    rentperday: data.rentperday,
    type: data.type,
    imageurls: data.imageurls,
    description: data.description,
    features: data.features,
  };

  return await axios.put(updateRoomsByIdURL1 + id, alldata);
}

export async function getAllRooms() {
  return await axios.get(getAllRoomspURL);
}

export async function getRoomsById(id) {
  return await axios.get(getRoomsByIdURL + id);
}
