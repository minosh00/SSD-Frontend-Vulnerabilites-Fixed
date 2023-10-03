import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Button } from "react-bootstrap";
import RoomPdfReport from "./RoomPdfReport";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BASE_URL } from "../../../configs/Url.json";

function AllBookings() {
  const [room, setRoom] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/viewbook`);
        setRoom(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const deleteBooking = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/deletestatus/${id}`);
      const newRoom = room.filter((booking) => booking._id !== id);
      setRoom(newRoom);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container shadow my-5 mx-auto">
      <br />
      <h3 className="fw-bolder mb-4 text-center">All Bookings</h3>
      <table className="table" id="FundsTrans">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th scope="col">Name</th>
            <th scope="col">E-mail Address</th>
            <th scope="col">Room Name</th>
            <th scope="col">Check-in Date</th>
            <th scope="col">Check-out Date</th>
            <th scope="col">Payment</th>
            <th scope="col">Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {room.map((topic, id) => (
            <tr key={id}>
              <td>{id + 1}</td>
              <td>{topic.Fullname}</td>
              <td>{topic.email}</td>
              <td>{topic.room}</td>
              <td>{topic.fromdate}</td>
              <td>{topic.todate}</td>
              <td>LKR: {topic.totAmount} /=</td>
              <td>
                <button className="btn btn-success">{topic.status}</button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteBooking(topic._id)}
                >
                  <RiDeleteBin6Fill />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <Button className="btn btn-danger" onClick={() => RoomPdfReport(room)}>
          Generate Pdf
        </Button>{" "}
        &nbsp;
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="btn btn-danger"
          table="FundsTrans"
          filename="AllBooking"
          sheet="tablexls"
          buttonText="Export As Excel"
        />
      </div>
      <br />
    </div>
  );
}

export default AllBookings;
