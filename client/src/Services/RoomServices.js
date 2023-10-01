import axios from 'axios';

let getRoomURL = "`${StartUrl}api/api/rooms/";
let getRoomByIdURL = "`${StartUrl}api/api/rooms/";
let updateRoomByIdURL = "`${StartUrl}api/api/rooms/";

export async function updateRoomByID(id, data) {
    const alldata = {
        name: data.name,
        maxcount: data.maxcount,
        rentperday: data.rentperday,
        type: data.type,
        features: data.features,
        description: data.description
    };
    return await axios.patch(updateRoomByIdURL + id, alldata);
}

export async function getAllRoom() {
    return await axios.get(getRoomURL);
}

export async function getRoomById(id) {
    return await axios.get(getRoomByIdURL + id);
}