import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";
import CommentsSection from "../../Comments/CommentsSection";
import StripeCheckout from "react-stripe-checkout";
import { AuthCustomer } from "../../../Services/AuthServices";
import axios from "axios";
import { getRoomsById } from "../services/Room";
import { BASE_URL } from "../../../configs/Url.json";

const Booking = () => {
  const [Fullname, setUserName] = useState("");
  const [email, setUserEmail] = useState("");
  const [, setcurrentUserID] = useState("");
  const { id, fromdate, todate } = useParams();
  const [room, setRoom] = useState([]);
  const [totDates, setTotDates] = useState("");
  const [imageurls, setimageurls] = useState("");

  const details = async () => {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    let email = localStorage.getItem("email");
    console.log(user); // Log the user value
    setUserName(user);
    console.log(email);
    setUserEmail(email);
    let data = await AuthCustomer(token);
    console.log("current User", data?.data);
    setcurrentUserID(data?.data?._id);
  };

  useEffect(() => {
    details();
  }, []);

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

  const totAmount = room.rentperday * totDates;

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/rooms/${id}`);
        setRoom(res.data);
        console.log("render");
      } catch (err) {
        console.log(err);
      }
    };
    getRoom();
  }, [id]);

  async function bookRoom() {
    const bookingDetails = {
      room: room.name,
      userid: room._id,
      Fullname,
      email,
      fromdate,
      todate,
      totAmount: room.rentperday * totDates,
      totDates,
    };

    try {
      const result = await axios.post(
        `${BASE_URL}/api/bookroom`,
        bookingDetails
      );
    } catch (error) {}
  }

  async function handleToken(token) {
    try {
      // Send the token to your server for payment processing
      const response = await axios.post(`${BASE_URL}/api/processPayment`, {
        token,
        amount: room.rentperday * totDates * 100, // Convert to cents
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Congrats...",
          text: "Booking Success",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Congrats...",
          text: "Booking Success",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "success",
        title: "Congrats...",
        text: "Booking Success",
      });
    }
  }

  const GetData = async () => {
    let data = await getRoomsById(id);
    console.log("Update Rooms", data);
    setimageurls(data?.data?.imageurls);
  };

  useEffect(() => {
    GetData();
  }, [id]);

  return (
    <div>
      <div className="container shadow border border-5 my-5 mx-auto w-100">
        <div className="col p-3">
          <form>
            <div className="row py-3">
              <div className="col-md-6">
                {" "}
                <br />
                <br />
                <br />
                <img src={imageurls[0]} className="previmg" alt="" />
              </div>
              <div className="col-md-6">
                <b>
                  <h4 className="fw-bolder">Booking Details</h4>
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
                  </div>
                  <br />
                  <div>
                    <h4 className="fw-bolder">Payment Details</h4>
                    <hr />
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Rent Per Day</th>
                          <th className="fw-bolder" scope="col">
                            LKR: {room.rentperday}/=
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Total Days</th>
                          <td>{totDates} days</td>
                        </tr>
                        <tr>
                          <th className="fw-bolder am" scope="row">
                            Total Amount
                          </th>
                          <td className="amount">LKR: {totAmount}/=</td>
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
                  className="btn btn-success"
                >
                  {" "}
                  Booking Details
                </MDBBtn>
              </Link>

              <Link to="/cusroom">
                <MDBBtn
                  rounded
                  color="warning"
                  type="submit"
                  className="btn btn-success"
                >
                  {" "}
                  Back to Home
                </MDBBtn>
              </Link>
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
          amount={totAmount * 100} // Convert totAmount to cents
          currency="LKR"
        >
          <MDBBtn
            rounded
            color="warning"
            type="submit"
            className="btn btn-danger"
            onClick={bookRoom}
          >
            Pay Now
          </MDBBtn>
        </StripeCheckout>
      </div>
      <div>
        <CommentsSection />
      </div>
    </div>
  );
};

export default Booking;
