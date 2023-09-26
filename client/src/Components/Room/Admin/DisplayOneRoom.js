import Swal from "sweetalert2";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRoomsById } from "../services/Room";
import { MDBBtn } from 'mdb-react-ui-kit'

const DisplayOneRoom = () => {

  const navigate = useNavigate();
  const { id, fromdate, todate } = useParams();

  const [name, setname] = useState("");
  const [totDates,  setTotDates] = useState("");
  const [maxcount, setmaxcount] = useState();
  const [rentperday, setrentperday] = useState("");
  const [type, settype] = useState("");
  const [imageurls, setimageurls] = useState("");
  const [features, setfeatures] = useState("");
  const [description, setdescription] = useState("");

  useEffect(() => {
    const toDate = new Date(todate);
    const fromDate = new Date(fromdate);

    console.log(toDate);
    console.log(fromDate);
    setTotDates(Math.floor((toDate.getTime() - fromDate.getTime()) / (1000*60*60*24)));
  }, [todate, fromdate]);

  const totaldays = 3;
  const totalamount = totDates * rentperday
  // const [totalamount, SetTotalAmount] = useState();

  function diffDays(fromdate, todate) {
    // time difference
    const timeDiff = Math.abs(fromdate.getTime() - todate.getTime());

    // days difference
    const totaldays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // difference
    console.log(fromdate, todate);
  }

  const GetData = async () => {
    let data = await getRoomsById(id);
    console.log("Update Rooms", data);
    setname(data?.data?.name);
    setmaxcount(data?.data?.maxcount);
    setrentperday(data?.data?.rentperday);
    settype(data?.data?.description);
    setimageurls(data?.data?.imageurls);
    setfeatures(data?.data?.features);
    setdescription(data?.data?.description);
    // SetTotalAmount(totaldays * rentperday);
  };

  useEffect(() => {
    GetData();
  }, []);

  return (

    <div>
      <div className="container shadow border border-5 my-5 mx-auto w-100">
        <div className="col p-3">
          <h3 className=" fw-bolder mb-4"><center>Booking Room</center></h3>
          <form>
            <div className="row py-3">
              <div className="col-md-6">
                <img src={imageurls[0]} className='image-fluid' alt='' />
              </div>
              <div className="col-md-6">
                <h1>Booking Details</h1>
                <hr />
                <div>
                  <p>Room Name: {name}</p>
                  <p>From Date: {fromdate}</p>
                  <p>To Date: {todate}</p>
                  <p>Max Count: {maxcount}</p>
                </div>
                <div>
                  <h1>Payment Details</h1>
                  <hr />
                  <p>Total Days: {totDates}</p>
                  <p>Rent Per Day: LKR {rentperday}/=</p>
                  <p>Total Amount: LKR {totalamount}/=</p>
                </div>
              </div>
            </div>
            <br />
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <a><Link to="/mainroom"><MDBBtn rounded color="warning" type="submit" className="btn btn-success">Back to Home  </MDBBtn></Link></a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default DisplayOneRoom;