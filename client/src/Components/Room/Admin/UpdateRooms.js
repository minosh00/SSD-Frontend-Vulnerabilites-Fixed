import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateRoomsByID, getRoomsById } from "../services/Room";
import { MDBBtn } from "mdb-react-ui-kit";
import { Validateroom } from "./roomVaildate";
import Swal from "sweetalert2";

const UpdateRooms = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setname] = useState("");
  const [maxcount, setmaxcount] = useState();
  const [adult, setadult] = useState("");
  const [children, setchildren] = useState("");
  const [bedroom, setbedroom] = useState("");
  const [rentperday, setrentperday] = useState("");
  const [type, settype] = useState("");
  const [imageurls, setimageurls] = useState("");
  const [features, setfeatures] = useState("");
  const [description, setdescription] = useState("");

  const handlename = (e) => {
    setname(e.target.value);
  };

  const handlemaxcount = (e) => {
    setmaxcount(e.target.value);
  };

  const handleAdult = (e) => {
    setadult(e.target.value);
  };

  const handleChildren = (e) => {
    setchildren(e.target.value);
  };

  const handleBedroom = (e) => {
    setbedroom(e.target.value);
  };

  const handlerentperday = (e) => {
    setrentperday(e.target.value);
  };

  const handletype = (e) => {
    settype(e.target.value);
  };

  const handleimageurls = (e) => {
    setimageurls(e.target.value);
  };

  const handlefeaturess = (e) => {
    setfeatures(e.target.value);
  };

  const handledescription = (e) => {
    setdescription(e.target.value);
  };

  const GetData = async () => {
    let data = await getRoomsById(id);
    console.log("Update rooms", data);

    setname(data?.data?.name);
    setmaxcount(data?.data?.maxcount);
    setadult(data?.data?.adult);
    setchildren(data?.data?.children);
    setbedroom(data?.data?.bedroom);
    setrentperday(data?.data?.rentperday);
    settype(data?.data?.type);
    setimageurls(data?.data?.imageurls);
    setfeatures(data?.data?.features);
    setdescription(data?.data?.description);
  };

  useEffect(() => {
    GetData();
  });

  const UpdateData = async (e) => {
    e.preventDefault();
    let newdata = {
      name: name,
      maxcount: maxcount,
      adult: adult,
      children: children,
      bedroom: bedroom,
      rentperday: rentperday,
      description: description,
      type: type,
      imageurls: imageurls,
      features: features,
    };

    let validate = Validateroom(newdata);
    let msg = validate?.message;
    console.log(msg);

    if (validate.status === false) {
      Swal.fire({
        toast: true,
        icon: "warning",
        html: `<span>${msg}</span>`,
        animation: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
      });
    } else {
      let data = await updateRoomsByID(id, newdata);
      console.log("Update success ", data);
      if (!data?.data?.name) {
        Swal.fire("Congrats", "Update room  successfully ", "success");
        navigate("/mainroom");
      } else {
        Swal.fire("Congrats", "Update room successfully ", "success");
        navigate("/mainroom");
      }
    }
  };

  return (
    <div>
      <div className="container shadow border border-5 my-5 mx-auto w-50">
        <div className="col p-3">
          <h3 className="fw-bolder mb-4">
            <center>Update Room Details</center>
          </h3>
          <form>
            <div className="row py-3">
              <div className="col-md-6">
                <label htmlFor="name"> Room Name </label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={handlename}
                  placeholder="room name "
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="type"> Room Type </label>
                <input
                  className="form-control"
                  id="type"
                  value={type}
                  onChange={handletype}
                  placeholder="Enter Room Type"
                />
              </div>
            </div>
            <div className="row py-3">
              <div className="col-md-3">
                <label htmlFor="count"> Adult </label>
                <input
                  className="form-control"
                  type="number"
                  value={adult}
                  onChange={handleAdult}
                  placeholder="No of Adult"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="rent"> Children </label>
                <input
                  className="form-control"
                  type="number"
                  value={children}
                  onChange={handleChildren}
                  placeholder="No of Children"
                />
              </div>
              <div className="col-md-5">
                <label htmlFor="img"> Bed Room </label>
                <input
                  className="form-control"
                  type="number"
                  value={bedroom}
                  onChange={handleBedroom}
                  placeholder="No of BedRoom"
                />
              </div>
            </div>
            <div className="row py-3">
              <div className="col-md-3">
                <label htmlFor="count"> Max Count </label>
                <input
                  className="form-control"
                  type="number"
                  value={maxcount}
                  onChange={handlemaxcount}
                  placeholder="Enter Max Count"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="rent"> Rent Per day (LKR) </label>
                <input
                  className="form-control"
                  type="number"
                  value={rentperday}
                  onChange={handlerentperday}
                  placeholder="Enter Rent Per Day"
                />
              </div>
              <div className="col-md-5">
                <label htmlFor="img"> Image URL </label>
                <input
                  className="form-control"
                  id="url"
                  value={imageurls}
                  onChange={handleimageurls}
                  placeholder="Enter IMG Url"
                />
              </div>
            </div>
            <div className="col-md-12">
              <label htmlFor="features"> Features </label>
              <textarea
                className="form-control"
                type="text"
                value={features}
                onChange={handlefeaturess}
                placeholder="Enter Features"
                rows="3"
              />{" "}
              <br />
            </div>
            <div className="col-md-12">
              <label htmlFor="floatingPassword">Description </label>
              <textarea
                className="form-control"
                type="text"
                value={description}
                onChange={handledescription}
                placeholder="Enter Description"
                rows="6"
              />
            </div>{" "}
            <br />
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <MDBBtn
                rounded
                color="danger"
                type="button"
                onClick={(e) => UpdateData(e)}
                className="btn btn-warning"
              >
                {" "}
                Update room{" "}
              </MDBBtn>
              <Link to="/">
                <MDBBtn
                  rounded
                  color="warning"
                  type="button"
                  className="btn btn-success"
                >
                  Back to Home{" "}
                </MDBBtn>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRooms;
