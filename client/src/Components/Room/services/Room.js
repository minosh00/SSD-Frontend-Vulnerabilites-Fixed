import axios from 'axios';
let getAllRoomspURL = "http://localhost:5000/room/getAllRooms/"; 
let getRoomsByIdURL = "http://localhost:5000/room/getRoomsById/";
let updateRoomsByIdURL = "http://localhost:5000/room/updateRoomsByID/";
let updateRoomsByIdURL1 = "http://localhost:5000/room/updateRoomsByID1/";

export async function updateRoomsByID(id,data) {
    const alldata = {
        name:data.name,
        maxcount:data.maxcount,
        adult:data.adult,
        children:data.children,
        bedroom:data.bedroom,
        rentperday:data.rentperday,
        type:data.type,
        imageurls:data.imageurls,
        description:data.description,
        features:data.features
    };

    return await axios.patch(updateRoomsByIdURL + id,alldata);
}






export async function updateRoomsByID1(id,data) {
    const alldata = {
      
        
        

        name:data.name,
        maxcount:data.maxcount,
        rentperday:data.rentperday,
        type:data.type,
        imageurls:data.imageurls,
        description:data.description,
        features:data.features
    };


    return await axios.patch(updateRoomsByIdURL1 + id,alldata);
}






export async function getAllRooms() { 
    return await axios.get(getAllRoomspURL);
}

export async function getRoomsById(id) { 
    return await axios.get(getRoomsByIdURL + id);
}





