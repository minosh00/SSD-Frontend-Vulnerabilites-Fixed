import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { Validateroom } from "./roomVaildate";
import { MDBBtn } from 'mdb-react-ui-kit'

const AddRoom = () => {
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

    const navigate = useNavigate();

    const changeOnClick = (f) => {
        const AddRoom = {
            name,
            maxcount,
            adult,
            children,
            bedroom,
            rentperday,
            type,
            imageurls,
            features,
            description
        };

        let validate = Validateroom(AddRoom);
        let msg = validate?.message;
        if (validate.status == false) {
            Swal.fire({
                toast: true,
                icon: 'warning',
                html: alert(`${msg}`),
                animation: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: false,
            });

        } else {
            axios.post("http://localhost:5000/room/room", AddRoom);
            Swal.fire("Congrats", " New room  Added  successfully", "success")
            navigate("/mainroom");
        }
    };


    return (
        <div>
            <div className="container shadow border border-5 my-5 mx-auto w-50">
                <div className="col p-3">
                    <h3 className=" fw-bolder mb-4"><center>Add Room Details</center></h3>
                    <form onSubmit={changeOnClick} encType="">
                        <div className="row py-3">
                            <div className="col-md-6">
                                <label for="name"> Room Name </label>
                                <input type="text" class="form-control" onChange={(f) => setname(f.target.value)} placeholder="Enter Room Name " required/>
                            </div>
                            <div class="col-md-6">
                                <label for="type"> Room Type  </label>
                                <input class="form-control" id="type" onChange={(f) => settype(f.target.value)} placeholder="Enter Room Type" required/>
                            </div>
                        </div>

                        <div className="row py-3">
                            <div class="col-md-3">
                                <label for="count"> Adult </label>
                                <input class="form-control" onChange={(f) => setadult(f.target.value)} type="number" placeholder="No of Adult " />
                            </div>
                            <div class="col-md-4">
                                <label for="rent">  Children </label>
                                <input class="form-control" onChange={(f) => setchildren(f.target.value)} type="number" placeholder="No of Children" />
                            </div>
                            <div class="col-md-5">
                                <label for="img">  Bed Rooms </label>
                                <input class="form-control" onChange={(f) => setbedroom(f.target.value)} type="number" placeholder="No of Bedroom" />
                            </div>
                        </div>

                        <div className="row py-3">
                            <div class="col-md-3">
                                <label for="count"> Max Count </label>
                                <input class="form-control" onChange={(f) => setmaxcount(f.target.value)} type="number" placeholder="Enter Max Count" />
                            </div>
                            <div class="col-md-4">
                                <label for="rent">  Rent Per day (LKR) </label>
                                <input class="form-control" onChange={(f) => setrentperday(f.target.value)} type="number" placeholder="Enter Rent Per Day" />
                            </div>
                            <div class="col-md-5">
                                <label for="img">  Image URL </label>
                                <input class="form-control" id="url" onChange={(f) => setimageurls(f.target.value)} placeholder="Enter IMG Url" />
                            </div>
                        </div>

                        <div class="col-md-12">
                            <label for="features"> Features </label>
                            <textarea class="form-control" onChange={(f) => setfeatures(f.target.value)} type="text" placeholder="Enter Features" rows="3" /> <br />
                        </div>
                        <div class="col-md-12">
                            <label for="floatingPassword"  >Description   </label>
                            <textarea class="form-control" onChange={(f) => setdescription(f.target.value)} type="text" placeholder="Enter Description" rows="6" />
                        </div> <br />
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <a><MDBBtn rounded color="danger" type="submit" className="btn btn-danger"> Add  New Rooms </MDBBtn> </a>
                            <a><Link to="/"><MDBBtn rounded color="warning" type="submit" className="btn btn-success">Back to Home  </MDBBtn></Link></a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRoom; 