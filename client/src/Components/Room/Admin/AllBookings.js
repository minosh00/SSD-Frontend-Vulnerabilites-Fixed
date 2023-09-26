import React, { useState, useEffect } from 'react'
import axios from "axios";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Button } from 'react-bootstrap'
import RoomPdfReport from './RoomPdfReport';

function AllBookings() {

    const [room, setRoom] = useState();

    useEffect(async () => {
        try {
            const data = await (
                await axios.get("http://localhost:5000/book/viewbook")).data;
            setRoom(data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const deleteBooking = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/book/deletestatus/${id}`)
            const newRoom = room.filter(room => room._id !== id);
            setRoom(newRoom);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <div className="">
                <div className="container shadow border border-5 my-5 mx-auto w-100"> <br />
                    <h3 className=" fw-bolder mb-4">
                        <center>All Bookings</center>
                        <hr />
                    </h3>
                    <table class="table" Id="FundsTrans">
                        <thead className='table-dark'>
                            <tr>
                                <th scope='col'>No</th>
                                <th scope="col">Name</th>
                                <th scope="col">E-mail Address</th>
                                <th scope="col">Room Name</th>
                                <th scope="col">Check-in Date</th>
                                <th scope="col">Check-out Date</th>
                                <th scope='col'>Payment</th>
                                <th scope="col">Status</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            {
                                room && room.map((topic, id) => (
                                    <tr>
                                        <td>{id + 1}</td>
                                        <td>{topic.Fullname}</td>
                                        <td>{topic.email}</td>
                                        <td>{topic.room}</td>
                                        <td>{topic.fromdate}</td>
                                        <td>{topic.todate}</td>
                                        <td>LKR {topic.totAmount}/=</td>
                                        <td><button className='btn btn-success'>{topic.status}</button></td>
                                        <td><button className='btn btn-danger' onClick={() => deleteBooking(topic._id)}>Delete</button></td>
                                    </tr>
                                )
                                )
                            }
                        </tbody>
                    </table>

                    <Button className='btn btn-danger search-btn' onClick={() => RoomPdfReport(room)}>Generate Pdf</Button> &nbsp;

                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="btn btn-danger"
                        table="FundsTrans"
                        filename="AllBooking"
                        sheet="tablexls"
                        buttonText="Export As Excel" /> <br /> <br />

                </div>
            </div>
        </div>
    )
}

export default AllBookings

