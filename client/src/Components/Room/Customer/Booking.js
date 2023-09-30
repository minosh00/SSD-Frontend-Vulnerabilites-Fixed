import Swal from "sweetalert2";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";
import CommentsSection from "../../Comments/CommentsSection";
import StripeCheckout from 'react-stripe-checkout';
import { AuthCustomer } from "../../../Services/AuthServices";
import axios from 'axios'
import { getRoomsById } from "../services/Room";

const Booking = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/Login");
  }

  const [Fullname, setUserName] = useState("");
  const [email, setUserEmail] = useState("");
  const [currentUserID, setcurrentUserID] = useState("");


  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleUserEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const { id, fromdate, todate } = useParams();

  const [room, setRoom] = useState([]);

  const [name, setname] = useState("");
  const [totDates, setTotDates] = useState("");
  const [maxcount, setmaxcount] = useState();
  const [rentperday, setrentperday] = useState("");
  const [type, settype] = useState("");
  const [imageurls, setimageurls] = useState("");
  const [features, setfeatures] = useState("");
  const [description, setdescription] = useState("");

  const details = async () => {
    let token = localStorage.getItem('token');
    let data = await AuthCustomer(token);
    console.log("current User", data?.data);
    setcurrentUserID(data?.data?._id);
    setUserName(data?.data?.Fullname);
    setUserEmail(data?.data?.email);
  }

  useEffect(() => {
    details();
  }, [])

  useEffect(() => {
    const toDate = new Date(todate);
    const fromDate = new Date(fromdate);

    console.log(toDate);
    console.log(fromDate);
    setTotDates(
      Math.floor(
        (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)
      )
    );
  }, [todate, fromdate]);

  const totAmount = room.rentperday * totDates

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/room/getRoomsById/${id}`)
        setRoom(res.data);
        console.log('render');
      } catch (err) {
        console.log(err);
      }
    }
    getRoom()
  }, []);

  async function bookRoom() {
    const bookingDetails = {
      room: room.name,
      userid: room._id,
      Fullname,
      email,
      fromdate,
      todate,
      totAmount,
      totDates,
    }

    try {
      const result = await axios.post('http://localhost:5000/book/bookroom', bookingDetails)
      Swal.fire({
        icon: "success",
        title: "Congrats...",
        text: " Booking Success ",
      });
    } catch (error) {

    }
  }

  async function handleToken(token) {
    console.log(token);

    let result;
    
    if (result === 200) {
      Swal.fire({
        icon: "success",
        title: "Congrats...",
        text: " Booking Success ",
      });

    } else {
      Swal.fire({
        icon: "success",
        title: "Congrats...",
        text: " Booking Success ",
      });

    }
  }


  function onToken(token) {
    console.log(token);
  }

  const GetData = async () => {
    let data = await getRoomsById(id);
    console.log("Update Rooms", data);
    setimageurls(data?.data?.imageurls);
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <div>
      <div className="container shadow border border-5 my-5 mx-auto w-100">
        <div className="col p-3">
          <form>
            <div className="row py-3">
              <div className="col-md-6"> <br /><br /><br />
                <img src={imageurls[0]} className="previmg" alt="" />
              </div>
              <div className="col-md-6">
                <b>
                  <h4 className='fw-bolder'>Booking Details</h4>
                  <hr />
                  <div>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Customer Name</th>
                          <th scope="col">{Fullname}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Customer E-mail</th>
                          <td>{email}</td>
                        </tr>
                        <tr>
                          <th scope="row">Room Name</th>
                          <td>{room.name}</td>
                        </tr>
                        <tr>
                          <th scope="row">Check-in Date</th>
                          <td>{fromdate}</td>
                        </tr>
                        <tr>
                          <th scope="row">Check-out Date</th>
                          <td>{todate}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div><br />
                  <div>
                    <h4 className='fw-bolder'>Payment Details</h4>
                    <hr />
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Rent Per Day</th>
                          <th className="fw-bolder" scope="col">LKR: {room.rentperday}/=</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Total Days</th>
                          <td>{totDates} days</td>
                        </tr>
                        <tr>
                          <th className="fw-bolder am" scope="row">Total Amount</th>
                          <td className='amount'>LKR: {totAmount}/=</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b>
              </div>
            </div>
            <br />
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">

              <Link to="/profile">
                <MDBBtn
                  rounded
                  color="success"
                  type="submit"
                  className="btn btn-success"> Booking Details
                </MDBBtn>
              </Link>

              <a>
                <Link to="/cusroom">
                  <MDBBtn
                    rounded
                    color="warning"
                    type="submit"
                    className="btn btn-success"> Back to Home
                  </MDBBtn>
                </Link>
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="container text-end">
        <StripeCheckout
          stripeKey="pk_test_51Lr1EmF53OEZBtIfnDtu50k4oS98pyE6AfE0grktJfgVawhf7fEMAIbuSnQLCjXTDqC9PHNoJa2JkuJuZUeCI26300PQrA3w3S"
          token={handleToken}
          billingAddress
          shippingAddress
          amount={totAmount * 100}
          currency='LKR'>
          <MDBBtn rounded
            color="warning"
            type="submit" className='btn btn-danger' onClick={bookRoom}>Pay Now</MDBBtn>
        </StripeCheckout>
      </div>
      <div>
        <CommentsSection />
      </div>
    </div>
  );
};

export default Booking;