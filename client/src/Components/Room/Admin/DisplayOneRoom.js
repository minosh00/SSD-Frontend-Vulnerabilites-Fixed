import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getRoomsById } from "../services/Room";
import { MDBBtn } from "mdb-react-ui-kit";

const DisplayOneRoom = () => {
  const { id, fromdate, todate } = useParams();

  const [name, setname] = useState("");
  const [totDates, setTotDates] = useState("");
  const [maxcount, setmaxcount] = useState();
  const [rentperday, setrentperday] = useState("");
  const [, settype] = useState("");
  const [imageurls, setimageurls] = useState("");
  const [, setfeatures] = useState("");
  const [, setdescription] = useState("");

  useEffect(() => {
    const toDate = new Date(todate);
    const fromDate = new Date(fromdate);
    setTotDates(
      Math.floor(
        (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)
      )
    );
  }, [todate, fromdate]);

  const totalamount = totDates * rentperday;

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
  };

  useEffect(() => {
    GetData();
  });

  return (
    <div>
      <div className="container shadow border border-5 my-5 mx-auto w-100">
        <div className="col p-3">
          <h3 className="fw-bolder mb-4">
            <center>Booking Room</center>
          </h3>
          <form>
            <div className="row py-3">
              <div className="col-md-6">
                <img src={imageurls[0]} className="image-fluid" alt="" />
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
              <Link to="/mainroom">
                <MDBBtn
                  rounded
                  color="warning"
                  type="submit"
                  className="btn btn-success"
                >
                  Back to Home
                </MDBBtn>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DisplayOneRoom;
