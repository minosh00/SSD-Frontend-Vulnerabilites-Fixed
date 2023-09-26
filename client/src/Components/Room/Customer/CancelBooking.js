import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const CancelBooking = (props) => {

    const { id } = useParams("");

    const navigate = useNavigate();

    const [room, setRoom] = useState({
        status: "",
    });

    useEffect(() => {
        const getRoom = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/book/getbookstatus/${id}`)
                setRoom(res.data);
                console.log('render');
            } catch (err) {
                console.log(err);
            }
        }
        getRoom()
    }, []);


    function sendData(e) {
        e.preventDefault();
        axios.put(`http://localhost:5000/book/updatestatus/${id}`, room)
            .then(res => {
                console.log(res.data)
                alert("Booking Status Updated Sucessfully")
                navigate("/profile");
            }).catch((err) => {
                alert(err)
                console.error(err)
            })
    }


    return (
        <div>
            <div>
                <br /><br />

                <h3 className=" fw-bolder mb-5"><center>Update Booking Status</center></h3>
                <form onSubmit={sendData}>
                    <div class="card mx-auto w-50">
                        <div class="card-body">
                            <select className="form-control" name='itemType'
                                value={room.status}
                                onChange={(e) => { setRoom({ status: e.target.value }) }}>
                                <option>Select Booking Status</option>
                                <option>Cancel</option>
                                <option>Booked</option>
                            </select> <br />
                            <center>
                                <button type="submit" class="btn btn-success">Update Status</button>
                            </center>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default CancelBooking;